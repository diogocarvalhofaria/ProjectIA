import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ReminderResolver } from './reminder.resolver';
import { Reminder } from './entities/reminder.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reminder])],
  controllers: [],
  providers: [ReminderResolver, ReminderService],
})
export class ReminderModule {}
