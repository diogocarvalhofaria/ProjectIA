import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReminderInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Date)
  date: Date;

  @Field()
  active: boolean;

}
