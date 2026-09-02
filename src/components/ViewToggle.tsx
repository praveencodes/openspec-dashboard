import { ToggleGroup, ToggleGroupItem } from '@patternfly/react-core'
import ChartBarIcon from '@patternfly/react-icons/dist/esm/icons/chart-bar-icon'
import TableIcon from '@patternfly/react-icons/dist/esm/icons/table-icon'

export type MetricView = 'table' | 'chart'

export function ViewToggle({
  view,
  onChange,
  id,
}: {
  view: MetricView
  onChange: (view: MetricView) => void
  id: string
}) {
  return (
    <ToggleGroup isCompact aria-label={`${id} view`}>
      <ToggleGroupItem
        text="Table"
        icon={<TableIcon />}
        isSelected={view === 'table'}
        onChange={() => onChange('table')}
      />
      <ToggleGroupItem
        text="Chart"
        icon={<ChartBarIcon />}
        isSelected={view === 'chart'}
        onChange={() => onChange('chart')}
      />
    </ToggleGroup>
  )
}
