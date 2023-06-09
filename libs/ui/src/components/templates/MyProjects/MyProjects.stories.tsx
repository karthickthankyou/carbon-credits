import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MyProjects } from './MyProjects'

export default {
  title: 'src/components/templates/MyProjects',
  component: MyProjects,
} as ComponentMeta<typeof MyProjects>

const Template: ComponentStory<typeof MyProjects> = (args) => (
  <MyProjects {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
