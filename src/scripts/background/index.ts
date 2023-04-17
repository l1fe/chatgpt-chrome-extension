import { highlightsStorage } from "./highlightStorage";
import { CommunicationMessage } from "../types";

// Register event listeners

console.log('Background: script loaded!');

chrome.runtime.onMessage.addListener(async (message: CommunicationMessage, sender, sendResponse) => {
  if (message.type === 'create_highlight') {
    console.log('Got incoming message', message);
    const highlight = await highlightsStorage.addHighlight(message.data);
    
    console.log('Background: received message, created highlight', highlight);
  } else if (message.type === 'remove_highlight') {
    const id = message.data;
    await highlightsStorage.removeHighlight(id);
  } else {
    console.error(`Unknown message type: ${(message as any)?.type}`);
  } 
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  console.log(changeInfo);

  if (changeInfo.status == 'complete' && tab.active) {
    const highlights = await highlightsStorage.getHighlights();

    await chrome.tabs.sendMessage(tabId, { type: "content_render_highlights", data: highlights });  
  }
})

export { };
