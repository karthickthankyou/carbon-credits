import { Field, Float, InputType, PickType } from '@nestjs/graphql'
import { FindManyProjectArgs } from './find.args'

@InputType()
export class DateFilterInput {
  @Field(() => String)
  start: string

  @Field(() => String)
  end: string
}

@InputType()
export class LocationFilterInput {
  @Field(() => Float)
  nw_lat: number

  @Field(() => Float)
  nw_lng: number

  @Field(() => Float)
  se_lat: number

  @Field(() => Float)
  se_lng: number
}

@InputType()
export class CombinedFilterInput {
  @Field(() => DateFilterInput)
  dateFilter: DateFilterInput

  @Field(() => LocationFilterInput)
  locationFilter: LocationFilterInput
}

@InputType()
export class GarageFilter extends PickType(
  FindManyProjectArgs,
  ['where', 'orderBy', 'skip', 'take'],
  InputType,
) {}
