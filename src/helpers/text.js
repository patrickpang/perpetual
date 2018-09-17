import pinyinlite from 'pinyinlite/index_full'

export function extractText({ content }) {
  return content.map(block => block.content).join(' ')
}

export function preprocessText(rawText) {
  let text = ''
  const result = pinyinlite(rawText).map(pinyins => (pinyins.length > 0 ? pinyins : [' ']))
  result.forEach(pinyins => {
    if (pinyins.length === 1 && pinyins[0].length === 1) {
      text += pinyins[0]
    } else {
      text += ' ' + pinyins[0] + ' '
    }
  })
  return text
}
