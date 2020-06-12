const dirTree = require('directory-tree');
const path = require('path');

function getChildrenFiles(folder, topItem) {
	const returnFiles = dirTree(path.join(__dirname, `../${folder}`), { extensions: /\.md/ }).children
		.filter(page => {
			return page.type === 'file' && page.name !== 'README.md';
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
		sidebarDepth: 2,
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
				link: '/nodes/nodes.md',
			},
			{
				text: 'Reference',
				link: '/reference/reference.md',
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
					children: getChildrenFiles('nodes', 'nodes.md'),
				},
				{
					title: '🔬 Creating Nodes',
					sidebarDepth: 2,
					children: getChildrenFiles('nodes/creating-nodes', 'create-node.md'),
				},
				{
					title: '🧠 Nodes Library',
					sidebarDepth: 3,
					children: [
						{
							title: 'Trigger Nodes',
							sidebarDepth: 2,
							children: getChildrenFolders('nodes/nodes-library/trigger-nodes'),
						},
						{
							title: 'Nodes',
							sidebarDepth: 2,
							children: getChildrenFolders('nodes/nodes-library/nodes'),
						},
						{
							title: 'Core Nodes',
							sidebarDepth: 2,
							children: getChildrenFolders('nodes/nodes-library/core-nodes'),
						},
					],
				},
				{
					title: '🔑 Credentials',
					sidebarDepth: 2,
					children: getChildrenFolders('nodes/credentials'),
				},
			],

			'/reference/': [
				{
					title: '📚 Overview',
					path: 'reference.md',
				},
				{
					title: '🧐 Changelog',
					path: 'changelog.md',
				},
				{
					title: '🎯 Workflow',
					path: 'workflow.md',
				},
				{
					title: '⚙️ Configuration',
					path: 'configuration.md',
				},
				{
					title: '🚔 Security',
					path: 'security.md',
				},
				{
					title: '📦 Docker',
					path: 'docker.md',
				},
				{
					title: '🖥 Server Setup',
					path: 'server-setup.md',
				},
				{
					title: '👾 Start Workflow via CLI',
					path: 'start-workflows-via-cli.md',
				},
				{
					title: '👀 Troubleshooting',
					path: 'troubleshooting.md',
				},
				{
					title: '💾 Data',
					sidebarDepth: 2,
					children: getChildrenFiles('reference/data'),
				},
				{
					title: '💻 Development',
					path: 'development.md',
				},
				{
					title: '⌨️ Keyboard Shortcuts',
					path: 'keyboard-shortcuts.md',
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
					title: '🚀 Quickstart',
					path: 'getting-started/quickstart.md',
				},
				{
					title: '🍄 Key Components',
					path: 'getting-started/key-components.md',
				},
				{
					title: '💪 Creating Your First Workflow',
					path: 'getting-started/creating-your-first-workflow.md',
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
