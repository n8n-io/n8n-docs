import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue';

export default ({ router, siteData }) => {
	library.add(fas);
  	Vue.component('font-awesome-icon', FontAwesomeIcon)
	// Redirects users which use links of old documentation to pages of new documentation

	// spring cleaning redirects
	const latestRedirects = {
		"/nodes/expressions.html#expressions": "/nodes/expressions/expressions.html",
		"/getting-started/quickstart": "/getting-started/installation/index.html",
		"/getting-started/quickstart.html": "/getting-started/installation/index.html",
		"/getting-started/quickstart.html#give-it-a-spin-using-npx": "/getting-started/installation/#npm",
		"/getting-started/quickstart.html#install-with-npm": "/getting-started/installation/#npm",
		"/getting-started/quickstart.html#post-installation-starting-n8n-with-tunnel": "/getting-started/installation/#n8n-with-tunnel",
		"/getting-started/quickstart.html#run-with-docker": "/getting-started/installation/#docker",
		"/getting-started/quickstart.html#sign-up-on-n8n-cloud": "/getting-started/installation/#n8n-cloud",
		"/reference/configuration.html": "/getting-started/installation/advanced/configuration.html",
		"/reference/configuration.html#configuration-via-file": "/getting-started/installation/advanced/configuration.html#configuration-via-file",
		"/reference/configuration.html#examples": "/getting-started/installation/advanced/configuration.html#examples",
		"/reference/configuration.html#encryption-key": "/getting-started/installation/advanced/configuration.html#encryption-key",
		"/reference/configuration.html#execute-in-same-process": "/getting-started/installation/advanced/configuration.html#execute-in-same-process",
		"/reference/configuration.html#execution-timeout": "/getting-started/installation/advanced/configuration.html#execution-timeout",
		"/reference/configuration.html#use-built-in-and-external-modules-in-function-nodes": "/getting-started/installation/advanced/configuration.html#use-built-in-and-external-modules-in-function-nodes",
		"/reference/configuration.html#timezone": "/getting-started/installation/advanced/configuration.html#timezone",
		"/reference/configuration.html#user-folder": "/getting-started/installation/advanced/configuration.html#user-folder",
		"/reference/configuration.html#webhook-url": "/getting-started/installation/advanced/configuration.html#webhook-url",
		"/reference/configuration.html#prometheus": "/getting-started/installation/advanced/configuration.html#prometheus",
		"/reference/data/data-structure.html": "/getting-started/key-concepts.html#data-structure",
		"/reference/scaling-n8n.html": "/getting-started/installation/advanced/scaling-n8n.html",
		"/reference/security.html": "/getting-started/key-concepts.html#security",
		"/reference/server-setup.html": "/getting-started/installation/advanced/server-setup.html",
		"/reference/workflow.html": "/getting-started/key-components/workflow.html",
		"/reference/workflow.html#data-flow": "/getting-started/key-concepts.html#data-flow",
		"/reference/workflow.html#error-workflows": "/getting-started/key-concepts.html#error-workflow",
		"/reference/workflow.html": "/getting-started/key-components/workflow.html",
	};

	const currentPath = window.location.pathname + (window.location.hash ? window.location.hash : '');
	const redirectUrl = latestRedirects[currentPath];
	if (redirectUrl) {
		setTimeout(() => {
			window.location.href = `${window.location.origin}${redirectUrl}`;
		}, 250);
		return;
	}

	// redirect paths for legacy Docusaurus hash URLs
	const hashRedirects = {
		'#/nodes?id=function-node': 'reference/function-nodes.html#function-node',
		'#/?id=n8n-documentation' : '#overview',
		'#/?id=what-is-n8n' : '#what-is-n8n',
		'#/key-components?id=key-components' : 'getting-started/key-components.html#key-components',
		'#/key-components?id=connection' : 'getting-started/key-components.html#connection',
		'#/key-components?id=node' : 'getting-started/key-components.html#node',
		'#/key-components?id=trigger-node' : 'getting-started/key-components.html#trigger-node',
		'#/key-components?id=workflow' : 'getting-started/key-components.html#workflow',
		'#/quick-start?id=quick-start' : 'getting-started/quickstart.html',
		'#/quick-start?id=give-n8n-a-spin' : 'getting-started/quickstart.html#give-n8n-a-spin',
		'#/quick-start?id=start-with-docker' : 'getting-started/quickstart.html#run-with-docker',
		'#/setup' : 'getting-started/quickstart.html#install-with-npm',
		'#/setup?id=installation' : 'getting-started/quickstart.html#install-with-npm',
		'#/setup?id=start' : 'getting-started/quickstart.html#start',
		'#/setup?id=start-with-tunnel' : 'getting-started/quickstart.html#start-with-tunnel',
		'#/docker' : 'reference/docker.html',
		'#/configuration' : 'reference/configuration.html',
		'#/configuration?id=publish' : 'reference/configuration.html#publish',
		'#/configuration?id=base-url' : 'reference/configuration.html#base-url',
		'#/configuration?id=execution-data-manual-runs' : 'reference/configuration.html#execution-data-manual-runs',
		'#/configuration?id=execution-data-errorsuccess' : 'reference/configuration.html#execution-data-error-success',
		'#/configuration?id=execute-in-same-process' : 'reference/configuration.html#execute-in-same-process',
		'#/configuration?id=exclude-nodes' : 'reference/configuration.html#exclude-nodes',
		'#/configuration?id=custom-nodes-location' : 'reference/configuration.html#custom-nodes-location',
		'#/configuration?id=use-built-in-and-external-modules-in-function-nodes' : 'reference/configuration.html#use-built-in-and-external-modules-in-function-nodes',
		'#/configuration?id=ssl' : 'reference/configuration.html#ssl',
		'#/configuration?id=timezone' : 'reference/configuration.html#timezone',
		'#/configuration?id=user-folder' : 'reference/configuration.html#user-folder',
		'#/configuration?id=webhook-url' : 'reference/configuration.html#webhook-url',
		'#/configuration?id=configuration-via-file' : 'reference/configuration.html#configuration-via-file',
		'#/data-structure' : 'reference/data/data-structure.html',
		'#/database' : 'reference/data/database.html',
		'#/database?id=database' : 'reference/data/database.html#database',
		'#/database?id=shared-settings' : 'reference/data/database.html#shared-settings',
		'#/database?id=mongodb' : 'reference/data/database.html#mongodb',
		'#/database?id=postgresdb' : 'reference/data/database.html#postgresdb',
		'#/database?id=mysql-mariadb' : 'reference/data/database.html#mysql-mariadb',
		'#/database?id=sqlite' : 'reference/data/database.html#sqlite',
		'#/database?id=other-databases' : 'reference/data/database.html#other-databases',
		'#/keyboard-shortcuts' : 'reference/keyboard-shortcuts.html#general',
		'#/keyboard-shortcuts?id=keyboard-shortcuts' : 'reference/keyboard-shortcuts.html#keyboard-shortcuts',
		'#/keyboard-shortcuts?id=general' : 'reference/keyboard-shortcuts.html#general',
		'#/keyboard-shortcuts?id=with-nodes-selected' : 'reference/keyboard-shortcuts.html#with-node-s-selected',
		'#/node-basics' : 'nodes/node-basics.html',
		'#/node-basics?id=node-basics' : 'nodes/node-basics.html#node-basics',
		'#/node-basics?id=types' : 'nodes/node-basics.html#types',
		'#/node-basics?id=trigger-nodes' : 'nodes/node-basics.html#trigger-nodes',
		'#/node-basics?id=regular-nodes' : 'nodes/node-basics.html#regular-nodes',
		'#/node-basics?id=credentials' : 'nodes/node-basics.html#credentials',
		'#/node-basics?id=expressions' : 'nodes/node-basics.html#expressions',
		'#/node-basics?id=parameters' : 'nodes/node-basics.html#parameters',
		'#/node-basics?id=pausing-node' : 'nodes/node-basics.html#pausing-node',
		'#/nodes' : 'reference/function-nodes.html',
		'#/nodes?id=function-and-function-item-nodes' : 'reference/function-nodes.html#function-and-function-item-nodes',
		'#/nodes?id=difference-between-both-nodes' : 'reference/function-nodes.html#difference-between-both-nodes',
		'#/nodes?id=function-node' : 'reference/function-nodes.html#function-node',
		'#/nodes?id=variable-items' : 'reference/function-nodes.html#variable-items',
		'#/nodes?id=method-itemindex': 'reference/function-nodes.html#method-item-index-number-runindex-number',
		'#/nodes?id=method-itemindex-number-runindex-number': 'reference/function-nodes.html#method-item-index-number-runindex-number',
		'#/nodes?id=method-itemsnodename-string-outputindex-number-runindex-number' : 'reference/function-nodes.html#method-itemsnodename-string-outputindex-number-runindex-number',
		'#/nodes?id=variable-node' : 'reference/function-nodes.html#variable-node',
		'#/nodes?id=variable-runindex' : 'reference/function-nodes.html#variable-runindex',
		'#/nodes?id=variable-workflow' : 'reference/function-nodes.html#variable-workflow',
		'#/nodes?id=method-evaluateexpressionexpression-string-itemindex-number' : 'reference/function-nodes.html#method-evaluateexpressionexpression-string-itemindex-number',
		'#/nodes?id=method-getworkflowstaticdatatype' : 'reference/function-nodes.html#method-getworkflowstaticdata-type',
		'#/nodes?id=function-item-node' : 'reference/function-nodes.html#function-item-node',
		'#/nodes?id=variable-item' : 'reference/function-nodes.html#variable-item',
		'#/nodes?id=method-getbinarydata' : 'reference/function-nodes.html#method-getbinarydata',
		'#/nodes?id=method-setbinarydatabinarydata' : 'reference/function-nodes.html#mmethod-setbinarydata-binarydata',
		'#/nodes?id=method-getworkflowstaticdatatype-1' : 'reference/function-nodes.html#method-getworkflowstaticdata-type-2',
		'#/security' : 'reference/security.html',
		'#/sensitive-data' : 'reference/data/sensitive-data.html',
		'#/server-setup' : 'reference/server-setup.html',
		'#/server-setup?id=example-setup-with-docker-compose' : 'reference/server-setup.html#example-setup-with-docker-compose',
		'#/server-setup?id=_1-install-docker' : 'reference/server-setup.html#_1-install-docker',
		'#/server-setup?id=_2-optional-if-it-should-run-as-not-root-user' : 'reference/server-setup.html#_2-optional-if-it-should-run-as-not-root-user',
		'#/server-setup?id=_3-install-docker-compose' : 'reference/server-setup.html#_3-install-docker-compose',
		'#/server-setup?id=_4-setup-dns' : 'reference/server-setup.html#_4-setup-dns',
		'#/server-setup?id=_5-create-docker-compose-file' : 'reference/server-setup.html#_5-create-docker-compose-file',
		'#/server-setup?id=_6-create-env-file' : 'reference/server-setup.html#_6-create-env-file',
		'#/server-setup?id=_7-create-data-folder' : 'reference/server-setup.html#_7-create-data-folder',
		'#/server-setup?id=_8-start-docker-compose-setup' : 'reference/server-setup.html#_8-start-docker-compose-setup',
		'#/server-setup?id=_9-done' : 'reference/server-setup.html#_9-done',
		'#/start-workflows-via-cli' : 'start-workflows-via-cli.html',
		'#/workflow' : 'reference/workflow.html',
		'#/workflow?id=activate' : 'reference/workflow.html#activate',
		'#/workflow?id=data-flow' : 'reference/workflow.html#data-flow',
		'#/workflow?id=error-workflows' : 'reference/workflow.html#data-flow',
		'#/workflow?id=setting-error-workflow' : 'reference/workflow.html#setting-error-workflow',
		'#/workflow?id=share-workflows' : 'reference/workflow.html#share-workflows',
		'#/workflow?id=workflow-settings' : 'reference/workflow.html#workflow-settings',
		'#/workflow?id=error-workflow' : 'reference/workflow.html#error-workflow',
		'#/workflow?id=timezone' : 'reference/workflow.html#timezone',
		'#/workflow?id=save-data-error-execution' : 'reference/workflow.html#save-data-error-execution',
		'#/workflow?id=save-data-success-execution' : 'reference/workflow.html#save-data-success-execution',
		'#/workflow?id=save-manual-executions' : 'reference/workflow.html#save-manual-executions',
		'#/create-node' : 'nodes/creating-nodes/create-node.html',
		'#/create-node?id=create-node' : 'nodes/creating-nodes/create-node.html#creating-a-node',
		'#/create-node?id=create-the-first-basic-node' : 'nodes/creating-nodes/create-node.html#create-the-first-basic-node',
		'#/create-node?id=create-own-custom-n8n-nodes-module' : 'nodes/creating-nodes/create-node.html#create-own-custom-n8n-nodes-module',
		'#/create-node?id=setup-to-use-n8n-nodes-module' : 'nodes/creating-nodes/create-node.html#setup-to-use-n8n-nodes-module',
		'#/create-node?id=developmenttesting-of-custom-n8n-nodes-module' : 'nodes/creating-nodes/create-node.html#development-testing-of-custom-n8n-nodes-module',
		'#/create-node?id=node-development-guidelines' : 'nodes/creating-nodes/create-node.html#node-development-guidelines',
		'#/create-node?id=do-not-change-incoming-data' : 'nodes/creating-nodes/create-node.html#do-not-change-incoming-data',
		'#/create-node?id=write-nodes-in-typescript' : 'nodes/creating-nodes/create-node.html#write-nodes-in-typescript',
		'#/create-node?id=use-the-built-in-request-library' : 'nodes/creating-nodes/create-node.html#use-the-built-in-request-library',
		'#/create-node?id=reuse-parameter-names' : 'nodes/creating-nodes/create-node.html#reuse-parameter-names',
		'#/create-node?id=create-an-quotoptionsquot-parameter' : 'nodes/creating-nodes/create-node.html#create-an-options-parameter',
		'#/create-node?id=follow-exiting-parameter-naming-guideline' : 'nodes/creating-nodes/create-node.html#follow-existing-parameter-naming-guideline',
		'#/create-node?id=node-icons' : 'nodes/creating-nodes/create-node.html#node-icons',
		'#/development' : 'reference/development.html',
		'#/faq' : 'reference/faq.html',
		'#/faq?id=integrations' : 'reference/faq.html#integrations',
		'#/faq?id=can-you-create-an-integration-for-service-x' : 'reference/faq.html#can-you-create-an-integration-for-service-x',
		'#/faq?id=an-integration-exists-already-but-a-feature-is-missing-can-you-add-it' : 'reference/faq.html#an-integration-exists-already-but-a-feature-is-missing-can-you-add-it',
		'#/faq?id=how-can-i-create-an-integration-myself' : 'reference/faq.html#how-can-i-create-an-integration-myself',
		'#/faq?id=license' : 'reference/faq.html#license',
		'#/faq?id=which-license-does-n8n-use' : 'reference/faq.html#which-license-does-n8n-use',
		'#/faq?id=is-n8n-open-source' : 'reference/faq.html#is-n8n-open-source',
		'#/faq?id=why-is-n8n-not-open-source-but-fair-code-licensed-instead' : 'reference/faq.html#why-is-n8n-not-open-source-but-fair-code-licensed-instead',
		'#/troubleshooting' : 'reference/troubleshooting.html',
		'#/troubleshooting?id=windows' : 'reference/troubleshooting.html#windows',
		'#/troubleshooting?id=requirements' : 'reference/troubleshooting.html#requirements',
		'#/troubleshooting?id=install-build-tools' : 'reference/troubleshooting.html#install-build-tools',
		'#/troubleshooting?id=configure-npm-to-use-python-version-27' : 'reference/troubleshooting.html#configure-npm-to-use-python-version-2-7',
		'#/troubleshooting?id=configure-npm-to-use-correct-msvs-version' : 'reference/troubleshooting.html#configure-npm-to-use-correct-msvs-version',
		'#/troubleshooting?id=lesser-known-issues' : 'reference/troubleshooting.html#lesser-known-issues',
		'#/troubleshooting?id=mmmagic-npm-package-when-using-msbuild-tools-with-visual-studio' : 'reference/troubleshooting.html#mmmagic-npm-package-when-using-msbuild-tools-with-visual-studio',
	};

	if (hashRedirects[window.location.hash] !== undefined) {
		// Redirect to different page if defined
		window.location.href = `${window.location.origin}/${hashRedirects[window.location.hash]}`;
	} else if (location.hash) {
		// Scroll to element
		setTimeout(() => {
			const id = location.hash.slice(1);
			const targetElement = document.getElementById(id);
			if (targetElement) {
				const y = targetElement.getBoundingClientRect().top + window.pageYOffset;
				window.scrollTo({ top: y, behavior: 'smooth' });
			}
		}, 250)
	}
}
