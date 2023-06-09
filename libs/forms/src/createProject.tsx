import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const schemaCreateProject = z.object({
  name: z.string(),
  price: z.number(),
})

export type FormTypeCreateProject = z.infer<typeof schemaCreateProject>

export const useFormCreateProject = () =>
  useForm<FormTypeCreateProject>({
    resolver: zodResolver(schemaCreateProject),
  })
