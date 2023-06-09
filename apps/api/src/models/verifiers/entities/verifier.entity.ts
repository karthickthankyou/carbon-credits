import { ObjectType } from '@nestjs/graphql'
import { Verifier as VerifierType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Verifier implements RestrictProperties<Verifier, VerifierType> {
  address: string
}
