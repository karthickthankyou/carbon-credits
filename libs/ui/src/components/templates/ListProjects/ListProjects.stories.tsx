import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ListProjects } from './ListProjects'

export default {
  title: 'src/components/templates/ListProjects',
  component: ListProjects,
} as ComponentMeta<typeof ListProjects>

const Template: ComponentStory<typeof ListProjects> = (args) => (
  <ListProjects {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
