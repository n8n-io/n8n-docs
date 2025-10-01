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


At the top of `_tokens.scss` you will find `--color-primary` variables as HSL colors:

```scss
@mixin theme {
	--color-primary-h: 6.9;
	--color-primary-s: 100%;
	--color-primary-l: 67.6%;
```

In the following example the primary color changes to <span style="color:#0099ff">#0099ff</span>. To convert to HSL you can use a [color converter tool](https://www.w3schools.com/colors/colors_converter.asp).

```scss
@mixin theme {
	--color-primary-h: 204;
	--color-primary-s: 100%;
	--color-primary-l: 50%;
```

![Example Theme Color Customization](/_images/embed/white-label/color-transition.gif)


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
	border-bottom: var(--border-width-base) var(--border-style-base) var(--color-background-xlight);
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




