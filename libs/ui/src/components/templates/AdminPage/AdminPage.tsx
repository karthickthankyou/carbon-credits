import { useVerifiersQuery } from '@carbon-credits/network/src/generated'
import { Controller } from 'react-hook-form'
import { useFormAddVerifier } from '@carbon-credits/forms/src/addVerifier'
import { ShowData } from '../../organisms/ShowData'
import { useState } from 'react'
import { PlainButton } from '../../atoms/PlainButton'

import { useAsync } from '@carbon-credits/hooks/async'
import { addVerifier } from '@carbon-credits/contract-utilities'
import { HtmlLabel } from '../../atoms/HtmlLabel'
import { HtmlInput } from '../../atoms/HtmlInput'
import { Form } from '../../atoms/Form'
import { Button } from '../../atoms/Button'
import { Dialog } from '../../atoms/Dialog'
import { useAccount } from '@carbon-credits/hooks/web3'
import { IconPlus } from '@tabler/icons-react'
import { uploadImagesIPFS } from '@carbon-credits/util'

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
          <div key={verifier.walletAddress}>{verifier.walletAddress}</div>
        ))}
      </ShowData>
    </div>
  )
}

export const CreateVerifier = () => {
  const [open, setOpen] = useState(false)
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormAddVerifier()
  const { account, contract } = useAccount()
  const [{ data, loading, error }, addVerifierFunction] = useAsync(addVerifier)

  return (
    <div>
      <div className="flex justify-end">
        <PlainButton
          className="flex items-center gap-1 py-2 hover:underline underline-offset-4"
          onClick={() => setOpen(true)}
        >
          <IconPlus /> Create verifier
        </PlainButton>
      </div>
      <Dialog open={open} setOpen={setOpen} title={'Add verifier'}>
        <Form
          onSubmit={handleSubmit(async ({ imageUrl, name, walletAddress }) => {
            console.log({ imageUrl, name, walletAddress })
            if (!account || !contract) {
              console.error('account or contract not found.')
              return
            }

            const ipfsImages = await uploadImagesIPFS(imageUrl)

            await addVerifierFunction({
              account,
              contract,
              payload: { imageUrl: ipfsImages[0], name, walletAddress },
            })
          })}
        >
          <HtmlLabel title="Name" error={errors.name?.message}>
            <HtmlInput {...register('name')} />
          </HtmlLabel>
          <HtmlLabel
            title="Wallet address"
            error={errors.walletAddress?.message}
          >
            <HtmlInput {...register('walletAddress')} />
          </HtmlLabel>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <HtmlLabel
                title="Images"
                error={errors.imageUrl?.message?.toString()}
              >
                <HtmlInput
                  type="file"
                  onChange={(e) => field.onChange(e?.target?.files)}
                />
              </HtmlLabel>
            )}
          />
          <Button disabled={Boolean(data)} loading={loading} type="submit">
            Add verifier
          </Button>
        </Form>
        {data ? <div>Verifier created successfully</div> : null}
      </Dialog>
      {data ? <div>Verifier added. 🎉🎉🎉</div> : null}
    </div>
  )
}
