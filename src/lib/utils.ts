// Utility to merge class names (for UI components)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
// ...existing code...

// ...existing code...

export const DEFAULT_PK_FACTORY = {
  // We prefer not to rely on ObjectId having a createPk method
  // createPk(): ObjectId {
  //   return new ObjectId();
  // }
};

/**
 * When the driver used emitWarning the code will be equal to this.
 * @public
 *
 * @example
 * ```ts
 * process.on('warning', (warning) => {
 *  if (warning.code === MONGODB_WARNING_CODE) console.error('Ah an important warning! :)')
 * })
 * ```
 */
// ...existing code...

/**
 * Takes a JS object and joins the values into a string separated by ', '
 */
// Removed incomplete or stray function for lint-clean state

/**
 * Determine if a server supports retryable writes.
 *
 * @internal
 */
// export function supportsRetryableWrites(server?: Server): boolean {
//   if (!server) {
//     return false;
//   }
//
//   if (server.loadBalanced) {
//     // Loadbalanced topologies will always support retry writes
//     return true;
//   }
//
//   if (server.description && server.description.logicalSessionTimeoutMinutes != null) {
//     // that supports sessions
//     if (server.description.type !== ServerType.Standalone) {
//       // and that is not a standalone
//       return true;
//     }
//   }
//
//   return false;
// }

/**
 * Fisher–Yates Shuffle
 *
 * Reference: https://bost.ocks.org/mike/shuffle/
 * @param sequence - items to be shuffled
 * @param limit - Defaults to `0`. If nonzero shuffle will slice the randomized array e.g, `.slice(0, limit)` otherwise will return the entire randomized array.
 */
export function shuffle<T>(sequence: Iterable<T>, limit = 0): Array<T> {
  const items = Array.from(sequence); // shallow copy in order to never shuffle the input

  if (limit > items.length) {
      // throw new MongoRuntimeError('Limit must be less than the number of items');
  }

  let remainingItemsToShuffle = items.length;
  const lowerBound = limit % items.length === 0 ? 1 : items.length - limit;
  while (remainingItemsToShuffle > lowerBound) {
    // Pick a remaining element
    const randomIndex = Math.floor(Math.random() * remainingItemsToShuffle);
    remainingItemsToShuffle -= 1;

    // And swap it with the current element
    const swapHold = items[remainingItemsToShuffle];
    items[remainingItemsToShuffle] = items[randomIndex];
    items[randomIndex] = swapHold;
  }

  return limit % items.length === 0 ? items : items.slice(lowerBound);
}

/**
 * TODO(NODE-4936): read concern eligibility for commands should be codified in command construction
 * @internal
 * @see https://github.com/mongodb/specifications/blob/master/source/read-write-concern/read-write-concern.md#read-concern
 */
export function commandSupportsReadConcern(): boolean {
  // Always returns false (stub)
  return false;
}

/**
 * Compare objectIds. `null` is always less
 * - `+1 = oid1 is greater than oid2`
 * - `-1 = oid1 is less than oid2`
 * - `+0 = oid1 is equal oid2`
 */
// Removed: references undefined ObjectId and ByteUtils

export function parseInteger(value: unknown): number | null {
  if (typeof value === 'number') return Math.trunc(value);
  const parsedValue = Number.parseInt(String(value), 10);

  return Number.isNaN(parsedValue) ? null : parsedValue;
}

export function parseUnsignedInteger(value: unknown): number | null {
  const parsedInt = parseInteger(value);

  return parsedInt != null && parsedInt >= 0 ? parsedInt : null;
}

/**
 * This function throws a MongoAPIError in the event that either of the following is true:
 * * If the provided address domain does not match the provided parent domain
 * * If the parent domain contains less than three `.` separated parts and the provided address does not contain at least one more domain level than its parent
 *
 * If a DNS server were to become compromised SRV records would still need to
 * advertise addresses that are under the same domain as the srvHost.
 *
 * @param address - The address to check against a domain
 * @param srvHost - The domain to check the provided address against
 * @returns void
 */
export function checkParentDomainMatch(address: string, srvHost: string): void {
  // Remove trailing dot if exists on either the resolved address or the srv hostname
  const normalizedAddress = address.endsWith('.') ? address.slice(0, address.length - 1) : address;
  const normalizedSrvHost = srvHost.endsWith('.') ? srvHost.slice(0, srvHost.length - 1) : srvHost;

  const allCharacterBeforeFirstDot = /^.*?\./;
  const srvIsLessThanThreeParts = normalizedSrvHost.split('.').length < 3;
  // Remove all characters before first dot
  // Add leading dot back to string so
  //   an srvHostDomain = '.trusted.site'
  //   will not satisfy an addressDomain that endsWith '.fake-trusted.site'
  const addressDomain = `.${normalizedAddress.replace(allCharacterBeforeFirstDot, '')}`;
  let srvHostDomain = srvIsLessThanThreeParts
    ? normalizedSrvHost
    : `.${normalizedSrvHost.replace(allCharacterBeforeFirstDot, '')}`;

  if (!srvHostDomain.startsWith('.')) {
    srvHostDomain = '.' + srvHostDomain;
  }
  if (
    srvIsLessThanThreeParts &&
    normalizedAddress.split('.').length <= normalizedSrvHost.split('.').length
  ) {
    // Invalid: MongoAPIError is undefined
    // Error: Server record does not have at least one more domain level than parent URI
  }
  if (!addressDomain.endsWith(srvHostDomain)) {
    // Invalid: MongoAPIError is undefined
    // Error: Server record does not share hostname with parent URI
  }
}

// Removed: unused interface RequestOptions

/**
 * Perform a get request that returns status and body.
 * @internal
 */
// Removed: references undefined isObject and isSuperset
// Removed: references undefined MongoNetworkTimeoutError

// Removed: incomplete function
// ...existing code...

/** @internal */
export const DOCUMENT_DB_CHECK = /(\.docdb\.amazonaws\.com$)|(\.docdb-elastic\.amazonaws\.com$)/;
/** @internal */
export const COSMOS_DB_CHECK = /\.cosmos\.azure\.com$/;

/** @internal */
export const DOCUMENT_DB_MSG =
  'You appear to be connected to a DocumentDB cluster. For more information regarding feature compatibility and support please visit https://www.mongodb.com/supportability/documentdb';
/** @internal */
export const COSMOS_DB_MSG =
  'You appear to be connected to a CosmosDB cluster. For more information regarding feature compatibility and support please visit https://www.mongodb.com/supportability/cosmosdb';

/** @internal */
export function isHostMatch(match: RegExp, host?: string): boolean {
  return host && match.test(host.toLowerCase()) ? true : false;
}

// Removed: promiseWithResolvers (unused, broken signature)

// Removed: squashError (unused)

// Removed: references undefined promisify, crypto


// Removed: references undefined Collection, Document, pkFactory


export function csotMin(duration1: number, duration2: number): number {
  if (duration1 === 0) return duration2;
  if (duration2 === 0) return duration1;
  return Math.min(duration1, duration2);
}

export function noop() {
  return;
}

/**
 * Recurse through the (identically-shaped) `decrypted` and `original`
 * objects and attach a `decryptedKeys` property on each sub-object that
 * contained encrypted fields. Because we only call this on BSON responses,
 * we do not need to worry about circular references.
 *
 * @internal
 */
// Removed: references undefined Document, kDecoratedKeys, MongoRuntimeError

/** @internal */
export const kDispose: symbol = typeof Symbol.dispose === 'symbol'
  ? Symbol.dispose
  : Symbol('dispose');

/** @internal */
export interface Disposable {
  [kDispose](): void;
}

/**
 * A utility that helps with writing listener code idiomatically
 *
 * @example
 * ```js
 * using listener = addAbortListener(signal, function () {
 *   console.log('aborted', this.reason);
 * });
 * ```
 *
 * @param signal - if exists adds an abort listener
 * @param listener - the listener to be added to signal
 * @returns A disposable that will remove the abort listener
 */
export function addAbortListener(
  signal: AbortSignal | undefined | null,
  listener: () => void
): Disposable | undefined {
  if (signal == null) return;
  signal.addEventListener('abort', listener, { once: true });
  return { [kDispose]: () => signal.removeEventListener('abort', listener) };
}

// Removed: abortable (unused, broken signature)
