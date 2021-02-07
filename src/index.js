// https://learn.javascript.ru/selection-range
// https://www.digitalocean.com/community/tutorials/how-to-modify-attributes-classes-and-styles-in-the-dom-ru
// https://stackoverflow.com/questions/20377835/how-to-get-css-class-property-in-javascript

import {
  _getSelection,
  _createElement,
  convertedName,
  btnsArr
} from './prep'

const isEditArea = _container => {
  if (!_container) return false

  return (_container.className === 'edit-area') ? true : isEditArea(_container.parentNode)
}

const setStyles = element => {
  const elementStyles = window.getComputedStyle(element);
  ['fontSize', 'fontWeight', 'fontStyle', 'lineHeight'].forEach(style => {
    const { className } = element

    // написать два слова, одно слово выделить в bold/italic, потом оба в H1
    if (style === 'fontSize' && className !== 'header1-text' && className !== 'header2-text') return

    // написать два слова, одно слово выделить в bold/H1, потом оба в italic
    if (style === 'fontStyle' && element.className !== 'italic-text') return

    if (style === 'fontWeight') {
      // написать два слова, одно слово выделить в italic, потом оба в bold
      if (element.className === 'italic-text') return

      // написать два слова, одно слово выделить в H1, потом оба в bold
      if (element.className === 'bold-text') {
        element.childNodes.forEach(node => {
          if (['H1', 'H2'].includes(node.nodeName)) {
            node.style[style] = elementStyles[style]
          }
        })
      }
    }

    element.style[style] = elementStyles[style]
  })
}

const formating = (btnName) => {
  const selection = _getSelection()
  if (!selection) return

  const range = selection.getRangeAt(0)
  if (!isEditArea(range.commonAncestorContainer)) return

  const element = _createElement(btnName)
  element.classList.add(btnName)

  const content = range.cloneContents().cloneNode(true)
  element.append(content)
  range.deleteContents()
  range.insertNode(element)

  setStyles(element)
}

btnsArr.forEach(button => {
  const btnName = convertedName[button.className]

  button.addEventListener('click', () => {
    formating(btnName)
  })
})
