// Page Agent (PAgent)
// ===================
var util = require('./util.js');

function renderResponse(res) {
	if (res.body !== '') {
		if (typeof res.body == 'string') {
			return res.body;
		} else {
			return util.makeSafe(JSON.stringify(res.body));
		}
	}
	return res.status + ' ' + res.reason;
}

function createIframe(origin, cmd) {
	var time = (new Date()).toLocaleTimeString();
	var html = [
		'<table class="cli-update">',
			'<tr>',
				'<td>',
					'<small class="text-muted">'+time+'</small>',
					'<div class="update-panel">',
						// '<a class="glyphicon glyphicon-remove" method="DELETE" href="/'+id+'" title="Delete History Item" target="_null"></a>',
						(origin?('<small>'+origin+'</small>'):''),
					'</div>',
				'</td>',
				'<td>',
					((cmd) ? ('<em class="text-muted">'+util.makeSafe(cmd)+'</em>') : ''),
					'<iframe seamless="seamless" sandbox="allow-popups allow-same-origin allow-scripts" data-origin="'+origin+'"><html><body></body></html></iframe>',
				'</td>',
			'</tr>',
		'</table>'
	].join('');
	$('#cmd-out').prepend(html);
	return $('#cmd-out iframe').first();
}

function renderIframe($iframe, html) {
	html = '<link href="css/bootstrap.css" rel="stylesheet"><link href="css/iframe.css" rel="stylesheet">'+html;
	html = '<meta http-equiv="Content-Security-Policy" content="default-src \'none\'; img-src *; style-src \'self\' \'unsafe-inline\'; font-src *;" />'+html;
	$iframe.attr('srcdoc', util.sanitizeHtml(html));
	function sizeIframe() {
		// this.height = '20px';
		this.height = null; // reset so we can get a fresh measurement
		// console.log(this.contentWindow.document.body.scrollHeight);
		this.height = (this.contentWindow.document.body.offsetHeight) + 'px';
	}
	$iframe.load(sizeIframe);

	// :TODO: can this go in .load() ?
	var attempts = 0;
	var bindPoller = setInterval(function() {
		try {
			local.bindRequestEvents($iframe.contents()[0].body);
			$iframe.contents()[0].body.addEventListener('request', iframeRequestEventHandler);
			clearInterval(bindPoller);
		} catch(e) {
			attempts++;
			if (attempts > 100) {
				console.error('Failed to bind iframe events, which meant FIVE SECONDS went by the browser constructing it. Who\'s driving this clown-car?');
				clearInterval(bindPoller);
			}
		}
	}, 50); // wait 50 ms for the page to setup
}

function iframeRequestEventHandler(e) {
	var iframeEl = $(e.target)[0].ownerDocument.defaultView.frameElement;
	var req = e.detail;
	prepIframeRequest(req, iframeEl);
	dispatchRequest(req, e.target, { $iframe: $(iframeEl) });
}

function prepIframeRequest(req, iframeEl) {
	var current_content_origin = 'httpl://' + ((iframeEl) ? iframeEl.id.slice('iframe-'.length) : 'main'); // :DEBUG: pull from iframe or default to main
	if (current_content_origin) {
		// Put origin into the headers
		req.headers.from = current_content_origin;
	}
}

function dispatchRequest(req, origin) {
	var originIsIframe = origin instanceof HTMLIFrameElement;
	var target = req.target; // local.Request() will strip `target`
	var body = req.body; delete req.body;

	if (!target) target = '_self';
	if (!req.headers && target != '_null') { req.headers = {}; }
	if (req.headers && !req.headers.accept) { req.headers.accept = 'text/html, */*'; }
	req = (req instanceof local.Request) ? req : (new local.Request(req));

	// Relative link? Make absolute
	if (!local.isAbsUri(req.url)) {
		var baseurl = (origin.dataset && origin.dataset.origin) ? origin.dataset.origin : (window.location.protocol + '//' + window.location.host);
		req.url = local.joinUri(baseurl, req.url);
	}

	// Handle request based on target and origin
	var res_;
	if (target == '_self' && originIsIframe) {
		// In-place update
		res_ = local.dispatch(req);
		res_.always(function(res) {
			renderIframe(origin, renderResponse(res));
			return res;
		});
	} else if (target == '_self' || target == '_parent') {
		// New iframe
		res_ = local.dispatch(req);
		res_.always(function(res) {
			var origin = (req.urld.protocol != 'data') ? (req.urld.protocol || 'httpl')+'://'+req.urld.authority : null;
			if (origin == 'httpl://cli' && res.header('CLI-Origin')) {
				origin = res.header('CLI-Origin');
			}

			var newIframe = createIframe(origin, res.header('CLI-Cmd'));
			renderIframe(newIframe, renderResponse(res));
			return res;
		});
	} else if (target == '_null') {
		// Null target, simple dispatch
		res_ = local.dispatch(req);
	} else {
		console.error('Invalid request target', target, req, origin);
		return null;
	}

	req.end(body);
	return res_;
}

module.exports = {
	renderIframe: renderIframe,
	prepIframeRequest: prepIframeRequest,
	dispatchRequest: dispatchRequest
};