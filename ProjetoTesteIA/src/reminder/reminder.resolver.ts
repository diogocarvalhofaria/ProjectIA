import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReminderService } from './reminder.service';
import { Reminder } from './entities/reminder.entity';
import { CreateReminderInput } from './dto/create-reminder.input';
import { UpdateReminderInput } from './dto/update-reminder.input';
import { DefaultMessage } from '../cummons/default-message';

@Resolver(() => Reminder)
export class ReminderResolver {
  constructor(private readonly reminderService: ReminderService) {}

  @Mutation(() => DefaultMessage)
  createReminder(@Args('createReminderInput') createReminderInput: CreateReminderInput) {
    return this.reminderService.createReminder(createReminderInput);
  }

  @Query(() => [Reminder], { name: 'findAllReminders' })
  findAllReminder() {
    return this.reminderService.findAllReminder();
  }

  @Query(() => Reminder, { name: 'findOneReminder' })
  findOneReminder(@Args('id', { type: () => String }) id: string) {
    return this.reminderService.findOneReminder(id);
  }

  @Mutation(() => DefaultMessage)
  updateReminder(
    @Args('ReminderId', { type: () => String }) ReminderId: string,
    @Args('updateReminderInput') updateReminderInput: UpdateReminderInput,
  ) {
    return this.reminderService.updateReminder(ReminderId, updateReminderInput);
  }

  @Mutation(() => DefaultMessage)
  removeReminder(@Args('ReminderId', { type: () => String }) ReminderId: string) {
    return this.reminderService.removeReminder(ReminderId);
  }
}
