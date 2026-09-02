import { Content, Flex, FlexItem, Title } from '@patternfly/react-core'
import { useEffect, type ReactNode } from 'react'

export function PageHeader({
  title,
  description,
  actions,
  documentTitle,
}: {
  title: string
  description?: ReactNode
  actions?: ReactNode
  documentTitle?: string
}) {
  useEffect(() => {
    const next = `${documentTitle ?? title} | Agentic SDLC`
    document.title = next
    return () => {
      document.title = 'Agentic SDLC Dashboard | OAP team'
    }
  }, [documentTitle, title])

  return (
    <Flex
      className="page-header"
      alignItems={{ default: 'alignItemsFlexStart', lg: 'alignItemsCenter' }}
      justifyContent={{ default: 'justifyContentSpaceBetween' }}
      direction={{ default: 'column', lg: 'row' }}
      gap={{ default: 'gapMd' }}
    >
      <FlexItem flex={{ default: 'flex_1' }}>
        <Title headingLevel="h1">{title}</Title>
        {description && (
          <Content className="page-header-lede">
            <Content component="p">{description}</Content>
          </Content>
        )}
      </FlexItem>
      {actions && <FlexItem className="page-header-actions">{actions}</FlexItem>}
    </Flex>
  )
}
