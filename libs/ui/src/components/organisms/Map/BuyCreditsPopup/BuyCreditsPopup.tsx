import { useFormContext } from 'react-hook-form'

import {
  InventoriesQuery,
  SearchProjectsQuery,
} from '@carbon-credits/network/src/generated'
import { Button } from '../../../atoms/Button'

import { HtmlLabel } from '../../../atoms/HtmlLabel'
import { HtmlInput } from '../../../atoms/HtmlInput'
import { Form } from '../../../atoms/Form'
import { FormTypeBuyCredits } from '@carbon-credits/forms/src/buyCredits'
import { notification$ } from '@carbon-credits/util/subjects'

import { useAsync } from '@carbon-credits/hooks/async'

import { useAccount } from '@carbon-credits/hooks/web3'
import { buyCredits } from '@carbon-credits/contract-utilities'

export const BuyCreditsPopup = ({
  inventory,
}: {
  inventory: InventoriesQuery['inventories'][number]
}) => {
  const { account, contract } = useAccount()

  const [{ loading }, buyCreditsFunction] = useAsync(buyCredits)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormTypeBuyCredits>()

  return (
    <div className="flex gap-2 text-left border-t-2 border-white bg-white/50 backdrop-blur-sm">
      <Form
        onSubmit={handleSubmit(async ({ quantity }) => {
          if (!account || !contract) {
            notification$.next({ message: 'You are not logged in.' })
            return
          }
          await buyCreditsFunction({
            account,
            contract,
            payload: {
              projectId: inventory.projectId,
              quantity,
              price: inventory.price,
            },
          })
        })}
      >
        <div className="mb-2 text-lg font-bold">{inventory?.project?.name}</div>

        <HtmlLabel title="Quantity" error={errors.quantity?.message}>
          <HtmlInput
            type="number"
            className="w-full p-2 text-lg font-light"
            {...register('quantity', { valueAsNumber: true })}
          />
        </HtmlLabel>

        <Button type="submit" loading={loading} className="w-full mt-2">
          Book now
        </Button>
      </Form>
    </div>
  )
}
