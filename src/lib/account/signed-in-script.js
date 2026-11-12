import { SIGNED_IN_COOKIE } from "./cookie-names";

/**
 * The inline script that tells the static pages who is signed in before they are drawn.
 * It reads the readable hint cookie (the first name; the session itself stays httpOnly),
 * then sets <html data-signed-in> and --bae-name, which the header's CSS uses to show the
 * right account button and the name from the first frame. fallbackName is "My account"
 * in the page's language, for a hint without a name. --bae-nav-name is the phone bottom
 * navigation's tab (12 Nov 2026): shortName ("Account") or the first name, so it fits one line.
 */
export function signedInScript(fallbackName, shortName = fallbackName) {
  return `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)${SIGNED_IN_COOKIE}=([^;]+)/);if(!m)return;var n="";try{n=decodeURIComponent(m[1])}catch(e){}var s;if(!n||n==="1"){n=${JSON.stringify(fallbackName)};s=${JSON.stringify(shortName)}}else{s=n.split(" ")[0]}var d=document.documentElement;d.setAttribute("data-signed-in","");d.style.setProperty("--bae-name",JSON.stringify(n));d.style.setProperty("--bae-nav-name",JSON.stringify(s))}catch(e){}})();`;
}
