/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  Ads = 'ads',
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

export enum AdsTypeOptions {
  'aeg' = 'aeg',
  'ptw' = 'ptw',
  'gbb' = 'gbb',
  'gbbr' = 'gbbr',
  'hpa' = 'hpa',
  'gear' = 'gear',
  'autres' = 'autres',
}
export type AdsRecord = {
  title: string;
  description: HTMLString;
  price: number;
  user: RecordIdString;
  type: AdsTypeOptions;
  field?: string[];
  envoi?: boolean;
};

export type UsersRecord = {
  name?: string;
  avatar?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type AdsResponse<Texpand = unknown> = AdsRecord & BaseSystemFields<Texpand>;
export type UsersResponse = UsersRecord & AuthSystemFields;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  ads: AdsRecord;
  users: UsersRecord;
};

export type CollectionResponses = {
  ads: AdsResponse;
  users: UsersResponse;
};
