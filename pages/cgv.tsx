import Head from 'next/head';

export default function CGV() {
  return (
    <>
      <Head>
        <title>Conditions Générales de Vente - NutriFlow</title>
        <meta name="description" content="Conditions Générales de Vente de NutriFlow - Modalités d'abonnement, tarification, paiement et remboursement de notre plateforme SaaS." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Conditions Générales de Vente</h1>
            <p className="text-lg text-gray-600">Modalités commerciales et d'abonnement à NutriFlow</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 lg:p-12">
            {/* Préambule */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Préambule</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations commerciales entre 
                  NutriFlow SAS, société par actions simplifiée au capital de 10 000 euros, dont le siège social 
                  est situé 123 Avenue de la République, 75011 Paris, France, et ses clients professionnels.
                </p>
                <p>
                  Toute commande implique l'acceptation sans réserve des présentes CGV qui prévalent sur toute 
                  autre condition proposée par le client.
                </p>
              </div>
            </section>

            {/* Services proposés */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Services proposés</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  NutriFlow propose un service SaaS (Software as a Service) destiné aux professionnels de la 
                  nutrition comprenant :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Plateforme de gestion de cabinet diététique</li>
                  <li>Génération automatique de plans nutritionnels par IA</li>
                  <li>Gestion de la relation patient et suivi personnalisé</li>
                  <li>Système de facturation et de paiement intégré</li>
                  <li>Portail patient sécurisé</li>
                  <li>Outils d'analyse et de reporting</li>
                  <li>Support technique et accompagnement</li>
                </ul>
              </div>
            </section>

            {/* Offres et tarification */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Offres et tarification</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">2.1 Formules d'abonnement</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p><strong>Formule Essentiel :</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>29€ HT/mois</li>
                  <li>Jusqu'à 50 patients actifs</li>
                  <li>Génération de plans IA illimitée</li>
                  <li>Facturation de base</li>
                  <li>Support email</li>
                </ul>

                <p><strong>Formule Professionnel :</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>49€ HT/mois</li>
                  <li>Jusqu'à 150 patients actifs</li>
                  <li>Toutes fonctionnalités incluses</li>
                  <li>Facturation avancée + paiements en ligne</li>
                  <li>Support prioritaire</li>
                  <li>Intégrations tierces</li>
                </ul>

                <p><strong>Formule Cabinet :</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>99€ HT/mois</li>
                  <li>Patients illimités</li>
                  <li>Multi-utilisateurs (jusqu'à 5 praticiens)</li>
                  <li>Fonctionnalités avancées d'analyse</li>
                  <li>Support téléphonique dédié</li>
                  <li>Formation personnalisée</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">2.2 Période d'essai</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  Une période d'essai gratuite de 14 jours est offerte pour toute nouvelle inscription. 
                  Aucune carte bancaire n'est requise pendant cette période. L'essai donne accès à toutes 
                  les fonctionnalités de la formule Professionnel.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">2.3 Engagement et facturation</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Sans engagement :</strong> Résiliation possible à tout moment avec effet au terme 
                  de la période de facturation en cours.
                </p>
                <p>
                  <strong>Avec engagement 12 mois :</strong> Réduction de 15% sur les tarifs annuels. 
                  Résiliation anticipée possible moyennant le paiement des mois restants.
                </p>
                <p>
                  <strong>Facturation :</strong> Mensuelle ou annuelle selon l'option choisie. 
                  Prélèvement automatique en début de période.
                </p>
              </div>
            </section>

            {/* Commande et souscription */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Commande et souscription</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">3.1 Processus de souscription</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>La souscription s'effectue en ligne via notre site web :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Création du compte professionnel</li>
                  <li>Vérification des qualifications professionnelles</li>
                  <li>Choix de la formule d'abonnement</li>
                  <li>Saisie des informations de paiement</li>
                  <li>Validation de la commande</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">3.2 Validation de la commande</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  La commande n'est définitive qu'après validation du paiement et vérification des qualifications 
                  professionnelles. Un email de confirmation est envoyé avec les détails de l'abonnement et les 
                  conditions d'accès.
                </p>
              </div>
            </section>

            {/* Modalités de paiement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Modalités de paiement</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">4.1 Moyens de paiement acceptés</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Carte bancaire (Visa, Mastercard, American Express)</li>
                  <li>Prélèvement SEPA (pour les abonnements récurrents)</li>
                  <li>Virement bancaire (sur demande pour les abonnements annuels)</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">4.2 Sécurisation des paiements</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  Les paiements sont sécurisés par notre partenaire Stripe, certifié PCI DSS niveau 1. 
                  Aucune donnée bancaire n'est stockée sur nos serveurs.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">4.3 Facturation automatique</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  Pour les abonnements récurrents, le renouvellement s'effectue automatiquement à échéance. 
                  Le client est informé par email 7 jours avant chaque prélèvement.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">4.4 Défaut de paiement</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  En cas d'échec de paiement, l'accès au service est suspendu après un délai de grâce de 7 jours. 
                  Des frais de relance de 15€ HT peuvent être appliqués. La résiliation intervient automatiquement 
                  après 30 jours de retard de paiement.
                </p>
              </div>
            </section>

            {/* Livraison et activation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Livraison et activation du service</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>5.1 Délai d'activation :</strong> Le service est activé immédiatement après validation 
                  du paiement et vérification des qualifications professionnelles (sous 24h ouvrées maximum).
                </p>
                <p>
                  <strong>5.2 Accès au service :</strong> Les identifiants de connexion sont communiqués par email 
                  sécurisé. Un accompagnement à la prise en main est proposé selon la formule souscrite.
                </p>
                <p>
                  <strong>5.3 Formation :</strong> Une formation en ligne est incluse. Des sessions de formation 
                  personnalisées peuvent être proposées moyennant supplément.
                </p>
              </div>
            </section>

            {/* Droit de rétractation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Droit de rétractation</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne 
                  s'applique pas aux contrats de fourniture de services pleinement exécutés avant la fin du 
                  délai de rétractation.
                </p>
                <p>
                  Toutefois, pour les professionnels libéraux, une politique de satisfaction garantie est appliquée : 
                  remboursement intégral possible dans les 30 premiers jours en cas d'insatisfaction justifiée.
                </p>
              </div>
            </section>

            {/* Politique de remboursement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Politique de remboursement</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">7.1 Remboursement standard</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  <strong>Période d'essai :</strong> Aucun frais pendant les 14 premiers jours. Résiliation possible 
                  sans frais jusqu'à la fin de cette période.
                </p>
                <p>
                  <strong>Satisfaction garantie :</strong> Remboursement possible dans les 30 premiers jours suivant 
                  la souscription si le service ne répond pas aux attentes (hors utilisation abusive).
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">7.2 Cas particuliers</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  <strong>Défaillance technique :</strong> Remboursement au prorata en cas d'indisponibilité 
                  prolongée du service (&gt;48h consécutives).
                </p>
                <p>
                  <strong>Résiliation anticipée :</strong> Pas de remboursement pour les périodes déjà facturées, 
                  sauf cas de force majeure ou défaillance de notre part.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">7.3 Modalités de remboursement</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  Les remboursements s'effectuent sur le moyen de paiement utilisé pour la transaction initiale, 
                  dans un délai de 14 jours ouvrés après acceptation de la demande.
                </p>
              </div>
            </section>

            {/* Résiliation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Résiliation</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">8.1 Résiliation par le client</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  <strong>Sans engagement :</strong> Résiliation possible à tout moment depuis l'espace client, 
                  avec effet au terme de la période de facturation en cours.
                </p>
                <p>
                  <strong>Avec engagement :</strong> Résiliation anticipée moyennant le paiement des mois restants 
                  ou selon les conditions négociées contractuellement.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">8.2 Résiliation par NutriFlow</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>NutriFlow peut résilier l'abonnement dans les cas suivants :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Non-paiement persistant (après 30 jours de retard)</li>
                  <li>Violation des conditions d'utilisation</li>
                  <li>Usage frauduleux ou abusif du service</li>
                  <li>Perte des qualifications professionnelles requises</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">8.3 Effets de la résiliation</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  À la résiliation, l'accès au service cesse immédiatement. Les données sont conservées 30 jours 
                  pour permettre une éventuelle réactivation, puis supprimées définitivement sauf obligations 
                  légales contraires.
                </p>
                <p>
                  Le client peut demander l'export de ses données pendant cette période de 30 jours.
                </p>
              </div>
            </section>

            {/* Support et garanties */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Support et garanties</h2>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">9.1 Support technique</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Email :</strong> Support@nutriflow.fr (réponse sous 24h ouvrées)</li>
                  <li><strong>Chat en ligne :</strong> Disponible aux heures ouvrables</li>
                  <li><strong>Téléphone :</strong> Pour les formules Professionnel et Cabinet</li>
                  <li><strong>Base de connaissances :</strong> Accessible 24h/24</li>
                </ul>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">9.2 Garanties de service</h3>
              <div className="text-gray-700 space-y-4 mb-4">
                <p>
                  <strong>Disponibilité :</strong> 99,5% de temps de fonctionnement mensuel garanti 
                  (hors maintenance programmée).
                </p>
                <p>
                  <strong>Sécurité :</strong> Chiffrement des données, sauvegardes quotidiennes, 
                  conformité RGPD garantie.
                </p>
                <p>
                  <strong>Performance :</strong> Temps de réponse moyen &lt; 2 secondes pour les requêtes standard.
                </p>
              </div>

              <h3 className="text-xl font-medium text-gray-900 mb-3">9.3 Limitations de garantie</h3>
              <div className="text-gray-700 space-y-4">
                <p>
                  La garantie ne couvre pas les dysfonctionnements dus à une utilisation non conforme, 
                  une modification du service par le client, ou des causes externes (force majeure, 
                  problèmes de connectivité internet, etc.).
                </p>
              </div>
            </section>

            {/* Modifications tarifaires */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Modifications tarifaires</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  NutriFlow se réserve le droit de modifier ses tarifs avec un préavis de 60 jours minimum. 
                  Pour les abonnements en cours, les nouveaux tarifs s'appliquent au prochain renouvellement.
                </p>
                <p>
                  En cas d'augmentation supérieure à 10%, le client peut résilier son abonnement sans frais 
                  dans les 30 jours suivant la notification.
                </p>
              </div>
            </section>

            {/* Réclamations */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Réclamations et médiation</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>Service client :</strong> contact@nutri-flow.me ou +33 (0)7 81 69 86 37
                </p>
                <p>
                  <strong>Médiation :</strong> En cas de litige persistant, recours possible à la médiation 
                  via la plateforme gouvernementale : https://www.mediation-conso.fr
                </p>
                <p>
                  <strong>Médiateur de la consommation :</strong> DEVIGNY MEDIATION 
                  (www.devignymediation.fr)
                </p>
              </div>
            </section>

            {/* Dispositions générales */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Dispositions générales</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>12.1 Droit applicable :</strong> Les présentes CGV sont régies par le droit français.
                </p>
                <p>
                  <strong>12.2 Juridiction :</strong> En cas de litige, les tribunaux de Paris sont seuls compétents.
                </p>
                <p>
                  <strong>12.3 Nullité partielle :</strong> Si une clause des présentes CGV était déclarée nulle, 
                  les autres dispositions resteraient en vigueur.
                </p>
                <p>
                  <strong>12.4 Modifications :</strong> Les présentes CGV peuvent être modifiées avec un préavis 
                  de 30 jours minimum.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  <strong>NutriFlow SAS</strong><br />
                  123 Avenue de la République<br />
                  75011 Paris, France<br />
                  <strong>Email :</strong> contact@nutri-flow.me<br />
                  <strong>Téléphone :</strong> +33 (0)1 XX XX XX XX<br />
                  <strong>SIRET :</strong> En cours d'attribution<br />
                  <strong>TVA :</strong> En cours d'attribution
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
