
import {injectGlobal} from 'styled-components'
import oc from 'open-color'
import {theme} from './theme/index'

export {theme}

export {default as App} from './app'
export {default as View} from './view'
export * from './block'
export * from './button'
export * from './buttongroup'
export * from './icon'
export * from './icons'
export * from './taskbar'

export * from './type'

export * from './transitions/appear'

export const setGlobalStyling = () => {
  injectGlobal`
    html {
      font-size: 10px;
    }
    body {
      margin: 0;
      background: ${oc.gray[0]};
      color: ${oc.gray[8]};
      font-family: ${theme.type.fallback};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      display: flex;
    }
  `
}
