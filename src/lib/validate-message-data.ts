import { isString } from 'type-guards';

import { isJsonString } from './is-json-string';

export function validateMessageData(
  messageData: unknown,
): messageData is string {
  return isString(messageData) && isJsonString(messageData);
}
