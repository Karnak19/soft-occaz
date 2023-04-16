/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  Annonces = 'annonces',
  Chats = 'chats',
  Messages = 'messages',
  Regions = 'regions',
  Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export enum AnnoncesTypeOptions {
  'aeg' = 'aeg',
  'ptw' = 'ptw',
  'gbb' = 'gbb',
  'gbbr' = 'gbbr',
  'hpa' = 'hpa',
  'gear' = 'gear',
  'autres' = 'autres',
}
export type AnnoncesRecord = {
  title: string;
  description: HTMLString;
  price: number;
  user: RecordIdString;
  type: AnnoncesTypeOptions;
  images?: string[];
  envoi?: boolean;
  field?: RecordIdString;
};

export type ChatsRecord = {
  users: RecordIdString[];
  messages?: RecordIdString[];
};

export type MessagesRecord = {
  content: string;
  author: RecordIdString;
  chat: RecordIdString;
  seen?: boolean;
};

export type RegionsRecord = {
  name: string;
};

export type UsersRecord = {
  name?: string;
  avatar?: string;
  region?: RecordIdString;
};

// Response types include system fields and match responses from the PocketBase API
export type AnnoncesResponse<Texpand = unknown> = AnnoncesRecord & BaseSystemFields<Texpand>;
export type ChatsResponse<Texpand = unknown> = ChatsRecord & BaseSystemFields<Texpand>;
export type MessagesResponse<Texpand = unknown> = MessagesRecord & BaseSystemFields<Texpand>;
export type RegionsResponse = RegionsRecord & BaseSystemFields;
export type UsersResponse<Texpand = unknown> = UsersRecord & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  annonces: AnnoncesRecord;
  chats: ChatsRecord;
  messages: MessagesRecord;
  regions: RegionsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  annonces: AnnoncesResponse;
  chats: ChatsResponse;
  messages: MessagesResponse;
  regions: RegionsResponse;
  users: UsersResponse;
};
