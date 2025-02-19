import { alertService } from './alert';

type ErrorContext = {
  userId?: string;
  email?: string;
  error: Error | string;
  metadata?: Record<string, any>;
};

export class ErrorMonitorService {
  private static instance: ErrorMonitorService;

  private constructor() {}

  public static getInstance(): ErrorMonitorService {
    if (!ErrorMonitorService.instance) {
      ErrorMonitorService.instance = new ErrorMonitorService();
    }
    return ErrorMonitorService.instance;
  }

  private formatErrorFields(context: ErrorContext) {
    const { userId, email, error, metadata } = context;
    const fields = [];

    if (userId) {
      fields.push({
        name: 'ID Utilisateur',
        value: userId,
        inline: true,
      });
    }

    if (email) {
      fields.push({
        name: 'Email',
        value: email,
        inline: true,
      });
    }

    // Add error message
    fields.push({
      name: "Message d'erreur",
      value: error instanceof Error ? error.message : error,
      inline: false,
    });

    // Add stack trace if available
    if (error instanceof Error && error.stack) {
      fields.push({
        name: 'Stack Trace',
        value: `\`\`\`\n${error.stack}\n\`\`\``,
        inline: false,
      });
    }

    // Add metadata if available
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        fields.push({
          name: key,
          value: JSON.stringify(value, null, 2),
          inline: false,
        });
      });
    }

    return fields;
  }

  async userFailedToRegister(context: ErrorContext) {
    await alertService.sendErrorAlert({
      title: "Échec d'inscription utilisateur",
      description: '**Un utilisateur a rencontré une erreur lors de son inscription**',
      fields: this.formatErrorFields({
        ...context,
        metadata: {
          ...context.metadata,
          timestamp: new Date().toISOString(),
          type: 'REGISTRATION_FAILURE',
        },
      }),
      url: process.env.NEXT_PUBLIC_APP_URL,
    });
  }

  async userFailedToCreateListing(
    context: ErrorContext & {
      listingData?: {
        title?: string;
        price?: number;
        category?: string;
      };
    },
  ) {
    await alertService.sendErrorAlert({
      title: "Échec de création d'annonce",
      description: "**Un utilisateur a rencontré une erreur lors de la création d'une annonce**",
      fields: this.formatErrorFields({
        ...context,
        metadata: {
          ...context.metadata,
          listingData: context.listingData,
          timestamp: new Date().toISOString(),
          type: 'LISTING_CREATION_FAILURE',
        },
      }),
      url: process.env.NEXT_PUBLIC_APP_URL,
    });
  }

  async userFailedToUpdateListing(
    context: ErrorContext & {
      listingId: string;
      listingData?: {
        title?: string;
        price?: number;
        category?: string;
        changes?: Record<string, any>;
      };
    },
  ) {
    await alertService.sendErrorAlert({
      title: "Échec de mise à jour d'annonce",
      description: "**Un utilisateur a rencontré une erreur lors de la mise à jour d'une annonce**",
      fields: this.formatErrorFields({
        ...context,
        metadata: {
          ...context.metadata,
          listingId: context.listingId,
          listingData: context.listingData,
          timestamp: new Date().toISOString(),
          type: 'LISTING_UPDATE_FAILURE',
        },
      }),
      url: process.env.NEXT_PUBLIC_APP_URL,
    });
  }
}

// Export a singleton instance
export const errorMonitor = ErrorMonitorService.getInstance();
