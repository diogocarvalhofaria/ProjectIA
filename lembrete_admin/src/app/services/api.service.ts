import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import {
  Reminder,
  CreateReminderInput,
  UpdateReminderInput,
  DefaultMessage
} from '../../generated/graphql';
import {GetReminderByIdGQL} from '../graphql/generated';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private _reminders: BehaviorSubject<Reminder[]> = new BehaviorSubject<Reminder[]>([]);
  private _reminder: BehaviorSubject<Reminder | null> = new BehaviorSubject<Reminder | null>(null);
  private _isLoadingReminders: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _isLoadingReminder: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

 // Definindo as queries GraphQL
  private readonly GET_ALL_REMINDERS = gql`
    query GetAllReminders {
      findAllReminders {
        id
        title
        description
        date
        active
      }
    }
  `;

  private readonly GET_REMINDER_BY_ID = gql`
    query GetReminderById($id: String!) {
      findOneReminder(id: $id) {
        id
        title
        description
        date
        active
      }
    }
  `;

  private readonly CREATE_REMINDER = gql`
    mutation CreateReminder($input: CreateReminderInput!) {
      createReminder(createReminderInput: $input) {
        message
        status
      }
    }
  `;

  private readonly UPDATE_REMINDER = gql`
    mutation UpdateReminder($id: String!, $input: UpdateReminderInput!) {
      updateReminder(ReminderId: $id, updateReminderInput: $input) {
        message
        status
      }
    }
  `;

  private readonly REMOVE_REMINDER = gql`
    mutation RemoveReminder($id: String!) {
      removeReminder(ReminderId: $id) {
        message
        status
      }
    }
  `;

  constructor(private apollo: Apollo,
              private getReminderByIdGQL: GetReminderByIdGQL) {}

  // Getters para observáveis
  get reminders$(): Observable<Reminder[]> {
    return this._reminders.asObservable();
  }

  get reminder$(): Observable<Reminder | null> {
    return this._reminder.asObservable();
  }

  get isLoadingReminders$(): Observable<boolean> {
    return this._isLoadingReminders.asObservable();
  }

  get isLoadingReminder$(): Observable<boolean> {
    return this._isLoadingReminder.asObservable();
  }

  // Métodos de API
  getAllReminders(): Observable<Reminder[]> {
    this._isLoadingReminders.next(true);

    return this.apollo.watchQuery<{ findAllReminders: Reminder[] }>({
      query: this.GET_ALL_REMINDERS,
      fetchPolicy: 'network-only'
    }).valueChanges.pipe(
      map(result => {
        const reminders = result.data.findAllReminders;
        this._reminders.next(reminders);
        this._isLoadingReminders.next(false);
        return reminders;
      })
    );
  }

  getReminderById(id: string): Observable<Reminder> {
    this._isLoadingReminder.next(true);

    return this.getReminderByIdGQL.watch({ id }).valueChanges.pipe(
      map(result => {
        const reminder = result.data.findOneReminder;
        this._reminder.next(reminder);
        this._isLoadingReminder.next(false);
        return reminder;
      })
    );
  }

  createReminder(data: CreateReminderInput): Observable<DefaultMessage> {
    return this.apollo.mutate<{ createReminder: DefaultMessage }>({
      mutation: this.CREATE_REMINDER,
      variables: { input: data },
      refetchQueries: [{ query: this.GET_ALL_REMINDERS }]
    }).pipe(
      map(result => {
        return result.data?.createReminder as DefaultMessage;
      })
    );
  }

  updateReminder(id: string, data: UpdateReminderInput): Observable<DefaultMessage> {
    return this.apollo.mutate<{ updateReminder: DefaultMessage }>({
      mutation: this.UPDATE_REMINDER,
      variables: {
        id,
        input: { ...data, id }
      },
      refetchQueries: [{ query: this.GET_ALL_REMINDERS }]
    }).pipe(
      map(result => {
        return result.data?.updateReminder as DefaultMessage;
      })
    );
  }

  deleteReminder(id: string): Observable<DefaultMessage> {
    return this.apollo.mutate<{ removeReminder: DefaultMessage }>({
      mutation: this.REMOVE_REMINDER,
      variables: { id },
      refetchQueries: [{ query: this.GET_ALL_REMINDERS }]
    }).pipe(
      map(result => {
        return result.data?.removeReminder as DefaultMessage;
      })
    );
  }

  clearCurrentReminder(): void {
    this._reminder.next(null);
  }
}
