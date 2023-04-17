import { ContentHighlight, Highlight } from "../../types";
import { API_URL } from "./config";

export class ApiClient {
  private apiUrl: string;
  private authToken: string;

  constructor(authToken: string) {
    this.apiUrl = API_URL;
    this.authToken = authToken;
  }

  private async fetchWithToken(path: string, options?: RequestInit): Promise<Response> {
    // if (this.isTokenExpired()) {
    //   await this.refreshToken(); // Update the auth token if it has expired
    // }

    const headers = {
      'Authorization': `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    };

    const fetchOptions = {
      ...options,
      headers,
    };

    return fetch(`${this.apiUrl}${path}`, fetchOptions);
  }

  private isTokenExpired(): boolean {
    // TODO: Implement logic to check if the token has expired
    return false;
  }

  private async refreshToken(): Promise<void> {
    // TODO: Implement logic to refresh the auth token
    // Update this.authToken with the new token value
    this.authToken = 'new-auth-token';
  }

  private async get<R>(url: string, options?: RequestInit): Promise<R> {
    const response = await this.fetchWithToken(url, {
      ...options,
      method: 'GET',
    });

    return await response.json() as R;
  }

  private async post<R>(url: string, data?: any, options?: RequestInit): Promise<R> {
    const response = await this.fetchWithToken(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });

    return await response.json() as R;
  }

  private async put(url: string, data?: any, options?: RequestInit): Promise<Response> {
    return this.fetchWithToken(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  private async delete(url: string, options?: RequestInit): Promise<Response> {
    return this.fetchWithToken(url, {
      ...options,
      method: 'DELETE',
    });
  }

  async getSummary(text: string) {
    return Promise.resolve(`summary generated by chatgpt for text ${text}`);
  }

  async createHighlight(highlight: ContentHighlight): Promise<Highlight> {
    const createdHighlight = await this.post<Highlight>('/highlights', highlight);

    return createdHighlight;
  }

  async deleteHighlight(id: string) {
    return Promise.resolve();
  }

  async getHighlights(): Promise<Highlight[]> {
    const highlights = await this.get<Highlight[]>('/highlights');

    return highlights;
  }
}

export const apiClient = new ApiClient('token');