import { injectGlobal } from 'emotion'

export const fontFamily = 'system-ui, sans-serif'
export const fontSize = '16px'

export const primary = '#333333'
export const secondary = '#aaaaaa'

export const setup = () => {
  injectGlobal`
  body {
    font-family: ${fontFamily};
    font-size: ${fontSize};
  }`
}
