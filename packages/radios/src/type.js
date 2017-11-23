
import styled from 'styled-components'

export const H1 = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fonts.size.base * 2.6}rem;
  font-weight: 500;
  color: ${props => props.theme.fonts.color.heading};
  line-height: 1.1;
  margin-top: 0;
  margin-bottom: ${props => props.theme.fonts.size.base * 1.2}rem;
`

export const P = styled.p`
  font-family: ${props => props.theme.fonts.main};
  font-size: ${props => props.theme.fonts.size.base}rem;
  font-weight: 400;
  color: ${props => props.theme.fonts.color.main};
  line-height: ${props => props.theme.baseLineHeight};
  margin-top: 0;
  margin-bottom: ${props => props.theme.fonts.size.base * 0.6}rem;
`
