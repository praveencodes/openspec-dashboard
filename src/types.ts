export type PhaseStatus = 'green' | 'wip' | 'pending'

export interface Goal {
  title: string
  body: string
}

export type RunStatus = 'PASSED' | 'SKIPPED' | 'RUNNING' | 'FAILED'

export interface OperatorPhases {
  onboarded: PhaseStatus
  rfe: PhaseStatus
  development: PhaseStatus
  unitTests: PhaseStatus
  qeE2e: PhaseStatus
  bugFix: PhaseStatus
}

export interface Operator {
  id: string
  shortName: string
  name: string
  category: string
  crds?: string
  apiVersion?: string
  olmChannel?: string
  repo: string
  repoLabel: string
  onboarded: boolean
  releaseStatus: 'WIP' | 'GA' | 'TP'
  adoptionDate: string
  phases: OperatorPhases
}

export interface PhaseTelemetry {
  phaseName: string
  status: RunStatus
  iterations: string
  timeTaken: string
  tokensInOut: string
  quality: string
}

export interface TicketHealth {
  totalTokens: string
  runCost: string
  wallTime: string
  evalRejections?: number
  compliance?: string
  gatePass?: string
  refinement?: string
  agentSuccessPct: string
  tasksPassed: number
  tasksTotal: number
}

export interface ArtifactEdit {
  artifact: string
  phase: string
  evalRefinements: number
  userFeedbackRounds: number
  manualCorrections: number
}

export interface TicketRun {
  ticketId: string
  ticketLink: string
  ticketSummary: string
  agentLabel: string
  status: string
  health: TicketHealth
  phases: PhaseTelemetry[]
  artifactEdits?: ArtifactEdit[]
}

export interface EpicSummary {
  runsCompleted: number
  runsTotal: number
  totalTokens: string
  agentSuccessPct: string
  openBlockers: number
  unitTests: number
  unitTestTokens: string
}

export interface Epic {
  epicId: string
  epicLink: string
  epicTitle: string
  status: string
  progressPct: number
  summary: EpicSummary
  tickets: TicketRun[]
}

export interface QeCoverage {
  total: number
  covered: number
  pct: number
  uncovered: string[]
}

export interface QeTicket {
  ticketId: string
  ticketLink: string
  ticketName: string
  changeName: string
  prUrl: string
  phase: number | string
  mode: string
  acScenarioCoverage: QeCoverage
  automationCoverage: {
    total: number
    automated: number
    manual: number
    pct: number
  }
  firstPassRate: {
    executed: number
    passed: number
    failed: number
    pct: number
    source: string
  }
  flakeRate: {
    retries: number
    retriesPassed: number
    pct: number
  }
  bugs: {
    found: number
    verified: number
  }
  triageAccuracy: {
    total: number
    correct: number
    pct: number | null
    reason: string
  }
  cost: {
    tokensIn: number
    tokensOut: number
    tokensTotalFmt: string
    estimatedCostUsd: string
    wallTime: string
    perStage: { stage: string; tokensIn: number; tokensOut: number; duration: string }[]
  }
}

export interface QeEpic {
  epicId: string
  epicLink: string
  epicTitle: string
  hasEpic: boolean
  summary: {
    ticketsCount: number
    acCoveragePct: number
    automationPct: number
    firstPassPct: number
    bugsFound: number
    bugsVerified: number
    totalTokens: string
    totalCost: string
  }
  tickets: QeTicket[]
}

export interface LinkItem {
  name: string
  description: string
  href: string
  group: string
}
