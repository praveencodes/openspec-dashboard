import { ProgressStep, ProgressStepper } from '@patternfly/react-core'
import { PHASES } from '../data'
import type { OperatorPhases, PhaseStatus } from '../types'

function variantFor(status: PhaseStatus, isCurrent: boolean): 'success' | 'info' | 'warning' | 'pending' {
  if (status === 'green') return 'success'
  if (status === 'wip') return isCurrent ? 'info' : 'warning'
  return 'pending'
}

export function PhaseStepper({ phases }: { phases: OperatorPhases }) {
  const firstWip = PHASES.find((p) => phases[p.key] === 'wip')?.key

  return (
    <ProgressStepper isCenterAligned>
      {PHASES.map((phase) => {
        const status = phases[phase.key]
        const isCurrent = phase.key === firstWip
        return (
          <ProgressStep
            key={phase.key}
            variant={variantFor(status, isCurrent)}
            isCurrent={isCurrent}
            description={status === 'green' ? 'Complete' : status === 'wip' ? 'In progress' : 'Not started'}
            id={`phase-${phase.key}`}
            titleId={`phase-${phase.key}-title`}
            aria-label={`${phase.label} — ${status}`}
          >
            {phase.label}
          </ProgressStep>
        )
      })}
    </ProgressStepper>
  )
}
