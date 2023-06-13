import { Field, Float, ObjectType } from '@nestjs/graphql'
import { Project as ProjectType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Project implements RestrictProperties<Project, ProjectType> {
  about: string
  images: string[]
  id: number
  name: string
  owner: string
  @Field(() => Float, { nullable: true })
  lat: number
  @Field(() => Float, { nullable: true })
  lng: number
  // Todo fill all properties. To make it nullable add below.
  // @Field(() => String, { nullable: true })
}
