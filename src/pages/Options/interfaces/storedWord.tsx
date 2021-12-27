/**
 * StoredWord is the primary data index of the extension
 * 
 * - single source of truth for all the words and extension logic
 * - id acts as primary key, implemented on application layer
 * - title is the actual word string that is being stored
 * - status allows quick toggle of the word's status
 * - count : an "approximate" of number of times a word was encountered by user.
 * - count increments w.r.t traces but persist when traces are cleared.
 */
export interface StoredWord {
    id: number;
    title: string;
    status: boolean;
    count: number,
}