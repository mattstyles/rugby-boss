
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {prop} from 'lodash/fp'

export const Block = styled.div`
  padding: ${props => props.tight || props.fit
    ? 0
    : `0 ${prop('theme.basePadding', props)}rem`
  };
  margin: ${props => props.fit
    ? 0
    : `${prop('theme.basePadding', props)}rem 0`
  };
`
Block.defaultTypes = {
  tight: false,
  fit: false
}
Block.propTypes = {
  tight: PropTypes.bool,
  fit: PropTypes.bool
}
