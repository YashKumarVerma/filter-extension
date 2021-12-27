/**
 * trace stores the instances when the event was fired
 * 
 * the reason that traces are kept separate from StoredWords are
 * - traces will grow very quickly as the user adds words and browses the web
 * - once traces become bulky, it would slow down normal text lookup and search
 * - there is no need of traces in normal extension working, so no need to keep in primary storage media
 * - traces are sent to telemetry endpoint and can be used to analyze the usage of extension
 * - traces can be cleared as needed by user.
 */
export interface Trace {
    id: number,
    word: string,
    url: string;
    extra: any
}
