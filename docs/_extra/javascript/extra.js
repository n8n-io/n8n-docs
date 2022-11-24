// If the user has accepted cookies, set the n8n-consent cookie
// This means if they then go to the website, they won't be prompted again
let docsConsent = __md_get("__consent")
let d = new Date();
d.setTime(d.getTime() + 5 * 24 * 60 * 60 * 1000);
let n8nCookie = {'consent': true};

if (docsConsent && docsConsent.analytics === true) {
  document.cookie = `n8n-consent=${JSON.stringify(n8nCookie)};expires=${d.toUTCString()};path=/;domain=.n8n.io`;
}

// If the user already has the n8n-consent cookie, accept cookies in docs as well
let n8nCookieConsent = getCookie("n8n-consent");
console.log("cs1 " + n8nCookieConsent);
if(n8nCookieConsent && n8nCookieConsent === true) {
	console.log("cs2 " + n8nCookieConsent);
	__md_set("__consent", {"analytics": true})
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
