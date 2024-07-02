---
#https://www.notion.so/n8n/Frontmatter-432c2b8dff1f43d4b1c8d20075510fe4
contentType: howto
---

# White labelling

--8<-- "_snippets/embed-license.md"

White labelling n8n means customizing the frontend styling and assets to match your brand identity. The process involves changing two packages in n8n's source code [github.com/n8n-io/n8n](https://github.com/n8n-io/n8n){:target=_blank .external-link}:

* [packages/design-system](https://github.com/n8n-io/n8n/tree/master/packages/design-system){:target=_blank .external-link}: n8n's [storybook](https://storybook.js.org/){:target=_blank .external-link} design system with CSS styles and Vue.js components
* [packages/editor-ui](https://github.com/n8n-io/n8n/tree/master/packages/editor-ui){:target=_blank .external-link}: n8n's [Vue.js](https://vuejs.org/){:target=_blank .external-link} frontend build with [Vite.js](https://vitejs.dev){:target=_blank .external-link}

## Prerequisites

You need the following installed on your development machine:

--8<-- "_snippets/integrations/creating-nodes/prerequisites.md"

Create a fork of [n8n's repository](https://github.com/n8n-io/n8n){:target=_blank .external-link} and clone your new repository.

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

To customize theme colors open [packages/design-system](https://github.com/n8n-io/n8n/tree/master/packages/design-system){:target=_blank .external-link} and start with:

- [packages/design-system/src/css/_tokens.scss](https://github.com/n8n-io/n8n/blob/master/packages/design-system/src/css/_tokens.scss){:target=_blank .external-link}
- [packages/design-system/src/css/_tokens.dark.scss](https://github.com/n8n-io/n8n/blob/master/packages/design-system/src/css/_tokens.dark.scss){:target=_blank .external-link}

At the top of `_tokens.scss` you will find `--color-primary` variables as HSL colors:

```scss
@mixin theme {
	--color-primary-h: 6.9;
	--color-primary-s: 100%;
	--color-primary-l: 67.6%;
```

In the following example the primary color changes to <span style="color:#0099ff">#0099ff</span>. To convert to HSL you can use a [color converter tool](https://www.w3schools.com/colors/colors_converter.asp){:target=_blank .external-link}.

```scss
@mixin theme {
	--color-primary-h: 204;
	--color-primary-s: 100%;
	--color-primary-l: 50%;
```

![Example Theme Color Customization](/_images/embed/white-label/color-transition.gif)


## Theme logos

To change the editor’s logo assets look into [packages/editor-ui/public](https://github.com/n8n-io/n8n/tree/master/packages/editor-ui/public){:target=_blank .external-link} and replace:

- favicon-16x16.png
- favicon-32x32.png
- favicon.ico
- n8n-logo.svg
- n8n-logo-collapsed.svg
- n8n-logo-expanded.svg

Replace these logo assets. n8n uses them in Vue.js components, including:

* [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/MainSidebar.vue){:target=_blank .external-link}: top/left logo in the main sidebar.
* [Logo.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/Logo.vue): reused in other components.

In the following example replace `n8n-logo-collapsed.svg` and `n8n-logo-expanded.svg` to update the main sidebar's logo assets.

![Example Logo Main Sidebar](/_images/embed/white-label/logo-main-sidebar.png)

If your logo assets require different sizing or placement you can customize SCSS styles at the bottom of [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/MainSidebar.vue){:target=_blank .external-link}.

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

To change all text occurrences like `n8n` or `n8n.io` to your brand identity you can customize n8n's English internationalization file: [packages/editor-ui/src/plugins/i18n/locales/en.json](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/plugins/i18n/locales/en.json){:target=_blank .external-link}.

n8n uses the [Vue I18n](https://kazupon.github.io/vue-i18n/){:target=_blank .external-link} internationalization plugin for Vue.js to translate the majority of UI texts. To search and replace text occurrences inside `en.json` you can use [Linked locale messages](https://kazupon.github.io/vue-i18n/guide/messages.html#linked-locale-messages){:target=_blank .external-link}.

In the following example add the `_brand.name` translation key to white label n8n's [AboutModal.vue](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/AboutModal.vue){:target=_blank .external-link}.

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

- [packages/editor-ui/index.html](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/index.html){:target=_blank .external-link}
- [packages/editor-ui/src/components/mixins/titleChange.ts](https://github.com/n8n-io/n8n/blob/master/packages/editor-ui/src/components/mixins/titleChange.ts){:target=_blank .external-link}

The following example replaces all occurrences of `n8n` and `n8n.io` with `My Brand` in `index.html` and `titleChange.ts`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Replace html title attribute -->
	<title>My Brand - Workflow Automation</title>
</head>
```

```typescript
$titleSet(workflow: string, status: WorkflowTitleStatus) {
	// replace n8n prefix
	window.document.title = `My Brand - ${icon} ${workflow}`;
},

$titleReset() {
	// replace n8n prefix
	document.title = `My Brand - Workflow Automation`;
},
```

![Example Window Title Localization](/_images/embed/white-label/window-title.png)




