import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@core/StoreSubscriber'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || null
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    const componentOptions = {
      store: this.store,
      emitter: this.emitter
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)

      $el.html = component.toHTML()
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
