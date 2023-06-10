import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BuyCreditsPopup } from './BuyCreditsPopup'

export default {
  title: 'src/components/organisms/Map/BuyCreditsPopup',
  component: BuyCreditsPopup,
} as ComponentMeta<typeof BuyCreditsPopup>

const Template: ComponentStory<typeof BuyCreditsPopup> = (args) => (
  <BuyCreditsPopup {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
