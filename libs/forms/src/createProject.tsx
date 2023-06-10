import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export const schemaCreateProject = z.object({
  name: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
})

export type FormTypeCreateProject = z.infer<typeof schemaCreateProject>

export const useFormCreateProject = () =>
  useForm<FormTypeCreateProject>({
    resolver: zodResolver(schemaCreateProject),
  })

export const FormProviderCreateProject = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateProject()
  return <FormProvider {...methods}>{children}</FormProvider>
}
