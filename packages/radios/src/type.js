
import {prop} from 'lodash/fp'
import styled from 'styled-components'

const getType = key => prop(`theme.type.${key}`)

export const H1 = styled.h1`
  font-family: ${getType('heading')};
  font-weight: 500;
  color: ${getType('color.heading')};
  ${getType('h1')}
  margin-top: 0;
`

export const H2 = styled.h2`
  font-family: ${getType('heading')};
  font-weight: 500;
  color: ${getType('color.heading')};
  ${getType('h2')}
  margin-top: 0;
`

export const H3 = styled.h3`
  font-family: ${getType('heading')};
  font-weight: 500;
  color: ${getType('color.heading')};
  ${getType('h1')}
  margin-top: 0;
  text-transform: uppercase;
`

export const P = styled.p`
  font-family: ${getType('main')};
  font-weight: 400;
  color: ${getType('color.main')};
  ${getType('content')}
  margin-top: 0;
  margin-bottom: ${props => props.theme.type.size.base * 0.6}rem;
`
