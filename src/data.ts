import type { Epic, Goal, LinkItem, Operator, QeEpic } from './types'

export const PHASES = [
  { key: 'onboarded', label: 'On-boarded' },
  { key: 'rfe', label: 'RFE' },
  { key: 'development', label: 'Development' },
  { key: 'unitTests', label: 'Unit tests' },
  { key: 'qeE2e', label: 'QE E2E' },
  { key: 'bugFix', label: 'Bug fix' },
] as const

const completePhases = {
  onboarded: 'green',
  rfe: 'green',
  development: 'green',
  unitTests: 'green',
  qeE2e: 'wip',
  bugFix: 'wip',
} as const

export const operators: Operator[] = [
  {
    id: 'cert-manager',
    shortName: 'Cert Manager',
    name: 'Cert Manager Operator for Red Hat OpenShift',
    category: 'Certificate management',
    crds: 'Certificate, Issuer, ClusterIssuer',
    apiVersion: 'cert-manager.io/v1',
    olmChannel: 'stable-v1',
    repo: 'https://github.com/openshift/cert-manager-operator',
    repoLabel: 'openshift/cert-manager-operator',
    onboarded: true,
    releaseStatus: 'WIP',
    adoptionDate: "Aug '26",
    phases: { ...completePhases },
  },
  {
    id: 'ztwim',
    shortName: 'ZTWIM',
    name: 'Zero Trust Workload Identity Manager (ZTWIM)',
    category: 'Zero trust workload identity and networking',
    repo: 'https://github.com/openshift/zero-trust-workload-identity-manager',
    repoLabel: 'openshift/zero-trust-workload-identity-manager',
    onboarded: true,
    releaseStatus: 'WIP',
    adoptionDate: "Aug '26",
    phases: { ...completePhases },
  },
  {
    id: 'sscsi',
    shortName: 'SSCSI',
    name: 'Secrets Store CSI Driver Operator (SSCSI)',
    category: 'Secrets management',
    crds: 'SecretProviderClass',
    apiVersion: 'secrets-store.csi.x-k8s.io/v1',
    repo: 'https://github.com/openshift/secrets-store-csi-driver-operator',
    repoLabel: 'openshift/secrets-store-csi-driver-operator',
    onboarded: true,
    releaseStatus: 'WIP',
    adoptionDate: "Aug '26",
    phases: { ...completePhases },
  },
  {
    id: 'must-gather',
    shortName: 'Must Gather',
    name: 'Must Gather Operator',
    category: 'Diagnostics and debugging',
    repo: 'https://github.com/openshift/must-gather-operator',
    repoLabel: 'openshift/must-gather-operator',
    onboarded: true,
    releaseStatus: 'WIP',
    adoptionDate: "Aug '26",
    phases: { ...completePhases },
  },
  {
    id: 'eso',
    shortName: 'ESO',
    name: 'External Secrets Operator (ESO)',
    category: 'Secrets management',
    crds: 'ExternalSecret, ClusterExternalSecret, SecretStore, ClusterSecretStore, PushSecret, ClusterPushSecret',
    apiVersion: 'external-secrets.io/v1',
    repo: 'https://github.com/openshift/external-secrets-operator',
    repoLabel: 'openshift/external-secrets-operator',
    onboarded: true,
    releaseStatus: 'WIP',
    adoptionDate: "Aug '26",
    phases: { ...completePhases },
  },
]

export const completedPhaseCount = 4
export const totalPhaseCount = 6
export const overallProgressPct = Math.round((completedPhaseCount / totalPhaseCount) * 100)

export const goals: Goal[] = [
  {
    title: 'Accelerate earliest adoption',
    body: 'Deliver a minimal, tool-agnostic (orchestration / model / sandbox), production-safe agentic flow for operator teams on real work, without waiting for full platform maturity.',
  },
  {
    title: 'Serve every SDLC persona',
    body: 'Structure the flow so SEs, SSEs, and architects each have explicit gates, artifacts, and approval points aligned to their responsibilities.',
  },
  {
    title: 'Shift quality left',
    body: 'Use planning-stage reviews and human gates to surface bugs, design flaws, and scope risks before code generation begins.',
  },
]

export const architectureLayers = [
  {
    layer: 'L5 Model',
    tools: [
      { name: 'Claude Sonnet / Opus', status: 'Accepted' as const },
      { name: 'Gemini', status: 'Dropped' as const },
      { name: 'GPT', status: 'Fair' as const },
    ],
    criteria: ['Report and code generation quality, and alignment with human interpretations.'],
    result: ['Composer leads overall performance. Anthropic models fare better than Gemini.'],
  },
  {
    layer: 'L4 Runtime',
    tools: [
      { name: 'OpenCode', status: 'WIP' as const },
      { name: 'Cursor', status: 'Testing' as const },
      { name: 'Claude Code', status: 'WIP' as const },
    ],
    criteria: [
      'Developer adoption, integration with OpenSpec flow, token efficiency',
      'Compliance with enterprise policy',
    ],
    result: ['OpenCode is still being reviewed. Cursor (CLI) and Claude Code fare well.'],
  },
  {
    layer: 'L3 Harness and orchestration',
    tools: [
      { name: 'Agentic docs', status: 'In use' as const },
      { name: 'OpenSpec', status: 'Active' as const },
    ],
    criteria: [
      'Traceability and human gates in the loop for orchestration',
      'Agentic guidelines for high-quality outputs',
    ],
    result: ['The agentic flow is orchestrated with OpenSpec.', 'Agentic docs evaluation is in progress.'],
  },
  {
    layer: 'L2 Sandbox',
    tools: [{ name: 'OpenShell', status: 'WIP' as const }],
    criteria: ['Security and policy enforcement and checks'],
    result: ['Evaluation still in progress.'],
  },
  {
    layer: 'L1 Infra',
    tools: [{ name: 'Laptop and cluster', status: 'Tested' as const }],
    criteria: ['Reliability and cost'],
    result: ['Laptop and Kubernetes fare well.'],
  },
]

export const pipelineTips: Record<string, { title: string; href: string; label: string }> = {
  spec: {
    title: 'Spec validation',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/spec-generation',
    label: 'Prompt and result',
  },
  'repo-assess': {
    title: 'Repo assessment',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/Repo-Assessment',
    label: 'Prompt and result',
  },
  planning: {
    title: 'Planning',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/Planning',
    label: 'Prompt and result',
  },
  tasks: {
    title: 'Task generation',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/Tasks',
    label: 'Prompt and result',
  },
  evals: {
    title: 'Eval pipeline',
    href: 'https://github.com/sujkini/openspec/tree/openspec-operator-generic/eval-generation',
    label: 'eval-generation',
  },
  codegen: {
    title: 'Code and unit tests',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/Code-Generation-evals-example-ztwim',
    label: 'Prompt and result',
  },
  'agents-md': {
    title: 'agents.md',
    href: 'https://github.com/nhegde07/zero-trust-workload-identity-manager/blob/OAPE-859/openspec/inputs/agents.md',
    label: 'agents.md example',
  },
}

export const harnessContribution = [
  { name: 'ai-helpers agentic docs', value: 40 },
  { name: 'Cursor', value: 30 },
  { name: 'Manual', value: 30 },
]

export const qualityScores = {
  phases: ['Spec validation', 'Planning', 'Tasks', 'Code-gen'],
  series: [
    { name: 'Sonnet 5', values: [4.5, 4.5, 3.0, 3.5] },
    { name: 'Sonnet 4.5', values: [4.5, 4.5, 4.0, 4.0] },
    { name: 'Composer 2.5', values: [4.5, 4.5, 4.0, 4.0] },
  ],
}

export const tokenUsage = {
  tickets: [
    { id: 'CM-830', href: 'https://redhat.atlassian.net/browse/CM-830' },
    { id: 'SSCSI-254', href: 'https://redhat.atlassian.net/browse/SSCSI-254' },
    { id: 'SPIRE-359', href: 'https://redhat.atlassian.net/browse/SPIRE-359' },
  ],
  series: [
    { name: 'Sonnet 5', values: [1701806, 592695, 1034279] },
    { name: 'Opus 4.6', values: [1732589, 598962, 1152367] },
    { name: 'Composer 2.5', values: [615208, 214261, 373895] },
  ],
}

export const productivityGains = {
  operator: 'ZTWIM',
  phases: ['Spec validation', 'Planning', 'Tasks', 'Code-gen'],
  series: [
    { name: 'Sonnet 5 / Opus 4.6', values: [80, 60, 10, 50] },
    { name: 'Composer 2.5', values: [80, 60, 10, 60] },
  ],
}

export const challenges = [
  'Maturity assessment of harness engineering docs and evals is still fuzzy. Benchmarking needs multiple iterations across enhancement proposals and methods (agentic docs, historical PRs, repeated testing).',
  'The agentic flow still needs to line up with how humans review work. Review of tasks.md and generated code should stay modular, with a PR per approved phase, instead of mass generation into a single PR.',
  'LLMs can misinterpret specs and contextual docs, and issues are often identified too late.',
  'Cross-repo governance and a secured agentic flow remain open problems.',
]

export const recommendations = [
  'Standardization: adopting ai-helpers agentic docs helped standardize harness-doc semantics across operators.',
  'Use customized OpenSpec orchestration for agentic SDLC. It is flexible, integrates natively, and matches how human reviewers think.',
  'Hybrid contextualization: ai-helpers generated the more meaningful sections; Cursor and the operator team refined them in iteration.',
]

export const nextSteps = ['Evaluate the OpenShell sandbox and orchestrators such as Prow.']

const cm830Edits: Epic['tickets'][0]['artifactEdits'] = [
  { artifact: 'Validation', phase: 'Spec Understanding', evalRefinements: 0, userFeedbackRounds: 0, manualCorrections: 0 },
  { artifact: 'Specs', phase: 'Spec Understanding', evalRefinements: 0, userFeedbackRounds: 0, manualCorrections: 0 },
  { artifact: 'Repo assessment', phase: 'Repo Assessment', evalRefinements: 0, userFeedbackRounds: 0, manualCorrections: 0 },
  { artifact: 'Plan', phase: 'Architectural Planning', evalRefinements: 0, userFeedbackRounds: 0, manualCorrections: 0 },
  { artifact: 'Tasks', phase: 'Sub-Tasks Creation (DAG)', evalRefinements: 0, userFeedbackRounds: 0, manualCorrections: 0 },
]

export const epicsByOperator: Record<string, Epic[]> = {
  'cert-manager': [
    {
      epicId: 'CM-861',
      epicLink: 'https://redhat.atlassian.net/browse/CM-861',
      epicTitle: '[Tech Preview] Integrate Trust Manager with Cert Manager Operator',
      status: 'Complete',
      progressPct: 100,
      summary: {
        runsCompleted: 1,
        runsTotal: 1,
        totalTokens: '1.3M',
        agentSuccessPct: '91.7%',
        openBlockers: 0,
        unitTests: 4,
        unitTestTokens: '74.2k',
      },
      tickets: [
        {
          ticketId: 'CM-830',
          ticketLink: 'https://redhat.atlassian.net/browse/CM-830',
          ticketSummary: 'Enhancement proposal',
          agentLabel: 'AI Helpers + Composer 2.5',
          status: 'Completed',
          health: {
            totalTokens: '1.3M',
            runCost: '$4.45',
            wallTime: '184m 11s',
            compliance: '60%',
            gatePass: '60%',
            refinement: '1',
            agentSuccessPct: '91.7%',
            tasksPassed: 33,
            tasksTotal: 36,
          },
          phases: [
            { phaseName: '1. Spec Understanding', status: 'PASSED', iterations: '1 iteration', timeTaken: '5m 0s', tokensInOut: '7.0k / 4.4k', quality: 'PASS' },
            { phaseName: '2. Repo Assessment', status: 'SKIPPED', iterations: '—', timeTaken: '—', tokensInOut: '0 / 0', quality: 'Telemetry not captured in this run' },
            { phaseName: '3. Architectural Planning', status: 'PASSED', iterations: '1 iteration', timeTaken: '1m 0s', tokensInOut: '6.0k / 5.7k', quality: 'Score: 100/100 — approved' },
            { phaseName: '4. Sub-Tasks Creation (DAG)', status: 'PASSED', iterations: '1 iteration', timeTaken: '1m 0s', tokensInOut: '11.7k / 9.0k', quality: 'Score: 100/100 — approved' },
            { phaseName: '5. Code Generation / Harness', status: 'PASSED', iterations: '2 iterations', timeTaken: '172m 23s', tokensInOut: '607.3k / 15.5k', quality: 'Implementation report complete (33 task reports)' },
            { phaseName: '5.1 Unit Tests (4 tasks)', status: 'PASSED', iterations: '0 self-corrections', timeTaken: '5m 34s', tokensInOut: '72.6k / 1.6k', quality: '4/4 tasks passed' },
          ],
          artifactEdits: cm830Edits,
        },
      ],
    },
  ],
  ztwim: [
    {
      epicId: 'OCPSTRAT-2611',
      epicLink: 'https://redhat.atlassian.net/browse/OCPSTRAT-2611',
      epicTitle: '[GA] Centralized & enforced TLS configuration throughout OpenShift (Core & layered products)',
      status: 'Complete',
      progressPct: 100,
      summary: {
        runsCompleted: 2,
        runsTotal: 2,
        totalTokens: '946.2k',
        agentSuccessPct: '100%',
        openBlockers: 0,
        unitTests: 6,
        unitTestTokens: '127.3k',
      },
      tickets: [
        {
          ticketId: 'SPIRE-359',
          ticketLink: 'https://redhat.atlassian.net/browse/SPIRE-359',
          ticketSummary: 'Central TLS profile consistency',
          agentLabel: 'AI Helpers + Composer 2.5',
          status: 'Completed',
          health: {
            totalTokens: '487.0k',
            runCost: '$2.23',
            wallTime: '190m 58s',
            evalRejections: 3,
            agentSuccessPct: '100%',
            tasksPassed: 18,
            tasksTotal: 18,
          },
          phases: [
            { phaseName: '1. Spec Understanding', status: 'PASSED', iterations: '2 iterations', timeTaken: '38m 34s', tokensInOut: '20.0k / 7.8k', quality: 'Approved — manual TLS scan scope' },
            { phaseName: '2. Repo Assessment', status: 'PASSED', iterations: '3 iterations', timeTaken: '35m 24s', tokensInOut: '19.0k / 10.3k', quality: 'Score: 94/100' },
            { phaseName: '3. Architectural Planning', status: 'PASSED', iterations: '3 iterations', timeTaken: '5m 43s', tokensInOut: '30.0k / 7.4k', quality: 'Score: 95/100' },
            { phaseName: '4. Sub-Tasks Creation (DAG)', status: 'PASSED', iterations: '3 iterations', timeTaken: '65m 18s', tokensInOut: '13.2k / 5.4k', quality: 'Score: 97/100 — approved' },
            { phaseName: '5. Code Generation / Harness', status: 'PASSED', iterations: '2 iterations', timeTaken: '15m 54s', tokensInOut: '341.1k / 32.8k', quality: 'Implementation report complete (18 tasks)' },
            { phaseName: '5.1 Unit Tests (3 tasks)', status: 'PASSED', iterations: '0 self-corrections', timeTaken: '< 1s', tokensInOut: '56.8k / 5.7k', quality: '3/3 tasks passed' },
          ],
        },
        {
          ticketId: 'SPIRE-359',
          ticketLink: 'https://redhat.atlassian.net/browse/SPIRE-359',
          ticketSummary: 'Central TLS profile consistency',
          agentLabel: 'Cursor Agent + Composer 2.5',
          status: 'Completed',
          health: {
            totalTokens: '459.2k',
            runCost: '$2.05',
            wallTime: '32m 38s',
            evalRejections: 0,
            agentSuccessPct: '100%',
            tasksPassed: 18,
            tasksTotal: 18,
          },
          phases: [
            { phaseName: '1. Spec Understanding', status: 'PASSED', iterations: '1 iteration', timeTaken: '4m 33s', tokensInOut: '12.1k / 4.3k', quality: 'Approved' },
            { phaseName: '2. Repo Assessment', status: 'PASSED', iterations: '1 iteration', timeTaken: '1m 39s', tokensInOut: '9.4k / 6.0k', quality: 'Score: 100/100 — approved' },
            { phaseName: '3. Architectural Planning', status: 'PASSED', iterations: '2 iterations', timeTaken: '5m 7s', tokensInOut: '15.4k / 3.7k', quality: 'Score: 100/100 — approved' },
            { phaseName: '4. Sub-Tasks Creation (DAG)', status: 'PASSED', iterations: '1 iteration', timeTaken: '3m 47s', tokensInOut: '13.1k / 6.3k', quality: 'Score: 100/100 — approved' },
            { phaseName: '5. Code Generation / Harness', status: 'PASSED', iterations: '1 iteration', timeTaken: '0m 4s', tokensInOut: '353.5k / 35.4k', quality: 'All tasks approved' },
            { phaseName: '5.1 Unit Tests (3 tasks)', status: 'PASSED', iterations: '0 self-corrections', timeTaken: '< 1s', tokensInOut: '58.9k / 5.9k', quality: '3/3 tasks passed' },
          ],
        },
      ],
    },
  ],
  sscsi: [
    {
      epicId: 'SSCSI-242',
      epicLink: 'https://redhat.atlassian.net/browse/SSCSI-242',
      epicTitle: 'Configurable secret rotation and WIF in Secret Store CSI driver operator',
      status: 'Complete',
      progressPct: 100,
      summary: {
        runsCompleted: 2,
        runsTotal: 2,
        totalTokens: '1,497.4k',
        agentSuccessPct: '100%',
        openBlockers: 0,
        unitTests: 7,
        unitTestTokens: '217.2k',
      },
      tickets: [
        {
          ticketId: 'SSCSI-254',
          ticketLink: 'https://redhat.atlassian.net/browse/SSCSI-254',
          ticketSummary: 'Enhancement proposal for configurable secret rotation',
          agentLabel: 'AI Helpers + Sonnet 5',
          status: 'Completed',
          health: {
            totalTokens: '697.3k',
            runCost: '$2.62',
            wallTime: '263m 5s',
            evalRejections: 0,
            agentSuccessPct: '100%',
            tasksPassed: 19,
            tasksTotal: 19,
          },
          phases: [
            { phaseName: '1. Spec Understanding', status: 'PASSED', iterations: '1 iteration', timeTaken: '18m 0s', tokensInOut: '21.1k / 4.1k', quality: 'APPROVED' },
            { phaseName: '2. Repo Assessment', status: 'PASSED', iterations: '1 iteration', timeTaken: '8m 58s', tokensInOut: '13.5k / 10.7k', quality: 'Score: 100/100 — APPROVED' },
            { phaseName: '3. Architectural Planning', status: 'PASSED', iterations: '1 iteration', timeTaken: '4m 28s', tokensInOut: '24.2k / 7.1k', quality: 'Score: 100/100 — APPROVED' },
            { phaseName: '4. Sub-Tasks Creation (DAG)', status: 'PASSED', iterations: '1 iteration', timeTaken: '4m 33s', tokensInOut: '20.6k / 8.7k', quality: 'Score: 100/100 — APPROVED' },
            { phaseName: '5. Code Generation / Harness', status: 'PASSED', iterations: '2 iterations', timeTaken: '174m 58s', tokensInOut: '573.5k / 13.9k', quality: '19/19 tasks approved' },
            { phaseName: '5.1 Unit Tests (4 tasks)', status: 'PASSED', iterations: '0 self-corrections', timeTaken: '17m 40s', tokensInOut: '121.1k / 2.7k', quality: '4/4 tasks passed' },
          ],
        },
        {
          ticketId: 'SSCSI-254',
          ticketLink: 'https://redhat.atlassian.net/browse/SSCSI-254',
          ticketSummary: 'Enhancement proposal for configurable secret rotation',
          agentLabel: 'Cursor Agent + Sonnet 5',
          status: 'Completed',
          health: {
            totalTokens: '800.1k',
            runCost: '$2.95',
            wallTime: '198m 42s',
            evalRejections: 0,
            agentSuccessPct: '100%',
            tasksPassed: 22,
            tasksTotal: 22,
          },
          phases: [
            { phaseName: '1. Spec Understanding', status: 'PASSED', iterations: '1 iteration', timeTaken: '7m 46s', tokensInOut: '21.0k / 4.0k', quality: 'Approved' },
            { phaseName: '2. Repo Assessment', status: 'PASSED', iterations: '1 iteration', timeTaken: '8m 48s', tokensInOut: '13.4k / 9.8k', quality: 'Score: 98/100 — excellent' },
            { phaseName: '3. Architectural Planning', status: 'PASSED', iterations: '1 iteration', timeTaken: '7m 43s', tokensInOut: '23.2k / 6.7k', quality: 'Score: 96/100 — excellent' },
            { phaseName: '4. Sub-Tasks Creation (DAG)', status: 'PASSED', iterations: '1 iteration', timeTaken: '8m 55s', tokensInOut: '20.1k / 10.5k', quality: 'Score: 95/100 — excellent' },
            { phaseName: '5. Code Generation / Harness', status: 'PASSED', iterations: '1 iteration', timeTaken: '157m 6s', tokensInOut: '676.5k / 15.0k', quality: '22/22 tasks approved' },
            { phaseName: '5.1 Unit Tests (3 tasks)', status: 'PASSED', iterations: '0 self-corrections', timeTaken: '14m 16s', tokensInOut: '91.3k / 2.0k', quality: '3/3 tasks passed' },
          ],
        },
      ],
    },
  ],
  'must-gather': [],
  eso: [],
}

export const qeByOperator: Record<string, QeEpic[]> = {
  'cert-manager': [],
  ztwim: [
    {
      epicId: 'SPIRE-617',
      epicLink: 'https://redhat.atlassian.net/browse/SPIRE-617',
      epicTitle: 'SPIRE-617 QE run',
      hasEpic: false,
      summary: {
        ticketsCount: 1,
        acCoveragePct: 33.3,
        automationPct: 33.3,
        firstPassPct: 0,
        bugsFound: 0,
        bugsVerified: 0,
        totalTokens: '29.1k',
        totalCost: '$0.23',
      },
      tickets: [
        {
          ticketId: 'SPIRE-617',
          ticketLink: 'https://redhat.atlassian.net/browse/SPIRE-617',
          ticketName: 'SPIRE-617',
          changeName: 'spire-617',
          prUrl: 'https://github.com/openshift/zero-trust-workload-identity-manager/pull/149',
          phase: 1,
          mode: 'phase-iterative',
          acScenarioCoverage: {
            total: 12,
            covered: 4,
            pct: 33.3,
            uncovered: ['FR-001', 'FR-002', 'FR-003', 'FR-004', 'FR-005', 'US-001', 'US-003', 'SC-004'],
          },
          automationCoverage: { total: 3, automated: 1, manual: 2, pct: 33.3 },
          firstPassRate: { executed: 3, passed: 0, failed: 0, pct: 0, source: 'local' },
          flakeRate: { retries: 0, retriesPassed: 0, pct: 0 },
          bugs: { found: 0, verified: 0 },
          triageAccuracy: { total: 0, correct: 0, pct: null, reason: 'no_triage_data' },
          cost: {
            tokensIn: 17000,
            tokensOut: 12100,
            tokensTotalFmt: '29.1k',
            estimatedCostUsd: '$0.23',
            wallTime: '3m 21s',
            perStage: [
              { stage: 'pre_analysis', tokensIn: 3500, tokensOut: 2800, duration: '2m 0s' },
              { stage: 'test_plan', tokensIn: 4200, tokensOut: 3800, duration: '3m 0s' },
              { stage: 'consolidation', tokensIn: 3800, tokensOut: 1200, duration: '1m 0s' },
              { stage: 'code_generation', tokensIn: 5000, tokensOut: 3500, duration: '2m 0s' },
              { stage: 'execution', tokensIn: 500, tokensOut: 800, duration: '0m 30s' },
            ],
          },
        },
      ],
    },
  ],
  sscsi: [],
  'must-gather': [],
  eso: [],
}

export const links: LinkItem[] = [
  {
    group: 'OpenSpec repository',
    name: 'Evals',
    description: 'Evaluation schemas and data for the OpenSpec agile workflow.',
    href: 'https://github.com/sujkini/openspec/tree/openspec-operator-generic/openspec/schemas/openspec-agile-workflow/evals',
  },
  {
    group: 'OpenSpec repository',
    name: 'Templates',
    description: 'Agile workflow templates for OpenSpec operator development.',
    href: 'https://github.com/sujkini/openspec/tree/openspec-operator-generic/openspec/schemas/openspec-agile-workflow/templates',
  },
  {
    group: 'OpenSpec repository',
    name: '.cursor (opsx-command)',
    description: 'Cursor configuration and opsx-command setup for the OpenSpec repository.',
    href: 'https://github.com/sujkini/openspec/tree/openspec-operator-generic/.cursor',
  },
  {
    group: 'OpenSpec repository',
    name: 'eval-generation',
    description: 'Eval generation tooling for the OpenSpec repository.',
    href: 'https://github.com/sujkini/openspec/tree/openspec-operator-generic/openspec/schemas/openspec-agile-workflow/eval-generation',
  },
  {
    group: 'Operator repositories',
    name: 'cert-manager-operator',
    description: 'Cert Manager Operator for Red Hat OpenShift.',
    href: 'https://github.com/openshift/cert-manager-operator',
  },
  {
    group: 'Operator repositories',
    name: 'zero-trust-workload-identity-manager',
    description: 'Zero Trust Workload Identity Manager (ZTWIM).',
    href: 'https://github.com/openshift/zero-trust-workload-identity-manager',
  },
  {
    group: 'Operator repositories',
    name: 'secrets-store-csi-driver-operator',
    description: 'Secrets Store CSI Driver Operator (SSCSI).',
    href: 'https://github.com/openshift/secrets-store-csi-driver-operator',
  },
  {
    group: 'Operator repositories',
    name: 'must-gather-operator',
    description: 'Must Gather Operator.',
    href: 'https://github.com/openshift/must-gather-operator',
  },
  {
    group: 'Operator repositories',
    name: 'external-secrets-operator',
    description: 'External Secrets Operator (ESO).',
    href: 'https://github.com/openshift/external-secrets-operator',
  },
  {
    group: 'Prompt examples',
    name: 'Spec generation',
    description: 'Prompt and sample spec-generation artifacts.',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/spec-generation',
  },
  {
    group: 'Prompt examples',
    name: 'Repo assessment',
    description: 'Prompt and sample repository assessment artifacts.',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/Repo-Assessment',
  },
  {
    group: 'Prompt examples',
    name: 'Planning',
    description: 'Prompt and sample planning artifacts.',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/Planning',
  },
  {
    group: 'Prompt examples',
    name: 'Tasks',
    description: 'Prompt and sample task-generation artifacts.',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/Tasks',
  },
  {
    group: 'Prompt examples',
    name: 'Code generation evals (ZTWIM)',
    description: 'Code-generation evaluation example for ZTWIM.',
    href: 'https://github.com/praveencodes/openspec-dashboard/tree/main/prompt_examples/Code-Generation-evals-example-ztwim',
  },
]

export function getOperator(id: string): Operator | undefined {
  return operators.find((op) => op.id === id)
}
