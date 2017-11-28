
import styled from 'styled-components'

import {getIcon} from './icons'
import {getTheme, getColor} from './theme/helpers'

const StyledIcon = styled.i`
  position: relative;
  display: block;
  width: ${props => props.size
    ? props.size + 'rem'
    : props.theme.baseIconSize + 'rem'
  };
  height: ${props => props.size
    ? props.size + 'rem'
    : props.theme.baseIconSize + 'rem'
  };

  svg {
    fill: ${getTheme('type.color.main')};
    transition: fill ease-out ${getTheme('transition.main')}ms;
  }

  :hover {
    svg {
      fill: ${getColor('primaryDark')};
    }
  }
`

export const Icon = ({
  icon,
  size
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
