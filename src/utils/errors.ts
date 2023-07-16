export const ERROR_CODES = {
  MAX_LISTINGS_REACHED: 'MAX_LISTINGS_REACHED',
} as const;

type ErrorCodes = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export const ERRORS = new Map<ErrorCodes, string>([
  [
    ERROR_CODES.MAX_LISTINGS_REACHED,
    "Vous avez atteint le nombre maximum d'annonces autorisées pour votre abonnement. Veuillez mettre à niveau votre abonnement pour créer plus d'annonces.",
  ],
]);
