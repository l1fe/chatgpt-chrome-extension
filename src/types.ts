// Shared types

export interface Highlight {
  _id: string;
  text: string;
  summary: string;
  createdAt: number;
  origin: string;
  range: string;
}

export type ContentHighlight = Pick<Highlight, "text" | "origin" | "range">;
