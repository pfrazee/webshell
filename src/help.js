var util = require('./util.js');

var server = servware();
module.exports = server;

server.route('/', function(link, method) {
	method('GET', function (req, res) {
		req.assert({ accept: 'text/html' });
		return [200, [
		'<html>',
			'<body>',
				'<p>These buttons are commands which can be clicked or typed into the input at the top of the screen:</p>',
				'<p class="text-muted"><a class="cmd-example" href="httpl://hosts">hosts&crarr;</a> list active hosts</p>',
				'<p class="text-muted"><a class="cmd-example" href="httpl://help">help&crarr;</a> this screen</p>',
				'<p class="text-muted"><a class="cmd-example" href="httpl://help/intro">help/intro&crarr;</a> learn how to use WebShell</p>',
				// '<p><a href="https://github.com/pfraze/webshell" target="_blank">Fork or clone WebShell</a> and host with <a href="http://pages.github.com/" target="_blank">GitHub Pages</a>. You can execute setup requests in ./src/main.js. Use <code>make setup</code> to build.</p>',
			'</body>',
		'</html>'
		].join(''), {'Content-Type': 'text/html'}];
	});
});

function intro1(req, res) {
	req.assert({ accept: 'text/html' });
	return [200, [
		'<p><strong>Welcome to WebShell</strong>. Everything here is powered by Web requests, and the responses are shown in a continuous history.</p>',
		'<p>Fetch the next page:</p>',
		'<p class="text-muted"><a class="cmd-example" href="httpl://help/intro/2">help/intro/2</a> see the next page</p>'
	].join(''), {'Content-Type':'text/html'}];
}

server.route('/intro', function (link, method) {
	method('GET', intro1);
});
server.route('/intro/1', function (link, method) {
	method('GET', intro1);
});

/*
req.assert({ accept: 'text/html' });
	var hostUrld = local.parseUri(window.location.toString());

	return local.GET('http://gwr.io/marked.js').always(function(res2) {
		var src = (res2.body && typeof res2.body == 'string') ? res2.body : (res2.status + ' ' + res2.reason);
		return [200, [
		'<html><head><link href="css/prism.css" rel="stylesheet"></head><body>',
			'<p>Observe this javascript:</p>',
			'<pre><code class="language-javascript">'+util.makeSafe(src)+'</code></pre>',
			'<p>As you can see, it is a Web server.</p>',
			'<p class="text-muted"><a class="cmd-example" href="httpl://gwr.io[marked.js]/help/intro/2">gwr.io[marked.js]/help/intro/2&crarr;</a> use it to generate the next page with markdown</p>',
				// '<p>WebShell is an open-source project created by <a href="https://twitter.com/pfrazee" target="_blank">Paul Frazee</a> to interact with Web services. It is a command line for HTTP requests, to compose streams of information and to construct interfaces. Responses are shown directly in iframes.</p>',
		'</body></html>'
		].join(''), {'Content-Type': 'text/html'}];
	});
	*/
/*server.route('/intro/2', function (link, method) {
	method('GET', function (req, res) {
		req.assert({ accept: 'text/plain' });
		return [200, [
			'Well done! This page is only available in Markdown, and so had to be converted. ([View Original](httpl://help/intro/2))',
			'The commands you type at the top generate Web requests, just like links do. Try typing the next command in the input on the top.',
			'`help/intro/3`'
		].join('\n\n'), {'Content-Type':'text/plain'}];
	});
});*/

server.route('/intro/2', function (link, method) {
	method('GET', function (req, res) {
		req.assert({ accept: 'text/html' });
		return [200, [
			'<p><strong>Well done!</strong> That was a link you clicked, but the response was added to the history instead of replacing the page.</p>',
			'<p>You can type commands at the top to generate Web requests, just like links do. Try typing the next command in the input on the top:</p>',
			'<p class="text-muted"><a class="cmd-example">help/intro/3</a> you\'ll have to type this one!</p>'
		].join(''), {'Content-Type':'text/html'}];
	});
});

server.route('/intro/3', function (link, method) {
	method('GET', function (req, res) {
		req.assert({ accept: 'text/html' });
		return [200, [
			'<p><strong>Alright!</strong> Typing commands isn\'t necessary for WebShell, but it does give you a lot of power.</p>',
			'<p>As it so happens, what you just typed is a URL. If you type it out fully, it looks like this:</p>',
			'<p class="text-muted"><a class="cmd-example" href="httpl://help/intro/4">httpl://help/intro/4</a> see the next page</p>'
		].join(''), {'Content-Type':'text/html'}];
	});
});

server.route('/intro/4', function (link, method) {
	method('GET', function (req, res) {
		req.assert({ accept: 'text/html' });
		return [200, [
			'<p><strong>That\'s it</strong>. Luckily, you don\'t have to type the <code>httpl://</code> part - that\'s the default protocol.</p>',
			'<p>When you enter a command, you send a Web request. In this case, it\'s a GET request, which is another default. If included, the command becomes:</p>',
			'<p class="text-muted"><a class="cmd-example" href="httpl://help/intro/5">GET help/intro/5</a> see the next page</p>'
		].join(''), {'Content-Type':'text/html'}];
	});
});

server.route('/intro/5', function (link, method) {
	method('GET', function (req, res) {
		req.assert({ accept: 'text/html' });
		return [200, [
			'<p><strong>Okay.</strong> Web requests all have "methods". A lot of services only use GET and POST, but there are others in common usage.</p>',
			'<p>Servers in Webshell may use a variety of methods. The next page only supports <code>AWESOME-GET</code>:</p>',
			'<p class="text-muted"><a class="cmd-example" method="AWESOME-GET" href="httpl://help/intro/6">AWESOME-GET help/intro/6</a> awesome-see the next page</p>'
		].join(''), {'Content-Type':'text/html'}];
	});
});

server.route('/intro/6', function (link, method) {
	method('AWESOME-GET', function (req, res) {
		req.assert({ accept: 'text/html' });
		return [200, [
			'<style>',
			'h3 { margin-top: 0 }',
			'.rainbow {',
				'background-image: -webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );',
				'background-image: gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );',
				'color:transparent;',
				'-webkit-background-clip: text;',
				'background-clip: text;',
			'}</style>',
			'<h3><span class="rainbow">AWESOME</span></h3>',
			'<p>You must be wondering what "httpl" is. That\'s a protocol that targets Javascript functions in the page. <a href="httpl://host.com/src/help.js">View This Script</a>.</p>',
			'<p>This is the basis of WebShell\'s power.</p>',
			'<p class="text-muted"><a class="cmd-example" href="httpl://help/intro/7">help/intro/7</a> see the next page</p>'
		].join(''), {'Content-Type':'text/html'}];
	});
});

/*
			'<p>What is HTTPL? The L stands for "Local," and it\'s a way to send requests to servers that live in the user\'s browser - on the Page, or in Web Workers (other threads).</p>',
			'<p><a href="https://grimwire.com/local" target="_blank"><img src="img/httplocal_20x20.png"><strong style="color:#333">HTTP<span class="text-danger">Local</span></strong><a></p>',
			'<p class="text-muted"><a class="cmd-example" href="httpl://help/intro/5">help/intro/5</a> see the next page</p>'
		].join(''), {'Content-Type':'text/html'}];
	});
});*/

server.route('/workers', function(link, method) {
	method('GET', function (req, res) {
		req.assert({ accept: 'text/html' });
		return [200, [
		'<html>',
			'<body>',
				'<h4>About Worker Services</h4>',
				'<p>Multi-threaded "Worker" VMs are used to sandbox Web services on the user\'s computer.</p>',
				// '<blockquote class="text-muted">',
					'<p>The Worker services use global URLs. When a request is sent to them, they are downloaded and executed to generate the response. They are closed immediately after the response is received; or after a time-out; or after bad behavior.</p>',
					'<p>Workers can also be persisted through an INSTALL request:<br><code>INSTALL workers?url=https://foo.com/worker.js</code></p>',
				// '</blockquote>',
			'</body>',
		'</html>'
		].join(''), {'Content-Type': 'text/html'}];
	});
});

/*

  <ul class="list-inline">
            <li><a href="https://grimwire.com/local" target="_blank"><img src="img/httplocal_20x20.png"><strong style="color:#333">HTTP<span class="text-danger">Local</span></strong><a></li>
            <li><a href="https://github.com/pfraze/servware" target="_blank"><img src="img/servware_20x20.png"><strong class="text-success">Servware</strong></a></li>
            <li><a href="http://getbootstrap.com/" target="_blank"><img src="img/bootstrap_20x20.png"><strong class="bootstrap-color">Bootstrap 3</strong></a></li>
          </ul>
          */