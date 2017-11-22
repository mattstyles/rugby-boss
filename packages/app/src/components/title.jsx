
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Title = styled.h1`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.main || 'rgb(64, 64, 64)'};
`
Title.propTypes = {
  text: PropTypes.string
}
Title.defaultProps = {
  text: null
}

const Heading = ({className, text, children}) => (
  <h1 className={className}>
    {text || children}
  </h1>
)
Heading.defaultProps = {
  text: null
}

export const H1 = styled(Heading)`
  font-size: 3.2rem;
  font-family: 'monospace';
`

export default Title
