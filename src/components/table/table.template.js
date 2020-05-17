const CODES = {
  A: 65,
  Z: 90
}

function toCell(row) {
  return function(_, col) {
    return `
        <div 
            class="cell" 
            contenteditable 
            data-col="${col}" 
            data-type="cell"
            data-id="${row}:${col}">
        </div>
    `
  }
}

function toColumn(col, i) {
  return `
    <div class="column" data-type="resizable" data-col="${i}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(i, content) {
  const resize = i ? `<div class="row-resize" data-resize="row"></div>` : ''

  return `
    <div class="row" data-type="resizable" data-row="${i}">
      <div class="row-info">
        ${i ? i : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, i) {
  return String.fromCharCode(CODES.A + i)
}

export function createTable(rowsCount = 18) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')

    rows.push(createRow(row+1, cells))
  }

  return rows.join('')
}
