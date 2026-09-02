import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppLayout } from './components/AppLayout'
import { LinksPage } from './pages/LinksPage'
import { OperatorPage } from './pages/OperatorPage'
import { OverviewPage } from './pages/OverviewPage'

function renderPath(path: string) {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/operators/:id" element={<OperatorPage />} />
          <Route path="/links" element={<LinksPage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('dashboard routes', () => {
  it('renders overview with operator status and goals', () => {
    const html = renderPath('/')
    expect(html).toContain('Agentic SDLC')
    expect(html).toContain('Cert Manager')
    expect(html).toContain('SSCSI')
    expect(html).toContain('Goals')
    expect(html).toContain('Color scheme')
    expect(html).toContain('phases complete')
    expect(html).toContain('OpenSpec flow')
    expect(html).toContain('67')
  })

  it('nests collapsible tickets and separate telemetry panels', () => {
    const html = renderPath('/operators/cert-manager')
    expect(html).toContain('CM-861')
    expect(html).toContain('CM-830')
    expect(html).toContain('CM-861-CM-830-AI-Helpers-Composer-2-5-toggle')
    expect(html).toContain('Phase-by-phase telemetry')
    expect(html).toContain('Per-artifact edit counts')
    expect(html).toContain('data-panel')
  })

  it('renders ZTWIM epic and QE story telemetry', () => {
    const html = renderPath('/operators/ztwim')
    expect(html).toContain('Zero Trust')
    expect(html).toContain('SPIRE-359')
    expect(html).toContain('SPIRE-617')
    expect(html).toContain('story-SPIRE-617-toggle')
    expect(html).not.toContain('SPIRE-617 QE tickets')
  })

  it('renders SSCSI under the corrected route id', () => {
    const html = renderPath('/operators/sscsi')
    expect(html).toContain('Secrets Store CSI')
    expect(html).toContain('SSCSI-254')
  })

  it('shows an honest empty state for Must Gather', () => {
    const html = renderPath('/operators/must-gather')
    expect(html).toContain('No epic telemetry yet')
  })

  it('lists OpenSpec and operator repositories', () => {
    const html = renderPath('/links')
    expect(html).toContain('OpenSpec repository')
    expect(html).toContain('cert-manager-operator')
  })
})

describe('pipeline flow', () => {
  it('renders a static OpenSpec lane with human-gated arrows and prompt links', () => {
    const html = renderPath('/')
    expect(html).toContain('OpenSpec flow')
    expect(html).toContain('Jira')
    expect(html).toContain('Spec validation')
    expect(html).toContain('Planning')
    expect(html).toContain('Code-rabbit')
    expect(html).toContain('QE E2E tests')
    expect(html).toContain('Human step')
    expect(html).toContain('Prompt and result')
    expect(html).toContain('has-human')
    expect(html).toContain('pipeline-os')
    expect(html).toContain('pipe-arrow--h')
    expect(html).toContain('pipe-node--custom')
  })
})
