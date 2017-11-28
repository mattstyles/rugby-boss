
import styled from 'styled-components'
import PropTypes from 'prop-types'
import oc from 'open-color'

import {getTheme, getColor, modTheme} from './theme/helpers'

export const BaseButton = styled.button`
  position: relative;
  font-family: ${getTheme('type.main')};
  background: rgba(0, 0, 0, 1);
  color: ${oc.white};
  padding: 0 ${modTheme('basePadding', 3)}rem;
  font-size: ${getTheme('type.size.base')}rem;
  line-height: 3;
  border: none;
  border-radius: ${getTheme('borderRadius')}px;
  cursor: pointer;
  transition: background ${getTheme('transition.main')}ms, text-shadow ${getTheme('transition.main')}ms;
  text-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  text-transform: ${props => props.shouty && 'uppercase'};
  letter-spacing: ${props => props.shouty && '0.5px'};
  width: ${props => props.fit && '100%'};

  :hover {
    background: rgba(0, 0, 0, 0.9);
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  }

  :active {
    background: rgba(0, 0, 0, 0.75);
  }
`

export const PrimaryButton = BaseButton.extend`
  background: ${getColor('button.primary')};

  :hover {
    background: ${getColor('button.primaryHover')};
  }

  :active {
    background: ${getColor('button.primarySelect')};
  }
`

export const ErrorButton = BaseButton.extend`
  background: ${getColor('button.error')};

  :hover {
    background: ${getColor('button.errorHover')};
  }

  :active {
    background: ${getColor('button.errorSelect')};
  }
`

export const TransparentButton = BaseButton.extend`
  background: ${getColor('button.transparent')};
  color: ${getTheme('type.color.main')};

  :hover {
    background: ${getColor('button.transparentHover')};
  }

  :active {
    background: ${getColor('button.transparentSelect')};
  }
`

export const Button = (props) => {
  if (props.primary) return <PrimaryButton {...props} />
  if (props.error) return <ErrorButton {...props} />
  if (props.transparent) return <TransparentButton {...props} />

  return <BaseButton {...props} />
}
Button.defaultProps = {
  primary: false,
  error: false,
  transparent: false,
  fit: false,
  shouty: false
}
Button.propTypes = {
  primary: PropTypes.bool,
  error: PropTypes.bool,
  transparent: PropTypes.bool,
  fit: PropTypes.bool,
  shouty: PropTypes.bool
}
