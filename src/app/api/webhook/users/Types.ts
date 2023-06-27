export interface Root {
  data: Data;
  object: string;
  type: string;
}

export interface Data {
  backup_code_enabled: boolean;
  banned: boolean;
  birthday: string;
  create_organization_enabled: boolean;
  created_at: number;
  delete_self_enabled: boolean;
  email_addresses: EmailAddress[];
  external_accounts: ExternalAccount[];
  external_id: any;
  first_name: string | null;
  gender: string;
  id: string;
  image_url: string;
  last_name: string | null;
  last_sign_in_at: number;
  object: string;
  password_enabled: boolean;
  phone_numbers: any[];
  primary_email_address_id: string;
  primary_phone_number_id: any;
  primary_web3_wallet_id: any;
  private_metadata: PrivateMetadata;
  profile_image_url: string;
  public_metadata: PublicMetadata2;
  saml_accounts: any[];
  totp_enabled: boolean;
  two_factor_enabled: boolean;
  unsafe_metadata: UnsafeMetadata;
  updated_at: number;
  username: string | null;
  web3_wallets: any[];
}

export interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: LinkedTo[];
  object: string;
  reserved: boolean;
  verification: Verification;
}

export interface LinkedTo {
  id: string;
  type: string;
}

export interface Verification {
  attempts: any;
  expire_at: any;
  status: string;
  strategy: string;
}

export interface ExternalAccount {
  approved_scopes: string;
  avatar_url?: string;
  email_address: string;
  first_name?: string;
  id: string;
  identification_id?: string;
  image_url?: string;
  label: any;
  last_name?: string;
  object: string;
  provider?: string;
  provider_user_id?: string;
  public_metadata: PublicMetadata;
  username?: string;
  verification: Verification2;
  family_name?: string;
  given_name?: string;
  google_id?: string;
  picture?: string;
}

export type PublicMetadata = Record<string, unknown>;

export interface Verification2 {
  attempts: any;
  expire_at: number;
  status: string;
  strategy: string;
}

export type PrivateMetadata = Record<string, unknown>;

export type PublicMetadata2 = Record<string, unknown>;

export type UnsafeMetadata = Record<string, unknown>;
