import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  EmptyState,
  EmptyStateBody,
} from '@patternfly/react-core'
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon'
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon'
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table'
import { useState } from 'react'
import type { Epic, TicketRun } from '../types'
import { DataPanel } from './ContentSection'
import { StatStrip, type StatItem } from './KpiCard'
import { BadgeLabel, RunStatusLabel } from './StatusLabel'

function accordionId(parts: string[]) {
  return parts.join('-').replace(/[^a-zA-Z0-9_-]+/g, '-')
}

function ticketHealthItems(ticket: TicketRun): StatItem[] {
  const { health } = ticket
  const items: StatItem[] = [
    { label: 'Total tokens', value: health.totalTokens },
    { label: 'Run cost', value: health.runCost },
    { label: 'Wall time', value: health.wallTime },
  ]
  if (health.compliance) {
    items.push({ label: 'Compliance', value: health.compliance, hint: 'Const. pass' })
  }
  if (health.gatePass) {
    items.push({ label: 'Gate pass rate', value: health.gatePass, hint: 'First-pass phases' })
  }
  if (health.refinement) {
    items.push({
      label: 'Refinement iter.',
      value: health.refinement,
      hint: health.evalRejections !== undefined ? `${health.evalRejections} eval rejections` : undefined,
    })
  } else if (health.evalRejections !== undefined) {
    items.push({ label: 'Eval rejections', value: health.evalRejections })
  }
  items.push({
    label: 'Agent success',
    value: health.agentSuccessPct,
    hint: `(${health.tasksPassed}/${health.tasksTotal} tasks)`,
  })
  return items
}

function TicketDetail({ ticket }: { ticket: TicketRun }) {
  return (
    <div className="ticket-detail">
      <StatStrip aria-label={`${ticket.ticketId} run metrics`} items={ticketHealthItems(ticket)} />

      <DataPanel title="Phase-by-phase telemetry">
        <div className="app-table-scroll">
          <Table
            aria-label={`Telemetry for ${ticket.ticketId} ${ticket.agentLabel}`}
            className="data-table"
            variant="compact"
          >
            <Thead>
              <Tr>
                <Th>Phase</Th>
                <Th>Status</Th>
                <Th>Loops / iter.</Th>
                <Th>Time</Th>
                <Th>Tokens in / out</Th>
                <Th>Quality / eval</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ticket.phases.map((phase) => (
                <Tr key={phase.phaseName}>
                  <Td>{phase.phaseName}</Td>
                  <Td>
                    <RunStatusLabel status={phase.status} />
                  </Td>
                  <Td>{phase.iterations}</Td>
                  <Td>{phase.timeTaken}</Td>
                  <Td>{phase.tokensInOut}</Td>
                  <Td>{phase.quality || '—'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </DataPanel>

      {ticket.artifactEdits && ticket.artifactEdits.length > 0 && (
        <DataPanel title="Per-artifact edit counts">
          <div className="app-table-scroll">
            <Table aria-label={`Artifact edits for ${ticket.ticketId}`} className="data-table" variant="compact">
              <Thead>
                <Tr>
                  <Th>Artifact</Th>
                  <Th>Phase</Th>
                  <Th>Eval refinements</Th>
                  <Th>User feedback rounds</Th>
                  <Th>Manual corrections</Th>
                </Tr>
              </Thead>
              <Tbody>
                {ticket.artifactEdits.map((row) => (
                  <Tr key={row.artifact}>
                    <Td>{row.artifact}</Td>
                    <Td>{row.phase}</Td>
                    <Td>{row.evalRefinements}</Td>
                    <Td>{row.userFeedbackRounds}</Td>
                    <Td>{row.manualCorrections}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </DataPanel>
      )}
    </div>
  )
}

function allTicketIds(epics: Epic[]) {
  const ids: Record<string, boolean> = {}
  for (const epic of epics) {
    for (const ticket of epic.tickets) {
      ids[accordionId([epic.epicId, ticket.ticketId, ticket.agentLabel])] = true
    }
  }
  return ids
}

export function EpicList({ epics, operatorName }: { epics: Epic[]; operatorName: string }) {
  const [expanded, setExpanded] = useState<string>(epics[0] ? `${epics[0].epicId}-0` : '')
  const [expandedTickets, setExpandedTickets] = useState<Record<string, boolean>>(() => allTicketIds(epics))

  if (epics.length === 0) {
    return (
      <EmptyState titleText="No epic telemetry yet" headingLevel="h3" icon={CubesIcon} variant="sm">
        <EmptyStateBody>
          {operatorName} is onboarded. Pipeline metrics will appear here after the first completed agentic run.
        </EmptyStateBody>
      </EmptyState>
    )
  }

  return (
    <Accordion isBordered className="epic-accordion">
      {epics.map((epic, epicIndex) => {
        const id = `${epic.epicId}-${epicIndex}`
        return (
          <AccordionItem key={id} isExpanded={expanded === id}>
            <AccordionToggle
              id={`${id}-toggle`}
              onClick={() => setExpanded(expanded === id ? '' : id)}
            >
              <span className="epic-toggle">
                <a href={epic.epicLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  {epic.epicId} <ExternalLinkAltIcon />
                </a>
                <span className="epic-title">{epic.epicTitle}</span>
                <BadgeLabel status={epic.status} />
              </span>
            </AccordionToggle>
            <AccordionContent id={`${id}-content`} contentBodyProps={{ className: 'epic-body' }}>
              <StatStrip
                aria-label={`${epic.epicId} summary`}
                items={[
                  { label: 'Runs', value: `${epic.summary.runsCompleted}/${epic.summary.runsTotal}` },
                  { label: 'Total tokens', value: epic.summary.totalTokens },
                  { label: 'Agent success', value: epic.summary.agentSuccessPct },
                  { label: 'Open blockers', value: epic.summary.openBlockers },
                  { label: 'Unit tests', value: epic.summary.unitTests, hint: epic.summary.unitTestTokens },
                ]}
              />

              <Accordion isBordered className="nested-accordion" aria-label={`${epic.epicId} tickets`}>
                {epic.tickets.map((ticket) => {
                  const ticketId = accordionId([epic.epicId, ticket.ticketId, ticket.agentLabel])
                  return (
                    <AccordionItem key={ticketId} isExpanded={Boolean(expandedTickets[ticketId])}>
                      <AccordionToggle
                        id={`${ticketId}-toggle`}
                        onClick={() =>
                          setExpandedTickets((current) => ({
                            ...current,
                            [ticketId]: !current[ticketId],
                          }))
                        }
                      >
                        <span className="epic-toggle">
                          <a
                            href={ticket.ticketLink}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {ticket.ticketId} <ExternalLinkAltIcon />
                          </a>
                          <span className="epic-title">
                            {ticket.ticketSummary} · {ticket.agentLabel}
                          </span>
                          <BadgeLabel status={ticket.status} />
                        </span>
                      </AccordionToggle>
                      <AccordionContent
                        id={`${ticketId}-content`}
                        contentBodyProps={{ className: 'ticket-body' }}
                      >
                        <TicketDetail ticket={ticket} />
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
