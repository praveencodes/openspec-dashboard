import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  Label,
  List,
  ListItem,
  PageSection,
  Progress,
} from '@patternfly/react-core'
import ShieldAltIcon from '@patternfly/react-icons/dist/esm/icons/shield-alt-icon'
import TachometerAltIcon from '@patternfly/react-icons/dist/esm/icons/tachometer-alt-icon'
import UsersIcon from '@patternfly/react-icons/dist/esm/icons/users-icon'
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  architectureLayers,
  challenges,
  completedPhaseCount,
  goals,
  harnessContribution,
  nextSteps,
  operators,
  overallProgressPct,
  productivityGains,
  qualityScores,
  recommendations,
  tokenUsage,
  totalPhaseCount,
} from '../data'
import { AppStack, ContentSection } from '../components/ContentSection'
import { formatCount, formatMillions, GroupedBarChart, HorizontalBarChart } from '../components/MetricsCharts'
import { StatStrip } from '../components/KpiCard'
import { PageHeader } from '../components/PageHeader'
import { PhaseStepper } from '../components/PhaseStepper'
import { PipelineFlow } from '../components/PipelineFlow'
import { BadgeLabel, PhaseLabel } from '../components/StatusLabel'
import { ViewToggle, type MetricView } from '../components/ViewToggle'

const GOAL_ICONS = [TachometerAltIcon, UsersIcon, ShieldAltIcon]

function MetricCard({
  title,
  view,
  onViewChange,
  viewId,
  footnote,
  children,
}: {
  title: string
  view?: MetricView
  onViewChange?: (view: MetricView) => void
  viewId?: string
  footnote?: string
  children: ReactNode
}) {
  return (
    <Card>
      <CardHeader
        actions={
          view && onViewChange && viewId
            ? { actions: <ViewToggle view={view} onChange={onViewChange} id={viewId} />, hasNoOffset: true }
            : undefined
        }
      >
        <CardTitle component="h3">{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="app-table-scroll">{children}</div>
      </CardBody>
      {footnote && <CardFooter className="metric-footnote">{footnote}</CardFooter>}
    </Card>
  )
}

export function OverviewPage() {
  const [params] = useSearchParams()
  const [qualityView, setQualityView] = useState<MetricView>('chart')
  const [tokenView, setTokenView] = useState<MetricView>('chart')
  const [prodView, setProdView] = useState<MetricView>('chart')

  useEffect(() => {
    const section = params.get('section')
    if (!section) return
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [params])

  return (
    <PageSection isFilled className="app-page">
      <AppStack>
        <PageHeader
          title="Agentic SDLC dashboard"
          description="Tracking AI-powered operator development for the OAP team: onboarding, OpenSpec pipeline metrics, and per-ticket telemetry across Cert Manager, ZTWIM, SSCSI, Must Gather, and ESO."
          actions={
            <div className="page-header-progress">
              <Progress
                value={overallProgressPct}
                title="Development phases"
                label={`${completedPhaseCount} of ${totalPhaseCount}`}
                measureLocation="outside"
              />
            </div>
          }
        />

        <ContentSection>
          <StatStrip
            aria-label="Pipeline snapshot"
            items={[
              { label: 'Operators', value: '5', hint: 'Onboarded to the flow' },
              {
                label: 'Phases complete',
                value: `${completedPhaseCount} of ${totalPhaseCount}`,
                hint: `${overallProgressPct}% of the shared SDLC model`,
              },
              { label: 'Overall progress', value: `${overallProgressPct}%`, hint: 'QE E2E and bug-fix remain WIP' },
              { label: 'In progress', value: 'QE E2E · Bug fix', hint: 'Same status across all operators' },
            ]}
          />
        </ContentSection>

        <ContentSection title="Goals">
          <div className="equal-grid">
            {goals.map((goal, i) => {
              const GoalIcon = GOAL_ICONS[i] ?? TachometerAltIcon
              return (
                <Card isFullHeight key={goal.title} className="goal-card">
                  <CardBody className="goal-card__inner">
                    <div className="goal-card__heading">
                      <span className="goal-card__icon" aria-hidden>
                        <Icon size="lg">
                          <GoalIcon />
                        </Icon>
                      </span>
                      <Label color="red" isCompact>
                        {i + 1}
                      </Label>
                      <CardTitle component="h3">{goal.title}</CardTitle>
                    </div>
                    <p className="goal-card__body">{goal.body}</p>
                  </CardBody>
                </Card>
              )
            })}
          </div>
        </ContentSection>

        <ContentSection
          title="Operator status"
          description={`Onboarding and development progress. ${completedPhaseCount} of ${totalPhaseCount} phases complete (${overallProgressPct}%) across all operators. QE E2E and bug-fix remain in progress.`}
        >
          <Card>
          <CardBody>
            <div className="app-table-scroll">
              <Table aria-label="Operator status and development patterns" variant="compact">
                <Thead>
                  <Tr>
                    <Th>Operator</Th>
                    <Th>On-boarded</Th>
                    <Th>RFE</Th>
                    <Th>Development</Th>
                    <Th>Unit tests</Th>
                    <Th>QE E2E</Th>
                    <Th>Bug fix</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {operators.map((op) => (
                    <Tr key={op.id}>
                      <Td dataLabel="Operator">
                        <Link to={`/operators/${op.id}`}>{op.shortName}</Link>
                      </Td>
                      <Td dataLabel="On-boarded">
                        <PhaseLabel status={op.phases.onboarded} />
                      </Td>
                      <Td dataLabel="RFE">
                        <PhaseLabel status={op.phases.rfe} />
                      </Td>
                      <Td dataLabel="Development">
                        <PhaseLabel status={op.phases.development} />
                      </Td>
                      <Td dataLabel="Unit tests">
                        <PhaseLabel status={op.phases.unitTests} />
                      </Td>
                      <Td dataLabel="QE E2E">
                        <PhaseLabel status={op.phases.qeE2e} />
                      </Td>
                      <Td dataLabel="Bug fix">
                        <PhaseLabel status={op.phases.bugFix} />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardTitle>Shared phase model</CardTitle>
          <CardBody>
            <div className="stepper-scroll">
              <PhaseStepper phases={operators[0].phases} />
            </div>
          </CardBody>
        </Card>
        </ContentSection>

        <ContentSection title="Tools for layered architecture" description="Platforms and tools across the five-layer architecture stack.">
          <Card>
          <CardBody>
            <div className="app-table-scroll">
              <Table aria-label="Layered architecture tools" variant="compact">
                <Thead>
                  <Tr>
                    <Th width={15}>Layer</Th>
                    <Th width={30}>Tools</Th>
                    <Th>Criteria</Th>
                    <Th>Result</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {architectureLayers.map((row) => (
                    <Tr key={row.layer}>
                      <Td dataLabel="Layer">
                        <strong>{row.layer}</strong>
                      </Td>
                      <Td dataLabel="Tools">
                        <div className="tool-stack">
                          {row.tools.map((t) => (
                            <div key={t.name} className="tool-chip">
                              <span>{t.name}</span>
                              <BadgeLabel status={t.status} />
                            </div>
                          ))}
                        </div>
                      </Td>
                      <Td dataLabel="Criteria">
                        <List isPlain>
                          {row.criteria.map((c) => (
                            <ListItem key={c}>{c}</ListItem>
                          ))}
                        </List>
                      </Td>
                      <Td dataLabel="Result">
                        <List isPlain>
                          {row.result.map((c) => (
                            <ListItem key={c}>{c}</ListItem>
                          ))}
                        </List>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
        </ContentSection>

        <ContentSection
          title="Agentic pipeline flow"
          description="OpenSpec architecture flow with human gates. Hover a colored step for prompt examples."
        >
          <PipelineFlow />
        </ContentSection>

        <ContentSection
          id="performance-metrics"
          title="Performance and metrics"
          description="Model performance across pipeline phases and code generation."
        >
          <Card>
            <CardTitle component="h3">Harness engineering document prep — contribution by approach</CardTitle>
            <CardBody>
              <HorizontalBarChart
                items={harnessContribution}
                ariaTitle="Harness document contribution"
                xLabel="Share of work (%)"
              />
            </CardBody>
            <CardFooter className="metric-footnote">
              ai-helpers agentic docs contributed semantics and structure. Cursor and the operator team refined the
              content in iteration.
            </CardFooter>
          </Card>

          <MetricCard
            title="Overall report quality and code generation"
            view={qualityView}
            onViewChange={setQualityView}
            viewId="quality"
            footnote="All models perform well for spec validation and planning. Sonnet 5 is less efficient for tasks and code generation because it produces a larger task list."
          >
            {qualityView === 'table' ? (
              <Table aria-label="Report quality by model" variant="compact">
                <Thead>
                  <Tr>
                    <Th>Phase</Th>
                    {qualityScores.series.map((s) => (
                      <Th key={s.name}>{s.name}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {qualityScores.phases.map((phase, i) => (
                    <Tr key={phase}>
                      <Td dataLabel="Phase">{phase}</Td>
                      {qualityScores.series.map((s) => (
                        <Td key={s.name} dataLabel={s.name}>
                          {s.values[i].toFixed(1)}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <GroupedBarChart
                categories={qualityScores.phases}
                series={qualityScores.series}
                yLabel="Score (0–5)"
                ariaTitle="Report quality by phase and model"
                domainY={[0, 5]}
              />
            )}
          </MetricCard>

          <MetricCard
            title="Code-generation token usage by ticket"
            view={tokenView}
            onViewChange={setTokenView}
            viewId="tokens"
            footnote="Composer 2.5 uses substantially fewer tokens than Sonnet 5 or Opus 4.6 on the same tickets."
          >
            {tokenView === 'table' ? (
              <Table aria-label="Token usage by ticket and model" variant="compact">
                <Thead>
                  <Tr>
                    <Th>Ticket</Th>
                    {tokenUsage.series.map((s) => (
                      <Th key={s.name}>{s.name}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {tokenUsage.tickets.map((ticket, i) => (
                    <Tr key={ticket.id}>
                      <Td dataLabel="Ticket">
                        <a href={ticket.href} target="_blank" rel="noreferrer">
                          {ticket.id}
                        </a>
                      </Td>
                      {tokenUsage.series.map((s) => (
                        <Td key={s.name} dataLabel={s.name}>
                          {formatCount(s.values[i])}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <GroupedBarChart
                categories={tokenUsage.tickets.map((t) => t.id)}
                series={tokenUsage.series}
                yLabel="Tokens"
                ariaTitle="Token usage by ticket and model"
                formatY={formatMillions}
              />
            )}
          </MetricCard>

          <MetricCard
            title={`Epic-calibrated productivity gains — ${productivityGains.operator}`}
            view={prodView}
            onViewChange={setProdView}
            viewId="productivity"
            footnote="Task-phase gain is modest because review time still dominates when the model generates a large task list."
          >
            {prodView === 'table' ? (
              <Table aria-label="ZTWIM productivity gains" variant="compact">
                <Thead>
                  <Tr>
                    <Th>Phase</Th>
                    {productivityGains.series.map((s) => (
                      <Th key={s.name}>{s.name}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {productivityGains.phases.map((phase, i) => (
                    <Tr key={phase}>
                      <Td dataLabel="Phase">{phase}</Td>
                      {productivityGains.series.map((s) => (
                        <Td key={s.name} dataLabel={s.name}>
                          {s.values[i]}%
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <GroupedBarChart
                categories={productivityGains.phases}
                series={productivityGains.series}
                yLabel="Time gain (%)"
                ariaTitle="ZTWIM productivity gains"
                domainY={[0, 100]}
                formatY={(v) => `${v}%`}
              />
            )}
          </MetricCard>
        </ContentSection>

        <ContentSection title="Challenges and recommendations">
          <div className="equal-grid">
            <Card isFullHeight>
              <CardTitle>Key challenges</CardTitle>
              <CardBody>
                <List>
                  {challenges.map((c) => (
                    <ListItem key={c}>{c}</ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
            <Card isFullHeight>
              <CardTitle>Recommendations</CardTitle>
              <CardBody>
                <List>
                  {recommendations.map((c) => (
                    <ListItem key={c}>{c}</ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
            <Card isFullHeight>
              <CardTitle>Next steps</CardTitle>
              <CardBody>
                <List>
                  {nextSteps.map((c) => (
                    <ListItem key={c}>{c}</ListItem>
                  ))}
                </List>
              </CardBody>
            </Card>
          </div>
        </ContentSection>
      </AppStack>
    </PageSection>
  )
}
