

var server = servware();
module.exports = server;

server.route('/', function (link, method) {
	method('GET', function (req, res) {
		req.assert({ accept: 'text/html' });

		return [200, [
		'<html><body style="max-width: 560px"><strong>WebSHell 0.1.0</strong>',
			'WebSHell is an open-source project created by <a href="https://twitter.com/pfrazee" target="_blank">Paul Frazee</a> to interact with Web services. It is a command line for HTTP requests, to compose streams of information and to construct interfaces. Responses are shown directly in iframes.',
			'<div class="well" style="margin: 0">Type <a href="httpl://help">help&crarr;</a> to learn the syntax.\nType <a href="httpl://hosts">hosts&crarr;</a> for a list of local hosts.</div>',
			'Multi-threaded "Worker" VMs are used to sandbox Web services on the user\'s computer.',
			'The Worker services use global URLs that extend the HTTP/S namespace. When a request is sent to them, they are downloaded and executed to generate the response. They are closed immediately after the response is received; or after a time-out; or after bad behavior.',
			'Workers can also be persisted through an INSTALL request:\n<code>INSTALL workers?url=https://user.github.io/repo/worker.js</code>',
			'<a href="https://github.com/pfraze/wsh" target="_blank">Fork or clone WebShell</a> and host with <a href="http://pages.github.com/" target="_blank">GitHub Pages</a>. You can execute setup requests in <code>./src/main.js</code>. Use <code>make setup</code> to build.',
			'Uses <a href="https://grimwire.com/local" target="_blank">HTTP Local</a>, <a href="https://github.com/pfraze/servware" target="_blank">Servware</a>, and <a href="http://getbootstrap.com/" target="_blank">Bootstrap 3</a>.',
		'</body></html>'
		].join('\n\n'), {'Content-Type': 'text/html'}];
	});
});

/*
*/