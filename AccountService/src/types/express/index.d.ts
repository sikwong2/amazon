/**
 * UUID https://www.uuidtools.com/what-is-uuid
 * @pattern ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$
 * @example "123e4567-e89b-12d3-a456-426655440000"
 */
export type UUID = string;

/**
 * Email 
 * @pattern ^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$
 * @example "shopper@amazon.com"
 */
export type Email = string;