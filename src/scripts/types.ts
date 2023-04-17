// Shared types between extension scripts

import { ContentHighlight, Highlight } from "../types"

export type CommunicationMessage = {
  type: 'create_highlight';
  data: ContentHighlight;
} | {
  type: 'remove_highlight';
  data: string;
} | {
  type: 'content_render_highlights';
  data: Highlight[];
}
