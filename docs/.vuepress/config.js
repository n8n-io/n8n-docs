const dirTree = require('directory-tree');
const path = require('path');

function getChildren(folder) {
	return dirTree(path.join(__dirname, `../${folder}`), { extensions: /\.md/ }).children
		.filter(page => {
			return page.type === 'directory' && !!page.children.find(child => child.name === 'README.md');
		})
		.map(page => {
			return `/${folder}/${page.name}/`;
		});
}

module.exports = {
	description: 'Documentation for n8n',
	title: 'n8n Documentation',
	plugins: [
		'vuepress-plugin-reading-time',
		'@vuepress/last-updated',
		[
			'vuepress-plugin-code-copy',
			true,
		],
		// [
		// 	'@vuepress/google-analytics',
		// 	{
		// 		'ga': '', // UA-00000000-0
		// 	},
		// ],
	],
	themeConfig: {
		repo: 'n8n-io/n8n',
		docsRepo: 'n8n-io/n8n-docs',
		docsDir: 'docs',
		editLinks: true,
		editLinkText: 'Help us improve this page!',
		smoothScroll: true,
		lastUpdated: true,
		searchPlaceholder: 'Search...',
		logo: '/assets/img/n8n-logo.png',
		nav: [
			{
				text: 'Home',
				link: '/',
			},
			{
				text: 'Community',
				link: 'https://community.n8n.io',
			},
		],
		sidebar: [
			['/', 'Home'],
			{
				title: 'Credentials',
				path: '/credentials/',
				sidebarDepth: 2,
				children: getChildren('credentials'),
			},
			{
				title: 'Nodes',
				path: '/nodes/',
				sidebarDepth: 2,
				children: getChildren('nodes'),
			},
		],
	},
}
