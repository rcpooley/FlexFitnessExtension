chrome.action.onClicked.addListener(() =>
    chrome.tabs.create({
        url: 'https://flex.plusone.com/FBLogin.aspx',
    })
);
