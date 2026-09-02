import { Button, Card, CardBody, PageSection } from '@patternfly/react-core'
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon'
import { Table, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table'
import { AppStack, ContentSection } from '../components/ContentSection'
import { PageHeader } from '../components/PageHeader'
import { links } from '../data'

const groups = [...new Set(links.map((l) => l.group))]

export function LinksPage() {
  return (
    <PageSection isFilled className="app-page">
      <AppStack>
        <PageHeader
          title="Links and repositories"
          description="OpenSpec sources, operator repositories, and prompt examples."
        />
        {groups.map((group) => (
          <ContentSection key={group} title={group}>
            <Card>
              <CardBody>
                <div className="app-table-scroll">
                  <Table aria-label={group} variant="compact">
                    <Thead>
                      <Tr>
                        <Th width={25}>Name</Th>
                        <Th>Description</Th>
                        <Th width={15}>Link</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {links
                        .filter((l) => l.group === group)
                        .map((item) => (
                          <Tr key={item.href}>
                            <Td dataLabel="Name">{item.name}</Td>
                            <Td dataLabel="Description">{item.description}</Td>
                            <Td dataLabel="Link">
                              <Button
                                variant="link"
                                isInline
                                component="a"
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                icon={<ExternalLinkAltIcon />}
                                iconPosition="end"
                              >
                                View
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </ContentSection>
        ))}
      </AppStack>
    </PageSection>
  )
}
