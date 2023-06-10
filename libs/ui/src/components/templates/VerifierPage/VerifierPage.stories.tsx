import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { VerifierPage } from './VerifierPage'

export default {
  title: 'src/components/templates/VerifierPage',
  component: VerifierPage,
} as ComponentMeta<typeof VerifierPage>

const Template: ComponentStory<typeof VerifierPage> = (args) => (
  <VerifierPage {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = {}
