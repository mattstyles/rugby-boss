
import PropTypes from 'prop-types'
import styled from 'styled-components'

const View = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
  padding: ${props => props.isPadded ? props.theme.basePadding + 'rem' : null};
`
View.propTypes = {
  isPadded: PropTypes.bool
}
View.defaultProps = {
  isPadded: false
}

export default View
