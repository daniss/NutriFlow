import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#3b82f6" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NutriFlow - Gestion de cabinet pour diététiciens indépendants" />
        <meta property="og:description" content="Arrêtez de lutter avec des logiciels lents. Planification de repas par IA, gestion client et facturation spécialement conçues pour les diététiciens indépendants." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
