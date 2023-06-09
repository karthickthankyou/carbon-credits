import { ObjectType } from '@nestjs/graphql'
import { Project as ProjectType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Project implements RestrictProperties<Project, ProjectType> {
  id: number
  name: string
  owner: string
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
