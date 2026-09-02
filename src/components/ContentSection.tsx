import { Card, CardBody, CardTitle, Title } from '@patternfly/react-core'
import type { ReactNode } from 'react'

export function AppStack({ children }: { children: ReactNode }) {
  return <div className="app-stack">{children}</div>
}

export function ContentSection({
  title,
  description,
  id,
  children,
}: {
  title?: string
  description?: ReactNode
  id?: string
  children: ReactNode
}) {
  return (
    <section className="content-section" id={id}>
      {(title || description) && (
        <header className="content-section__header">
          {title && <Title headingLevel="h2">{title}</Title>}
          {description && <p className="section-lede">{description}</p>}
        </header>
      )}
      <div className="content-section__body">{children}</div>
    </section>
  )
}

export function DataPanel({
  title,
  children,
  className,
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={['data-panel', className].filter(Boolean).join(' ')}>
      <Card>
        <CardTitle component="h4">{title}</CardTitle>
        <CardBody>{children}</CardBody>
      </Card>
    </section>
  )
}
