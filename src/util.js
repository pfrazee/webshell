
var lbracket_regex = /</g;
var rbracket_regex = />/g;
function makeSafe(str) {
	str = ''+str;
	return str.replace(lbracket_regex, '&lt;').replace(rbracket_regex, '&gt;');
}

var sanitizeHtmlRegexp = /<\s*script/g;
function sanitizeHtml (html) {
	// CSP stops inline or remote script execution, but we still want to stop inclusions of scripts on our domain
	// :TODO: this approach probably naive in some important way
	return html.replace(sanitizeHtmlRegexp, '&lt;script');
}

module.exports = {
	makeSafe: makeSafe,
	sanitizeHtml: sanitizeHtml
};