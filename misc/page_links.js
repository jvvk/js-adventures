var system = require('system');
if (system.args.length > 1) {
    url = Array.prototype.slice.call(system.args, 1);
} else {
    console.log("Usage: phantomjs page_links.js <pagelink>");
}
var page = require('webpage').create();
page.settings.userAgent = "Googlebot";
page.open(url, function () {
	var links = page.evaluate(function() {
        	return [].map.call(document.querySelectorAll('a'), function(link) {
	            return link.getAttribute('href');
        	});
    	});

console.log(links.join('\n'));
phantom.exit();
});

