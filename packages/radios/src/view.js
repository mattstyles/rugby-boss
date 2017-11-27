
import PropTypes from 'prop-types'
import styled from 'styled-components'

const View = styled.div`
  display: ${props => props.flex && 'flex'};
  flex-direction: ${props => props.flex && 'column'};
  flex: 1;
  overflow-y: scroll;
  padding: ${props => props.isPadded && `${props.theme.basePadding}rem`}
`
View.propTypes = {
  isPadded: PropTypes.bool,
  flex: PropTypes.bool
}
View.defaultProps = {
  isPadded: false,
  flex: false
}

export default View
