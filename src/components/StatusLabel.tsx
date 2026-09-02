import { Label } from '@patternfly/react-core'
import type { PhaseStatus, RunStatus } from '../types'

export function PhaseLabel({ status }: { status: PhaseStatus }) {
  if (status === 'green') {
    return <Label color="green">Complete</Label>
  }
  if (status === 'wip') {
    return <Label color="orange">WIP</Label>
  }
  return <Label color="grey">Pending</Label>
}

export function BadgeLabel({ status }: { status: string }) {
  const s = status.toLowerCase()
  if (s === 'complete' || s === 'completed' || s === 'passed' || s === 'green' || s === 'accepted' || s === 'active' || s === 'tested' || s === 'in use') {
    return <Label color="green">{status}</Label>
  }
  if (s === 'wip' || s === 'testing' || s === 'fair' || s === 'skipped') {
    return <Label color="orange">{status}</Label>
  }
  if (s === 'running') {
    return <Label color="blue">{status}</Label>
  }
  if (s === 'dropped' || s === 'failed' || s === 'low') {
    return <Label color="red">{status}</Label>
  }
  return <Label color="blue">{status}</Label>
}

export function RunStatusLabel({ status }: { status: RunStatus }) {
  if (status === 'PASSED') return <Label color="green">Passed</Label>
  if (status === 'SKIPPED') return <Label color="orange">Skipped</Label>
  if (status === 'RUNNING') return <Label color="blue">Running</Label>
  return <Label color="red">Failed</Label>
}

export function CoverageLabel({ pct }: { pct: number }) {
  if (pct >= 70) return <Label color="green">Good</Label>
  if (pct >= 40) return <Label color="orange">Moderate</Label>
  return <Label color="red">Low</Label>
}
