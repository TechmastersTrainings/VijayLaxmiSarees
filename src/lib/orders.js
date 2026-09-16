import { supabase, supabaseConfigured } from './supabase'

/**
 * Persists a checkout to the orders table. Always optional: the customer's
 * message is still sent via WhatsApp regardless of the result, so the shop
 * never misses an order because of a backend hiccup.
 */
export const saveOrder = async ({ customer, items, subtotal, count }) => {
  if (!supabaseConfigured) return { ok: false, reason: 'not-configured' }

  const payload = {
    customer_name: customer.name.trim(),
    customer_phone: customer.phone.trim(),
    address: customer.address.trim() || null,
    city: customer.city.trim() || null,
    pin: customer.pin.trim() || null,
    notes: customer.notes.trim() || null,
    items: items.map((line) => ({
      id: line.id,
      name: line.name,
      qty: line.qty,
      price: line.price,
    })),
    subtotal,
    item_count: count,
  }

  const { error } = await supabase.from('orders').insert(payload)
  if (error) return { ok: false, reason: error.message }
  return { ok: true }
}

export const ORDER_STATUSES = ['new', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled']

export default saveOrder
