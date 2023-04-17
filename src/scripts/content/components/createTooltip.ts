// Create the tooltip content element

interface TooltipProps {
  text: string;
}

export const createTooltip = ({ text }: TooltipProps) => {
  const tooltip = document.createElement("div");
  tooltip.textContent = text;
  // tooltip.style.visibility = "visible";
  tooltip.style.position = "absolute";
  tooltip.style.bottom = "125%";
  tooltip.style.left = "50%";
  tooltip.style.transform = "translateX(-50%)";
  tooltip.style.padding = "8px";
  tooltip.style.background = "white";
  tooltip.style.color = "red";
  tooltip.style.borderRadius = "4px";
  tooltip.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
  // tooltip.style.transition = "visibility 0s, opacity 0.2s ease-out";

  tooltip.classList.add('highlight-tooltip');

  return tooltip;
}
