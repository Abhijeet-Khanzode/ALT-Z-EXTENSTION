chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getSelection") {
        const sel = window.getSelection ? window.getSelection().toString() : "";
        sendResponse({ text: sel });
    }
});


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "readClipboard") {
        navigator.clipboard.readText().then((clipText) => {
            sendResponse({ text: clipText });
        }).catch((err) => {
            console.error("Clipboard read failed:", err);
            sendResponse({ text: "" });
        });
        return true; // async response ke liye required
    }
});
