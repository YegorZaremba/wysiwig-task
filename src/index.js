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

const formating = (btnName) => {
  const selection = _getSelection()
  if (!selection) return

  const range = selection.getRangeAt(0)
  if (!isEditArea(range.commonAncestorContainer)) return

  const element = _createElement(btnName)
  element.classList.add(btnName)

  const content = range.cloneContents().cloneNode(true)
  console.log({ element })
  element.append(content)
  range.deleteContents()
  range.insertNode(element)

  const elementStyles = window.getComputedStyle(element);
  ['fontSize', 'fontWeight', 'fontStyle', 'lineHeight'].forEach(style => {
    element.style[style] = elementStyles[style]
  })
}

btnsArr.forEach(button => {
  const btnName = convertedName[button.className]

  button.addEventListener('click', () => {
    formating(btnName)
  })
})
