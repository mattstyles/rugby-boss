
import {storiesOf} from '@storybook/react'
import styled from 'styled-components'
import oc from 'open-color'

import {addonApp} from '../.storybook/app'
import {View, H1, P} from '../src'

storiesOf('layout', module)
  .addDecorator(addonApp())
  .add('view', () => (
    <View isPadded>
      <H1>Header for this content</H1>
      <P>Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime.</P>
      <P>Do you believe that shit?</P>
      <P>It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit.</P>
      <P>Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing.</P>
      <P>She starred in one of the ones that became nothing.</P>
      <P>Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you.</P>
      <P>But I can't give you this case, it don't belong to me.</P>
      <P>Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass.</P>
    </View>
  ))
