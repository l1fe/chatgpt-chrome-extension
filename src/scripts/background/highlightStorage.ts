import { ContentHighlight, Highlight } from "../../types";
import { apiClient, ApiClient } from "./api";

class HighlightsStorage {
  private highlights: Map<string, Highlight> = new Map();

  constructor(private apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async addHighlight(highlight: ContentHighlight): Promise<Highlight> {
    const createdHighlight = await this.apiClient.createHighlight(highlight);

    console.log('Got created highlight', createdHighlight);

    this.highlights.set(createdHighlight._id, createdHighlight);

    return createdHighlight;
  }

  async removeHighlight(id: string): Promise<void> {
    await this.apiClient.deleteHighlight(id);
  
    this.highlights.delete(id);
  }

  async getHighlights(): Promise<Highlight[]> {
    const highlights = await this.apiClient.getHighlights();
    this.highlights.clear();
    for (const highlight of highlights) {
      this.highlights.set(highlight._id, highlight);
    }

    return highlights;
  }

  getHighlight(id: string): Highlight | undefined {
    return this.highlights.get(id);
  }
}

export const highlightsStorage = new HighlightsStorage(apiClient);
