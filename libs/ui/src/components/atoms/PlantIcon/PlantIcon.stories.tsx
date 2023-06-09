import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PlantIcon } from './PlantIcon'

export default {
  title: 'src/components/atoms/PlantIcon',
  component: PlantIcon,
} as ComponentMeta<typeof PlantIcon>

const Template: ComponentStory<typeof PlantIcon> = (args) => (
  <PlantIcon {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
