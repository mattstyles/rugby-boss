
import styled from 'styled-components'
import {prop} from 'lodash/fp'

export const Block = styled.div`
  padding: 0 ${prop('theme.basePadding')}rem;
  margin: ${prop('theme.basePadding')}rem 0;
`
