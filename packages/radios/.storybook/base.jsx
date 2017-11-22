
import oc from 'open-color'
import styled from 'styled-components'

const WIDTH = 320
const HEIGHT = 568

const BG = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(30deg, ${oc.orange[3]}, ${oc.red[7]} 75%);
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
  position: relative;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1;
  background: ${oc.gray[1]};
`

const Base = ({children}) => (
  <div>
    <BG />
    <Frame><Body>{children}</Body></Frame>
  </div>
)

export default Base
