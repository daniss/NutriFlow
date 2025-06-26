// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next/api'

type Data = {
  message: string
  email?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' })
  }

  const { email } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Adresse email invalide' })
  }

  // Ici vous pourriez typiquement :
  // 1. Valider l'email
  // 2. Enregistrer en base de données
  // 3. Envoyer un email de bienvenue
  // 4. Ajouter à votre service d'email marketing (Mailchimp, ConvertKit, etc.)
  
  console.log('Nouvelle inscription:', email)
  
  // Simuler le traitement
  setTimeout(() => {
    console.log(`Email de bienvenue envoyé à : ${email}`)
  }, 1000)

  res.status(200).json({ 
    message: 'Inscription réussie ! Vérifiez votre email pour commencer votre essai gratuit.',
    email 
  })
}
