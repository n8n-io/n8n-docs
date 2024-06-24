
var n8nTopNav = document.getElementById("n8n-top-nav-target");
// Hide the n8n additional top nav on scroll
window.addEventListener('scroll', function() {
	if(scrollY != 0) {
		n8nTopNav.classList.remove("n8n-visible");
		n8nTopNav.classList.add("n8n-hidden");
	} else {
		n8nTopNav.classList.remove("n8n-hidden");
		n8nTopNav.classList.add("n8n-visible");
	}
  });
