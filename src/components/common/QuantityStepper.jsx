import Icon from './Icon'

export const QuantityStepper = ({ value, onChange, label = 'Quantity' }) => (
  <div className="qty" role="group" aria-label={label}>
    <button
      type="button"
      onClick={() => onChange(value - 1)}
      disabled={value <= 1}
      aria-label="Decrease quantity"
    >
      <Icon name="minus" size={16} />
    </button>
    <span aria-live="polite">{value}</span>
    <button
      type="button"
      onClick={() => onChange(value + 1)}
      disabled={value >= 10}
      aria-label="Increase quantity"
    >
      <Icon name="plus" size={16} />
    </button>
  </div>
)

export default QuantityStepper
