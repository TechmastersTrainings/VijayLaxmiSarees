import { cx } from '../../utils/format'

const FilterGroup = ({ label, options, selected, onToggle }) => {
  if (!options.length) return null
  return (
    <div className="filter-group">
      <span className="filter-group__label">{label}</span>
      <div className="filter-chips">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={cx('chip', selected.includes(option) && 'chip--active')}
            aria-pressed={selected.includes(option)}
            onClick={() => onToggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export const ProductFilters = ({ facets, selected, onToggle, onClear, hasActive }) => (
  <div className="filters-panel">
    <FilterGroup
      label="Colour"
      options={facets.colours}
      selected={selected.colours}
      onToggle={(v) => onToggle('colours', v)}
    />
    <FilterGroup
      label="Weave"
      options={facets.weaves}
      selected={selected.weaves}
      onToggle={(v) => onToggle('weaves', v)}
    />
    <FilterGroup
      label="Category"
      options={facets.categories}
      selected={selected.categories}
      onToggle={(v) => onToggle('categories', v)}
    />
    {hasActive && (
      <button type="button" className="filters-panel__clear" onClick={onClear}>
        Clear all filters
      </button>
    )}
  </div>
)

export default ProductFilters
