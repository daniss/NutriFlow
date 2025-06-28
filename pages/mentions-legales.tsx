import Head from 'next/head';

export default function MentionsLegales() {
  return (
    <>
      <Head>
        <title>Mentions légales - NutriFlow</title>
        <meta name="description" content="Mentions légales de NutriFlow - Informations sur l'éditeur, l'hébergeur et les conditions d'utilisation de notre plateforme SaaS pour diététiciens." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentions légales</h1>
            <p className="text-lg text-gray-600">Informations légales relatives à NutriFlow</p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 lg:p-12">
            {/* Éditeur du site */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Éditeur du site</h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Dénomination sociale :</strong> NutriFlow SAS</p>
                <p><strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)</p>
                <p><strong>Capital social :</strong> 10 000 euros</p>
                <p><strong>SIRET :</strong> En cours d'attribution</p>
                <p><strong>Code APE :</strong> 6201Z (Programmation informatique)</p>
                <p><strong>TVA intracommunautaire :</strong> En cours d'attribution</p>
                <p><strong>Siège social :</strong> 123 Avenue de la République, 75011 Paris, France</p>
                <p><strong>Téléphone :</strong> +33 (0)1 XX XX XX XX</p>
                <p><strong>Email :</strong> contact@nutri-flow.me</p>
                <p><strong>Directeur de la publication :</strong> Danis Cindrak</p>
              </div>
            </section>

            {/* Hébergement */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hébergement</h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Hébergeur :</strong> DigitalOcean, LLC</p>
                <p><strong>Adresse :</strong> 101 Avenue of the Americas, 10th Floor, New York, NY 10013, USA</p>
                <p><strong>Téléphone :</strong> +1 (866) 409-1497</p>
                <p><strong>Site web :</strong> https://www.digitalocean.com</p>
                <p><strong>Localisation des serveurs :</strong> Union Européenne (Frankfurt, Allemagne)</p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Propriété intellectuelle</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  L'ensemble du contenu du site NutriFlow (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) 
                  est protégé par les droits de propriété intellectuelle. Ces éléments sont la propriété exclusive de 
                  NutriFlow SAS ou de ses partenaires.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments 
                  du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable 
                  de NutriFlow SAS.
                </p>
                <p>
                  La marque "NutriFlow" ainsi que les logos et signes distinctifs sont des marques déposées ou en cours 
                  de dépôt de NutriFlow SAS. Toute utilisation non autorisée de ces marques est strictement interdite.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Responsabilité</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  NutriFlow SAS s'efforce de fournir des informations aussi précises que possible. Toutefois, elle ne 
                  pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, 
                  qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
                <p>
                  NutriFlow SAS ne saurait être tenue responsable de l'utilisation des informations nutritionnelles 
                  fournies par la plateforme. Ces informations sont données à titre indicatif et ne remplacent en 
                  aucun cas l'avis d'un professionnel de santé qualifié.
                </p>
                <p>
                  L'utilisateur assume l'entière responsabilité de l'utilisation qu'il fait des informations et 
                  contenus présents sur le site NutriFlow.
                </p>
              </div>
            </section>

            {/* Protection des données */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Protection des données personnelles</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et 
                  Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos 
                  données personnelles.
                </p>
                <p>
                  Pour exercer ces droits ou pour toute question relative au traitement de vos données personnelles, 
                  vous pouvez nous contacter à l'adresse : contact@nutri-flow.me
                </p>
                <p>
                  Pour plus d'informations, consultez notre <a href="/politique-confidentialite" className="text-blue-600 hover:underline">Politique de confidentialité</a>.
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Droit applicable et juridiction</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, et après 
                  recherche d'une solution amiable, les tribunaux français seront seuls compétents.
                </p>
                <p>
                  Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter à l'adresse : 
                  contact@nutri-flow.me
                </p>
              </div>
            </section>

            {/* Date de mise à jour */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Dernière mise à jour</h2>
              <p className="text-gray-700">
                Les présentes mentions légales ont été mises à jour le 28 juin 2025.
              </p>
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
