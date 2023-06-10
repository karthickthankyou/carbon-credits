import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AdminPage } from './AdminPage'

export default {
  title: 'src/components/templates/AdminPage',
  component: AdminPage,
} as ComponentMeta<typeof AdminPage>

const Template: ComponentStory<typeof AdminPage> = (args) => (
  <AdminPage {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
