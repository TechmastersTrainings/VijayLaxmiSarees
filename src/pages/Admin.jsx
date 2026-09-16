import { useCallback, useEffect, useState } from 'react'
import { useSeo } from '../hooks/useSeo'
import { supabase, supabaseConfigured } from '../lib/supabase'
import { ORDER_STATUSES } from '../lib/orders'
import { formatINR } from '../utils/format'
import { useCatalog } from '../context/CatalogContext'
import Icon from '../components/common/Icon'
import Notice from '../components/common/Notice'
import Breadcrumbs from '../components/common/Breadcrumbs'

const formatDate = (value) =>
  new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

const SetupNotice = () => (
  <section className="section">
    <div className="container" style={{ maxWidth: '760px' }}>
      <h1>Backend not configured yet</h1>
      <p className="lede">
        The admin dashboard activates once the Supabase environment variables are set.
      </p>
      <Notice icon="info">
        <strong>Two steps remain.</strong>
        <ol style={{ margin: '0.6rem 0 0', paddingLeft: '1.1rem' }}>
          <li>Run <code>supabase/schema.sql</code> in Supabase → SQL Editor.</li>
          <li>
            Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> (Supabase →
            Settings → API) to <code>.env.local</code> and to Vercel's Environment Variables, then
            redeploy.
          </li>
        </ol>
      </Notice>
    </div>
  </section>
)

export const Admin = () => {
  useSeo({
    title: 'Store Admin',
    description: 'Private dashboard for Sri Vijaylaxmi Silks.',
    path: '/admin',
  })

  const catalog = useCatalog()
  const [ready, setReady] = useState(!supabaseConfigured)
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState('orders')

  const [orders, setOrders] = useState([])
  const [ordersError, setOrdersError] = useState('')
  const [loadingOrders, setLoadingOrders] = useState(false)

  const [drafts, setDrafts] = useState({})
  const [savingId, setSavingId] = useState(null)
  const [savedMsg, setSavedMsg] = useState('')

  useEffect(() => {
    if (!supabaseConfigured) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) {
      setIsAdmin(null)
      return
    }
    supabase.rpc('is_admin').then(({ data }) => setIsAdmin(Boolean(data)))
  }, [session])

  const loadOrders = useCallback(async () => {
    setLoadingOrders(true)
    setOrdersError('')
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setOrdersError(error.message)
    else setOrders(data || [])
    setLoadingOrders(false)
  }, [])

  useEffect(() => {
    if (session) loadOrders()
  }, [session, loadOrders])

  useEffect(() => {
    const next = {}
    for (const product of catalog.products) {
      const override = catalog.overrides[product.id]
      next[product.id] = {
        price: override?.price ?? product.price ?? '',
        in_stock: override?.in_stock ?? true,
      }
    }
    setDrafts(next)
  }, [catalog.products, catalog.overrides])

  const signIn = async (e) => {
    e.preventDefault()
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) setAuthError(error.message)
  }

  const signOut = () => supabase.auth.signOut()

  const updateStatus = async (id, status) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id)
    if (error) setOrdersError(error.message)
    else setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  const updateDraft = (id, key, value) =>
    setDrafts((d) => ({ ...d, [id]: { ...d[id], [key]: value } }))

  const saveDraft = async (product) => {
    const draft = drafts[product.id]
    setSavingId(product.id)
    setSavedMsg('')
    const { error } = await supabase.from('product_overrides').upsert({
      product_id: product.id,
      price: draft.price === '' ? null : Number(draft.price),
      in_stock: draft.in_stock,
      updated_at: new Date().toISOString(),
    })
    setSavingId(null)
    if (error) setSavedMsg(`Could not save: ${error.message}`)
    else {
      setSavedMsg(`Saved "${product.name}".`)
      catalog.reload()
    }
  }

  if (!supabaseConfigured) return <SetupNotice />
  if (!ready) return null

  if (!session) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: '440px' }}>
          <Breadcrumbs items={[{ label: 'Admin' }]} />
          <h1 style={{ marginBottom: '0.4rem' }}>Store Admin</h1>
          <p className="muted" style={{ marginBottom: '1.4rem' }}>
            Sign in to manage orders and the catalogue.
          </p>
          <form className="checkout-form" onSubmit={signIn}>
            <div className="field">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {authError && (
              <p role="alert" className="field-error">
                {authError}
              </p>
            )}
            <button type="submit" className="btn" style={{ width: '100%' }}>
              Sign in
            </button>
          </form>
        </div>
      </section>
    )
  }

  if (isAdmin === false) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: '640px' }}>
          <Breadcrumbs items={[{ label: 'Admin' }]} />
          <h1 style={{ margin: '0.2rem 0 0.4rem' }}>Not authorised</h1>
          <p className="lede">
            Your account is signed in, but it isn't listed as an admin for this store yet.
          </p>
          <Notice icon="info">
            <strong>One-time setup.</strong> In Supabase → Authentication → Users, copy your user's
            UID, then run this in the SQL editor:
            <code style={{ display: 'block', margin: '0.6rem 0', padding: '0.6rem 0.8rem', background: 'var(--cream-deep)', borderRadius: 'var(--radius-sm)' }}>
              insert into public.admins (id) values ('PASTE-UID-HERE');
            </code>
            Reload this page afterwards.
          </Notice>
          <button type="button" className="btn btn--outline" onClick={signOut}>
            Sign out
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <div className="admin-head">
          <div>
            <Breadcrumbs items={[{ label: 'Admin' }]} />
            <h1 style={{ margin: '0.2rem 0' }}>Store Admin</h1>
            <p className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
              Signed in as {session.user.email}
            </p>
          </div>
          <button type="button" className="btn btn--outline btn--sm" onClick={signOut}>
            Sign out
          </button>
        </div>

        <div className="admin-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'orders'}
            className={tab === 'orders' ? 'is-active' : ''}
            onClick={() => setTab('orders')}
          >
            Orders
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'catalogue'}
            className={tab === 'catalogue' ? 'is-active' : ''}
            onClick={() => setTab('catalogue')}
          >
            Catalogue
          </button>
        </div>

        {tab === 'orders' && (
          <div>
            {ordersError && (
              <Notice icon="info">
                {ordersError.includes('permission')
                  ? 'Your account is signed in but is not listed as an admin yet. Add your user UID to the public.admins table (see supabase/schema.sql).'
                  : ordersError}
              </Notice>
            )}
            {loadingOrders ? (
              <p className="muted">Loading orders…</p>
            ) : orders.length === 0 ? (
              <div className="empty-state">
                <Icon name="bag" size={30} />
                <h3>No orders yet</h3>
                <p>Orders placed on the website will appear here.</p>
              </div>
            ) : (
              <div className="admin-orders">
                {orders.map((order) => (
                  <article key={order.id} className="admin-order">
                    <div className="admin-order__top">
                      <div>
                        <strong>{order.customer_name}</strong>
                        <span className="admin-order__meta">
                          {order.customer_phone} · {formatDate(order.created_at)}
                        </span>
                      </div>
                      <span className="badge badge--gold">{formatINR(order.subtotal)}</span>
                    </div>

                    <ul className="admin-order__items">
                      {(order.items || []).map((item, i) => (
                        <li key={`${order.id}-${i}`}>
                          <span>{item.name}</span>
                          <span>×{item.qty}</span>
                        </li>
                      ))}
                    </ul>

                    {(order.address || order.city || order.notes) && (
                      <p className="admin-order__address">
                        {[order.address, order.city, order.pin].filter(Boolean).join(', ')}
                        {order.notes ? ` — ${order.notes}` : ''}
                      </p>
                    )}

                    <div className="admin-order__foot">
                      <label>
                        Status
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </label>
                      <a
                        className="btn btn--whatsapp btn--sm"
                        href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon name="whatsapp" size={16} /> Contact
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'catalogue' && (
          <div>
            {savedMsg && <Notice icon="check">{savedMsg}</Notice>}
            <div className="admin-catalogue">
              {catalog.products.map((product) => (
                <div key={product.id} className="admin-product">
                  <img src={product.image} alt="" width="64" height="80" loading="lazy" />
                  <div className="admin-product__info">
                    <strong>{product.name}</strong>
                    <span className="admin-product__meta">
                      {product.category} · {product.weave}
                    </span>
                  </div>
                  <label className="admin-product__field">
                    Price (₹)
                    <input
                      type="number"
                      min="0"
                      value={drafts[product.id]?.price ?? ''}
                      onChange={(e) => updateDraft(product.id, 'price', e.target.value)}
                    />
                  </label>
                  <label className="admin-product__check">
                    <input
                      type="checkbox"
                      checked={drafts[product.id]?.in_stock ?? true}
                      onChange={(e) => updateDraft(product.id, 'in_stock', e.target.checked)}
                    />
                    In stock
                  </label>
                  <button
                    type="button"
                    className="btn btn--sm"
                    disabled={savingId === product.id}
                    onClick={() => saveDraft(product)}
                  >
                    {savingId === product.id ? 'Saving…' : 'Save'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Admin