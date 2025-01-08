import Link from 'next/link';

export const dynamic = 'force-static';

export default function Page() {
  return (
    <div className="prose prose-sm prose-invert mx-auto max-w-[100ch]">
      <h1>Politique de Confidentialité</h1>
      <p>Dernière mise à jour : 19 mars 2024</p>

      <p>
        Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations lorsque vous
        utilisez notre service. Elle vous informe également de vos droits et de la manière dont la loi vous protège.
      </p>

      <h2>Définitions</h2>
      <ul>
        <li>
          <p>
            <strong>Compte</strong> désigne votre compte créé pour accéder à notre service.
          </p>
        </li>
        <li>
          <p>
            <strong>Service</strong> désigne le site web Airsoft Market, accessible à l&apos;adresse{' '}
            <Link href="https://airsoft-market.store">https://airsoft-market.store</Link>
          </p>
        </li>
        <li>
          <p>
            <strong>Données Personnelles</strong> désigne toute information se rapportant à une personne physique identifiée ou
            identifiable.
          </p>
        </li>
      </ul>

      <h2>Collecte et Utilisation de vos Données</h2>

      <h3>Types de Données Collectées</h3>

      <h4>Données Personnelles</h4>
      <p>
        Lors de l&apos;utilisation de notre service, nous pouvons vous demander de nous fournir certaines informations
        personnelles qui peuvent être utilisées pour vous contacter ou vous identifier :
      </p>
      <ul>
        <li>Adresse e-mail</li>
        <li>Nom et prénom</li>
        <li>Numéro de téléphone</li>
      </ul>

      <h4>Connexion via les Réseaux Sociaux</h4>
      <p>Vous pouvez créer un compte et vous connecter via :</p>
      <ul>
        <li>Google</li>
        <li>Facebook</li>
        <li>Discord</li>
      </ul>
      <p>
        Si vous choisissez de vous connecter via un réseau social, nous pouvons collecter les données déjà associées à votre
        compte (comme votre nom et email). Ces informations sont régies par cette politique de confidentialité.
      </p>

      <h3>Cookies et Technologies de Suivi</h3>
      <p>
        Nous utilisons des cookies et des technologies similaires pour des fonctionnalités essentielles et pour améliorer notre
        service. Les technologies que nous utilisons sont :
      </p>
      <ul>
        <li>
          <strong>Cookies Essentiels</strong>
          <ul>
            <li>Cookies d&apos;authentification pour gérer votre connexion</li>
            <li>Cookies de session pour maintenir votre session active</li>
            <li>Cookies de suivi des annonces vues pour améliorer votre expérience de navigation</li>
            <li>Cookie de consentement pour mémoriser vos préférences</li>
          </ul>
        </li>
        <li>
          <strong>Outils d&apos;Analyse Respectueux de la Vie Privée</strong>
          <ul>
            <li>
              <strong>Plausible Analytics :</strong> Un outil d&apos;analyse qui ne collecte aucune donnée personnelle et
              n&apos;utilise pas de cookies.
            </li>
            <li>
              <strong>Vercel Speed Insights :</strong> Un outil de mesure de performance qui collecte uniquement des données
              techniques anonymes.
            </li>
          </ul>
        </li>
      </ul>

      <h3>Utilisation de vos Données</h3>
      <p>Nous utilisons vos données personnelles pour :</p>
      <ul>
        <li>Gérer votre compte et vous permettre d&apos;utiliser notre service</li>
        <li>Vous contacter concernant des mises à jour ou des informations importantes</li>
        <li>Améliorer notre service et votre expérience utilisateur</li>
        <li>Assurer la sécurité de notre plateforme</li>
      </ul>

      <h3>Partage de vos Données</h3>
      <p>Nous partageons vos informations uniquement dans les cas suivants :</p>
      <ul>
        <li>
          <strong>Avec les autres utilisateurs :</strong> lorsque vous interagissez publiquement sur la plateforme (annonces,
          messages publics)
        </li>
        <li>
          <strong>Avec votre consentement :</strong> après avoir obtenu votre autorisation explicite
        </li>
        <li>
          <strong>Pour des obligations légales :</strong> si la loi nous y oblige
        </li>
      </ul>

      <h2>Conservation des Données</h2>
      <p>
        Nous conservons vos données personnelles uniquement le temps nécessaire aux finalités décrites dans cette politique. Vous
        pouvez demander la suppression de vos données à tout moment via les paramètres de votre compte ou en nous contactant.
      </p>

      <h2>Vos Droits</h2>
      <p>Conformément au RGPD, vous disposez des droits suivants :</p>
      <ul>
        <li>Droit d&apos;accès à vos données personnelles</li>
        <li>Droit de rectification de vos données</li>
        <li>Droit à l&apos;effacement de vos données</li>
        <li>Droit à la limitation du traitement</li>
        <li>Droit à la portabilité de vos données</li>
        <li>Droit d&apos;opposition au traitement</li>
      </ul>

      <h2>Sécurité des Données</h2>
      <p>
        La sécurité de vos données est importante pour nous. Nous mettons en œuvre des mesures de sécurité appropriées pour
        protéger vos informations. Cependant, aucune méthode de transmission sur Internet n&apos;est totalement sécurisée.
      </p>

      <h2>Protection des Mineurs</h2>
      <p>
        Notre service ne s&apos;adresse pas aux personnes de moins de 13 ans. Si vous êtes parent et que vous apprenez que votre
        enfant nous a fourni des informations personnelles, contactez-nous.
      </p>

      <h2>Modifications de cette Politique</h2>
      <p>
        Nous pouvons mettre à jour cette politique de confidentialité. Nous vous informerons de tout changement en publiant la
        nouvelle version sur cette page et en vous envoyant un email si les modifications sont importantes.
      </p>

      <h2>Nous Contacter</h2>
      <p>Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter :</p>
      <ul>
        <li>Par email : support@airsoft-market.store</li>
      </ul>
    </div>
  );
}
