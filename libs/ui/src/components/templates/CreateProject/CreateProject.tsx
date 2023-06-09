import { Form } from '../../atoms/Form'
import { HtmlInput } from '../../atoms/HtmlInput'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { useFormCreateProject } from '@carbon-credits/forms/src/createProject'
import { createProject } from '@carbon-credits/contract-utilities'
import { useAccount } from '@carbon-credits/hooks/web3'
import { Dialog } from '../../atoms/Dialog'
import { useState } from 'react'
import { PlainButton } from '../../atoms/PlainButton'
import { IconPlus } from '@tabler/icons-react'
import { Button } from '../../atoms/Button'
import { useAsync } from '@carbon-credits/hooks/async'

export interface ICreateProjectProps {}

export const CreateProject = ({}: ICreateProjectProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormCreateProject()
  const { contract, account } = useAccount()
  const [open, setOpen] = useState(false)

  const [{ data, loading, error }, createProjectFunction] =
    useAsync(createProject)
  if (!account) {
    return null
  }

  return (
    <>
      <PlainButton
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-2 px-4 text-sm transition-shadow rounded-full hover:shadow-lg hover:border"
      >
        <IconPlus />
        Create project
      </PlainButton>

      <Dialog open={open} setOpen={setOpen} title={'Create project'}>
        <Form
          onSubmit={handleSubmit(({ name, price }) => {
            if (!contract) {
              console.error('Contract not found')
              return
            }

            createProjectFunction({
              account,
              contract,
              payload: { name, price },
            })
          })}
        >
          <HtmlLabel error={errors.name?.message} title="name">
            <HtmlInput placeholder="Project name" {...register('name')} />
          </HtmlLabel>
          <HtmlLabel error={errors.name?.message} title="price">
            <HtmlInput placeholder="Price" {...register('price')} />
          </HtmlLabel>
          <Button loading={loading} color="black" type="submit">
            Create
          </Button>
        </Form>
      </Dialog>
    </>
  )
}
