import Link from 'next/link';

import { OAuthProviders } from '$/components/auth/OAuthProviders';
import { ReferralCodeInput } from '$/components/auth/ReferralCodeInput';
import { SignUpForm } from '$/components/auth/SignUpForm';
import { DepartementInput } from '$/components/auth/departement-input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$/components/ui/card';
import { createServerClient } from '$/utils/pocketbase/server';

async function Page() {
  const client = await createServerClient();
  const { oauth2, password } = await client.collection('users').listAuthMethods();

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">S&apos;inscrire</CardTitle>
        <CardDescription>Choisissez votre méthode d&apos;inscription préférée</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ReferralCodeInput />
        <DepartementInput />

        {oauth2?.enabled && oauth2.providers && <OAuthProviders providers={oauth2.providers} />}

        {oauth2?.enabled && oauth2.providers && (
          <div className="bg-muted/30 p-4 rounded-lg border border-muted">
            <h3 className="text-sm font-medium mb-2 text-foreground">🔒 Pourquoi uniquement OAuth ?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pour votre sécurité et votre confort, nous utilisons exclusivement Discord et Google pour l'authentification. Cela
              garantit une sécurité maximale (aucun mot de passe à retenir), une connexion rapide, et réduit les risques de
              piratage. Vos données restent protégées par les systèmes de sécurité avancés de ces plateformes de confiance.
            </p>
          </div>
        )}

        {oauth2?.enabled && password?.enabled && (
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Ou</span>
            </div>
          </div>
        )}
        {password?.enabled && <SignUpForm />}
      </CardContent>
      <CardFooter>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Déjà un compte ?{' '}
          <Link href="/sign-in" className="underline underline-offset-4 hover:text-primary">
            Se connecter
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default Page;
