---
url: "https://pocketbase.io/docs/api-rules-and-filters/"
title: "Introduction - API rules and filters - Docs - PocketBase"
---
API rules and filters

- API rules
- Filters syntax
- Special identifiers and modifiers
  - @ macros
  - :isset modifier
  - :length modifier
  - :each modifier
  - :lower modifier
- Examples

### API rules

**API Rules** are your collection access controls and data filters.

    Each collection has**5 rules**, corre	sponding to the specific API action:

- `listRule`
- `viewRule`
- `createRule`
- `updateRule`
- `deleteRule`

Auth collections has an additional `options.manageRule` used to allow one user (it could be even
from a different collection) to be able to fully manage the data of another user (ex. changing their email,
password, etc.).

Each rule could be set to:

- **"locked"** \- aka. `null`, which means that the action could be performed
  only by an authorized superuser

( **this is the default**)

- **Empty string** \- anyone will be able to perform the action (superusers, authorized users
  and guests)
- **Non-empty string** \- only users (authorized or not) that satisfy the rule filter expression
  will be able to perform this action

**PocketBase API Rules act also as records filter!**

Or in other words, you could for example allow listing only the "active" records of your collection,
by using a simple filter expression such as:
`status = "active"`
(where "status" is a field defined in your Collection).

Because of the above, the API will return 200 empty items response in case a request doesn't
satisfy a `listRule`, 400 for unsatisfied `createRule` and 404 for
unsatisfied `viewRule`, `updateRule` and `deleteRule`.

All rules will return 403 in case they were "locked" (aka. superuser only) and the request client is
not a superuser.

The API Rules are ignored when the action is performed by an authorized superuser ( **superusers can access everything**)!

### Filters syntax

You can find information about the available fields in your collection API rules tab:

![Collection API Rules filters screenshot](https://pocketbase.io/images/screenshots/collection-rules.png)

There is autocomplete to help you guide you while typing the rule filter expression, but in general you
have access to **3 groups of fields**:

- **Your Collection schema fields**

This includes all nested relation fields too, ex.
`someRelField.status != "pending"`

- `@request.*`

Used to access the current request data, such as query parameters, body/form fields, authorized user state,
etc.

- `@request.context` \- the context where the rule is used (ex.
  `@request.context != "oauth2"`)

  The currently supported context values are
  `default`,
  `oauth2`,
  `otp`,
  `password`,
  `realtime`,
  `protectedFile`.
- `@request.method` \- the HTTP request method (ex.
  `@request.method = "GET"`)
- `@request.headers.*` \- the request headers as string values (ex.
  `@request.headers.x_token = "test"`)

  Note: All header keys are normalized to lowercase and "-" is replaced with "\_" (for
  example "X-Token" is "x\_token").
- `@request.query.*` \- the request query parameters as string values (ex.
  `@request.query.page = "1"`)
- `@request.auth.*` \- the current authenticated model (ex.
  `@request.auth.id != ""`)
- `@request.body.*` \- the submitted body parameters (ex.
  `@request.body.title != ""`)

  Note: Uploaded files are not part of the `@request.body`
  because they are evaluated separately ( _this behavior may change in the future_).
- `@collection.*`
  This filter could be used to target other collections that are not directly related to the current
  one (aka. there is no relation field pointing to it) but both shares a common field value, like
  for example a category id:

`@collection.news.categoryId ?= categoryId && @collection.news.author ?= @request.auth.id`

In case you want to join the same collection multiple times but based on different criteria, you
can define an alias by appending `:alias` suffix to the collection name.

`// see https://github.com/pocketbase/pocketbase/discussions/3805#discussioncomment-7634791 @request.auth.id != "" && @collection.courseRegistrations.user ?= id && @collection.courseRegistrations:auth.user ?= @request.auth.id && @collection.courseRegistrations.courseGroup ?= @collection.courseRegistrations:auth.courseGroup`

The syntax basically follows the format
`OPERAND OPERATOR OPERAND`, where:

- `OPERAND` \- could be any field literal, string (single or double quoted),
  number, null, true, false
- `OPERATOR` \- is one of:
  - `=` Equal
  - `!=` NOT equal
  - `>` Greater than
  - `>=` Greater than or equal
  - `<` Less than
  - `<=` Less than or equal
  - `~` Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for wildcard
    match)
  - `!~` NOT Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
    wildcard match)
  - `?=` _Any/At least one of_ Equal
  - `?!=` _Any/At least one of_ NOT equal
  - `?>` _Any/At least one of_ Greater than
  - `?>=` _Any/At least one of_ Greater than or equal
  - `?<` _Any/At least one of_ Less than
  - `?<=` _Any/At least one of_ Less than or equal
  - `?~` _Any/At least one of_ Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for wildcard
    match)
  - `?!~` _Any/At least one of_ NOT Like/Contains (if not specified auto wraps the right string OPERAND in a "%" for
    wildcard match)

To group and combine several expressions you can use parenthesis
`(...)`, `&&` (AND) and `||` (OR) tokens.

Single line comments are also supported: `// Example comment`.

### Special identifiers and modifiers

##### @ macros

The following datetime macros are available and can be used as part of the filter expression:

all macros are UTC based

| Macro       | Description                                       |
| ----------- | ------------------------------------------------- |
| @now        | the current datetime as string                    |
| @second     | @now second number (0-59)                         |
| @minute     | @now minute number (0-59)                         |
| @hour       | @now hour number (0-23)                           |
| @weekday    | @now weekday number (0-6)                         |
| @day        | @now day number                                   |
| @month      | @now month number                                 |
| @year       | @now year number                                  |
| @yesterday  | the yesterday datetime relative to @now as string |
| @tomorrow   | the tomorrow datetime relative to @now as string  |
| @todayStart | beginning of the current day as datetime string   |
| @todayEnd   | end of the current day as datetime string         |
| @monthStart | beginning of the current month as datetime string |
| @monthEnd   | end of the current month as datetime string       |
| @yearStart  | beginning of the current year as datetime string  |
| @yearEnd    | end of the current year as datetime string        |

For example:

`@request.body.publicDate >= @now`

##### :isset modifier

The `:isset` field modifier is available only for the `@request.*` fields and can be
used to check whether the client submitted a specific data with the request. Here is for example a rule that
disallows changing a "role" field:

`@request.body.role:isset = false`

Note that `@request.body.*:isset` at the moment doesn't support checking for
new uploaded files because they are evaluated separately and cannot be serialized ( _this behavior may change in the future_).

##### :length modifier

The `:length` field modifier could be used to check the number of items in an array field
(multiple `file`, `select`, `relation`).

Could be used with both the collection schema fields and the `@request.body.*` fields. For example:

`// check example submitted data: {"someSelectField": ["val1", "val2"]} @request.body.someSelectField:length > 1 // check existing record field length someRelationField:length = 2`

Note that `@request.body.*:length` at the moment doesn't support checking
for new uploaded files because they are evaluated separately and cannot be serialized ( _this behavior may change in the future_).

##### :each modifier		

The `:each` field modifier works only with multiple `select`, `file` and
`relation`
type fields. It could be used to apply a condition on each item from the field array. For example:

`// check if all submitted select options contain the "create" text @request.body.someSelectField:each ~ "create" // check if all existing someSelectField has "pb_" prefix someSelectField:each ~ "pb_%"`

Note that `@request.body.*:each` at the moment doesn't support checking for
new uploaded files because they are evaluated separately and cannot be serialized ( _this behavior may change in the future_).

##### :lower modifier

The `:lower` field modifier could be used to perform lower-case string comparisons. For example:

`// check if the submitted lower-cased body "title" field is equal to "test" ("Test", "tEsT", etc.) @request.body.title:lower = "test" // match existing records with lower-cased "title" equal to "test" ("Test", "tEsT", etc.) title:lower ~ "test"`

Under the hood it uses the
SQLite `LOWER` scalar function
and by default works only for ASCII characters, unless the ICU extension is loaded.

### Examples

- Allow only registered users:

`@request.auth.id != ""`

- Allow only registered users and return records that are either "active" or "pending":

`@request.auth.id != "" && (status = "active" || status = "pending")`

- Allow only registered users who are listed in an _allowed\_users_ multi-relation field value:

`@request.auth.id != "" && allowed_users.id ?= @request.auth.id`

- Allow access by anyone and return only the records where the _title_ field value starts with
  "Lorem" (ex. "Lorem ipsum"):

`title ~ "Lorem%"`
