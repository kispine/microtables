import {toInlineStyles} from '@core/utils'
import {DEFAULT_STYLES} from '@/constants'
import {parse} from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, i) {
  return (state[i] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, i) {
  return (state[i] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {
  return function(_, col) {
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const width = getWidth(state.colState, col)
    const styles = toInlineStyles({
      ...DEFAULT_STYLES,
      ...state.stylesState[id]
    })
    return `
        <div 
            class="cell" 
            contenteditable 
            data-col="${col}" 
            data-type="cell"
            data-id="${id}"
            data-value="${data || ''}"
            style="${styles}; width: ${width}"}
        >${parse(data) || ''}</div>
    `
  }
}

function toColumn({col, i, width}) {
  return `
      <div class="column" 
           data-type="resizable" 
           data-col="${i}"
           style="width: ${width}"}
      >
        ${col}
        <div class="col-resize" data-resize="col"></div>
      </div>
    `
}

function createRow(i, content, state) {
  const resize = i ? `<div class="row-resize" data-resize="row"></div>` : ''
  const height = getHeight(state, i)
  return `
    <div class="row" 
         data-type="resizable" 
         data-row="${i}"
         style="height: ${height};"
    >
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

function withWidthFrom(state) {
  return function(col, i) {
    return {
      col, i, width: getWidth(state.colState, i)
    }
  }
}

export function createTable(state = {}, rowsCount = 18) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('')

    rows.push(createRow(row+1, cells, state.rowState))
  }

  return rows.join('')
}
