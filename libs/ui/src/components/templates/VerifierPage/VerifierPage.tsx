import { useProjectsQuery } from '@carbon-credits/network/src/generated'
import { ProjectCard } from '@carbon-credits/ui/src/components/organisms/ProjectCard'
import { useState } from 'react'
import { ShowData } from '../../organisms/ShowData'
import { useAccount } from '@carbon-credits/hooks/web3'
import { useAsync } from '@carbon-credits/hooks/async'
import { verifyProject } from '@carbon-credits/contract-utilities'
import { PlainButton } from '../../atoms/PlainButton'
import { Dialog } from '../../atoms/Dialog'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Button } from '../../atoms/Button'
import { Form } from '../../atoms/Form'
import { notification$ } from '@carbon-credits/util/subjects'

export interface IVerifierPageProps {}

export const VerifierPage = ({}: IVerifierPageProps) => {
  const { account } = useAccount()
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(12)
  const { data, loading } = useProjectsQuery({
    variables: {
      where: { verifiers: { none: { walletAddress: { equals: account } } } },
    },
  })
  return (
    <ShowData
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.projects.length,
        totalCount: data?.projectsCount.count,
        setSkip,
        setTake,
      }}
    >
      {data?.projects.map((project) => (
        <div>
          <ProjectCard project={project} />
          <VerifyDialog projectId={project.id} />
        </div>
      ))}
    </ShowData>
  )
}

export const VerifyDialog = ({ projectId }: { projectId: number }) => {
  const [open, setOpen] = useState(false)
  const [verificationText, setVerificationText] = useState('')
  const { account, contract } = useAccount()
  const [{ data, loading, error }, addVerifierFunction] =
    useAsync(verifyProject)
  console.log('success? data ', data)
  return (
    <div>
      <PlainButton
        className="underline underline-offset-4"
        onClick={() => setOpen(true)}
      >
        Verify project
      </PlainButton>
      <Dialog open={open} setOpen={setOpen} title={'Add verifier'}>
        <Form
          onSubmit={async (e) => {
            e.preventDefault()

            // get form data
            const data = new FormData(e.currentTarget)
            const verificationText = data.get('verificationText') as string
            console.log('Address:', verificationText)
            if (!account || !contract) {
              console.error('account or contract not found.')
              return
            }
            if (verificationText !== 'I verify') {
              notification$.next({ message: 'Address is required.' })
              return
            }
            await addVerifierFunction({
              account,
              contract,
              payload: { projectId },
            })
          }}
        >
          <HtmlLabel
            title="Confirm"
            error={verificationText !== 'I verify' ? "Type 'I verify'" : ''}
          >
            <HtmlInput
              placeholder="Confirmation text"
              value={verificationText}
              name="verificationText"
              onChange={(e) => setVerificationText(e.target.value)}
            />
          </HtmlLabel>
          <Button disabled={Boolean(data)} loading={loading} type="submit">
            Verify project
          </Button>
        </Form>
        {data ? <div>Project verification success. 🎉</div> : null}
      </Dialog>
    </div>
  )
}
