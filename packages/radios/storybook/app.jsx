
import styled from 'styled-components'
import oc from 'open-color'

import {App} from '../src'

export const Header = styled.header`
  height: 44px;
  border-bottom: 1px solid ${oc.gray[3]};
  background: ${oc.white};
  color: ${oc.gray[8]};
  text-align: center;
`
export const Title = styled.h1`
  font-size: 16px;
  line-height: 44px;
  margin: 0;
`
export const Footer = styled.footer`
  height: 44px;
  background: ${oc.white};
  color: ${oc.gray[8]};
  border-top: 1px solid ${oc.gray[3]};
  padding: 0 ${props => props.theme.basePadding}rem;
`

export const AppHeader = () => (
  <Header>
    <Title>Title</Title>
  </Header>
)
export const AppFooter = () => (
  <Footer>
    <Title>Footer</Title>
  </Footer>
)

export const addonApp = (header = true, footer = true) => story => (
  <App>
    {header && <AppHeader />}
    {story()}
    {footer && <AppFooter />}
  </App>
)
