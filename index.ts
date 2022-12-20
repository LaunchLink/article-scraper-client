import { parseArticles } from "./parsers/articles";
import { parseClients } from "./parsers/clients";
import { fetcher } from "./services/fetcher";

interface PanopticonClientOptions {
  panopticonApiKey: string;
}

export class PanopticonClient {
  private apiKey: string;

  constructor(options: Partial<PanopticonClientOptions> = {}) {
    const provisionalApiKey =
      options.panopticonApiKey || process.env.PANOPTICON_API_KEY;
    if (!provisionalApiKey) {
      throw new Error("No API key provided.");
    } else if (!provisionalApiKey.startsWith("PANOPTICON")) {
      throw new Error(
        "Are you sure this is a valid API key? All API keys should start with PANOPTICON_"
      );
    } else {
      this.apiKey = provisionalApiKey;
    }
  }

  public async getArticles() {
    return await fetcher("/articles", "GET", parseArticles, this.apiKey);
  }

  public async getClients() {
    return await fetcher("/client", "GET", parseClients, this.apiKey);
  }
}
