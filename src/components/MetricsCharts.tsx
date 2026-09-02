import { Tooltip } from '@patternfly/react-core'
import { useId } from 'react'

const SERIES_COLORS = [
  'var(--pf-t--global--color--nonstatus--blue--400)',
  'var(--pf-t--global--color--nonstatus--green--400)',
  'var(--pf-t--global--color--nonstatus--orange--400)',
  'var(--pf-t--global--color--nonstatus--purple--400)',
]

export function GroupedBarChart({
  categories,
  series,
  yLabel,
  ariaTitle,
  domainY,
  formatY,
}: {
  categories: string[]
  series: { name: string; values: number[] }[]
  yLabel: string
  ariaTitle: string
  domainY?: [number, number]
  formatY?: (v: number) => string
}) {
  const fmt = formatY ?? ((v: number) => String(v))
  const max = domainY?.[1] ?? Math.max(...series.flatMap((s) => s.values), 1)
  const min = domainY?.[0] ?? 0
  const range = max - min || 1
  const ticks = [max, max * 0.75, max * 0.5, max * 0.25, min]
  const captionId = useId()

  return (
    <figure className="pf-chart" aria-labelledby={captionId}>
      <figcaption id={captionId} className="sr-only">
        {ariaTitle}
      </figcaption>
      <p className="pf-chart-ylabel">{yLabel}</p>
      <div className="pf-chart-plot">
        <div className="pf-chart-y" aria-hidden>
          {ticks.map((t) => (
            <span key={t}>{fmt(t)}</span>
          ))}
        </div>
        <div className="pf-chart-canvas">
          <div className="pf-chart-grid" aria-hidden>
            {ticks.map((t) => (
              <div key={t} className="pf-chart-gridline" />
            ))}
          </div>
          <div className="pf-chart-groups" role="list">
            {categories.map((cat, i) => (
              <div key={cat} className="pf-chart-group" role="listitem">
                <div className="pf-chart-bars">
                  {series.map((s, si) => {
                    const value = s.values[i] ?? 0
                    const pct = ((value - min) / range) * 100
                    return (
                      <Tooltip key={s.name} content={`${s.name}: ${fmt(value)}`}>
                        <div
                          className="pf-chart-bar"
                          style={{
                            height: `${Math.max(pct, 1.5)}%`,
                            background: SERIES_COLORS[si % SERIES_COLORS.length],
                          }}
                        >
                          <span className="pf-chart-bar-value">{fmt(value)}</span>
                        </div>
                      </Tooltip>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pf-chart-xlabels" aria-hidden>
          {categories.map((cat) => (
            <span key={cat} className="pf-chart-x">
              {cat}
            </span>
          ))}
        </div>
      </div>
      <ul className="pf-chart-legend">
        {series.map((s, si) => (
          <li key={s.name}>
            <span className="pf-chart-swatch" style={{ background: SERIES_COLORS[si % SERIES_COLORS.length] }} />
            {s.name}
          </li>
        ))}
      </ul>
    </figure>
  )
}

export function HorizontalBarChart({
  items,
  ariaTitle,
  xLabel,
}: {
  items: { name: string; value: number }[]
  ariaTitle: string
  xLabel: string
}) {
  const max = Math.max(...items.map((i) => i.value), 1)
  const captionId = useId()

  return (
    <figure className="pf-chart pf-chart-h" aria-labelledby={captionId}>
      <figcaption id={captionId} className="sr-only">
        {ariaTitle}. {xLabel}.
      </figcaption>
      <p className="pf-chart-ylabel">{xLabel}</p>
      {items.map((item) => (
        <div key={item.name} className="pf-hchart-row">
          <span className="pf-hchart-label">{item.name}</span>
          <div className="pf-hchart-track">
            <div className="pf-hchart-bar" style={{ width: `${(item.value / max) * 100}%` }}>
              {item.value}%
            </div>
          </div>
        </div>
      ))}
      <div className="pf-hchart-axis" aria-hidden>
        <span>0%</span>
        <span>{Math.round(max / 2)}%</span>
        <span>{max}%</span>
      </div>
    </figure>
  )
}

export function formatMillions(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`
  return String(n)
}

export function formatCount(n: number): string {
  return n.toLocaleString()
}
