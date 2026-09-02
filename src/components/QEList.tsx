import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionToggle,
  EmptyState,
  EmptyStateBody,
  Label,
} from '@patternfly/react-core'
import ChartLineIcon from '@patternfly/react-icons/dist/esm/icons/chart-line-icon'
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon'
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table'
import { useState } from 'react'
import type { QeEpic, QeTicket } from '../types'
import { DataPanel } from './ContentSection'
import { StatStrip } from './KpiCard'
import { CoverageLabel } from './StatusLabel'

function accordionId(parts: string[]) {
  return parts.join('-').replace(/[^a-zA-Z0-9_-]+/g, '-')
}

function formatStage(stage: string) {
  return stage.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatTokens(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

function StoryToggle({ ticket }: { ticket: QeTicket }) {
  return (
    <span className="epic-toggle">
      <a href={ticket.ticketLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
        {ticket.ticketId} <ExternalLinkAltIcon />
      </a>
      <span className="epic-title">{ticket.changeName || ticket.ticketName}</span>
      <Label color="blue" isCompact>
        {ticket.mode}
      </Label>
      <Label color="purple" isCompact>
        Phase {ticket.phase}
      </Label>
      {ticket.prUrl && (
        <a href={ticket.prUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
          PR <ExternalLinkAltIcon />
        </a>
      )}
    </span>
  )
}

function TicketMetrics({ ticket }: { ticket: QeTicket }) {
  const ac = ticket.acScenarioCoverage
  const auto = ticket.automationCoverage
  const fpr = ticket.firstPassRate
  const flake = ticket.flakeRate
  const bugs = ticket.bugs
  const triage = ticket.triageAccuracy

  return (
    <div className="ticket-detail">
      <StatStrip
        aria-label={`${ticket.ticketId} QE summary`}
        items={[
          { label: 'Flake rate', value: `${flake.pct.toFixed(1)}%` },
          { label: 'Bugs found', value: bugs.found },
          { label: 'Bugs verified', value: bugs.verified },
          {
            label: 'Triage accuracy',
            value: triage.pct !== null ? `${triage.pct}%` : 'N/A',
          },
          { label: 'Estimated cost', value: ticket.cost.estimatedCostUsd },
          { label: 'Wall time', value: ticket.cost.wallTime },
        ]}
      />

      <DataPanel title="Coverage and quality">
        <div className="app-table-scroll">
          <Table aria-label={`QE coverage for ${ticket.ticketId}`} className="data-table" variant="compact">
            <Thead>
              <Tr>
                <Th>Metric</Th>
                <Th>Result</Th>
                <Th>Coverage</Th>
                <Th>Status</Th>
                <Th>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>AC scenario coverage</Td>
                <Td>
                  {ac.covered} / {ac.total}
                </Td>
                <Td>
                  <strong>{ac.pct.toFixed(1)}%</strong>
                </Td>
                <Td>
                  <CoverageLabel pct={ac.pct} />
                </Td>
                <Td>
                  {ac.uncovered.length > 0
                    ? ac.uncovered.map((u) => (
                        <Label key={u} isCompact className="pf-v6-u-mr-xs">
                          {u}
                        </Label>
                      ))
                    : '—'}
                </Td>
              </Tr>
              <Tr>
                <Td>Automation coverage</Td>
                <Td>
                  {auto.automated} / {auto.total}
                </Td>
                <Td>
                  <strong>{auto.pct.toFixed(1)}%</strong>
                </Td>
                <Td>
                  <CoverageLabel pct={auto.pct} />
                </Td>
                <Td>
                  {auto.manual} manual scenario{auto.manual === 1 ? '' : 's'}
                </Td>
              </Tr>
              <Tr>
                <Td>First-pass rate</Td>
                <Td>
                  {fpr.passed} / {fpr.executed}
                </Td>
                <Td>
                  <strong>{fpr.pct.toFixed(1)}%</strong>
                </Td>
                <Td>
                  <CoverageLabel pct={fpr.pct} />
                </Td>
                <Td>{fpr.source ? `Source: ${fpr.source}` : '—'}</Td>
              </Tr>
              <Tr>
                <Td>Flake rate</Td>
                <Td>
                  {flake.retriesPassed} / {flake.retries} retries
                </Td>
                <Td>
                  <strong>{flake.pct.toFixed(1)}%</strong>
                </Td>
                <Td>
                  {flake.pct === 0 ? <Label color="green">Clean</Label> : <Label color="orange">Flaky</Label>}
                </Td>
                <Td>—</Td>
              </Tr>
              <Tr>
                <Td>Bugs</Td>
                <Td>{bugs.found} found</Td>
                <Td>{bugs.verified} verified</Td>
                <Td>
                  {bugs.found === 0 ? (
                    <Label color="green">None</Label>
                  ) : (
                    <Label color="red">
                      {bugs.found} bug{bugs.found === 1 ? '' : 's'}
                    </Label>
                  )}
                </Td>
                <Td>—</Td>
              </Tr>
              <Tr>
                <Td>Triage accuracy</Td>
                <Td>
                  {triage.correct} / {triage.total}
                </Td>
                <Td>
                  <strong>{triage.pct !== null ? `${triage.pct}%` : 'N/A'}</strong>
                </Td>
                <Td>
                  {triage.pct !== null ? <CoverageLabel pct={triage.pct} /> : <Label color="grey">N/A</Label>}
                </Td>
                <Td>{triage.reason ? triage.reason.replace(/_/g, ' ') : '—'}</Td>
              </Tr>
            </Tbody>
          </Table>
        </div>
      </DataPanel>

      {ticket.cost.perStage.length > 0 && (
        <DataPanel title="Cost breakdown by stage">
          <div className="app-table-scroll">
            <Table aria-label={`QE cost for ${ticket.ticketId}`} className="data-table" variant="compact">
              <Thead>
                <Tr>
                  <Th>Stage</Th>
                  <Th>Tokens in</Th>
                  <Th>Tokens out</Th>
                  <Th>Duration</Th>
                </Tr>
              </Thead>
              <Tbody>
                {ticket.cost.perStage.map((s) => (
                  <Tr key={s.stage}>
                    <Td>{formatStage(s.stage)}</Td>
                    <Td>{formatTokens(s.tokensIn)}</Td>
                    <Td>{formatTokens(s.tokensOut)}</Td>
                    <Td>{s.duration}</Td>
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

function nestedTicketIds(epics: QeEpic[]) {
  const ids: Record<string, boolean> = {}
  for (const epic of epics) {
    if (!epic.hasEpic || epic.tickets.length < 2) continue
    for (const ticket of epic.tickets) {
      ids[accordionId([epic.epicId, ticket.ticketId])] = true
    }
  }
  return ids
}

function firstItemId(epics: QeEpic[]) {
  const epic = epics[0]
  if (!epic) return ''
  if (!epic.hasEpic && epic.tickets[0]) return `story-${epic.tickets[0].ticketId}`
  return `epic-${epic.epicId}`
}

export function QEList({ epics, operatorName }: { epics: QeEpic[]; operatorName: string }) {
  const [expanded, setExpanded] = useState<string>(() => firstItemId(epics))
  const [expandedTickets, setExpandedTickets] = useState<Record<string, boolean>>(() => nestedTicketIds(epics))

  if (epics.length === 0) {
    return (
      <EmptyState titleText="No QE pipeline data yet" headingLevel="h3" icon={ChartLineIcon} variant="sm">
        <EmptyStateBody>
          QE E2E is still in progress for {operatorName}. Metrics appear here after a QE agentic run lands.
        </EmptyStateBody>
      </EmptyState>
    )
  }

  return (
    <Accordion isBordered className="epic-accordion">
      {epics.flatMap((epic) => {
        if (!epic.hasEpic) {
          return epic.tickets.map((ticket) => {
            const id = `story-${ticket.ticketId}`
            return (
              <AccordionItem key={id} isExpanded={expanded === id}>
                <AccordionToggle id={`${id}-toggle`} onClick={() => setExpanded(expanded === id ? '' : id)}>
                  <StoryToggle ticket={ticket} />
                </AccordionToggle>
                <AccordionContent id={`${id}-content`} contentBodyProps={{ className: 'epic-body' }}>
                  <TicketMetrics ticket={ticket} />
                </AccordionContent>
              </AccordionItem>
            )
          })
        }

        const id = `epic-${epic.epicId}`
        const nestTickets = epic.tickets.length > 1
        return [
          <AccordionItem key={id} isExpanded={expanded === id}>
            <AccordionToggle id={`${id}-toggle`} onClick={() => setExpanded(expanded === id ? '' : id)}>
              <span className="epic-toggle">
                <a href={epic.epicLink} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                  {epic.epicId} <ExternalLinkAltIcon />
                </a>
                <span className="epic-title">{epic.epicTitle}</span>
                {epic.tickets[0]?.prUrl && (
                  <a href={epic.tickets[0].prUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    PR <ExternalLinkAltIcon />
                  </a>
                )}
              </span>
            </AccordionToggle>
            <AccordionContent id={`${id}-content`} contentBodyProps={{ className: 'epic-body' }}>
              <StatStrip
                aria-label={`${epic.epicId} QE summary`}
                items={[
                  { label: 'QE tickets', value: epic.summary.ticketsCount },
                  { label: 'AC coverage', value: `${epic.summary.acCoveragePct}%` },
                  { label: 'Automation', value: `${epic.summary.automationPct}%` },
                  { label: 'First pass', value: `${epic.summary.firstPassPct}%` },
                  { label: 'Bugs found', value: epic.summary.bugsFound },
                  { label: 'Tokens', value: epic.summary.totalTokens },
                  { label: 'Cost', value: epic.summary.totalCost },
                ]}
              />
              {nestTickets ? (
                <Accordion isBordered className="nested-accordion" aria-label={`${epic.epicId} QE tickets`}>
                  {epic.tickets.map((ticket) => {
                    const ticketId = accordionId([epic.epicId, ticket.ticketId])
                    return (
                      <AccordionItem key={ticket.ticketId} isExpanded={Boolean(expandedTickets[ticketId])}>
                        <AccordionToggle
                          id={`${ticketId}-toggle`}
                          onClick={() =>
                            setExpandedTickets((current) => ({
                              ...current,
                              [ticketId]: !current[ticketId],
                            }))
                          }
                        >
                          <StoryToggle ticket={ticket} />
                        </AccordionToggle>
                        <AccordionContent id={`${ticketId}-content`} contentBodyProps={{ className: 'ticket-body' }}>
                          <TicketMetrics ticket={ticket} />
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              ) : (
                epic.tickets[0] && <TicketMetrics ticket={epic.tickets[0]} />
              )}
            </AccordionContent>
          </AccordionItem>,
        ]
      })}
    </Accordion>
  )
}
