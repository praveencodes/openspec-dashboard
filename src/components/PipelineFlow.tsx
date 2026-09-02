import { Button, Label, LabelGroup } from '@patternfly/react-core'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { pipelineTips } from '../data'

type NodeKind = 'adapted' | 'custom' | 'eval' | 'tool' | 'wip'

type TipKey = keyof typeof pipelineTips

type StepProps = {
  kind: NodeKind
  tipKey?: TipKey
  children: ReactNode
}

const HUMAN_TITLE = 'Human step'

function HumanIcon({ size = 18 }: { size?: number }) {
  return (
    <svg className="pipe-human" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <title>{HUMAN_TITLE}</title>
      <path
        fill="currentColor"
        d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v2h20v-2c0-3.3-6.7-5-10-5z"
      />
    </svg>
  )
}

function Arrow({
  axis,
  both = false,
  human = false,
}: {
  axis: 'h' | 'v' | 'up'
  both?: boolean
  human?: boolean
}) {
  const className = `pipe-arrow pipe-arrow--${axis}${human ? ' has-human' : ''}`
  if (axis === 'h') {
    return (
      <span className={className}>
        <svg width="48" height="16" viewBox="0 0 48 16" aria-hidden="true">
          {both ? (
            <>
              <path d="M8 8h32" />
              <path d="M11 4l-7 4 7 4" />
              <path d="M37 4l7 4-7 4" />
            </>
          ) : (
            <>
              <path d="M0 8h40" />
              <path d="M37 4l7 4-7 4" />
            </>
          )}
        </svg>
        {human && <HumanIcon />}
      </span>
    )
  }

  const up = axis === 'up'
  return (
    <span className={className}>
      <svg width="16" height="32" viewBox="0 0 16 32" aria-hidden="true">
        {both ? (
          <>
            <path d="M8 8v16" />
            <path d="M4 11l4-7 4 7" />
            <path d="M4 21l4 7 4-7" />
          </>
        ) : up ? (
          <>
            <path d="M8 32v-24" />
            <path d="M4 11l4-7 4 7" />
          </>
        ) : (
          <>
            <path d="M8 0v24" />
            <path d="M4 21l4 7 4-7" />
          </>
        )}
      </svg>
      {human && <HumanIcon />}
    </span>
  )
}

function Step({ kind, tipKey, children }: StepProps) {
  const tip = tipKey ? pipelineTips[tipKey] : undefined
  return (
    <div
      className={`pipe-node pipe-node--${kind}${tip ? ' is-interactive' : ''}`}
      tabIndex={tip ? 0 : undefined}
    >
      <span className="pipe-node__label">{children}</span>
      {tip && (
        <div className="pipe-tip">
          <strong>{tip.title}</strong>
          <Button variant="link" isInline component="a" href={tip.href} target="_blank" rel="noreferrer">
            {tip.label}
          </Button>
        </div>
      )}
    </div>
  )
}

function RepoNode() {
  return (
    <div className="pipe-node pipe-node--db" aria-label="Repo">
      <svg className="pipe-db" width="64" height="56" viewBox="0 0 64 56" aria-hidden="true">
        <ellipse cx="32" cy="10" rx="26" ry="10" />
        <path d="M6 10v36c0 5.5 11.6 10 26 10s26-4.5 26-10V10" />
        <ellipse cx="32" cy="10" rx="26" ry="10" />
        <text x="32" y="36" textAnchor="middle">
          Repo
        </text>
      </svg>
    </div>
  )
}

export function PipelineFlow() {
  return (
    <div className="pipeline">
      <div className="pipeline-wrap">
        <div className="pipeline-canvas" role="img" aria-label="OpenSpec architecture flow">
          <div className="pipeline-section pipeline-section--inputs">
            <Step kind="custom">
              Historical epics, dev PRs,
              <br />
              bugs, and test cases per operator
            </Step>
            <Arrow axis="v" human />
            <Step kind="eval" tipKey="evals">
              Evals derivation for automated
              <br />
              agentic flow
            </Step>
            <Arrow axis="v" />
          </div>

          <div className="pipeline-section pipeline-section--openspec">
            <h3 className="pipeline-lane-title">OpenSpec flow</h3>
            <div className="pipeline-os">
              <Step kind="adapted">Jira</Step>
              <Arrow axis="h" />
              <Step kind="custom" tipKey="spec">
                Spec validation
              </Step>
              <Arrow axis="h" human />
              <Step kind="custom" tipKey="repo-assess">
                Repo assessment for
                <br />
                the given epic
              </Step>
              <Arrow axis="h" human />
              <Step kind="custom" tipKey="planning">
                Planning
              </Step>
              <Arrow axis="h" human />
              <Step kind="custom" tipKey="tasks">
                Tasks generated in
                <br />
                phases
              </Step>
              <Arrow axis="h" both human />
              <Step kind="adapted" tipKey="codegen">
                Code &amp; unit test
                <br />
                generation
              </Step>
              <Arrow axis="h" human />
              <Step kind="wip">
                PR raised for each phase of
                <br />
                human-approved code
              </Step>
              <Arrow axis="h" />
              <Step kind="wip">
                Code-rabbit
                <br />
                reviews
              </Step>
            </div>
            <div className="pipeline-loop" aria-hidden="true">
              <svg viewBox="0 0 440 30" fill="none">
                <path d="M430 0 L430 16 Q430 24 420 24 L20 24 Q10 24 10 16 L10 0" />
                <path d="M6 4 L10 -4 L14 4" />
              </svg>
            </div>
          </div>

          <div className="pipeline-section pipeline-section--support">
            <div className="pipeline-below">
              <div className="below-cell below-cell--context">
                <RepoNode />
                <Arrow axis="h" />
                <Step kind="tool">Cursor</Step>
                <Arrow axis="h" human />
                <div className="below-stack">
                  <Arrow axis="up" />
                  <Step kind="eval" tipKey="agents-md">
                    agents.md and
                    <br />
                    contextualization docs
                  </Step>
                  <Arrow axis="up" />
                  <Step kind="adapted">AI helpers agentic docs</Step>
                </div>
              </div>
              <div className="below-cell below-cell--stack">
                <Arrow axis="v" both />
                <Step kind="wip">Unit test run</Step>
              </div>
              <div className="below-cell below-cell--stack">
                <Arrow axis="v" />
                <Step kind="wip">
                  QE E2E tests
                  <br />
                  (WIP)
                </Step>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pipeline-legend">
        <LabelGroup numLabels={4} aria-label="Pipeline legend">
          <Label color="blue">Blue: adapted</Label>
          <Label color="orange">Orange: custom developed</Label>
          <Label icon={<HumanIcon size={14} />}>Person: human step</Label>
        </LabelGroup>
        <p className="pipeline-results">
          Operator results: <Link to="/operators/ztwim">ZTWIM</Link>
          {' · '}
          <Link to="/operators/sscsi">SSCSI</Link>
        </p>
      </div>
    </div>
  )
}
