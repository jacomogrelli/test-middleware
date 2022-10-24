export const enum MESSAGE_TYPES {
  OPEN = 'open',
  REQUEST = 'request',
  RESPONSE = 'response',
}

export const enum STATUS_CODES {
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  CONFLICT = 409,
  CLIENT_CLOSED_REQUEST = 499,
}
