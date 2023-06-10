import { ProjectsQuery } from '@carbon-credits/network/src/generated'
import { PlainButton } from '../../atoms/PlainButton'
import { useAccount } from '@carbon-credits/hooks/web3'
import { memo, useState } from 'react'
import { Dialog } from '../../atoms/Dialog'
import { userFormAddCredits } from '@carbon-credits/forms/src/addCredits'
import { Form } from '../../atoms/Form'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Button } from '../../atoms/Button'
import { useAsync } from '@carbon-credits/hooks/async'
import { addCredits } from '@carbon-credits/contract-utilities'

export type ProjectQuery = ProjectsQuery['projects'][number]

export const pickRandom = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)]

export interface IProjectCardProps {
  project: ProjectQuery
}

export const ProjectCard = memo(({ project }: IProjectCardProps) => {
  const { account, contract, isOwner } = useAccount()

  return (
    <div>
      <div
        className="flex flex-col items-center justify-start gap-1 p-2 bg-white "
        key={project.id}
      >
        <div className="flex flex-col justify-center w-full ">
          <div>{project.name}</div>
          <span className="px-1 rounded bg-primary">{project.verified}</span>
          {project.owner === account && project.verified ? (
            <AddCreditsDialog project={project} />
          ) : null}
          <PlainButton>Buy</PlainButton>
        </div>
      </div>
      <div className="mt-2 text-center">
        {isOwner ? <OwnerDialog name={project.name} /> : null}
      </div>
    </div>
  )
})

export const AddCreditsDialog = ({ project }: IProjectCardProps) => {
  const [open, setOpen] = useState(false)
  const { account, contract, isOwner } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormAddCredits()
  const [{ data, loading, error }, addCreditsFunction] = useAsync(addCredits)
  return (
    <>
      <PlainButton
        className="text-sm underline underline-offset-4"
        onClick={() => setOpen(true)}
      >
        Add credits
      </PlainButton>
      <Dialog open={open} setOpen={setOpen} title={'Owners'}>
        <Form
          onSubmit={handleSubmit(async ({ quantity, price }) => {
            console.log('data ', { quantity })

            if (!contract) {
              return
            }

            await addCreditsFunction({
              account,
              contract,
              payload: { projectId: project.id, quantity, price },
            })
          })}
        >
          <HtmlLabel error={errors.quantity?.message} title="Quantity">
            <HtmlInput
              placeholder="Quantity"
              {...register('quantity', { valueAsNumber: true })}
            />
          </HtmlLabel>
          <HtmlLabel error={errors.price?.message} title="Price">
            <HtmlInput
              placeholder="Price"
              {...register('price', { valueAsNumber: true })}
            />
          </HtmlLabel>
          <Button loading={loading} type="submit">
            Add credits
          </Button>
        </Form>
        {data ? <div>Credits added successfully. 🎉🎉🎉</div> : null}
        {error ? (
          <div className="mt-1 text-sm text-red-800">
            Error for developers: {error}
          </div>
        ) : null}
      </Dialog>
    </>
  )
}

export const OwnerDialog = ({ name }: { name: string }) => {
  const [open, setOpen] = useState(false)
  const { account, contract, isOwner } = useAccount()
  const [loading, setLoading] = useState(false)

  return (
    <>
      <PlainButton
        className="text-sm underline underline-offset-4"
        onClick={() => setOpen(true)}
      >
        Owner
      </PlainButton>
      <Dialog open={open} setOpen={setOpen} title={'Owners'}>
        <PlainButton
          loading={loading}
          onClick={async () => {
            try {
              if (!isOwner) {
                alert(
                  'You are not the owner of the contract and cannot remove a Project!',
                )
                return
              }
              setLoading(true)
              // If the requester is the owner, proceed with the removal
              await contract?.methods
                .removeProject(name)
                .send({ from: account })
              setLoading(false)
              alert('Project successfully removed!')
            } catch (error) {
              console.error(error)
            }
          }}
        >
          Remove Project
        </PlainButton>
      </Dialog>
    </>
  )
}
