export const capitalize = (s) => s.split('').map((l, i) => i === 0 ? l.toUpperCase() : l).join('')
export const checkPlural = (s, i) => i !== 1 ? s.concat('s') : s
