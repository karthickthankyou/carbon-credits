import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ProjectCard } from './ProjectCard'

export default {
  title: 'src/components/organisms/ProjectCard',
  component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>

const Template: ComponentStory<typeof ProjectCard> = (args) => (
  <ProjectCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
