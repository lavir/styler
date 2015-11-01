/*
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage")
		sendResponse({data: localStorage[request.key]});
	else
		sendResponse({}); // snub them.
});
*/

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	var url = tab.url;
	var host = get_hostname(url);

	with_config(function (config) {
		executeScripts(tabId,
			[
				{ code: "var css = '"+ addslashes((config[host + '-css'] || '').replace(/(\r\n|\n|\r)/gm,"")) +"';", runAt: 'document_start' },
				{ code: "var js = '"+ addslashes((config[host + '-js'] || '').replace(/(\r\n|\n|\r)/gm,"")) +"';", runAt: 'document_start' },
				{ file: "jquery.js", runAt: 'document_start' },
				{ file: "styler.js", runAt: 'document_start' }
			]
		);
	});
});
