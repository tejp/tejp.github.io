var page = require('webpage').create();

var baseurl = 'http://localhost:8080/monotowns/?',
	paraurl = ['all','mining','manufacturing','others'],
	index = 1;

page.viewportSize = {
	width: "1280",
	height: "720"
};

page.onConsoleMessage = function(msg) {
	console.log("console message: " + msg);
};

page.open(baseurl+paraurl[index], function(status) {
	window.setTimeout(function () {
        page.render(paraurl[index]+'.png');
        phantom.exit();
    }, 3000);
});
