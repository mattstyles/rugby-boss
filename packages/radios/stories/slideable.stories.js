
import {storiesOf} from '@storybook/react'

import {addonApp} from '../storybook/app'
import {P, View, Slideable} from '../src'

storiesOf('slideable', module)
  .addDecorator(addonApp())
  .add('Slideable', () => (
    <View>
      <Slideable>
        <P>Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime.</P>
      </Slideable>
    </View>
  ))
