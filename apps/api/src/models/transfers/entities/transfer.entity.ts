import { ObjectType } from '@nestjs/graphql'
import { Transfer as TransferType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Transfer implements RestrictProperties<Transfer, TransferType> {
  id: number
  timestamp: Date
  projectId: number
  from: string
  to: string
  quantity: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
