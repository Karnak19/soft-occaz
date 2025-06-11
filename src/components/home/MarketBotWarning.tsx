import { Alert, AlertDescription } from '$/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function MarketBotWarning() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Alert className="border-amber-200 bg-amber-50 text-amber-800">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-sm">
          <strong>Information importante :</strong> Notre Market Bot rencontre actuellement des difficultés techniques pour
          récupérer les annonces depuis Airsoft-Occasion et France-Airsoft. Nous travaillons activement à résoudre ce problème. En
          attendant, vous pouvez continuer à utiliser toutes les autres fonctionnalités de la plateforme.
        </AlertDescription>
      </Alert>
    </div>
  );
}
