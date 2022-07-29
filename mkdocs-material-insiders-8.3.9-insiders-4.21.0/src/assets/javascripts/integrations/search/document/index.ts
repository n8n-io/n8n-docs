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

import { SearchIndexDocument } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search document
 */
export interface SearchDocument extends SearchIndexDocument {
  parent?: SearchIndexDocument         /* Parent article */
}

/* ------------------------------------------------------------------------- */

/**
 * Search document mapping
 */
export type SearchDocumentMap = Map<string, SearchDocument>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a search document mapping
 *
 * @param docs - Search index documents
 *
 * @returns Search document map
 */
export function setupSearchDocumentMap(
  docs: SearchDocument[]
): SearchDocumentMap {
  const documents = new Map<string, SearchDocument>()
  for (const doc of docs) {
    const [path] = doc.location.split("#")

    /* Add document article */
    const article = documents.get(path)
    if (typeof article === "undefined") {
      documents.set(path, doc)

    /* Add document section */
    } else {
      documents.set(doc.location, doc)
      doc.parent = article
    }
  }
  return documents
}
