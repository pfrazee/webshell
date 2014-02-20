// Environment Setup
// =================
var pagent = require('./pagent.js');
local.logAllExceptions = true;

// Traffic logging
local.setDispatchWrapper(function(req, res, dispatch) {
	var res_ = dispatch(req, res);
	res_.then(
		function() { console.log(req, res); },
		function() { console.error(req, res); }
	);
});

// Request events
try { local.bindRequestEvents(document.body); }
catch (e) { console.error('Failed to bind body request events.', e); }
document.body.addEventListener('request', function(e) {
	var req = e.detail;
	pagent.dispatchRequest(req, e.target);
});

// Worker management
local.setHostLookup(require('./worker-loader.js').lookupWorker);
local.addServer('worker-bridge', require('./worker-bridge.js'));

// Servers
local.addServer('cli', require('./cli'));

pagent.dispatchRequest({ url: 'httpl://hosts' });