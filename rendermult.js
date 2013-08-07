var RenderUrlsToFile, arrayOfUrls, system;
system = require("system");

/*
Render given urls
@param array of URLs to render
@param callbackPerUrl Function called after finishing each URL, including the last URL
@param callbackFinal Function called after finishing everything
*/
RenderUrlsToFile = function(urls, callbackPerUrl, callbackFinal) {
    var getFilename, next, page, retrieve, urlIndex, webpage;
    urlIndex = 0;
    webpage = require("webpage");
    page = null;
    getFilename = function(url) {
	var fnps = url.split('/');
        return urlIndex + "-" + fnps[fnps.length-1] + "-.png";
    };
    next = function(status, url, file) {
        page.close();
        callbackPerUrl(status, url, file);
        return retrieve();
    };
    retrieve = function() {
        var url;
        if (urls.length > 0) {
            url = urls.shift();
            urlIndex++;
            page = webpage.create();
            page.settings.userName = "BlackRock";
	    page.settings.password = "inV3st";
            page.settings.userAgent = "Googlebot";
            return page.open(url, function(status) {
                var file;
                file = getFilename(url);
                if (status === "success") {
			try
			{	
	                    return window.setTimeout((function() {
        	                page.render(file);
                	        return next(status, url, file);
                    		}), 500);
			}
			catch(err)
			{}
                } else {
                    return next(status, url, file);
                }
            });
        } else {
            return callbackFinal();
        }
    };
    return retrieve();
};

arrayOfUrls = null;

//if (system.args.length > 1) {
//    arrayOfUrls = Array.prototype.slice.call(system.args, 1);
//} else {
//    console.log("Usage: phantomjs render_multi_url.js [domain.name1, domain.name2, ...]");
//    arrayOfUrls = ["www.google.com", "www.bbc.co.uk", "www.phantomjs.org"];
//}

var fs = require('fs'),
    system = require('system');

var content = '',
    f = null,
    lines = null,
    eol = system.os.name == 'windows' ? "\r\n" : "\n";

try {
    f = fs.open(system.args[1], "r");
    content = f.read();
} catch (e) {
    console.log(e);
}

if (f) {
    f.close();
}

if (content) {
    lines = content.split(eol);
    for (var i = 0, len = lines.length; i < len; i++) {
        //console.log(lines[i]);
    }
    arrayOfUrls = lines.splice(0);    	
}

RenderUrlsToFile(arrayOfUrls, (function(status, url, file) {
    if (status !== "success") {
        return console.log("Unable to render '" + url + "'");
    } else {
        return console.log("Rendered '" + url + "' at '" + file + "'");
    }
}), function() {
    return phantom.exit();
});