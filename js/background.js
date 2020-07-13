var id = 100;

chrome.browserAction.onClicked.addListener(function() {

    
    chrome.tabs.captureVisibleTab(null, { format : "png"}, function(screenshotUrl) {
      
        var viewTabUrl = chrome.extension.getURL('scnShot.html?' + screenshotUrl)
        var tagetID = null;
        chrome.tabs.create({ url: viewTabUrl},);

        console.log(viewTabUrl)
    });
  });