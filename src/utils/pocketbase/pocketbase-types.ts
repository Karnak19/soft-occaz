/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Blog = "blog",
	Conversations = "conversations",
	Favorites = "favorites",
	Listings = "listings",
	Messages = "messages",
	News = "news",
	Partners = "partners",
	RatingSessions = "rating_sessions",
	Ratings = "ratings",
	ReferralTiers = "referral_tiers",
	Reports = "reports",
	Search = "search",
	Stats = "stats",
	UnreadMessages = "unread_messages",
	UserPreferences = "user_preferences",
	Users = "users",
	UsersAverageRating = "users_average_rating",
	UsersSeenListings = "users_seen_listings",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

type ExpandType<T> = unknown extends T
	? T extends unknown
		? { expand?: unknown }
		: { expand: T }
	: { expand: T }

// System fields
export type BaseSystemFields<T = unknown> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
} & ExpandType<T>

export type AuthSystemFields<T = unknown> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type BlogRecord = {
	content: HTMLString
	created?: IsoDateString
	id: string
	slug: string
	title: string
	updated?: IsoDateString
}

export type ConversationsRecord = {
	created?: IsoDateString
	createdBy: RecordIdString
	id: string
	name?: string
	participants: RecordIdString[]
	updated?: IsoDateString
}

export type FavoritesRecord = {
	created?: IsoDateString
	id: string
	listing: RecordIdString
	updated?: IsoDateString
	user: RecordIdString
}

export enum ListingsTypeOptions {
	"aeg" = "aeg",
	"aep" = "aep",
	"gbb" = "gbb",
	"gbbr" = "gbbr",
	"hpa" = "hpa",
	"ptw" = "ptw",
	"gear" = "gear",
	"sniper" = "sniper",
	"shotgun" = "shotgun",
	"other" = "other",
}

export enum ListingsFeesOptions {
	"paypal_in" = "paypal_in",
	"shipping_in" = "shipping_in",
}
export type ListingsRecord<Timages = unknown> = {
	created?: IsoDateString
	description?: HTMLString
	external_id?: string
	fees?: ListingsFeesOptions[]
	id: string
	images?: null | Timages
	price: number
	sold_to?: RecordIdString
	title: string
	type: ListingsTypeOptions
	updated?: IsoDateString
	user: RecordIdString
}

export enum MessagesStatusOptions {
	"sent" = "sent",
	"delivered" = "delivered",
	"read" = "read",
}
export type MessagesRecord = {
	attachments?: string[]
	content: string
	conversation: RecordIdString
	created?: IsoDateString
	deletedAt?: IsoDateString
	id: string
	replyTo?: RecordIdString
	sender: RecordIdString
	status: MessagesStatusOptions
	updated?: IsoDateString
}

export type NewsRecord = {
	content?: HTMLString
	created?: IsoDateString
	id: string
	title?: string
	until?: IsoDateString
	updated?: IsoDateString
}

export type PartnersRecord = {
	created?: IsoDateString
	displayName?: boolean
	href?: string
	id: string
	logo?: string
	name?: string
	updated?: IsoDateString
}

export type RatingSessionsRecord = {
	created?: IsoDateString
	id: string
	listing: RecordIdString
	rating?: RecordIdString
	target: RecordIdString
	updated?: IsoDateString
	user: RecordIdString
}

export type RatingsRecord = {
	comment?: string
	created?: IsoDateString
	from: RecordIdString
	id: string
	listing: RecordIdString
	rating: number
	session: RecordIdString
	updated?: IsoDateString
	user: RecordIdString
}

export type ReferralTiersRecord<Ttier = unknown> = {
	id: string
	referral_count?: number
	tier?: null | Ttier
	user?: RecordIdString
}

export type ReportsRecord = {
	created?: IsoDateString
	id: string
	listing: RecordIdString
	reason: string
	reporter: RecordIdString
	updated?: IsoDateString
}

export enum SearchConditionOptions {
	"new" = "new",
	"like_new" = "like_new",
	"very_good" = "very_good",
	"good_acceptable" = "good_acceptable",
	"any" = "any",
}

export enum SearchCategoryOptions {
	"aeg" = "aeg",
	"aep" = "aep",
	"gbb" = "gbb",
	"gbbr" = "gbbr",
	"hpa" = "hpa",
	"ptw" = "ptw",
	"gear" = "gear",
	"sniper" = "sniper",
	"shotgun" = "shotgun",
	"other" = "other",
}

export enum SearchStatusOptions {
	"active" = "active",
	"in_progress" = "in_progress",
	"completed" = "completed",
	"expired" = "expired",
}
export type SearchRecord<Treference_images = unknown> = {
	budget_low?: number
	budget_max?: number
	category?: SearchCategoryOptions
	condition?: SearchConditionOptions[]
	created?: IsoDateString
	description?: HTMLString
	id: string
	location?: string
	reference_images?: null | Treference_images
	status?: SearchStatusOptions
	title?: string
	updated?: IsoDateString
	upgraded?: boolean
	user?: RecordIdString
	valid_until?: IsoDateString
}

export type StatsRecord<Tlistings_count = unknown, Tusers_count = unknown> = {
	id: string
	listings_count?: null | Tlistings_count
	users_count?: null | Tusers_count
}

export type UnreadMessagesRecord<TunreadCount = unknown> = {
	conversationId: RecordIdString
	id: string
	participants: RecordIdString[]
	unreadCount?: null | TunreadCount
}

export type UserPreferencesRecord = {
	created?: IsoDateString
	has_seen_chat_announcement?: boolean
	id: string
	updated?: IsoDateString
	user?: RecordIdString
}

export enum UsersPaymentOptions {
	"paypal" = "paypal",
	"cash" = "cash",
	"bank_transfer" = "bank_transfer",
	"lydia" = "lydia",
}

export enum UsersShippingOptions {
	"in_hand" = "in_hand",
	"colissimo" = "colissimo",
	"mondial_relay" = "mondial_relay",
}
export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	departement?: number
	email: string
	emailVisibility?: boolean
	id: string
	lastOnline?: IsoDateString
	name?: string
	password: string
	payment?: UsersPaymentOptions
	referral_code?: string
	referrer?: RecordIdString
	shipping?: UsersShippingOptions
	stripeConnectAccountId?: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type UsersAverageRatingRecord<Taverage_rating = unknown> = {
	average_rating?: null | Taverage_rating
	id: string
	rating_count?: number
	user: RecordIdString
}

export type UsersSeenListingsRecord = {
	created?: IsoDateString
	id: string
	listing: RecordIdString
	updated?: IsoDateString
	user?: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type BlogResponse<Texpand = unknown> = Required<BlogRecord> & BaseSystemFields<Texpand>
export type ConversationsResponse<Texpand = unknown> = Required<ConversationsRecord> & BaseSystemFields<Texpand>
export type FavoritesResponse<Texpand = unknown> = Required<FavoritesRecord> & BaseSystemFields<Texpand>
export type ListingsResponse<Timages = unknown, Texpand = unknown> = Required<ListingsRecord<Timages>> & BaseSystemFields<Texpand>
export type MessagesResponse<Texpand = unknown> = Required<MessagesRecord> & BaseSystemFields<Texpand>
export type NewsResponse<Texpand = unknown> = Required<NewsRecord> & BaseSystemFields<Texpand>
export type PartnersResponse<Texpand = unknown> = Required<PartnersRecord> & BaseSystemFields<Texpand>
export type RatingSessionsResponse<Texpand = unknown> = Required<RatingSessionsRecord> & BaseSystemFields<Texpand>
export type RatingsResponse<Texpand = unknown> = Required<RatingsRecord> & BaseSystemFields<Texpand>
export type ReferralTiersResponse<Ttier = unknown, Texpand = unknown> = Required<ReferralTiersRecord<Ttier>> & BaseSystemFields<Texpand>
export type ReportsResponse<Texpand = unknown> = Required<ReportsRecord> & BaseSystemFields<Texpand>
export type SearchResponse<Treference_images = unknown, Texpand = unknown> = Required<SearchRecord<Treference_images>> & BaseSystemFields<Texpand>
export type StatsResponse<Tlistings_count = unknown, Tusers_count = unknown, Texpand = unknown> = Required<StatsRecord<Tlistings_count, Tusers_count>> & BaseSystemFields<Texpand>
export type UnreadMessagesResponse<TunreadCount = unknown, Texpand = unknown> = Required<UnreadMessagesRecord<TunreadCount>> & BaseSystemFields<Texpand>
export type UserPreferencesResponse<Texpand = unknown> = Required<UserPreferencesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type UsersAverageRatingResponse<Taverage_rating = unknown, Texpand = unknown> = Required<UsersAverageRatingRecord<Taverage_rating>> & BaseSystemFields<Texpand>
export type UsersSeenListingsResponse<Texpand = unknown> = Required<UsersSeenListingsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	blog: BlogRecord
	conversations: ConversationsRecord
	favorites: FavoritesRecord
	listings: ListingsRecord
	messages: MessagesRecord
	news: NewsRecord
	partners: PartnersRecord
	rating_sessions: RatingSessionsRecord
	ratings: RatingsRecord
	referral_tiers: ReferralTiersRecord
	reports: ReportsRecord
	search: SearchRecord
	stats: StatsRecord
	unread_messages: UnreadMessagesRecord
	user_preferences: UserPreferencesRecord
	users: UsersRecord
	users_average_rating: UsersAverageRatingRecord
	users_seen_listings: UsersSeenListingsRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	blog: BlogResponse
	conversations: ConversationsResponse
	favorites: FavoritesResponse
	listings: ListingsResponse
	messages: MessagesResponse
	news: NewsResponse
	partners: PartnersResponse
	rating_sessions: RatingSessionsResponse
	ratings: RatingsResponse
	referral_tiers: ReferralTiersResponse
	reports: ReportsResponse
	search: SearchResponse
	stats: StatsResponse
	unread_messages: UnreadMessagesResponse
	user_preferences: UserPreferencesResponse
	users: UsersResponse
	users_average_rating: UsersAverageRatingResponse
	users_seen_listings: UsersSeenListingsResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'blog'): RecordService<BlogResponse>
	collection(idOrName: 'conversations'): RecordService<ConversationsResponse>
	collection(idOrName: 'favorites'): RecordService<FavoritesResponse>
	collection(idOrName: 'listings'): RecordService<ListingsResponse>
	collection(idOrName: 'messages'): RecordService<MessagesResponse>
	collection(idOrName: 'news'): RecordService<NewsResponse>
	collection(idOrName: 'partners'): RecordService<PartnersResponse>
	collection(idOrName: 'rating_sessions'): RecordService<RatingSessionsResponse>
	collection(idOrName: 'ratings'): RecordService<RatingsResponse>
	collection(idOrName: 'referral_tiers'): RecordService<ReferralTiersResponse>
	collection(idOrName: 'reports'): RecordService<ReportsResponse>
	collection(idOrName: 'search'): RecordService<SearchResponse>
	collection(idOrName: 'stats'): RecordService<StatsResponse>
	collection(idOrName: 'unread_messages'): RecordService<UnreadMessagesResponse>
	collection(idOrName: 'user_preferences'): RecordService<UserPreferencesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'users_average_rating'): RecordService<UsersAverageRatingResponse>
	collection(idOrName: 'users_seen_listings'): RecordService<UsersSeenListingsResponse>
}
