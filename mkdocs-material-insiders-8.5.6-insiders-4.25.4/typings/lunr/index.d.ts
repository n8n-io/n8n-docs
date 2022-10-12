/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import lunr from "lunr"

/* ----------------------------------------------------------------------------
 * Global types
 * ------------------------------------------------------------------------- */

declare global {
  namespace lunr {

    /**
     * Index - expose inverted index
     */
    interface Index {
      invertedIndex: object;
    }

    /**
     * Query clause - add missing field definitions
     */
    namespace Query {
      interface Clause {
        presence: Query.presence
      }
    }

    /**
     * Query parser - add missing class definitions
     */
    class QueryParser {
      constructor(value: string, query: Query)
      public parse(): void
    }

    /**
     * Enable multi-language support
     *
     * @param lang - Languages
     *
     * @returns Plugin
     */
    function multiLanguage(...lang: string[]): Builder.Plugin

    /**
     * Stopword filter
     *
     * @template T - Token type
     *
     * @param token - Token or string
     *
     * @returns Token or nothing
     */
    function stopWordFilter<T>(token: T): T | undefined;

    /**
     * Segmenter for Japanese
     */
    class TinySegmenter {
      public ctype_(value: string): string
      public segment(value: string): string[]
    }
  }
}
