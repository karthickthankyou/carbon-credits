import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { SearchPageTemplate } from './SearchPageTemplate'

export default {
  title: 'components/templates/SearchPageTemplate',
  component: SearchPageTemplate,
} as ComponentMeta<typeof SearchPageTemplate>

const Template: ComponentStory<typeof SearchPageTemplate> = (args) => (
  <SearchPageTemplate />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
