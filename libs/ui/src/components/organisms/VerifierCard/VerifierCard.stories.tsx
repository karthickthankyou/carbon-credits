import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { VerifierCard } from './VerifierCard'

export default {
  title: 'src/components/organisms/VerifierCard',
  component: VerifierCard,
} as ComponentMeta<typeof VerifierCard>

const Template: ComponentStory<typeof VerifierCard> = (args) => (
  <VerifierCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
