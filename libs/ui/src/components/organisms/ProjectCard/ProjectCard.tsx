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
import { useFetchIPFS } from '@carbon-credits/util'
import Badge from '../../atoms/Badge'
import { IconAlertCircle, IconCheck } from '@tabler/icons-react'

export type ProjectQuery = ProjectsQuery['projects'][number]

export const pickRandom = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)]

export interface IProjectCardProps {
  project: ProjectQuery
}

export const ProjectCard = memo(({ project }: IProjectCardProps) => {
  console.log('project ', project)
  const { account, contract, isOwner } = useAccount()

  const { images } = useFetchIPFS(project.images)

  return (
    <div>
      <div
        className="flex flex-col overflow-hidden bg-white rounded"
        key={project.id}
      >
        {images.map((image) => (
          <img className="object-cover w-full h-48" key={image} src={image} />
        ))}
        <div className="flex flex-col items-start w-full p-2 ">
          <div className="font-semibold">{project.name}</div>
          <div className="text-xs text-gray">{project.about}</div>
          <div className="mt-1">
            {project.verified ? (
              <div className="flex items-center gap-1 text-sm">
                <IconCheck /> Verified {project.verified}.
              </div>
            ) : (
              <div className="flex items-center gap-1 text-sm">
                <IconAlertCircle /> Unverified
              </div>
            )}
          </div>
          {project.owner === account && project.verified ? (
            <AddCreditsDialog project={project} />
          ) : null}
          {project.owner !== account ? <PlainButton>Buy</PlainButton> : null}
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
