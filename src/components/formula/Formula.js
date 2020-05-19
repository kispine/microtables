import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  toHTML(val) {
    return `
      <div class="info">fx</div>
      <div id="formula" 
           class="input" 
           contenteditable 
           spellcheck="false"
      >
          ${val || ''}</div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $el => {
      this.$formula.text = $el.data.value
    })
  }

  storeChanged({currentText}) {
    this.$formula.text = currentText.trim()
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text)
  }

  onKeydown(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
