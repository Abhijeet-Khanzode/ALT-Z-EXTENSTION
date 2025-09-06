chrome.commands.onCommand.addListener((command) => {
  if (command === "send-selection-to-bot") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      chrome.scripting.executeScript({
        target: { tabId },
        func: () => window.getSelection().toString()
      }, async (results) => {
        if (!results || !results[0] || !results[0].result) {
          console.log("No selection found.");
          return;
        }

        const text = results[0].result;

        try {
          const resp = await fetch("https://t-bot-luhe.onrender.com/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
          });

          const data = await resp.json();
          console.log("Server response:", data);
        } catch (err) {
          console.error("Send error:", err);
        }
      });
    });
  }
});
