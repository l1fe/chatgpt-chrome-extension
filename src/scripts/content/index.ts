// contentScript.js
// @ts-ignore
import rangy from 'rangy';
import 'rangy/lib/rangy-textrange';
import 'rangy/lib/rangy-serializer';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-selectionsaverestore';
import 'rangy/lib/rangy-textrange';
import { CommunicationMessage } from "../types";
import { observer } from './observer';
import './index.css';

rangy.init();
const highlighter = rangy.createHighlighter();
highlighter.addClassApplier(
  rangy.createClassApplier("highlight", {
    ignoreWhiteSpace: true,
    elementTagName: "mark",
    tagNames: ["mark"]
  })
);

async function handleSelection() {
  const selection = rangy.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = range.toString();

  if (!selectedText) {
    return;
  }

  highlighter.highlightSelection("highlight");

  const message = {
    type: 'create_highlight',
    data: {
      text: selectedText,
      origin: 'http://localhost',
      range: rangy.serializeSelection(selection, true),
    },
  } as const;

  await chrome.runtime.sendMessage<CommunicationMessage>(message);
}

document.addEventListener('mouseup', handleSelection);

observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener(async (message: CommunicationMessage, sender, sendResponse) => {
  if (message.type === 'content_render_highlights') {
    const highlights = message.data;

    for (const highlight of highlights) {
      const range = rangy.deserializeSelection(highlight.range);
      console.log('Got highlight id, range', highlight._id, range);
    }
  }
});

export { };
