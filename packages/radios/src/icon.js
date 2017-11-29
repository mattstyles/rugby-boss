
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {getIcon} from './icons'
import {getTheme, getColor} from './theme/helpers'

const StyledIcon = styled.i`
  position: relative;
  display: block;
  width: ${props => props.size || props.theme.baseIconSize}rem;
  height: ${props => props.size || props.theme.baseIconSize}rem;

  svg {
    fill: ${props => props.color || props.theme.type.color.main};
    transition: fill ease-out ${getTheme('transition.main')}ms;
  }

  :hover {
    svg {
      fill: ${props => props.hoverColor || getColor('primaryDark')};
    }
  }
`

export const Icon = ({
  icon,
  size,
  color,
  hoverColor
}) => {
  const svg = {
    __html: getIcon(icon)
  }

  return (
    <StyledIcon
      {...{size}}
      dangerouslySetInnerHTML={svg}
    />
  )
}
Icon.defaultProps = {
  icon: '',
  size: null,
  color: '',
  hoverColor: ''
}
Icon.propTypes = {
  icon: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string
}
