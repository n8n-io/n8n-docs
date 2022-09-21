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

import { split } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Table for indexing
 */
export type Table = number[][]

/**
 * Position
 */
export type Position = number

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * String section
 */
type Section = [number, number, number, number]

/**
 * String with table
 */
interface StringLike {
  toString(): string                   /* String representation */
  table: Table                         /* Table for indexing */
}

/**
 * Visitor function
 */
type VisitorFn = (...args: Section) => void

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Extract all non-HTML parts of a string
 *
 * This function preprocesses the given string by isolating all non-HTML parts
 * of a string, in order to ensure that HTML tags are removed before indexing.
 * A visitor function is used to reduce pressure on the garbage collector as
 * only the latest section is needed during indexing.
 *
 * @param value - String value
 * @param fn - Visitor function
 */
function extract(value: string, fn: VisitorFn): void {

  let block = 0                        /* Current block */
  let start = 0                        /* Current start offset */
  let end = 0                          /* Current end offset */

  /* Split string into sections */
  for (let stack = 0; end < value.length; end++) {

    /* Tag start after non-empty section */
    if (value.charAt(end) === "<" && end > start) {
      fn(block, 1, start, start = end)

    /* Tag end */
    } else if (value.charAt(end) === ">") {
      if (value.charAt(start + 1) === "/") {
        if (--stack === 0)
          fn(block++, 2, start, end + 1)

      /* Tag is not self-closing */
      } else if (value.charAt(end - 1) !== "/") {
        if (stack++ === 0)
          fn(block, 0, start, end + 1)
      }

      /* New section */
      start = end + 1
    }
  }

  /* Add trailing section */
  if (end > start)
    fn(block, 1, start, end)
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Split a string into tokens
 *
 * This tokenizer supersedes the default tokenizer that is provided by Lunr.js,
 * as it is aware of HTML tags and allows for multi-character splitting.
 *
 * @param input - String value or token
 *
 * @returns Tokens
 */
export function tokenizer(
  input?: StringLike | Array<StringLike>
): lunr.Token[] {
  const tokens: lunr.Token[] = []

  /**
   * Initialize segmenter, if loaded
   *
   * Note that doing this here is not ideal, but it's okay as we just test it
   * before bringing the new search implementation in its final shape.
   */
  const segmenter = "TinySegmenter" in lunr
    ? new lunr.TinySegmenter()
    : undefined

  /* Tokenize an array of string values */
  if (Array.isArray(input)) {
    for (const value of input)
      tokens.push(...tokenizer(value))

  /* Tokenize a string value */
  } else if (input) {
    const value = input.toString()
    const table = input.table || []

    /* Split string into sections and tokenize content blocks */
    extract(value, (block, type, start, end) => {
      if (type & 1) {
        const section = value.slice(start, end)
        split(section, lunr.tokenizer.separator, ([index, until]) => {

          /**
           * Apply segmenter after tokenization. Note that the segmenter will
           * also split words at word boundaries, which is not what we want, so
           * we need to check if we can somehow mitigate this behavior.
           */
          if (typeof segmenter !== "undefined") {
            const subsection = section.slice(index, until)
            // eslint-disable-next-line
            if (/^[MHIK]$/.test(segmenter.ctype_(subsection))) {
              const segments = segmenter.segment(subsection)
              for (let i = 0, l = 0; i < segments.length; i++) {

                /* Add block to table */
                table[block] ||= []
                table[block].push(
                  start + index + l  << 12 |
                  segments[i].length <<  2 |
                  type
                )

                /* Add block as token */
                tokens.push(new lunr.Token(
                  segments[i].toLowerCase(), {
                    position: block << 20 | table[block].length - 1
                  }
                ))

                // Keep track of length
                l += segments[i].length
              }
              return
            }
          }

          /* Add block to table */
          table[block] ||= []
          table[block].push(
            start + index << 12 |
            until - index <<  2 |
            type
          )

          /* Add block as token */
          tokens.push(new lunr.Token(
            section.slice(index, until).toLowerCase(), {
              position: block << 20 | table[block].length - 1
            }
          ))
        })

      /* Add non-content block to table */
      } else {
        table[block] ||= []
        table[block].push(
          start       << 12 |
          end - start <<  2 |
          type
        )
      }
    })
  }

  /* Return tokens */
  return tokens
}

/**
 * Highlight all occurrences in a string
 *
 * @param value - String value
 * @param table - Table for indexing
 * @param positions - Occurrences
 *
 * @returns Highlighted string value
 */
export function highlighter(
  value: string, table: Table, positions: Position[]
): string {

  /* Map matches to blocks */
  const blocks = new Map<number, number[]>()
  for (const i of positions
    .sort((a, b) => a - b)
  ) {
    const block = i >>> 20
    const index = i  & 0xFFFFF

    /* Ensure presence of block group */
    let group = blocks.get(block)
    if (typeof group === "undefined")
      blocks.set(block, group = [])

    /* Add index to group */
    group.push(index)
  }

  let count = 0

  const slices: string[] = []
  for (const [block, indexes] of blocks) {
    const t = table[block]

    const start  = t[0]            >>> 12
    const end    = t[t.length - 1] >>> 12
    const length = t[t.length - 1] >>> 2 & 0x3FF

    /* Extract and highlight slice/block */
    let slice = value.slice(start, end + length)
    for (const i of indexes.sort((a, b) => b - a)) {

      /* Retrieve offset and length of match */
      const p = (t[i] >>> 12) - start
      const q = (t[i] >>>  2 & 0x3FF) + p

      /* Wrap occurrence */ // TODO: improve, make fewer concatenations
      slice = [
        slice.slice(0, p),
        "<mark>", slice.slice(p, q), "</mark>",
        slice.slice(q)
      ].join("")

    }
    slices.push(slice)
    if (++count > 1)
      break
  }

  /* Return highlighted string value */
  return slices.join("")
}
