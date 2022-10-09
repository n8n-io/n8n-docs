# White Labelling

To white label n8n you customize the frontend styling and assets to match your brand identity. The process involves changing n8n's source code [github.com/n8n-io/n8n](https://github.com/n8n-io/n8n), specifically two packages:

* [packages/design-system](https://github.com/n8n-io/n8n/tree/master/packages/design-system) - n8n's [storybook](https://storybook.js.org/) design system with css styles and vue components
* [packages/editor-ui](https://github.com/n8n-io/n8n/tree/master/packages/editor-ui) - n8n's [vuejs](https://vuejs.org/) frontend build with [vitejs](https://vitejs.dev)

## Prerequisite

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

## Theme Colors

To customize theme colors look into [packages/design-system](https://github.com/n8n-io/n8n/tree/master/packages/design-system) and start with:

- [packages/design-system/src/css/_tokens.scss](https://github.com/n8n-io/n8n/blob/master/packages/design-system/src/css/_tokens.scss)
- [packages/design-system/src/css/_tokens.dark.scss](https://github.com/n8n-io/n8n/blob/master/packages/design-system/src/css/_tokens.dark.scss)

At the top of `_tokens.scss` you will find `--color-primary` variables as hsl colors:

```scss
@mixin theme {
	--color-primary-h: 6.9;
	--color-primary-s: 100%;
	--color-primary-l: 67.6%;
```

In the following example we changed the primary color to <span style="color:#0099ff">#0099ff</span>. To convert to HSL you can use a [color converter tool](https://www.w3schools.com/colors/colors_converter.asp).

```scss
@mixin theme {
	--color-primary-h: 204;
	--color-primary-s: 100%;
	--color-primary-l: 50%;
```

![Example Theme Color Customization](/_images/embed/white-label/color-transition.gif)

!!! note
    Similar css variables for dark mode are defined in `_tokens.dark.scss`. Dark mode is an upcoming feature that cannot be toggled using n8n's UI yet.

## Theme Logos

To change the editor’s logo assets look into [packages/editor-ui/public](https://github.com/n8n-io/n8n/tree/master/packages/editor-ui/public) and replace:

- favicon-16x16.png
- favicon-32x32.png
- favicon.ico
- n8n-logo.svg
- n8n-logo-collapsed.svg
- n8n-logo-expanded.svg

The logo assets are used in different vue components like

* [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/MainSidebar.vue) - top/left logo in the main sidebar
* [Logo.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/Logo.vue) - Reused in other components

In the following example we replaced `n8n-logo-collapsed.svg` and `n8n-logo-expanded.svg` that are used by the main sidebar.

![Example Logo Main Sidebar](/_images/embed/white-label/logo-main-sidebar.png)

If your logo assets require different sizing or placement you can customize scss styles at the bottom of [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/MainSidebar.vue).

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

## Text Localization

To change all text occurences like `n8n` or `n8n.io` to your brand identity you can customize n8n's english internationalization file:

- [packages/editor-ui/src/plugins/i18n/locales/en.json](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/plugins/i18n/locales/en.json)

N8n uses the [Vue I18n](https://kazupon.github.io/vue-i18n/) internationalization plugin for Vue.js to translate the majority of UI texts. To quickly search and replace text occurences inside `en.json` you can use [Linked locale messages](https://kazupon.github.io/vue-i18n/guide/messages.html#linked-locale-messages).

In the following example we added a `_brand.name` translation key to white label n8n's [AboutModal.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/AboutModal.vue).

```js
{
	"_brand.name": "My Brand",
	//replace n8n with link to _brand.name
	"about.aboutN8n": "About @:_brand.name",
	"about.n8nVersion": "@:_brand.name Version",
}
```

![Example About Modal Localization](/_images/embed/white-label/about-modal.png)

### Window Title

To change n8n`s window title to your brand name look at

- [packages/editor-ui/index.html](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/index.html)
- [packages/editor-ui/src/components/mixins/titleChange.ts](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/mixins/titleChange.ts)

In the following example we replaced all occurences of `n8n` and `n8n.io` with `My Brand`.

![Example Window Title Localization](/_images/embed/white-label/window-title.png)




