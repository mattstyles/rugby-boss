
import {storiesOf} from '@storybook/react'
import oc from 'open-color'

import {addonApp} from '../storybook/app'
import {View, H1, P, Text, TextBlock, Block} from '../src'
import {getTheme} from '../src/theme/helpers'

const WhiteBlock = Block.extend`
  background: ${oc.white};
  padding-top: ${getTheme('basePadding')}rem;
  padding-bottom: ${getTheme('basePadding')}rem;
`

storiesOf('layout', module)
  .addDecorator(addonApp())
  .add('view', () => (
    <View isPadded>
      <P>Padded views honour the base padding from the theme.</P>
    </View>
  ))
  .add('blocks', () => (
    <View>
      <Block>
        <H1>Heading Block</H1>
      </Block>
      <Block>
        <TextBlock>
          <P>Some text inside a block.</P>
          <P>Some more text, also within a block.</P>
        </TextBlock>
      </Block>
      <WhiteBlock>
        <Text>Block background styling will break to full-width</Text>
      </WhiteBlock>
    </View>
  ))
