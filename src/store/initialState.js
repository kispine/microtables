import {storage} from '@core/utils'
import {DEFAULT_STYLES, DEFAULT_TITLE} from '@/constants'

const defaultState = {
  title: DEFAULT_TITLE,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES
}

const normalize = s => ({
  ...s,
  currentStyles: DEFAULT_STYLES,
  currentText: ''
})

export const initialState = storage('table-state')
  ? normalize(storage('table-state'))
  : defaultState
