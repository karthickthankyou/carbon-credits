import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { InventoryPage } from './InventoryPage'

export default {
  title: 'src/components/templates/InventoryPage',
  component: InventoryPage,
} as ComponentMeta<typeof InventoryPage>

const Template: ComponentStory<typeof InventoryPage> = (args) => (
  <InventoryPage {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
