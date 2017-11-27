
import oc from 'open-color'
import styled, {ThemeProvider} from 'styled-components'

import {theme} from '../src'

const WIDTH = 320
const HEIGHT = 568

const BG = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% 90%,
    rgb(64, 66, 70) 0,
    rgb(26, 28, 32) 60%,
    rgb(18, 18, 20) 100%
  );
  z-index: 0;
`

const Frame = styled.div`
  position: relative;
  width: ${WIDTH + 12}px;
  height: ${HEIGHT + 12}px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.2);
  padding: 6px;
  margin: 20px;
  z-index: 1;
  box-sizing: border-box;
`

const Body = styled.div`
  display: flex;
  position: relative;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1;
  background: ${oc.gray[1]};
`

const Base = ({children}) => (
  <ThemeProvider theme={theme}>
    <div>
      <BG />
      <Frame>
        <Body>
          {children}
        </Body>
      </Frame>
    </div>
  </ThemeProvider>
)

export default Base
