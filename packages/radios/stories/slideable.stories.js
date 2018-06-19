
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import styled from 'styled-components'
import oc from 'open-color'

import {addonApp} from '../storybook/app'
import {Text, View, Slideable} from '../src'

const Item = styled.div`
  margin-top: ${props => props.theme.basePadding}rem;
  padding: ${props => props.theme.basePadding * 0.6}rem ${props => props.theme.basePadding}rem;
  background: ${oc.white};
  border-top: 1px solid ${oc.gray[3]};
  border-bottom: 1px solid ${oc.gray[3]};
`

storiesOf('slideable', module)
  .addDecorator(addonApp())
  .add('Slideable', () => (
    <View>
      <Slideable
        snapToClose
        onOpenLeft={action('left')}
        onOpenRight={action('right')}
      >
        <Item>
          <Text>Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime.</Text>
        </Item>
      </Slideable>
    </View>
  ))
