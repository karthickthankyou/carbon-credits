import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CreateProject } from './CreateProject'

export default {
  title: 'src/components/templates/CreateProject',
  component: CreateProject,
} as ComponentMeta<typeof CreateProject>

const Template: ComponentStory<typeof CreateProject> = (args) => (
  <CreateProject />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
