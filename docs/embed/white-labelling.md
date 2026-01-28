---
contentType: howto
---

# White labelling

--8<-- "_snippets/embed-license.md"

White labelling n8n means customizing the frontend styling and assets to match your brand identity. The process involves changing two packages in n8n's source code [github.com/n8n-io/n8n](https://github.com/n8n-io/n8n):

* [packages/frontend/@n8n/design-system](https://github.com/n8n-io/n8n/tree/master/packages/frontend/@n8n/design-system): n8n's [storybook](https://storybook.js.org/) design system with CSS styles and Vue.js components
* [packages/frontend/editor-ui](https://github.com/n8n-io/n8n/tree/master/packages/frontend/editor-ui): n8n's [Vue.js](https://vuejs.org/) frontend build with [Vite.js](https://vitejs.dev)


## Prerequisites

You need the following installed on your development machine:

--8<-- "_snippets/integrations/creating-nodes/prerequisites.md"

Create a fork of [n8n's repository](https://github.com/n8n-io/n8n) and clone your new repository.

```shell
git clone https://github.com/<your-organization>/n8n.git n8n
cd n8n
```

Install all dependencies, build and start n8n.

```shell
npm install
npm run build
npm run start
```

Whenever you make changes you need to rebuild and restart n8n. While developing you can use `npm run dev` to automatically rebuild and restart n8n anytime you make code changes. 

## Theme colors

To customize theme colors open [packages/frontend/@n8n/design-system](https://github.com/n8n-io/n8n/tree/master/packages/frontend/@n8n/design-system) and start with:

- [packages/frontend/@n8n/design-system/src/css/_tokens.scss](https://github.com/n8n-io/n8n/blob/master/packages/frontend/@n8n/design-system/src/css/_tokens.scss)
- [packages/frontend/@n8n/design-system/src/css/_tokens.dark.scss](https://github.com/n8n-io/n8n/blob/master/packages/frontend/@n8n/design-system/src/css/_tokens.dark.scss)

### Understanding n8n's token system

n8n uses a two-tier token system following a hybrid CSS variable naming convention:

**Global tokens** define your brand's core design decisions (colors, spacing, typography). These are shared system-wide:

```scss
--color--primary: #ff6d5a;
--color--secondary: #7e7e7e;
--color--success: #16a34a;
--color--danger: #dc2626;
--spacing--md: 1rem;
--radius--md: 0.5rem;
```

**Component tokens** reference global tokens (or override them when necessary):

```scss
--button--background--primary: var(--color--primary);
--button--text-color--on-primary: #ffffff;
--card--background--surface: var(--color--surface);
--input--border-color--focus: var(--color--primary);
```

/// note | Naming convention
Variable names use double dashes (`--`) between semantic groups and single dashes (`-`) within groups. For example: `--button--background--primary--hover` breaks down as:
- `button` = component
- `background` = property
- `primary` = value
- `hover` = state
///

### Customizing your brand colors

In `_tokens.scss`, you'll find global color tokens. To change the primary color to <span style="color:#0099ff">#0099ff</span>:

```scss
:root {
	--color--primary: #0099ff;
	--color--primary-hover: #0088ee; /* Darker shade for hover states */
}
```

Component tokens that reference `--color--primary` will automatically inherit your changes:

```scss
/* These automatically use your new primary color */
--button--background--primary: var(--color--primary);
--link--text-color: var(--color--primary);
--input--outline-color--focus-visible: var(--color--primary);
```

![Example Theme Color Customization](/_images/embed/white-label/color-transition.gif)

### Theme modes (light and dark)

To customize colors for dark mode, override global tokens in `_tokens.dark.scss` using the `[data-theme="dark"]` selector:

```scss
:root {
	/* Light mode */
	--color--primary: #0099ff;
	--color--surface: #ffffff;
	--text-color--primary: #1a1a1a;
}

:root[data-theme="dark"] {
	/* Dark mode */
	--color--primary: #66b3ff;
	--color--surface: #0f1115;
	--text-color--primary: #e5e5e5;
}
```

Theme switches primarily rewrite global tokens. Component overrides exist only where necessary for specific visual adjustments.


## Theme logos

To change the editor’s logo assets look into [packages/frontend/editor-ui/public](https://github.com/n8n-io/n8n/tree/master/packages/frontend/editor-ui/public) and replace:

- favicon-16x16.png
- favicon-32x32.png
- favicon.ico
- n8n-logo.svg
- n8n-logo-collapsed.svg
- n8n-logo-expanded.svg

Replace these logo assets. n8n uses them in Vue.js components, including:

* [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/components/MainSidebar.vue): top/left logo in the main sidebar.
* [Logo.vue](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/components/Logo/Logo.vue): reused in other components.

In the following example replace `n8n-logo-collapsed.svg` and `n8n-logo-expanded.svg` to update the main sidebar's logo assets.

![Example Logo Main Sidebar](/_images/embed/white-label/logo-main-sidebar.png)

If your logo assets require different sizing or placement you can customize SCSS styles at the bottom of [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/components/MainSidebar.vue).

```scss
.logoItem {
	display: flex;
	justify-content: space-between;
	height: $header-height;
	line-height: $header-height;
	margin: 0 !important;
	border-radius: 0 !important;
	border-bottom: var(--border-width--base) var(--border-style--base) var(--background--light);
	cursor: default;

	&:hover, &:global(.is-active):hover {
		background-color: initial !important;
	}

	* { vertical-align: middle; }
	.icon {
		height: 18px;
		position: relative;
		left: 6px;
	}

}
```

/// warning | Variable names may change
If you customize CSS variables directly in component files, be aware that n8n is migrating to a new naming convention. Use global tokens (like `--color--primary`) rather than component-specific tokens to minimize breaking changes. See [Backwards compatibility](#backwards-compatibility) below.
///

## Text localization

To change all text occurrences like `n8n` or `n8n.io` to your brand identity you can customize n8n's English internationalization file: [packages/frontend/@n8n/i18n/src/locales/en.json](https://github.com/n8n-io/n8n/blob/master/packages/frontend/@n8n/i18n/src/locales/en.json).

n8n uses the [Vue I18n](https://kazupon.github.io/vue-i18n/) internationalization plugin for Vue.js to translate the majority of UI texts. To search and replace text occurrences inside `en.json` you can use [Linked locale messages](https://kazupon.github.io/vue-i18n/guide/messages.html#linked-locale-messages).

In the following example add the `_brand.name` translation key to white label n8n's [AboutModal.vue](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/components/AboutModal.vue).

```js
{
	"_brand.name": "My Brand",
	//replace n8n with link to _brand.name
	"about.aboutN8n": "About @:_brand.name",
	"about.n8nVersion": "@:_brand.name Version",
}
```

![Example About Modal Localization](/_images/embed/white-label/about-modal.png)

## Backwards compatibility

n8n is actively migrating to a new CSS variable naming convention. To ensure your white-label customizations remain compatible:

### Best practices for stable customizations

1. **Prefer global tokens over component tokens**: Customize high-level design tokens like `--color--primary`, `--spacing--md`, and `--radius--sm` rather than component-specific variables.

2. **Check for aliases during migration**: n8n may temporarily alias old variable names to new ones:
   ```scss
   /* Legacy variable aliased to new convention */
   --btn-bg-primary: var(--button--background--primary);
   ```

3. **Follow the naming convention**: If you create custom variables, use the hybrid double-dash convention:
   - Between groups: `--` (double dash)
   - Within groups: `-` (single dash)
   - Example: `--my-brand--button--background--accent--hover`

4. **Validate variable names**: Use this pattern to check your variable names:
   ```
   ^--[a-z0-9]+(?:-[a-z0-9]+)*(?:--[a-z0-9]+(?:-[a-z0-9]+)*){1,7}$
   ```

### Migration timeline

n8n maintains backwards compatibility during major version transitions. When upgrading:

- Review release notes for CSS variable changes
- Test your customizations in a staging environment
- Look for deprecation warnings in browser console
- Update to new variable names during planned maintenance windows

/// warning | Breaking changes in CSS overrides
If you override CSS variables in embedded n8n instances (Chat Trigger, Form nodes), you may need to update your variable names after n8n upgrades. Always test embedded instances after updating n8n.
///

### Window title

To change n8n's window title to your brand name, edit the following:

- [packages/frontend/editor-ui/index.html](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/index.html)
- [packages/frontend/editor-ui/src/composables/useDocumentTitle.ts](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/composables/useDocumentTitle.ts)

The following example replaces all occurrences of `n8n` and `n8n.io` with `My Brand` in `index.html` and `useDocumentTitle.ts`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Replace html title attribute -->
	<title>My Brand - Workflow Automation</title>
</head>
```

```typescript
import { useSettingsStore } from '@/stores/settings.store';

// replace n8n
const DEFAULT_TITLE = 'My Brand';
const DEFAULT_TAGLINE = 'Workflow Automation';
```

![Example Window Title Localization](/_images/embed/white-label/window-title.png)




