// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if (tab.url && tab.url.includes("youtube.com/watch")) {
//     const queryParameters = tab.url.split("?")[1];
//     const urlParameters = new URLSearchParams(queryParameters);

//     chrome.tabs.sendMessage(tabId, {
//       type: "NEW",
//       videoId: urlParameters.get("v"),
//     });
//   }
// });

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlMatches: "youtube.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});
