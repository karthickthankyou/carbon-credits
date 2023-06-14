import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'

export const formSchemaBuyCredits = z.object({
  quantity: z.number(),
  forSale: z.boolean().default(false),
})

export type FormTypeBuyCredits = z.infer<typeof formSchemaBuyCredits>

export const userFormBuyCredits = () =>
  useForm<FormTypeBuyCredits>({
    resolver: zodResolver(formSchemaBuyCredits),
  })

export const FormProviderBuyCredits = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = userFormBuyCredits()
  return <FormProvider {...methods}>{children}</FormProvider>
}
