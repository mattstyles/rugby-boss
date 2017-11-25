
import oc from 'open-color'
import Shevy from 'shevyjs'
import {pick} from 'lodash'

const baseLineHeight = 1.6
const baseFontSize = 1.4

const shevy = new Shevy({
  baseFontScale: 'minorThird',
  baseLineHeight: baseLineHeight,
  baseFontSize: `${baseFontSize}rem`,
  proximity: true
})

export const theme = {
  baseLineHeight,
  basePadding: 1.2,
  borderRadius: 3,

  baseIconSize: 6,
  baseIconTextSize: 1.6,

  layout: {
    headerHeight: 4.4,
    footerHeight: 4.4
  },

  transition: {
    main: 150,
    spin: 1250
  },

  type: {
    fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`,
    main: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`,
    heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;`,
    onLightShadow: `0 1px rgba(0, 0, 0, 0.2)`,

    size: {
      base: baseFontSize,
      small: 1.2,
      vsmall: 1.1
    },

    color: {
      main: oc.gray[8],
      heading: oc.gray[7]
    },

    ...pick(shevy, [
      'body',
      'content',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6'
    ])
  },

  color: {
    primary: oc.green[5],
    primaryDark: oc.green[7],
    primaryLight: oc.green[4],
    header: oc.gray[8],
    error: oc.red[8],

    button: {
      primary: oc.green[5],
      primaryHover: oc.green[7],
      primarySelect: oc.green[8],
      transparent: 'transparent',
      transparentHover: 'rgba(0, 0, 0, 0.1)',
      transparentSelect: 'rgba(0, 0, 0, 0.4)'
    }
  },

  gradient: {
    background: `radial-gradient(
      circle at 50% 90%,
      rgba(0, 0, 0, 0.05) 0,
      rgba(0, 0, 0, 0.3) 60%,
      rgba(0, 0, 0, 0.4) 100%
    )`,
    backgroundSubtle: `radial-gradient(
      circle at 50% 90%,
      rgba(0, 0, 0, 0.01) 0,
      rgba(0, 0, 0, 0.1) 60%,
      rgba(0, 0, 0, 0.15) 100%
    )`,
    primaryRadial: `radial-gradient(
      circle at 50% 90%,
      ${oc.green[5]} 0,
      ${oc.green[7]} 60%,
      ${oc.green[8]} 100%
    )`,
    primary: `linear-gradient(30deg, ${oc.green[8]}, ${oc.green[4]})`,
    primaryShift: `linear-gradient(30deg, ${oc.teal[5]}, ${oc.green[4]})`,
    primaryLight: `linear-gradient(30deg, ${oc.lime[3]}, ${oc.green[7]})`,
    primaryDark: `linear-gradient(30deg, ${oc.green[7]}, ${oc.green[8]})`,
    blue: `linear-gradient(30deg, ${oc.violet[5]}, ${oc.blue[6]})`,
    sunset: `linear-gradient(30deg, ${oc.orange[3]}, ${oc.red[7]} 75%)`
  }
}
