import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  FlexItem,
  Label,
  PageSection,
} from '@patternfly/react-core'
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AppStack, ContentSection } from '../components/ContentSection'
import { EpicList } from '../components/EpicList'
import { StatStrip } from '../components/KpiCard'
import { PageHeader } from '../components/PageHeader'
import { PhaseStepper } from '../components/PhaseStepper'
import { QEList } from '../components/QEList'
import { BadgeLabel } from '../components/StatusLabel'
import { completedPhaseCount, epicsByOperator, getOperator, qeByOperator, totalPhaseCount } from '../data'

export function OperatorPage() {
  const { id } = useParams()
  const operator = id ? getOperator(id) : undefined

  if (!operator) {
    return <Navigate to="/" replace />
  }

  const epics = epicsByOperator[operator.id] ?? []
  const qe = qeByOperator[operator.id] ?? []

  return (
    <>
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Overview</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>{operator.shortName}</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>

      <PageSection isFilled className="app-page">
        <AppStack>
          <div>
            <PageHeader
              title={operator.name}
              documentTitle={operator.shortName}
              description={`Current status and readiness for the ${operator.shortName} operator.`}
              actions={
                <Button
                  variant="secondary"
                  component="a"
                  href={operator.repo}
                  target="_blank"
                  rel="noreferrer"
                  icon={<ExternalLinkAltIcon />}
                  iconPosition="end"
                >
                  Repository
                </Button>
              }
            />
            <Flex className="pf-v6-u-mt-md" gap={{ default: 'gapSm' }} flexWrap={{ default: 'wrap' }}>
              <FlexItem>
                <Label color="blue">{operator.category}</Label>
              </FlexItem>
              <FlexItem>
                <BadgeLabel status={operator.releaseStatus} />
              </FlexItem>
            </Flex>
          </div>

          <ContentSection>
            <StatStrip
              aria-label={`${operator.shortName} status`}
              items={[
                { label: 'Onboarded', value: operator.onboarded ? 'Yes' : 'No' },
                { label: 'Release status', value: operator.releaseStatus },
                { label: 'End-to-end adoption', value: operator.adoptionDate },
              ]}
            />
          </ContentSection>

          <ContentSection
            title="Development progress"
            description={`${completedPhaseCount} of ${totalPhaseCount} phases complete. QE E2E and bug-fix are still WIP.`}
          >
            <Card>
              <CardBody>
                <div className="stepper-scroll">
                  <PhaseStepper phases={operator.phases} />
                </div>
              </CardBody>
            </Card>
          </ContentSection>

          <ContentSection
            title="Epics"
            description="Development progress by epic. Expand an epic, then a ticket, for phase telemetry."
          >
            <Card className="accordion-card">
              <CardBody>
                <EpicList epics={epics} operatorName={operator.shortName} />
              </CardBody>
            </Card>
          </ContentSection>

          <ContentSection
            title="QE metrics"
            description="Acceptance-criteria coverage, automation, first-pass rate, and cost."
          >
            <Card className="accordion-card">
              <CardBody>
                <QEList epics={qe} operatorName={operator.shortName} />
              </CardBody>
            </Card>
          </ContentSection>

          {operator.id === 'ztwim' && (
            <ContentSection>
              <Card>
                <CardTitle>Related metrics</CardTitle>
                <CardBody>
                  View detailed model performance and productivity metrics for ZTWIM:{' '}
                  <Link to="/?section=performance-metrics">Performance and metrics</Link>
                </CardBody>
              </Card>
            </ContentSection>
          )}

          <ContentSection title="Operator details">
            <Card>
              <CardBody>
                <DescriptionList isHorizontal>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Operator name</DescriptionListTerm>
                    <DescriptionListDescription>{operator.name}</DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Category</DescriptionListTerm>
                    <DescriptionListDescription>{operator.category}</DescriptionListDescription>
                  </DescriptionListGroup>
                  {operator.crds && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>CRDs</DescriptionListTerm>
                      <DescriptionListDescription>{operator.crds}</DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                  {operator.apiVersion && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>API version</DescriptionListTerm>
                      <DescriptionListDescription>{operator.apiVersion}</DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                  {operator.olmChannel && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>OLM channel</DescriptionListTerm>
                      <DescriptionListDescription>{operator.olmChannel}</DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                  <DescriptionListGroup>
                    <DescriptionListTerm>Repository</DescriptionListTerm>
                    <DescriptionListDescription>
                      <Button
                        variant="link"
                        isInline
                        icon={<ExternalLinkAltIcon />}
                        iconPosition="end"
                        component="a"
                        href={operator.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {operator.repoLabel}
                      </Button>
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </ContentSection>
        </AppStack>
      </PageSection>
    </>
  )
}
