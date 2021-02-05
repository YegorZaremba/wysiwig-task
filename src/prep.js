const btnsArr = Array.from(document.querySelectorAll('.toolkit button'))

const _getSelection = () => {
  if (window && window.getSelection) {
    return window.getSelection()
  } else if (document && document.getSelection) {
    return document.getSelection()
  }
}

const convertedName = {
  'head-1': 'header1-text',
  'head-2': 'header2-text',
  bold: 'bold-text',
  italic: 'italic-text'
}

const _createElement = btnName => {
  if (btnName === 'header1-text') {
    return document.createElement('h1')
  } else if (btnName === 'header2-text') {
    return document.createElement('h2')
  } else {
    return document.createElement('span')
  }
}

module.exports = {
  _getSelection,
  _createElement,
  convertedName,
  btnsArr
}
