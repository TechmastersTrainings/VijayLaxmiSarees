export const formatINR = (value) => {
  if (value === null || value === undefined) return null
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatViews = (n) => {
  if (n >= 100000) return `${(n / 100000).toFixed(1).replace(/\.0$/, '')}L views`
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K views`
  return `${n} view${n === 1 ? '' : 's'}`
}

export const cx = (...classes) => classes.filter(Boolean).join(' ')

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
