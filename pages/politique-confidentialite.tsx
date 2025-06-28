import Head from 'next/head';

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Head>
        <title>Politique de confidentialité - NutriFlow</title>
        <meta name="description" content="Politique de confidentialité de NutriFlow - Comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Politique de confidentialité</h1>
            <p className="text-lg text-gray-600">Comment nous protégeons et utilisons vos données personnelles</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 lg:p-12">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  NutriFlow SAS (ci-après "nous", "notre" ou "NutriFlow") s'engage à protéger la confidentialité de vos 
                  données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, 
                  stockons et protégeons vos informations personnelles lorsque vous utilisez notre plateforme SaaS.
                </p>
                <p>
                  Nous respectons le Règlement Général sur la Protection des Données (RGPD) et la loi française 
                  Informatique et Libertés.
                </p>
              </div>
            </section>

            {/* Données collectées */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Données personnelles collectées</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 Données d'inscription et de compte</h3>
              <ul className="text-gray-700 space-y-2 mb-4 list-disc list-inside">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Profession (diététicien/nutritionniste)</li>
                <li>Numéro ADELI</li>
                <li>Adresse professionnelle</li>
                <li>Informations de facturation</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">2.2 Données d'utilisation</h3>
              <ul className="text-gray-700 space-y-2 mb-4 list-disc list-inside">
                <li>Journaux de connexion (adresse IP, navigateur, système d'exploitation)</li>
                <li>Pages visitées et fonctionnalités utilisées</li>
                <li>Durée des sessions</li>
                <li>Préférences d'utilisation</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">2.3 Données de patients (pour les professionnels)</h3>
              <ul className="text-gray-700 space-y-2 mb-4 list-disc list-inside">
                <li>Informations démographiques des patients</li>
                <li>Données nutritionnelles et de santé</li>
                <li>Plans alimentaires et recommandations</li>
                <li>Historique des consultations</li>
                <li>Notes et observations professionnelles</li>
              </ul>
            </section>

            {/* Finalités */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Finalités du traitement</h2>
              <div className="text-gray-700 space-y-4">
                <p><strong>3.1 Fourniture du service :</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Création et gestion de votre compte professionnel</li>
                  <li>Génération automatique de plans nutritionnels</li>
                  <li>Gestion de la relation avec vos patients</li>
                  <li>Facturation et paiements</li>
                </ul>

                <p><strong>3.2 Amélioration du service :</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Analyse des performances et de l'utilisation</li>
                  <li>Développement de nouvelles fonctionnalités</li>
                  <li>Support technique et assistance</li>
                </ul>

                <p><strong>3.3 Communication :</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Envoi d'informations sur le service</li>
                  <li>Notifications importantes</li>
                  <li>Support client</li>
                </ul>
              </div>
            </section>

            {/* Base légale */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Base légale du traitement</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Exécution du contrat :</strong> Le traitement de vos données est nécessaire pour l'exécution 
                  de notre contrat de service et la fourniture de notre plateforme.
                </p>
                <p>
                  <strong>Intérêt légitime :</strong> L'amélioration de nos services, la sécurité de la plateforme et 
                  l'analyse des performances constituent nos intérêts légitimes.
                </p>
                <p>
                  <strong>Consentement :</strong> Pour certaines communications marketing (avec possibilité de retrait).
                </p>
                <p>
                  <strong>Obligation légale :</strong> Conservation des données de facturation conformément aux 
                  obligations comptables et fiscales.
                </p>
              </div>
            </section>

            {/* Partage des données */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Partage des données</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données uniquement dans 
                  les cas suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Prestataires de services :</strong> Hébergement, paiement, support technique (sous contrat de confidentialité)</li>
                  <li><strong>Obligations légales :</strong> Si requis par la loi ou une autorité compétente</li>
                  <li><strong>Protection des droits :</strong> Pour protéger nos droits, notre sécurité ou celle d'autrui</li>
                </ul>
              </div>
            </section>

            {/* Conservation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Durée de conservation</h2>
              <div className="text-gray-700 space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Données de compte :</strong> Pendant la durée du contrat + 3 ans après résiliation</li>
                  <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
                  <li><strong>Données de patients :</strong> Selon la réglementation professionnelle applicable</li>
                  <li><strong>Journaux de connexion :</strong> 12 mois maximum</li>
                  <li><strong>Données marketing :</strong> Jusqu'au retrait du consentement + 3 ans</li>
                </ul>
              </div>
            </section>

            {/* Sécurité */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Sécurité des données</h2>
              <div className="text-gray-700 space-y-4">
                <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Chiffrement des données en transit et au repos (SSL/TLS, AES-256)</li>
                  <li>Authentification forte et gestion des accès</li>
                  <li>Surveillance continue et détection des intrusions</li>
                  <li>Sauvegardes automatiques et régulières</li>
                  <li>Formation du personnel à la sécurité des données</li>
                  <li>Audits de sécurité réguliers</li>
                </ul>
              </div>
            </section>

            {/* Vos droits */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Vos droits</h2>
              <div className="text-gray-700 space-y-4">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
                  <li><strong>Droit de rectification :</strong> Corriger des données inexactes ou incomplètes</li>
                  <li><strong>Droit d'effacement :</strong> Demander la suppression de vos données</li>
                  <li><strong>Droit de limitation :</strong> Limiter le traitement de vos données</li>
                  <li><strong>Droit de portabilité :</strong> Récupérer vos données dans un format structuré</li>
                  <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
                  <li><strong>Droit de retrait du consentement :</strong> Retirer votre consentement à tout moment</li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez-nous à : <strong>contact@nutri-flow.me</strong> ou via votre espace personnel.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies et technologies similaires</h2>
              <div className="text-gray-700 space-y-4">
                <p>Nous utilisons des cookies pour :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Cookies essentiels :</strong> Fonctionnement de la plateforme et sécurité</li>
                  <li><strong>Cookies de performance :</strong> Analyse d'utilisation et amélioration du service</li>
                  <li><strong>Cookies de préférences :</strong> Mémorisation de vos choix et paramètres</li>
                </ul>
                <p>
                  Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur ou via notre 
                  centre de préférences accessible dans votre compte.
                </p>
              </div>
            </section>

            {/* Transferts internationaux */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Transferts internationaux</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Vos données sont principalement stockées au sein de l'Union Européenne. En cas de transfert vers 
                  un pays tiers, nous nous assurons d'un niveau de protection adéquat par :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Décision d'adéquation de la Commission européenne</li>
                  <li>Clauses contractuelles types approuvées par la Commission</li>
                  <li>Mécanismes de certification reconnus</li>
                </ul>
              </div>
            </section>

            {/* Contact DPO */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact et réclamations</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Délégué à la Protection des Données (DPO) :</strong><br />
                  Email : dpo@nutriflow.fr<br />
                  Adresse : NutriFlow SAS - DPO, 123 Avenue de la République, 75011 Paris
                </p>
                <p>
                  <strong>Autorité de contrôle :</strong><br />
                  En cas de litige, vous pouvez saisir la Commission Nationale de l'Informatique et des Libertés (CNIL) :<br />
                  3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07<br />
                  www.cnil.fr
                </p>
              </div>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Modifications de cette politique</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Nous pouvons modifier cette politique de confidentialité pour refléter les changements dans nos 
                  pratiques ou pour des raisons légales. Toute modification importante sera communiquée par email 
                  et via notre plateforme au moins 30 jours avant son entrée en vigueur.
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
