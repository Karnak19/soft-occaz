/**
 * Utility functions for handling Market Bot related operations
 */

// Market Bot's user ID
export const MARKET_BOT_ID = 'v163jc234126c64';

/**
 * Checks if a user ID belongs to the Market Bot
 * @param userId - The user ID to check
 * @returns True if the user ID matches the Market Bot's ID
 */
export function isMarketBot(userId: string): boolean {
  return userId === MARKET_BOT_ID;
}

/**
 * Checks if a user ID does NOT belong to the Market Bot
 * @param userId - The user ID to check
 * @returns True if the user ID does NOT match the Market Bot's ID
 */
export function isNotMarketBot(userId: string): boolean {
  return userId !== MARKET_BOT_ID;
}

/**
 * Message context types for Market Bot messages
 */
export type MessageContext = 'listing' | 'profile' | 'search' | 'default';

/**
 * Returns a message explaining why interaction with Market Bot is disabled
 * @param context - The context in which the message is displayed
 * @returns A user-friendly message explaining the Market Bot based on context
 */
export function getMarketBotDisabledMessage(context: MessageContext = 'default'): string {
  switch (context) {
    case 'listing':
      return 'Cette annonce a été importée par Market Bot. Veuillez utiliser le lien original pour contacter le vendeur.';
    case 'profile':
      return "Market Bot est notre système automatisé qui importe des annonces. Ce n'est pas un utilisateur réel et ne répond pas aux messages.";
    case 'search':
      return 'Cette recherche est gérée par Market Bot. Consultez les annonces correspondantes pour contacter les vendeurs.';
    default:
      return 'Market Bot est un système automatisé qui ne répond pas aux messages. Veuillez contacter directement les vendeurs via les liens originaux.';
  }
}
