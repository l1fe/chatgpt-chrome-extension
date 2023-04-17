import { createTooltip } from "./components/createTooltip";

// Listen for changes to the DOM and dynamically add event listeners to highlighted elements
export const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // @ts-ignore
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.classList.contains('highlight')) {
          addedNode.addEventListener('mouseenter', handleHighlightMouseEnter);
          addedNode.addEventListener('mouseleave', handleHighlightMouseLeave);
        }
      }
    }
  }
});

function handleHighlightMouseEnter(event: any) {
  const tooltip = createTooltip({ text: 'ChatGPT Summary' });

  // @ts-ignore
  this.appendChild(tooltip);
}

function handleHighlightMouseLeave(event: any) {
  // Remove the tooltip from the highlighted element
  // @ts-ignore
  const tooltip = this.querySelector('.highlight-tooltip');
  
  if (tooltip) {
    // @ts-ignore
    this.removeChild(tooltip);
  }
}
