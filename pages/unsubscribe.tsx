import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Unsubscribe() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill email from query parameter
  useEffect(() => {
    if (router.query.email && typeof router.query.email === 'string') {
      setEmail(router.query.email);
    }
  }, [router.query.email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        // Handle specific error cases
        if (response.status === 404) {
          setError('Cette adresse email n\'est pas inscrite à nos communications.');
        } else if (response.status === 400) {
          setError('Adresse email invalide. Veuillez vérifier le format.');
        } else if (response.status === 429) {
          setError('Trop de tentatives. Veuillez réessayer dans quelques minutes.');
        } else {
          setError(data.message || 'Une erreur est survenue. Veuillez réessayer.');
        }
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Se désabonner - NutriFlow</title>
        <meta 
          name="description" 
          content="Désabonnez-vous facilement de nos communications NutriFlow"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <svg 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Se désabonner
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Nous sommes désolés de vous voir partir. Entrez votre adresse email pour vous désabonner de nos communications.
            </p>
          </div>

          {/* Success State */}
          {isSuccess ? (
            <div className="bg-white py-8 px-6 shadow-xl rounded-lg border border-gray-200">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <svg 
                    className="h-8 w-8 text-emerald-600" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Désabonnement confirmé
                </h3>
                <p className="text-gray-600 mb-6">
                  Vous avez été désabonné(e) avec succès de nos communications. 
                  Vous ne recevrez plus d'emails de notre part.
                </p>
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          ) : (
            /* Form State */
            <form className="bg-white py-8 px-6 shadow-xl rounded-lg border border-gray-200" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                    placeholder="votre.email@exemple.com"
                    disabled={isLoading}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <svg 
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        />
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Désabonnement en cours...
                    </>
                  ) : (
                    'Se désabonner'
                  )}
                </button>
              </div>

              {/* Footer Text */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  En vous désabonnant, vous ne recevrez plus nos newsletters et communications marketing. 
                  Les emails de service (confirmations, factures) peuvent continuer selon vos commandes.
                </p>
              </div>
            </form>
          )}

          {/* Back to Home Link */}
          {!isSuccess && (
            <div className="text-center">
              <button
                onClick={() => router.push('/')}
                className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                ← Retour à l'accueil
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
