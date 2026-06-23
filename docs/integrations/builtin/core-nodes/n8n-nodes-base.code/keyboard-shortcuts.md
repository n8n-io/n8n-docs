---
contentType: reference
title: Code editor keyboard shortcuts
description: >-
  A list of the keyboard shortcuts, for multiple platforms, which are supported
  by the Code node editor.
priority: high
nodeTitle: Code editor keyboard shortcuts
originalFilePath: integrations/builtin/core-nodes/n8n-nodes-base.code/keyboard-shortcuts.md
originalUrl: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code/keyboard-shortcuts
url: >-
  https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.code/keyboard-shortcuts
layout:
  description:
    visible: false
---

# Keyboard shortcuts when using the Code editor <a href="#keyboard-shortcuts-when-using-the-code-editor" id="keyboard-shortcuts-when-using-the-code-editor"></a>

The Code node editing environment supports a range of keyboard shortcuts to speed up and enhance your experience. Select the appropriate tab to see the relevant shortcuts for your operating system.

## Cursor Movement <a href="#cursor-movement" id="cursor-movement"></a>

{% tabs %}
{% tab title="Windows" %}
| Action                    | Shortcut                         |
|---------------------------|----------------------------------|
| Move cursor left          | ++left++                         |
| Move cursor right         | ++right++                        |
| Move cursor up            | ++up++                           |
| Move cursor down          | ++down++                         |
| Move cursor by word left  | ++control+left++                 |
| Move cursor by word right | ++control+right++                |
| Move to line start        | ++home++ **or** ++control+left++ |
| Move to line end          | ++end++ or ++control+right++     |
| Move to document start    | ++control+home++                 |
| Move to document end      | ++control+end++                  |
| Move page up              | ++page-up++                      |
| Move page down            | ++page-down++                    |
{% endtab %}

{% tab title="macOS" %}
| Action                    | Shortcut                               |
|---------------------------|----------------------------------------|
| Move cursor left          | ++left++ **or** ++control+b++          |
| Move cursor right         | ++right++ **or** ++control+f++         |
| Move cursor up            | ++up++ **or** ++control+p++            |
| Move cursor down          | ++down++ **or** ++control+n++          |
| Move cursor by word left  | ++option+left++                        |
| Move cursor by word right | ++option+right++                       |
| Move to line start        | ++command+left++ **or** ++control+a++  |
| Move to line end          | ++command+right++ **or** ++control+e++ |
| Move to document start    | ++command+up++                         |
| Move to document end      | ++command+down++                       |
| Move page up              | ++page-up++ **or** ++option+v++        |
| Move page down            | ++page-down++ **or** ++control+v++     |
{% endtab %}

{% tab title="Linux" %}
| Action                    | Shortcut                         |
|---------------------------|----------------------------------|
| Move cursor left          | ++left++                         |
| Move cursor right         | ++right++                        |
| Move cursor up            | ++up++                           |
| Move cursor down          | ++down++                         |
| Move cursor by word left  | ++control+left++                 |
| Move cursor by word right | ++control+right++                |
| Move to line start        | ++home++ **or** ++control+left++ |
| Move to line end          | ++end++ or ++control+right++     |
| Move to document start    | ++control+home++                 |
| Move to document end      | ++control+end++                  |
| Move page up              | ++page-up++                      |
| Move page down            | ++page-down++                    |
{% endtab %}
{% endtabs %}

## Selection <a href="#selection" id="selection"></a>

{% tabs %}
{% tab title="Windows" %}
| Action                          | Shortcut                    |
|---------------------------------|-----------------------------|
| Selection with any movement key | ++shift++ + [Movement Key]  |
| Select all                      | ++control+a++               |
| Select line                     | ++control+l++               |
| Select next occurrence          | ++control+d++               |
| Select all occurrences          | ++shift+control+l++         |
| Go to matching bracket          | ++shift+control+backslash++ |
{% endtab %}

{% tab title="macOS" %}
| Action                          | Shortcut                    |
|---------------------------------|-----------------------------|
| Selection with any movement key | ++shift++ + [Movement Key]  |
| Select all                      | ++command+a++               |
| Select line                     | ++command+l++               |
| Select next occurrence          | ++command+d++               |
| Go to matching bracket          | ++shift+command+backslash++ |
{% endtab %}

{% tab title="Linux" %}
| Action                          | Shortcut                    |
|---------------------------------|-----------------------------|
| Selection with any movement key | ++shift++ + [Movement Key]  |
| Select all                      | ++control+a++               |
| Select line                     | ++control+l++               |
| Select next occurrence          | ++control+d++               |
| Select all occurrences          | ++shift+control+l++         |
| Go to matching bracket          | ++shift+control+backslash++ |
{% endtab %}
{% endtabs %}

## Basic Operations <a href="#basic-operations" id="basic-operations"></a>

{% tabs %}
{% tab title="Windows" %}
| Action                    | Shortcut                                 |
|---------------------------|------------------------------------------|
| New line with indentation | ++enter++                                |
| Undo                      | ++control+z++                            |
| Redo                      | ++control+y++ **or** ++control+shift+z++ |
| Undo selection            | ++control+u++                            |
| Copy                      | ++control+c++                            |
| Cut                       | ++control+x++                            |
| Paste                     | ++control+v++                           |
{% endtab %}

{% tab title="macOS" %}
| Action                    | Shortcut                                 |
|---------------------------|------------------------------------------|
| New line with indentation | ++enter++                                |
| Undo                      | ++command+z++                            |
| Redo                      | ++command+y++ **or** ++command+shift+z++ |
| Undo selection            | ++command+u++                            |
| Copy                      | ++command+c++                            |
| Cut                       | ++command+x++                            |
| Paste                     | ++command+v++                            |
{% endtab %}

{% tab title="Linux" %}
| Action                    | Shortcut                                 |
|---------------------------|------------------------------------------|
| New line with indentation | ++enter++                                |
| Undo                      | ++control+z++                            |
| Redo                      | ++control+y++ **or** ++control+shift+z++ |
| Undo selection            | ++control+u++                            |
| Copy                      | ++control+c++                            |
| Cut                       | ++control+x++                            |
| Paste                     | ++control+v++                            |
{% endtab %}
{% endtabs %}

## Delete Operations <a href="#delete-operations" id="delete-operations"></a>

{% tabs %}
{% tab title="Windows" %}
| Action                 | Shortcut              |
|------------------------|-----------------------|
| Delete character left  | ++backspace++         |
| Delete character right | ++delete++            |
| Delete word left       | ++control+backspace++ |
| Delete word right      | ++control+delete++    |
| Delete line            | ++shift+control+k++   |
{% endtab %}

{% tab title="macOS" %}
| Action                 | Shortcut                                                |
|------------------------|---------------------------------------------------------|
| Delete character left  | ++backspace++                                           |
| Delete character right | ++delete++                                              |
| Delete word left       | ++option+backspace++ **or** ++control+command+h++       |
| Delete word right      | ++option+delete++  **or** ++function+option+backspace++ |
| Delete line            | ++shift+command+k++                                     |
| Delete to line start   | ++command+backspace++                                   |
| Delete to line end     | ++command+delete++ **or** ++control+k++                 |
{% endtab %}

{% tab title="Linux" %}
| Action                 | Shortcut              |
|------------------------|-----------------------|
| Delete character left  | ++backspace++         |
| Delete character right | ++delete++            |
| Delete word left       | ++control+backspace++ |
| Delete word right      | ++control+delete++    |
| Delete line            | ++shift+control+k++   |
{% endtab %}
{% endtabs %}

## Line Operations <a href="#line-operations" id="line-operations"></a>

{% tabs %}
{% tab title="Windows" %}
| Action               | Shortcut                             |
|----------------------|--------------------------------------|
| Move line up         | ++alt+up++                           |
| Move line down       | ++alt+down++                         |
| Copy line up         | ++shift+alt+up++                     |
| Copy line down       | ++shift+alt+down++                   |
| Toggle line comment  | ++control+slash++                    |
| Add line comment     | ++control+k++ **then** ++control+c++ |
| Remove line comment  | ++control+k++ **then** ++control+u++ |
| Toggle block comment | ++shift+alt+a++                      |
{% endtab %}

{% tab title="macOS" %}
| Action               | Shortcut                             |
|----------------------|--------------------------------------|
| Move line up         | ++option+up++                        |
| Move line down       | ++option+down++                      |
| Copy line up         | ++shift+option+up++                  |
| Copy line down       | ++shift+option+down++                |
| Toggle line comment  | ++command+slash++                    |
| Add line comment     | ++command+k++ **then** ++command+c++ |
| Remove line comment  | ++command+k++ **then** ++command+u++ |
| Toggle block comment | ++shift+option+a++                   |
| Split line           | ++control+o++                        |
| Transpose characters | ++control+t++                        |
{% endtab %}

{% tab title="Linux" %}
| Action               | Shortcut                             |
|----------------------|--------------------------------------|
| Move line up         | ++alt+up++                           |
| Move line down       | ++alt+down++                         |
| Copy line up         | ++shift+alt+up++                     |
| Copy line down       | ++shift+alt+down++                   |
| Toggle line comment  | ++control+slash++                    |
| Add line comment     | ++control+k++ **then** ++control+c++ |
| Remove line comment  | ++control+k++ **then** ++control+c++ |
| Toggle block comment | ++shift+alt+a++                      |
{% endtab %}
{% endtabs %}

## Autocomplete <a href="#autocomplete" id="autocomplete"></a>

{% tabs %}
{% tab title="Windows" %}
| Action                      | Shortcut                 |
|-----------------------------|--------------------------|
| Start completion            | ++control+space++        |
| Accept completion           | ++enter++ **or** ++tab++ |
| Close completion            | ++escape++               |
| Navigate completion options | ++up++ **or** ++down++   |
{% endtab %}

{% tab title="macOS" %}
| Action                      | Shortcut                 |
|-----------------------------|--------------------------|
| Start completion            | ++control+space++        |
| Accept completion           | ++enter++ **or** ++tab++ |
| Close completion            | ++escape++               |
| Navigate completion options | ++up++ **or** ++down++   |
{% endtab %}

{% tab title="Linux" %}
| Action                      | Shortcut                 |
|-----------------------------|--------------------------|
| Start completion            | ++control+space++        |
| Accept completion           | ++enter++ **or** ++tab++ |
| Close completion            | ++escape++               |
| Navigate completion options | ++up++ **or** ++down++   |
{% endtab %}
{% endtabs %}

## Indentation <a href="#indentation" id="indentation"></a>

{% tabs %}
{% tab title="Windows" %}
| Action      | Shortcut                                      |
|-------------|-----------------------------------------------|
| Indent more | ++tab++ **or** ++control+bracket-right++      |
| Indent less | ++shift+tab++ **or** ++control+bracket-left++ |
{% endtab %}

{% tab title="macOS" %}
| Action      | Shortcut                  |
|-------------|---------------------------|
| Indent more | ++command+bracket-right++ |
| Indent less | ++command+bracket-left++  |
{% endtab %}

{% tab title="Linux" %}
| Action      | Shortcut                                      |
|-------------|-----------------------------------------------|
| Indent more | ++tab++ **or** ++control+bracket-right++      |
| Indent less | ++shift+tab++ **or** ++control+bracket-left++ |
{% endtab %}
{% endtabs %}

## Code Folding <a href="#code-folding" id="code-folding"></a>

{% tabs %}
{% tab title="Windows" %}
| Action      | Shortcut                             |
|-------------|--------------------------------------|
| Fold code   | ++control+shift+bracket-left++       |
| Unfold code | ++control+shift+bracket-right++      |
| Fold all    | ++control+k++ **then** ++control+0++ |
| Unfold all  | ++control+k++ **then** ++control+j++ |
{% endtab %}

{% tab title="macOS" %}
| Action      | Shortcut                             |
|-------------|--------------------------------------|
| Fold code   | ++command+option+bracket-left++      |
| Unfold code | ++command+option+bracket-right++     |
| Fold all    | ++command+k++ **then** ++command+0++ |
| Unfold all  | ++command+k++ **then** ++command+j++ |
{% endtab %}

{% tab title="Linux" %}
| Action      | Shortcut                             |
|-------------|--------------------------------------|
| Fold code   | ++control+shift+bracket-left++       |
| Unfold code | ++control+shift+bracket-right++      |
| Fold all    | ++control+k++ **then** ++control+0++ |
| Unfold all  | ++control+k++ **then** ++control+j++ |
{% endtab %}
{% endtabs %}

## Multi-cursor <a href="#multi-cursor" id="multi-cursor"></a>

{% tabs %}
{% tab title="Windows" %}
| Action                       | Shortcut             |
|------------------------------|----------------------|
| Add cursor at click position | ++alt+left-button++  |
| Add cursor above             | ++control+alt+up++   |
| Add cursor below             | ++control+alt+down++ |
| Add cursors to line ends     | ++shift+alt+i++      |
| Clear multiple cursors       | ++escape++           |
{% endtab %}

{% tab title="macOS" %}
| Action                       | Shortcut                |
|------------------------------|-------------------------|
| Add cursor at click position | ++option+left-button++  |
| Add cursor above             | ++control+option+up++   |
| Add cursor below             | ++control+option+down++ |
| Add cursors to line ends     | ++shift+option+i++      |
| Clear multiple cursors       | ++escape++              |
{% endtab %}

{% tab title="Linux" %}
| Action                       | Shortcut            |
|------------------------------|---------------------|
| Add cursor at click position | ++alt+left-button++ |
| Add cursor above             | ++shift+alt+up++    |
| Add cursor below             | ++shift+alt+down++  |
| Add cursors to line ends     | ++shift+alt+i++     |
| Clear multiple cursors       | ++escape++          |
{% endtab %}
{% endtabs %}

## Formatting <a href="#formatting" id="formatting"></a>

{% tabs %}
{% tab title="Windows" %}
| Action          | Shortcut                                     |
|-----------------|----------------------------------------------|
| Format document | ++shift+alt+f++ |
{% endtab %}

{% tab title="macOS" %}
| Action          | Shortcut                                     |
|-----------------|----------------------------------------------|
| Format document | ++shift+command+f++ |
{% endtab %}

{% tab title="Linux" %}
| Action          | Shortcut                                      |
|-----------------|-----------------------------------------------|
| Format document | ++control+shift+i++ |
{% endtab %}
{% endtabs %}

## Search & Navigation <a href="#search-and-navigation" id="search-and-navigation"></a>

{% tabs %}
{% tab title="Windows" %}
| Action          | Shortcut              |
|-----------------|-----------------------|
| Open Search     | ++control+f++         |
| Select All      | ++alt+enter++         |
| Replace All     | ++control+alt+enter++ |
| Go To Line      | ++control+g++         |
| Next Diagnostic | ++f8++                |
| Previous Diag.  | ++shift+f8++          |
| Open Lint Panel | ++control+shift+m++   |
{% endtab %}

{% tab title="macOS" %}
| Action          | Shortcut              |
|-----------------|-----------------------|
| Open Search     | ++command+f++         |
| Select All      | ++command+enter++     |
| Replace All     | ++command+option+enter++ |
| Go To Line      | ++command+g++         |
| Next Diagnostic | ++f8++                |
| Previous Diag.  | ++shift+f8++          |
| Open Lint Panel | ++command+shift+m++   |
{% endtab %}

{% tab title="Linux" %}
| Action          | Shortcut              |
|-----------------|-----------------------|
| Open Search     | ++control+f++         |
| Select All      | ++alt+enter++         |
| Replace All     | ++control+alt+enter++ |
| Go To Line      | ++control+g++         |
| Next Diagnostic | ++f8++                |
| Previous Diag.  | ++shift+f8++          |
| Open Lint Panel | ++control+shift+m++   |
{% endtab %}
{% endtabs %}
