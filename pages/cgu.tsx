import Head from 'next/head';

export default function CGU() {
  return (
    <>
      <Head>
        <title>Conditions Générales d'Utilisation - NutriFlow</title>
        <meta name="description" content="Conditions Générales d'Utilisation de NutriFlow - Règles et responsabilités pour l'utilisation de notre plateforme SaaS pour diététiciens." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Conditions Générales d'Utilisation</h1>
            <p className="text-lg text-gray-600">Règles et modalités d'utilisation de NutriFlow</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 lg:p-12">
            {/* Préambule */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Préambule</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Les présentes Conditions Générales d'Utilisation (CGU) définissent les modalités et conditions 
                  d'utilisation de la plateforme SaaS NutriFlow, éditée par NutriFlow SAS, société par actions 
                  simplifiée au capital de 10 000 euros, dont le siège social est situé 123 Avenue de la République, 
                  75011 Paris, France.
                </p>
                <p>
                  L'utilisation de la plateforme NutriFlow implique l'acceptation pleine et entière des présentes 
                  conditions générales d'utilisation.
                </p>
              </div>
            </section>

            {/* Définitions */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Définitions</h2>
              <div className="text-gray-700 space-y-3">
                <p><strong>Plateforme :</strong> La solution SaaS NutriFlow accessible via l'adresse nutri-flow.me</p>
                <p><strong>Utilisateur :</strong> Toute personne physique ou morale utilisant la Plateforme</p>
                <p><strong>Professionnel :</strong> Diététicien, nutritionniste ou professionnel de santé autorisé</p>
                <p><strong>Patient :</strong> Personne bénéficiant des services du Professionnel via la Plateforme</p>
                <p><strong>Compte :</strong> Espace personnel sécurisé permettant l'accès à la Plateforme</p>
                <p><strong>Services :</strong> L'ensemble des fonctionnalités proposées par NutriFlow</p>
              </div>
            </section>

            {/* Objet */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Objet</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  NutriFlow est une plateforme SaaS destinée aux professionnels de la nutrition offrant :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Génération automatique de plans nutritionnels personnalisés</li>
                  <li>Gestion de la relation patient</li>
                  <li>Outils de suivi et d'analyse nutritionnelle</li>
                  <li>Système de facturation intégré</li>
                  <li>Portail patient pour le suivi personnalisé</li>
                  <li>Outils de communication professionnel-patient</li>
                </ul>
              </div>
            </section>

            {/* Accès et inscription */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Accès et inscription</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">3.1 Conditions d'accès</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  L'accès à NutriFlow est réservé aux professionnels de la nutrition (diététiciens, nutritionnistes) 
                  disposant des qualifications et autorisations légales requises pour exercer leur profession.
                </p>
                <p>
                  L'Utilisateur doit être majeur et disposer de la capacité juridique pour s'engager contractuellement.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">3.2 Processus d'inscription</h3>
              <div className="text-gray-700 space-y-4">
                <p>L'inscription nécessite de fournir des informations exactes et à jour :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Identité complète</li>
                  <li>Qualifications professionnelles</li>
                  <li>Numéro ADELI ou équivalent</li>
                  <li>Coordonnées professionnelles</li>
                  <li>Informations de facturation</li>
                </ul>
                <p>
                  NutriFlow se réserve le droit de vérifier ces informations et de refuser toute inscription 
                  qui ne respecterait pas les conditions requises.
                </p>
              </div>
            </section>

            {/* Obligations de l'utilisateur */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Obligations de l'Utilisateur</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">4.1 Usage conforme</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>L'Utilisateur s'engage à :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Utiliser la Plateforme dans le cadre de son activité professionnelle légale</li>
                  <li>Respecter les règles déontologiques de sa profession</li>
                  <li>Maintenir la confidentialité de ses identifiants de connexion</li>
                  <li>Informer immédiatement NutriFlow de toute utilisation non autorisée de son compte</li>
                  <li>Ne pas utiliser la Plateforme à des fins illégales ou non autorisées</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">4.2 Responsabilité professionnelle</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>L'Utilisateur reste entièrement responsable :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>De la pertinence des conseils nutritionnels donnés à ses patients</li>
                  <li>De la validation médicale des plans générés automatiquement</li>
                  <li>Du respect du secret médical et professionnel</li>
                  <li>De l'obtention du consentement éclairé de ses patients</li>
                  <li>De la conformité avec la réglementation applicable à sa profession</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">4.3 Interdictions</h3>
              <div className="text-gray-700 space-y-4">
                <p>Il est strictement interdit de :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Partager ses identifiants de connexion avec des tiers</li>
                  <li>Utiliser la Plateforme pour des activités illégales</li>
                  <li>Tenter de contourner les mesures de sécurité</li>
                  <li>Extraire ou copier le contenu de la base de données</li>
                  <li>Utiliser des scripts automatisés pour accéder à la Plateforme</li>
                  <li>Perturber le fonctionnement normal des Services</li>
                </ul>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Propriété intellectuelle</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">5.1 Droits de NutriFlow</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  NutriFlow détient tous les droits de propriété intellectuelle sur la Plateforme, notamment :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Le code source et l'architecture logicielle</li>
                  <li>Les algorithmes d'intelligence artificielle</li>
                  <li>Les bases de données nutritionnelles</li>
                  <li>Les marques, logos et éléments graphiques</li>
                  <li>La documentation et les contenus éditoriaux</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">5.2 Licence d'utilisation</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  NutriFlow accorde à l'Utilisateur une licence personnelle, non exclusive, non cessible et 
                  révocable d'utilisation de la Plateforme, limitée à la durée du contrat et dans le respect 
                  des présentes CGU.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">5.3 Contenus de l'Utilisateur</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  L'Utilisateur conserve la propriété de ses données et contenus. Il accorde toutefois à NutriFlow 
                  une licence limitée pour traiter ces données dans le cadre de la fourniture des Services.
                </p>
              </div>
            </section>

            {/* Disponibilité */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disponibilité et maintenance</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>6.1 Objectif de disponibilité :</strong> NutriFlow s'engage à maintenir une disponibilité 
                  de la Plateforme de 99,5% sur une base mensuelle, hors maintenance programmée.
                </p>
                <p>
                  <strong>6.2 Maintenance :</strong> Des opérations de maintenance peuvent nécessiter une interruption 
                  temporaire du service. L'Utilisateur sera informé au moins 48h à l'avance sauf cas d'urgence.
                </p>
                <p>
                  <strong>6.3 Évolutions :</strong> NutriFlow peut faire évoluer la Plateforme. Les modifications 
                  majeures seront communiquées au moins 30 jours à l'avance.
                </p>
              </div>
            </section>

            {/* Limitations de responsabilité */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitations de responsabilité</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>7.1 Nature de l'outil :</strong> NutriFlow est un outil d'aide à la décision. La responsabilité 
                  des conseils nutritionnels et du suivi médical incombe entièrement au professionnel utilisateur.
                </p>
                <p>
                  <strong>7.2 Limitation de responsabilité :</strong> La responsabilité de NutriFlow est limitée aux 
                  dommages directs et ne peut excéder le montant des sommes versées au cours des 12 derniers mois.
                </p>
                <p>
                  <strong>7.3 Exclusions :</strong> NutriFlow ne saurait être tenue responsable des dommages indirects, 
                  perte de données, manque à gagner, ou conséquences d'une utilisation inappropriée de la Plateforme.
                </p>
              </div>
            </section>

            {/* Suspension et résiliation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Suspension et résiliation</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">8.1 Suspension</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>NutriFlow peut suspendre immédiatement l'accès en cas de :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violation des présentes CGU</li>
                  <li>Défaut de paiement</li>
                  <li>Utilisation frauduleuse ou abusive</li>
                  <li>Risque pour la sécurité de la Plateforme</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">8.2 Résiliation</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Par l'Utilisateur :</strong> Résiliation possible à tout moment avec préavis d'un mois, 
                  sans pénalité après la période d'engagement minimale.
                </p>
                <p>
                  <strong>Par NutriFlow :</strong> Résiliation possible pour motif légitime avec préavis de 2 mois, 
                  ou immédiatement en cas de violation grave des CGU.
                </p>
              </div>
            </section>

            {/* Données personnelles */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Protection des données</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Le traitement des données personnelles est régi par notre Politique de Confidentialité. 
                  L'Utilisateur dispose de droits d'accès, rectification, effacement et portabilité de ses données.
                </p>
                <p>
                  En cas de résiliation, les données sont conservées pendant les durées légales puis supprimées, 
                  sauf demande expresse de conservation ou obligation légale contraire.
                </p>
              </div>
            </section>

            {/* Force majeure */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Force majeure</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  NutriFlow ne saurait être tenue responsable de l'inexécution ou des retards d'exécution de ses 
                  obligations résultant d'un cas de force majeure tel que défini par la jurisprudence française.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Droit applicable et litiges</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Les présentes CGU sont régies par le droit français. En cas de litige, et après recherche 
                  d'une solution amiable, les tribunaux de Paris seront seuls compétents.
                </p>
                <p>
                  L'Utilisateur professionnel peut également recourir à la médiation en contactant : 
                  mediation@nutriflow.fr
                </p>
              </div>
            </section>

            {/* Modifications */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modifications des CGU</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  NutriFlow se réserve le droit de modifier les présentes CGU. Toute modification sera communiquée 
                  par email au moins 30 jours avant son entrée en vigueur. L'absence d'opposition dans ce délai 
                  vaut acceptation des nouvelles conditions.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Pour toute question relative aux présentes CGU :<br />
                  <strong>Email :</strong> contact@nutri-flow.me<br />
                  <strong>Adresse :</strong> NutriFlow SAS, 123 Avenue de la République, 75011 Paris<br />
                  <strong>Téléphone :</strong> +33 (0)1 XX XX XX XX
                </p>
                <p><strong>Dernière mise à jour :</strong> 28 juin 2025</p>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="text-center mt-12">
            <a 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              ← Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
