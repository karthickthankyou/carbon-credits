import { ProjectsQuery } from '@carbon-credits/network/src/generated'
import { PlainButton } from '../../atoms/PlainButton'
import { useAccount } from '@carbon-credits/hooks/web3'
import { memo, useState } from 'react'
import { Dialog } from '../../atoms/Dialog'

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
        className="flex flex-col items-center gap-1 bg-white rounded-full "
        key={project.id}
      >
        <div className="flex justify-center w-full ">
          <div>{project.name}</div>

          <PlainButton>Buy</PlainButton>
        </div>
      </div>
      <div className="mt-2 text-center">
        {isOwner ? <OwnerDialog name={project.name} /> : null}
      </div>
    </div>
  )
})

export const OwnerDialog = ({ name }: { name: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { account, contract, isOwner } = useAccount()
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
