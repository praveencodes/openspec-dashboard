import { Dropdown, DropdownItem, DropdownList, MenuToggle } from '@patternfly/react-core'
import DesktopIcon from '@patternfly/react-icons/dist/esm/icons/desktop-icon'
import MoonIcon from '@patternfly/react-icons/dist/esm/icons/moon-icon'
import SunIcon from '@patternfly/react-icons/dist/esm/icons/sun-icon'
import { useState } from 'react'
import { useTheme, type ColorScheme } from '../theme'

const OPTIONS: { id: ColorScheme; label: string; description: string; icon: typeof SunIcon }[] = [
  { id: 'light', label: 'Light', description: 'Always use light theme', icon: SunIcon },
  { id: 'dark', label: 'Dark', description: 'Always use dark theme', icon: MoonIcon },
  { id: 'system', label: 'System', description: 'Match the operating system', icon: DesktopIcon },
]

export function ThemeToggle() {
  const { colorScheme, isDark, setColorScheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const current = OPTIONS.find((o) => o.id === colorScheme) ?? OPTIONS[2]
  const ToggleIcon = isDark ? MoonIcon : SunIcon

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onSelect={(_event, value) => {
        setColorScheme(value as ColorScheme)
        setIsOpen(false)
      }}
      popperProps={{ position: 'right' }}
      toggle={(toggleRef) => (
        <MenuToggle
          ref={toggleRef}
          onClick={() => setIsOpen(!isOpen)}
          isExpanded={isOpen}
          icon={<ToggleIcon />}
          aria-label="Color scheme"
        >
          <span className="theme-toggle-label">{current.label}</span>
        </MenuToggle>
      )}
    >
      <DropdownList>
        {OPTIONS.map((option) => {
          const ItemIcon = option.icon
          return (
            <DropdownItem
              key={option.id}
              value={option.id}
              icon={<ItemIcon />}
              description={option.description}
              isSelected={colorScheme === option.id}
            >
              {option.label}
            </DropdownItem>
          )
        })}
      </DropdownList>
    </Dropdown>
  )
}
