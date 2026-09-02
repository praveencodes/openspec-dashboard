import {
  Label,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Page,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
  SkipToContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core'
import CubesIcon from '@patternfly/react-icons/dist/esm/icons/cubes-icon'
import LinkIcon from '@patternfly/react-icons/dist/esm/icons/link-icon'
import TachometerAltIcon from '@patternfly/react-icons/dist/esm/icons/tachometer-alt-icon'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { operators } from '../data'
import { ThemeProvider } from '../theme'
import { ThemeToggle } from './ThemeToggle'

function BrandMark() {
  return (
    <span className="brand-lockup">
      <svg className="brand-mark" width="32" height="32" viewBox="0 0 32 32" aria-hidden>
        <path
          fill="currentColor"
          d="M16 4.5c-1.6 3.9-7.1 6.3-10.4 7.1C8.9 12.4 12.1 14.8 13.8 18.1c2.4-3.9 6.5-6.3 10.4-7.1C21.3 10.1 18 7.7 16 4.5z"
        />
        <ellipse cx="16" cy="24" rx="9.2" ry="3.8" fill="currentColor" />
      </svg>
      <span className="brand-text">
        <span className="brand-title">Agentic SDLC</span>
        <span className="brand-sub">OpenShift operators · OAP</span>
      </span>
    </span>
  )
}

export function AppLayout() {
  const { pathname } = useLocation()
  const operatorActive = pathname.startsWith('/operators')

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton variant="plain" aria-label="Global navigation" isHamburgerButton />
        </MastheadToggle>
        <MastheadBrand>
          <MastheadLogo href="#/" aria-label="Agentic SDLC home">
            <BrandMark />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar id="masthead-toolbar" isFullHeight isStatic>
          <ToolbarContent>
            <ToolbarGroup align={{ default: 'alignEnd' }} alignItems="center" gap={{ default: 'gapMd' }}>
              <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
                <Label color="red" isCompact>
                  OAP team
                </Label>
              </ToolbarItem>
              <ToolbarItem>
                <ThemeToggle />
              </ToolbarItem>
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  )

  const sidebar = (
    <PageSidebar>
      <PageSidebarBody>
        <Nav aria-label="Global">
          <NavList>
            <NavItem itemId="overview" isActive={pathname === '/'} icon={<TachometerAltIcon />}>
              <NavLink to="/">Overview</NavLink>
            </NavItem>
            <NavExpandable title="Operators" groupId="operators" isExpanded isActive={operatorActive}>
              {operators.map((op) => (
                <NavItem
                  key={op.id}
                  itemId={op.id}
                  isActive={pathname === `/operators/${op.id}`}
                  icon={<CubesIcon />}
                >
                  <NavLink to={`/operators/${op.id}`}>{op.shortName}</NavLink>
                </NavItem>
              ))}
            </NavExpandable>
            <NavItem itemId="links" isActive={pathname === '/links'} icon={<LinkIcon />}>
              <NavLink to="/links">Links and repos</NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  )

  return (
    <ThemeProvider>
      <Page
        masthead={masthead}
        sidebar={sidebar}
        isManagedSidebar
        skipToContent={<SkipToContent href="#main-content">Skip to content</SkipToContent>}
        mainContainerId="main-content"
      >
        <Outlet />
      </Page>
    </ThemeProvider>
  )
}
