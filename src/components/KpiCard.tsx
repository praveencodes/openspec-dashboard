import type { ReactNode } from 'react'

export interface StatItem {
  label: string
  value: ReactNode
  hint?: string
}

export function KpiCard({
  title,
  value,
  subtitle,
}: {
  title: string
  value: ReactNode
  subtitle?: string
}) {
  return <StatCard label={title} value={value} hint={subtitle} />
}

export function StatCard({ label, value, hint }: StatItem) {
  return (
    <div className="stat-card">
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__value">{value}</div>
      {hint ? <div className="stat-card__hint">{hint}</div> : <div className="stat-card__hint stat-card__hint--empty">&nbsp;</div>}
    </div>
  )
}

export function StatStrip({ items, 'aria-label': ariaLabel }: { items: StatItem[]; 'aria-label'?: string }) {
  return (
    <div className="stat-strip" role="list" aria-label={ariaLabel}>
      {items.map((item) => (
        <div key={item.label} role="listitem">
          <StatCard {...item} />
        </div>
      ))}
    </div>
  )
}
