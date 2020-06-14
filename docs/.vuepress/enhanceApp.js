export default ({ router, siteData }) => {
	// Redirects users which use links of old documentation to pages of new documentation

	// Redirects paths from old -> new
	const redirectPaths = {
		'#/nodes?id=function-node': 'reference/function-nodes.html#function-node',
	};

	if (redirectPaths[window.location.hash] !== undefined) {
		// Redirect to different page if defined
		window.location.href = `${window.location.origin}/${redirectPaths[window.location.hash]}`;
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
