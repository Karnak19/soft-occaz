import { env } from '$/env';

type DiscordEmbed = {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: Array<{
    name: string;
    value: string;
    inline?: boolean;
  }>;
  timestamp?: string;
};

type DiscordWebhookPayload = {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: DiscordEmbed[];
};

const DISCORD_WEBHOOK_URL = env.DISCORD_WEBHOOK_URL;

const COLORS = {
  ERROR: 0xff0000, // Red
  WARNING: 0xffa500, // Orange
  INFO: 0x0099ff, // Blue
  SUCCESS: 0x00ff00, // Green
} as const;

export class AlertService {
  private static instance: AlertService;

  private constructor() {}

  public static getInstance(): AlertService {
    if (!AlertService.instance) {
      AlertService.instance = new AlertService();
    }
    return AlertService.instance;
  }

  private async sendDiscordAlert(payload: DiscordWebhookPayload) {
    if (!DISCORD_WEBHOOK_URL) {
      return;
    }

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Discord webhook failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to send Discord alert:', error);
      throw error;
    }
  }

  async sendErrorAlert(params: {
    title: string;
    description: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    url?: string;
  }) {
    const { title, description, fields = [], url } = params;

    const payload: DiscordWebhookPayload = {
      username: 'Airsoft Market Monitor',
      embeds: [
        {
          title: `🚨 ${title}`,
          description,
          color: COLORS.ERROR,
          fields,
          url,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await this.sendDiscordAlert(payload);
  }

  async sendWarningAlert(params: {
    title: string;
    description: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    url?: string;
  }) {
    const { title, description, fields = [], url } = params;

    const payload: DiscordWebhookPayload = {
      username: 'Airsoft Market Monitor',
      embeds: [
        {
          title: `⚠️ ${title}`,
          description,
          color: COLORS.WARNING,
          fields,
          url,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await this.sendDiscordAlert(payload);
  }

  async sendInfoAlert(params: {
    title: string;
    description: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    url?: string;
  }) {
    const { title, description, fields = [], url } = params;

    const payload: DiscordWebhookPayload = {
      username: 'Airsoft Market Monitor',
      embeds: [
        {
          title: `ℹ️ ${title}`,
          description,
          color: COLORS.INFO,
          fields,
          url,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await this.sendDiscordAlert(payload);
  }

  async sendSuccessAlert(params: {
    title: string;
    description: string;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    url?: string;
  }) {
    const { title, description, fields = [], url } = params;

    const payload: DiscordWebhookPayload = {
      username: 'Airsoft Market Monitor',
      embeds: [
        {
          title: `✅ ${title}`,
          description,
          color: COLORS.SUCCESS,
          fields,
          url,
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await this.sendDiscordAlert(payload);
  }
}

// Export a singleton instance
export const alertService = AlertService.getInstance();
