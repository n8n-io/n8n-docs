const dirTree = require('directory-tree');
const path = require('path');

function getChildrenFiles(folder, topItem) {
	const returnFiles = dirTree(path.join(__dirname, `../${folder}`), { extensions: /\.md/ }).children
		.filter(page => {
			return page.type === 'file' && page.name !== 'README.md';
		})
		.sort((a, b) => {
			const aName = a.name.toLowerCase();
			const bName = b.name.toLowerCase();
			if (aName < bName) { return -1; }
			if (aName > bName) { return 1; }
			return 0;
		})
		.map(page => {
			return `/${folder}/${page.name}`;
		});

	if (topItem !== undefined) {
		const topItemPath = `/${folder}/${topItem}`;
		const index = returnFiles.indexOf(topItemPath);
		if (index !== -1) {
			returnFiles.splice(index, 1);
			returnFiles.unshift(topItemPath);
		}
	}

	return returnFiles;
}

function getChildrenFolders(folder) {
	return dirTree(path.join(__dirname, `../${folder}`), { extensions: /\.md/ }).children
		.filter(page => {
			return page.type === 'directory' && !!page.children.find(child => child.name === 'README.md');
		})
		.sort((a, b) => {
			const aName = a.name.toLowerCase();
			const bName = b.name.toLowerCase();
			if (aName < bName) { return -1; }
			if (aName > bName) { return 1; }
			return 0;
		})
		.map(page => {
			return `/${folder}/${page.name}/`;
		});
}

function getDescription(frontmatterDescription, permalink) {
	var description = 'n8n is an extendable workflow automation tool that enables you to connect anything to everything via its open, fair-code model.';
	var nodePath = /\/nodes\/n8n-nodes-base/;
	var credentialPath = /\/credentials\//;
	if (frontmatterDescription) {
		if (nodePath.test(permalink) || credentialPath.test(permalink)) {
			description = `${frontmatterDescription}, an extendable workflow automation tool that enables you to connect anything to everything via its open, fair-code model.`;
		} else {
			description = frontmatterDescription;
		}
	}
	return description;
}

module.exports = {
	description: 'Documentation for n8n',
	title: 'Docs',
	plugins: [
		'vuepress-plugin-reading-time',
		'@vuepress/last-updated',
		[
			'vuepress-plugin-code-copy',
			true,
		],
		[
			'seo',
			{
				description: $page => getDescription($page.frontmatter.description, $page.frontmatter.permalink),
				title: ($page, $site) => `${$page.title} | n8n ${$site.title}`,
				image: () => '/assets/img/n8n-docs.png',
				modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
				url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
			}
		],
		[
			'@vuepress/google-analytics',
			{
				'ga': 'UA-146470481-3',
			},
		],
		[
			'sitemap',
			{
				hostname: 'https://docs.n8n.io'
			},
		],
		require('./plugins/nodes'),
	],
	themeConfig: {
		repo: 'n8n-io/n8n',
		base: '/n8n-docs/',
		docsRepo: 'n8n-io/n8n-docs',
		docsDir: 'docs',
		editLinks: true,
		editLinkText: 'Help us improve this page!',
		smoothScroll: true,
		lastUpdated: true,
		sidebarDepth: 2,
		algolia: {
			apiKey: '36968f1949f14fc25079286688915dc9',
			indexName: 'n8n_io',
		},
		searchPlaceholder: 'Search...',
		logo: '/assets/img/n8n-logo.png',
		nav: [
			{
				text: 'Getting Started',
				link: '/',
			},
			// {
			// 	text: 'Guides',
			// 	link: '/guides/guides.md'
			// },
			{
				text: 'Nodes',
				link: '/nodes/',
			},
			{
				text: 'Reference',
				link: '/reference/',
			},
			{
				text: 'Community',
				link: 'https://community.n8n.io',
			},
		],
		sidebar: {
			// '/guides/': [
			// 	{
			// 		title: 'Guide Overview',
			// 		sidebarDepth: 2,
			// 		children: getChildrenFiles('guides', 'guides.md'),
			// 	},
			// ],

			'/nodes/': [
				{
					title: '🧬 Overview',
					sidebarDepth: 2,
					path: '/nodes/',
					children: getChildrenFiles('nodes'),
				},
				{
					title: '🔬 Creating Nodes',
					sidebarDepth: 1,
					children: getChildrenFiles('nodes/creating-nodes', 'create-node.md'),
				},
				{
					title: '🧠 Nodes Library',
					sidebarDepth: 3,
					path: '/nodes/nodes-library',
					children: [
						{
							title: 'Core Nodes',
							sidebarDepth: 1,
							path: '/nodes/nodes-library/core-nodes',
							children: getChildrenFolders('nodes/nodes-library/core-nodes'),
						},
						{
							title: 'Nodes',
							sidebarDepth: 1,
							path: '/nodes/nodes-library/nodes',
							children: getChildrenFolders('nodes/nodes-library/nodes'),
						},
						{
							title: 'Trigger Nodes',
							sidebarDepth: 1,
							path: '/nodes/nodes-library/trigger-nodes',
							children: getChildrenFolders('nodes/nodes-library/trigger-nodes'),
						},
					],
				},
				{
					title: '🔑 Credentials Library',
					sidebarDepth: 2,
					path: '/nodes/credentials',
					children: getChildrenFolders('nodes/credentials'),
				},
			],

			'/reference/': [
				{
					title: '📚 Overview',
					path: '/reference/',
				},
				{
					title: '🧐 Changelog',
					path: 'changelog.md',
				},
				{
					title: '💭 Glossary',
					path: 'glossary.md',
				},
				{
					title: '⌨️ Keyboard Shortcuts',
					path: 'keyboard-shortcuts.md',
				},
				{
					title: '🧑‍💻 Setup via PM2',
					path: 'setup-pm2.md',
				},
				{
					title: '👾 CLI commands for n8n',
					path: 'start-workflows-via-cli.md',
				},
				{
					title: '💻 JavaScript Code Snippets',
					path: 'javascript-code-snippets.md',
				},
				{
					title: '💾 Data',
					sidebarDepth: 2,
					children: getChildrenFiles('reference/data'),
				},
				{
					title: '👀 Troubleshooting',
					path: 'troubleshooting.md',
				},
				{
					title: '🙌 Contributing',
					path: 'contributing.md',
				},
				{
					title: '🎫 License',
					path: 'license.md',
				},
				{
					title: '❓ FAQ',
					path: 'faq.md',
				},
			],

			'/': [
				{
					title: '👋 Introduction',
					collapsable: false,
					path: '/',
					sidebarDepth: 0,
				},
				{
					title: '🍄 Key Components',
					path: '/getting-started/key-components/',
					sidebarDepth: 2,
					sidebarDepth: 2,
					children: getChildrenFiles('getting-started/key-components'),
				},
				{
					title: '💡 Key Concepts',
					path: 'getting-started/key-concepts.md',
				},
				{
					title: '🚀 Installation',
					path: '/getting-started/installation/',
					sidebarDepth: 2,
					children: [
							{
									title: 'Docker',
									sidebarDepth: 1,
									path: '/getting-started/installation/docker-quickstart.md',
							},
							{
								title: 'Updating',
								sidebarDepth: 1,
								path: '/getting-started/installation/updating.md',
							},
							{		title: 'Advanced',
									sidebarDepth: 1,
									children: getChildrenFiles('getting-started/installation/advanced', 'configuration.md'),
							}	
					],
				},
				{
					title: '🏅 Create Your First Workflow',
					path: '/getting-started/create-your-first-workflow/',
					children: getChildrenFolders('getting-started/create-your-first-workflow'),

				},
				{
					title: '🤘 Tutorials',
					path: 'getting-started/tutorials.md',
				},
				{
					title: '🤔 What\'s Next?',
					path: 'getting-started/whats-next.md',
				},
			],
			// [
			// {
			// 	title: 'Introduction',
			// 	sidebarDepth: 2,
			// 	children: [
			// 		'getting-started/overview.md',
			// 		'getting-started/node-basics.md',
			// 		'getting-started/workflow.md',
			// 		'getting-started/start-workflows-via-cli.md',
			// 	],
			// },
			// ]
		}
	},
}

