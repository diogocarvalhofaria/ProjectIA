import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateReminderInput = {
  active: Scalars['Boolean']['input'];
  date: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type DefaultMessage = {
  __typename?: 'DefaultMessage';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createReminder: DefaultMessage;
  removeReminder: DefaultMessage;
  updateReminder: DefaultMessage;
};


export type MutationCreateReminderArgs = {
  createReminderInput: CreateReminderInput;
};


export type MutationRemoveReminderArgs = {
  ReminderId: Scalars['String']['input'];
};


export type MutationUpdateReminderArgs = {
  ReminderId: Scalars['String']['input'];
  updateReminderInput: UpdateReminderInput;
};

export type Query = {
  __typename?: 'Query';
  findAllReminders: Array<Reminder>;
  findOneReminder: Reminder;
};


export type QueryFindOneReminderArgs = {
  id: Scalars['String']['input'];
};

export type Reminder = {
  __typename?: 'Reminder';
  CreatedAt: Scalars['DateTime']['output'];
  active: Scalars['Boolean']['output'];
  date: Scalars['DateTime']['output'];
  deletedAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type UpdateReminderInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetAllRemindersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRemindersQuery = { __typename?: 'Query', findAllReminders: Array<{ __typename?: 'Reminder', id: string, title: string, description: string, date: any, active: boolean }> };

export type GetReminderByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetReminderByIdQuery = { __typename?: 'Query', findOneReminder: { __typename?: 'Reminder', id: string, title: string, description: string, date: any, active: boolean, CreatedAt: any, deletedAt: any } };

export type CreateReminderMutationVariables = Exact<{
  input: CreateReminderInput;
}>;


export type CreateReminderMutation = { __typename?: 'Mutation', createReminder: { __typename?: 'DefaultMessage', message: string, status: number } };

export type UpdateReminderMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateReminderInput;
}>;


export type UpdateReminderMutation = { __typename?: 'Mutation', updateReminder: { __typename?: 'DefaultMessage', message: string, status: number } };

export type RemoveReminderMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveReminderMutation = { __typename?: 'Mutation', removeReminder: { __typename?: 'DefaultMessage', message: string, status: number } };

export const GetAllRemindersDocument = gql`
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

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllRemindersGQL extends Apollo.Query<GetAllRemindersQuery, GetAllRemindersQueryVariables> {
    document = GetAllRemindersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetReminderByIdDocument = gql`
    query GetReminderById($id: String!) {
  findOneReminder(id: $id) {
    id
    title
    description
    date
    active
    CreatedAt
    deletedAt
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetReminderByIdGQL extends Apollo.Query<GetReminderByIdQuery, GetReminderByIdQueryVariables> {
    document = GetReminderByIdDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateReminderDocument = gql`
    mutation CreateReminder($input: CreateReminderInput!) {
  createReminder(createReminderInput: $input) {
    message
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateReminderGQL extends Apollo.Mutation<CreateReminderMutation, CreateReminderMutationVariables> {
    document = CreateReminderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateReminderDocument = gql`
    mutation UpdateReminder($id: String!, $input: UpdateReminderInput!) {
  updateReminder(ReminderId: $id, updateReminderInput: $input) {
    message
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateReminderGQL extends Apollo.Mutation<UpdateReminderMutation, UpdateReminderMutationVariables> {
    document = UpdateReminderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RemoveReminderDocument = gql`
    mutation RemoveReminder($id: String!) {
  removeReminder(ReminderId: $id) {
    message
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RemoveReminderGQL extends Apollo.Mutation<RemoveReminderMutation, RemoveReminderMutationVariables> {
    document = RemoveReminderDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }