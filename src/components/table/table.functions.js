import {range} from '@core/utils'

export const isTitle = event => {
  return event.target.dataset.resize
}

export const isCell = event => {
  return event.target.dataset.type === 'cell'
}

export const matrix = ($target, $current) => {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export const nextSelector = (key, {col, row}) => {
  switch (key) {
    case 'ArrowDown':
    case 'Enter':
      row += 1
      break

    case 'ArrowUp':
      row = row > 0 ? row - 1 : row
      break

    case 'ArrowLeft':
      col = col > 0 ? col - 1 : col
      break

    case 'ArrowRight':
    case 'Tab':
      col += 1
      break
  }

  return `[data-id="${row}:${col}"]`
}
