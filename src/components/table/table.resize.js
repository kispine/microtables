export const resizeHandler = ($root, $resizer) => {
  return new Promise(resolve => {
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'height' : 'width'
    let value

    $resizer.css({[sideProp]: `${$root.getCoords()[sideProp]}px`})

    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        value = value > 25 ? value : 25
        $resizer.css({left: `${value}px`})
      } else {
        const delta = e.pageY - coords.bottom
        value = coords.height + delta
        value = value > 15 ? value : 15
        $resizer.css({top: `${value}px`})
      }
    }

    document.onmouseup = e => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: `${value}px`})
      }

      resolve({
        type,
        value,
        id: $parent.data.col || $parent.data.row
      })

      $resizer.css({
        width: null, height: null,
        top: null, left: null
      })
    }
  })
}
