chrome.commands.onCommand.addListener(command => {
    if (command === "get") { getCopy() }
    if (command === "toggle") { sendToggle() }
})
chrome.browserAction.onClicked.addListener(getCopy)

function getCopy() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "findCrop" }, function (response) {
            if (response.success) {
                chrome.notifications.clear("IM");
                chrome.notifications.create("IM", {
                    type: "basic",
                    iconUrl: '128.png',
                    title: "Copied!",
                    message: "The crop markings have been copied"
                })
            }
        })
    })
}

function sendToggle() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "toggle" }, function (response) {
            chrome.notifications.clear("IM");
            chrome.browserAction.setBadgeText({text: response.status ? "✓" : ""});
            chrome.notifications.create("IM", {
                type: "basic",
                iconUrl: '128.png',
                title: "Toggled!",
                message: "The feature is " + (response.status ? "on" : "off")
            })
        })
    })
}
