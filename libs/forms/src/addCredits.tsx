import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'

export const formSchemaAddCredits = z.object({
  quantity: z.number(),
  price: z.number(),
  forSale: z.boolean().default(false),
})

export type FormTypeAddCredits = z.infer<typeof formSchemaAddCredits>

export const useFormAddCredits = () =>
  useForm<FormTypeAddCredits>({
    resolver: zodResolver(formSchemaAddCredits),
  })

export const FormProviderAddCredits = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormAddCredits()
  return <FormProvider {...methods}>{children}</FormProvider>
}
