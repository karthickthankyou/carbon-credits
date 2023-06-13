import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export const schemaAddVerifier = z.object({
  name: z.string(),
  walletAddress: z.string(),
  imageUrl: z.any(),
})

export type FormTypeAddVerifier = z.infer<typeof schemaAddVerifier>

export const useFormAddVerifier = () =>
  useForm<FormTypeAddVerifier>({
    resolver: zodResolver(schemaAddVerifier),
  })

export const FormProviderAddVerifier = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormAddVerifier()
  return <FormProvider {...methods}>{children}</FormProvider>
}
