import { ObjectType } from '@nestjs/graphql'
import { Retirement as RetirementType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Retirement
  implements RestrictProperties<Retirement, RetirementType>
{
  id: number
  timestamp: Date
  projectId: number
  retiree: string
  quantity: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
