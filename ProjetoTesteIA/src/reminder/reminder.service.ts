import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReminderInput } from './dto/create-reminder.input';
import { UpdateReminderInput } from './dto/update-reminder.input';
import { Reminder } from './entities/reminder.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultMessage } from '../cummons/default-message';

@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(Reminder)
    private reminderRepository: Repository<Reminder>,
  ) {}

  async createReminder(createReminderInput: CreateReminderInput) {
    const reminder = await this.reminderRepository.findOne({
      where: { title: createReminderInput.title },
    });
    if (reminder) {
      throw new BadRequestException('Lembrete já existe');
    }

    const newReminder = this.reminderRepository.create(createReminderInput);
    await this.reminderRepository.save(newReminder);
    return new DefaultMessage(200 , 'Lembrete criado com sucesso');
  }

  async findAllReminder() {
    const reminders = this.reminderRepository.find();
    if (!reminders) {
      throw new BadRequestException('Nenhum lembrete encontrado');
    }
    return reminders;
  }

  findOneReminder(reminderId: string) {
    const reminder = this.reminderRepository.findOne({
      where: { id: reminderId },
    });
    if (!reminder) {
      throw new BadRequestException('Lembrete não encontrado');
    }
    return reminder;
  }

  async updateReminder(reminderId: string, updateReminderInput: UpdateReminderInput) {
    const reminder = await this.reminderRepository.findOne({
      where: { id: reminderId },
    });

    if (!reminder) {
      throw new BadRequestException('Lembrete não encontrado');
    }
    const {...updateData} = updateReminderInput;

    await this.reminderRepository.update({ id: reminderId }, updateData);
    return new DefaultMessage(200, 'Lembrete atualizado com sucesso');
  }

  async removeReminder(reminderId: string) {
    const removedReminder = await this.findOneReminder(reminderId);
    if (!removedReminder) {
      throw new BadRequestException('Lembrete não encontrado');
    }
    this.reminderRepository.softRemove(removedReminder);
    return new DefaultMessage(200, 'Lembrete removido com sucesso');
  }
}
