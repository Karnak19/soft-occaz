/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  Chats = 'chats',
  Messages = 'messages',
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

export type ChatsRecord = {
  listing_id?: string;
  messages?: RecordIdString[];
  sender_id?: string;
};

export type MessagesRecord = {
  content: string;
  author_id: string;
  chat: RecordIdString;
  seen?: boolean;
};

export type UsersRecord = {
  user_id: string;
};

// Response types include system fields and match responses from the PocketBase API
export type ChatsResponse<Texpand = unknown> = ChatsRecord & BaseSystemFields<Texpand>;
export type MessagesResponse<Texpand = unknown> = MessagesRecord & BaseSystemFields<Texpand>;
export type UsersResponse = UsersRecord & AuthSystemFields;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  chats: ChatsRecord;
  messages: MessagesRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  chats: ChatsResponse;
  messages: MessagesResponse;
  users: UsersResponse;
};
