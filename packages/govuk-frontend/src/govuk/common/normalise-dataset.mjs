/**
 * Normalise string
 *
 * 'If it looks like a duck, and it quacks like a duck…' 🦆
 *
 * If the passed value looks like a boolean or a number, convert it to a boolean
 * or number.
 *
 * Designed to be used to convert config passed via data attributes (which are
 * always strings) into something sensible.
 *
 * @private
 * @param {string} value - The value to normalise
 * @returns {string | boolean | number | undefined} Normalised data
 */
export function normaliseString (value) {
  if (typeof value !== 'string') {
    return value
  }

  const trimmedValue = value.trim()

  if (trimmedValue === 'true') {
    return true
  }

  if (trimmedValue === 'false') {
    return false
  }

  // Empty / whitespace-only strings are considered finite so we need to check
  // the length of the trimmed string as well
  if (trimmedValue.length > 0 && isFinite(Number(trimmedValue))) {
    return Number(trimmedValue)
  }

  return value
}

/**
 * Normalise dataset
 *
 * Loop over an object and normalise each value using normaliseData function
 *
 * @private
 * @param {DOMStringMap} dataset - HTML element dataset
 * @returns {{ [key: string]: unknown }} Normalised dataset
 */
export function normaliseDataset (dataset) {
  /** @type {{ [key: string]: unknown }} */
  const out = {}

  for (const key in dataset) {
    out[key] = normaliseString(dataset[key])
  }

  return out
}
