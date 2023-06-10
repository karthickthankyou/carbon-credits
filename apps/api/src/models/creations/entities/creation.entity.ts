import { ObjectType } from '@nestjs/graphql'
import { Creation as CreationType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Creation implements RestrictProperties<Creation, CreationType> {
  id: number
  timestamp: Date
  projectId: number
  user: string
  price: number
  quantity: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
