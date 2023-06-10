import { useVerifiersQuery } from '@carbon-credits/network/src/generated'
import { ShowData } from '../../organisms/ShowData'
import { SetStateAction, useState } from 'react'
import { PlainButton } from '../../atoms/PlainButton'

import { useAsync } from '@carbon-credits/hooks/async'
import { addVerifier } from '@carbon-credits/contract-utilities'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Form } from '../../atoms/Form'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { useAccount } from '@carbon-credits/hooks/web3'
import { notification$ } from '@carbon-credits/util/subjects'

export interface IAdminPageProps {}

export const AdminPage = ({}: IAdminPageProps) => {
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(12)
  const { data, loading } = useVerifiersQuery()
  return (
    <div>
      <CreateVerifier />
      <ShowData
        loading={loading}
        pagination={{
          skip,
          take,
          resultCount: data?.verifiers.length,
          totalCount: data?.verifiersCount.count,
          setSkip,
          setTake,
        }}
      >
        {data?.verifiers.map((verifier) => (
          <div key={verifier.address}>{verifier.address}</div>
        ))}
      </ShowData>
    </div>
  )
}

export const CreateVerifier = () => {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState('')
  const { account, contract } = useAccount()
  const [{ data, loading, error }, addVerifierFunction] = useAsync(addVerifier)
  return (
    <div>
      <PlainButton onClick={() => setOpen(true)}>Create verifer</PlainButton>
      <Dialog open={open} setOpen={setOpen} title={'Add verifier'}>
        <Form
          onSubmit={async (e) => {
            e.preventDefault()

            // get form data
            const data = new FormData(e.currentTarget)
            const address = data.get('address') as string
            console.log('Address:', address)
            if (!account || !contract) {
              console.error('account or contract not found.')
              return
            }
            if (!address) {
              notification$.next({ message: 'Address is required.' })
              return
            }
            await addVerifierFunction({
              account,
              contract,
              payload: { verifier: address },
            })
          }}
        >
          <HtmlLabel>
            <HtmlInput
              value={address}
              name="address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </HtmlLabel>
          <Button loading={loading} type="submit">
            Add verifier
          </Button>
        </Form>
      </Dialog>
    </div>
  )
}
