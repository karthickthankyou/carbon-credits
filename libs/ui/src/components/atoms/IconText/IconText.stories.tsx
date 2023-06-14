import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { IconText } from './IconText'

export default {
  title: 'src/components/atoms/IconText',
  component: IconText,
} as ComponentMeta<typeof IconText>

const Template: ComponentStory<typeof IconText> = (args) => (
  <IconText {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
