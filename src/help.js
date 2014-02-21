

var server = servware();
module.exports = server;

server.route('/', function (link, method) {
	method('GET', function (req, res) {
		req.assert({ accept: 'text/html' });
		var html;
		switch (req.query.part) {
			case 'intro':
				html = introHtml(req, res);
				break;
			default:
				html = helpHtml(req, res);
		}
		return [200, html, {'Content-Type': 'text/html'}];
	});
});

function introHtml(req, res) {
	return [
	'<html><body style="max-width: 560px">',
		'<h4>WebShell 0.1.0</h4>',
		'<p>WebShell is an open-source project created by <a href="https://twitter.com/pfrazee" target="_blank">Paul Frazee</a> to interact with Web services. It is a command line for HTTP requests, to compose streams of information and to construct interfaces. Responses are shown directly in iframes.</p>',
		'<div class="well">Type <a href="httpl://help">help&crarr;</a> to learn the syntax.<br>Type <a href="httpl://hosts">hosts&crarr;</a> for a list of local hosts.</div>',
		'<p>Multi-threaded "Worker" VMs are used to sandbox Web services on the user\'s computer.</p>',
		'<blockquote class="text-muted">',
			'The Worker services use global URLs that extend the HTTP/S namespace. When a request is sent to them, they are downloaded and executed to generate the response. They are closed immediately after the response is received; or after a time-out; or after bad behavior.<br><br>',
			'Workers can also be persisted through an INSTALL request:<br><code>INSTALL workers?url=https://foo.com/worker.js</code>',
		'</blockquote>',
		'<p><a href="https://github.com/pfraze/webshell" target="_blank">Fork or clone WebShell</a> and host with <a href="http://pages.github.com/" target="_blank">GitHub Pages</a>. You can execute setup requests in ./src/main.js. Use <code>make setup</code> to build.</p>',
		'<p>Uses <a href="https://grimwire.com/local" target="_blank">HTTP Local</a>, <a href="https://github.com/pfraze/servware" target="_blank">Servware</a>, and <a href="http://getbootstrap.com/" target="_blank">Bootstrap 3</a>.</p>',
	'</body></html>'
	].join('');
}

function helpHtml(req, res) {
	return [
	'<html><body style="max-width: 560px">',
		'<h4>todo</h4>',
	'</body></html>'
	].join('');

}