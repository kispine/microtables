import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import * as actions from '@/store/actions'
import {debounce} from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: ['title'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title
    return `
      <input type="text" id="title" class="input" value="${title}" />

      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `
  }

  init() {
    super.init()

    this.$title = this.$root.find('#title')
  }

  storeChanged({title}) {
    this.$title.text = title
  }

  onInput(event) {
    const text = $(event.target).text
    this.$dispatch(actions.changeTitle(text))
  }
}
