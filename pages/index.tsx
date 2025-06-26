import { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitMessage('Succès ! Vérifiez votre email pour commencer votre essai gratuit.');
        setEmail('');
      } else {
        setSubmitMessage(data.detail || 'Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      setSubmitMessage('Erreur de connexion. Veuillez réessayer.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>NutriFlow - Logiciel de gestion pour diététiciens</title>
        <meta name="description" content="Plateforme intelligente pour diététiciens : plans de repas IA, suivi client automatisé, facturation simplifiée. Transformez votre cabinet en 2 minutes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-semibold text-gray-900 tracking-tight">NutriFlow</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Fonctionnalités</a>
              <a href="#why-us" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pourquoi nous</a>
              <button className="text-sm bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Commencer l'essai gratuit
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Modern gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          
          {/* Animated orbs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-8 hover:bg-blue-100 transition-colors cursor-pointer">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Essai gratuit • 14 jours sans engagement
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-none tracking-tight">
            Le logiciel qui fait
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              grandir votre cabinet
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Moins d'administratif, plus de clients. Automatisez 80 % de votre suivi, sans sacrifier l'humain.
            <span className="block mt-2 text-lg text-gray-500">Transformez votre pratique en cabinet moderne.</span>
          </p>
          
          {/* CTA Form */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex-1 min-w-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  required
                  className="w-full h-14 px-4 py-4 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 shadow-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center min-w-fit"
              >
                {isSubmitting ? 'Démarrage...' : 'Commencer l\'essai gratuit'}
              </button>
            </form>
            
            {submitMessage && (
              <p className={`text-sm mt-4 ${submitMessage.includes('Succès') ? 'text-green-600' : 'text-red-600'}`}>
                {submitMessage}
              </p>
            )}
          </div>
          
          {/* Trust elements & Social proof */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            {/* Main trust badge */}
            <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Déjà utilisé par plus de 300 diététicien·nes en France</span>
            </div>
            
            {/* GDPR compliance badge */}
            <div className="flex items-center justify-center space-x-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200 text-xs">
              <span className="font-semibold">🇫🇷</span>
              <span>Données sécurisées et hébergées en France</span>
            </div>
          </div>
          
          {/* Additional Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Configuration en 2 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Aucune carte bancaire</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Support français inclus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 mb-6">
              Aperçu du produit
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Un aperçu de votre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                tableau de bord
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Simple, clair, efficace. Découvrez l'interface qui va transformer votre façon de travailler.
            </p>
          </div>
          
          {/* Dashboard Preview */}
          <div className="relative max-w-6xl mx-auto">
            {/* Main dashboard container */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Browser header */}
              <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-gray-600 text-sm font-medium">nutriflow.fr/dashboard</div>
                <div className="w-20"></div>
              </div>
              
              {/* Dashboard content */}
              <div className="p-8">
                {/* Top stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Clients actifs</p>
                        <p className="text-2xl font-bold text-blue-900">47</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-600 text-sm font-medium">Plans ce mois</p>
                        <p className="text-2xl font-bold text-emerald-900">128</p>
                      </div>
                      <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-600 text-sm font-medium">CA ce mois</p>
                        <p className="text-2xl font-bold text-purple-900">€4,290</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-600 text-sm font-medium">Taux suivi</p>
                        <p className="text-2xl font-bold text-orange-900">94%</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* AI Plan Generation Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-8 border border-blue-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Génération de plan IA</h3>
                    <div className="flex items-center space-x-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Plan généré en 1m 47s</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-3">Client: Marie Dubois, 34 ans</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Objectif: Perte de poids</span>
                          <span className="font-medium text-gray-900">-5kg en 3 mois</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Allergies:</span>
                          <span className="font-medium text-gray-900">Lactose, Gluten</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-medium text-gray-900">15€/jour</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <span className="text-sm font-medium">Plan nutritionnel</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">✓ Généré</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <span className="text-sm font-medium">Liste de courses</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">✓ Prête</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <span className="text-sm font-medium">Envoi client</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">En cours...</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent clients */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Clients récents</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">MD</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Marie Dubois</p>
                            <p className="text-sm text-gray-500">Perte de poids • Suivi 3/3</p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">Objectif atteint</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">JM</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Jean Martin</p>
                            <p className="text-sm text-gray-500">Diabète • Suivi 8/10</p>
                          </div>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">En cours</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">SC</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Sophie Chen</p>
                            <p className="text-sm text-gray-500">Sport nutrition • Nouveau</p>
                          </div>
                        </div>
                        <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">Plan en cours</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Plan généré pour Marie D.</p>
                          <p className="text-xs text-gray-500">Il y a 2 minutes</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-xl">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Paiement reçu - Jean M.</p>
                          <p className="text-xs text-gray-500">Il y a 1 heure</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-xl">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Nouveau message - Sophie C.</p>
                          <p className="text-xs text-gray-500">Il y a 3 heures</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements for visual appeal */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20 rotate-12 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
          
          {/* Caption */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 font-medium">
              Un aperçu de votre tableau de bord : simple, clair, efficace
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Interface moderne conçue pour vous faire gagner du temps au quotidien
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 mb-6">
              Fonctionnalités principales
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Tout ce dont vous avez
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                vraiment besoin
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Oubliez les logiciels complexes. Nos outils sont conçus spécifiquement 
              pour simplifier le quotidien des diététiciens indépendants.
            </p>
          </div>
          
          {/* Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feature 1 - AI Plans */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Plans IA instantanés</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Générez des plans de repas personnalisés en 2 minutes. Notre IA comprend les restrictions alimentaires, 
                  les objectifs de santé et les préférences de chaque client.
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Allergies et intolérances automatiques
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Calculs nutritionnels précis
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Listes de courses incluses
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Client Portal */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Portail client intelligent</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Vos clients accèdent à leur espace personnel 24h/24. Suivi des progrès, 
                  communication directe, et engagement automatisé pour de meilleurs résultats.
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Suivi des repas en temps réel
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Messagerie intégrée
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Rappels automatiques
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Billing */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Facturation sans effort</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Factures professionnelles en un clic. Paiements en ligne sécurisés. 
                  Export comptable automatique. Concentrez-vous sur vos patients, pas la paperasse.
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Factures aux normes françaises
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Paiements Stripe intégrés
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Export comptable automatique
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Tool Section */}
      <section id="why-us" className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 mb-6">
                  Pourquoi NutriFlow ?
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Conçu par des diététiciens,
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    pour des diététiciens
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Nous savons exactement quels sont vos défis quotidiens. C'est pourquoi 
                  chaque fonctionnalité a été pensée pour vous faire gagner du temps et 
                  améliorer l'expérience de vos clients.
                </p>
              </div>
              
              {/* Benefits List */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Interface ultra-moderne</h3>
                    <p className="text-gray-600">
                      Finies les interfaces lentes et confuses. Notre plateforme charge instantanément 
                      et s'adapte parfaitement à tous vos appareils.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Développé avec vous</h3>
                    <p className="text-gray-600">
                      Chaque nouvelle fonctionnalité provient des suggestions de nos utilisateurs. 
                      Vos besoins guident notre développement.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Support français dédié</h3>
                    <p className="text-gray-600">
                      Une équipe française qui comprend vos spécificités professionnelles 
                      et réglementaires. Réponse garantie sous 24h.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Évolution continue</h3>
                    <p className="text-gray-600">
                      Nouvelles fonctionnalités chaque mois, mises à jour automatiques, 
                      et amélirations constantes basées sur vos retours.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction client</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">2min</div>
                  <div className="text-sm text-gray-600">Configuration</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">24h</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Visual */}
            <div className="relative lg:ml-8">
              <div className="relative">
                {/* Main container */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    </div>
                    <div className="text-white text-sm font-medium">NutriFlow Dashboard</div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 h-80">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">AI</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Plan généré en 2min</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50 p-4 rounded-xl">
                          <div className="text-sm font-medium text-emerald-800">Clients actifs</div>
                          <div className="text-2xl font-bold text-emerald-900">47</div>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl">
                          <div className="text-sm font-medium text-blue-800">Plans ce mois</div>
                          <div className="text-2xl font-bold text-blue-900">128</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">Marie Dupont</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Objectif atteint</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">Jean Martin</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">En cours</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">Sophie Chen</span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Nouveau plan</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20 rotate-12"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 mb-6">
              Témoignages clients
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Ce que disent nos
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                utilisateurs
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Plus de 300 diététiciens nous font confiance pour développer leur cabinet.
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Camille Roche</div>
                  <div className="text-sm text-gray-600">Diététicienne, Lyon</div>
                </div>
                <div className="ml-auto flex text-yellow-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-4">
                "Grâce à NutriFlow, je gagne 4h par semaine sur les suivis. L'automatisation des plans et le suivi client me permettent de me concentrer sur ce qui compte vraiment : mes patients."
              </blockquote>
              <div className="text-sm text-gray-500">
                Utilise NutriFlow depuis 8 mois • 52 clients actifs
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-3xl border border-emerald-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Marie Leblanc</div>
                  <div className="text-sm text-gray-600">Diététicienne, Bordeaux</div>
                </div>
                <div className="ml-auto flex text-yellow-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-4">
                "Mes clients adorent l'application mobile ! Ils peuvent consulter leurs menus, noter leurs ressentis et me poser des questions. Mon taux de rétention a augmenté de 60%."
              </blockquote>
              <div className="text-sm text-gray-500">
                Utilise NutriFlow depuis 1 an • 73 clients actifs
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <div className="ml-4">
                  <div className="font-semibold text-gray-900">Julien Martinez</div>
                  <div className="text-sm text-gray-600">Diététicien du sport, Nice</div>
                </div>
                <div className="ml-auto flex text-yellow-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-4">
                "L'intégration avec les applis de sport de mes clients est parfaite ! Je peux adapter les plans nutritionnels en temps réel selon leur activité. Mes athlètes adorent cette approche personnalisée."
              </blockquote>
              <div className="text-sm text-gray-500">
                Utilise NutriFlow depuis 10 mois • 38 clients actifs
              </div>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">300+</div>
              <div className="text-gray-600 font-medium mb-1">Diététiciens actifs</div>
              <div className="text-sm text-gray-500">en France</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600 font-medium mb-1">Taux de satisfaction</div>
              <div className="text-sm text-gray-500">basé sur 245 avis</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">2min</div>
              <div className="text-gray-600 font-medium mb-1">Temps de setup</div>
              <div className="text-sm text-gray-500">configuration complète</div>
            </div>
          </div>
        </div>
      </section>

      {/* Built With You Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 mb-6">
              Développement collaboratif
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Vos idées deviennent
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                nos fonctionnalités
              </span>
            </h2>
          </div>
          
          {/* Main testimonial card */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 mb-16">
            {/* Quote decoration */}
            <div className="absolute top-6 left-6 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" />
              </svg>
            </div>
            
            <div className="text-center">
              {/* Avatar */}
              <div className="relative mx-auto mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-3xl text-white">👨‍💻</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Quote */}
              <blockquote className="text-xl sm:text-2xl font-medium text-gray-900 mb-6 leading-relaxed">
                "Nous développons NutriFlow <span className="text-emerald-600 font-semibold">AVEC</span> vous, 
                pas <span className="text-gray-500">POUR</span> vous. Chaque suggestion devient une priorité 
                et est souvent intégrée en 2-4 semaines."
              </blockquote>
              
              {/* Author */}
              <div className="text-gray-600 mb-8">
                <div className="font-semibold text-gray-900">Thomas, Fondateur & Développeur</div>
                <div className="text-sm">Ex-consultant en nutrition sportive</div>
              </div>
            </div>
          </div>
          
          {/* Recent features */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Fonctionnalités récemment ajoutées sur demande des utilisateurs
            </h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center justify-center space-x-3 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-emerald-800">Intégration WhatsApp</span>
              <span className="text-xs bg-emerald-200 text-emerald-700 px-2 py-1 rounded-full">Nov 2024</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-blue-800">Plans par lot</span>
              <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full">Oct 2024</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 bg-purple-50 p-4 rounded-2xl border border-purple-100">
              <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
              <span className="text-sm font-medium text-purple-800">Suivi émotionnel</span>
              <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full">Sep 2024</span>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Vous avez une idée ? Partagez-la avec nous !
            </p>
            <a 
              href="mailto:hello@nutriflow.fr" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Suggérer une fonctionnalité
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        
        {/* Animated elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white border border-white/20 mb-8 backdrop-blur-sm">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Déjà utilisé par plus de 300 diététicien·nes en France
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Transformez votre cabinet
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              dès aujourd'hui
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Rejoignez les diététiciens qui ont choisi la simplicité et l'efficacité. 
            Votre premier client pourrait être demain.
          </p>
          
          {/* CTA Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12 items-stretch">
            <div className="flex-1 min-w-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                required
                className="w-full h-14 px-6 py-4 rounded-2xl border border-gray-600 bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm shadow-lg"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center min-w-fit"
            >
              {isSubmitting ? 'Démarrage...' : 'Commencer l\'essai gratuit'}
            </button>
          </form>
          
          {submitMessage && (
            <p className={`text-sm mb-8 ${submitMessage.includes('Succès') ? 'text-green-400' : 'text-red-400'}`}>
              {submitMessage}
            </p>
          )}
          
          {/* Trust indicators */}
          <div className="grid sm:grid-cols-3 gap-8 text-sm">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-300 font-medium">Essai 14 jours gratuit</span>
              <span className="text-gray-500 text-xs">Aucune carte bancaire</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <span className="text-blue-400 text-lg font-bold">🇫🇷</span>
              </div>
              <span className="text-gray-300 font-medium">Données sécurisées</span>
              <span className="text-gray-500 text-xs">Hébergées en France • RGPD</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.5a9.5 9.5 0 110 19 9.5 9.5 0 010-19z" />
                </svg>
              </div>
              <span className="text-gray-300 font-medium">Support français 24h</span>
              <span className="text-gray-500 text-xs">Réponse garantie</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 mb-6">
              Questions fréquentes
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Vous avez des
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                questions ?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Voici les réponses aux questions les plus fréquemment posées par nos utilisateurs.
            </p>
          </div>
          
          {/* FAQ Grid */}
          <div className="space-y-8">
            {/* FAQ 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Est-ce que mes données sont sécurisées ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolument. Toutes vos données sont hébergées en France, cryptées et sauvegardées quotidiennement. 
                Nous respectons le RGPD et ne partageons jamais vos informations avec des tiers. Vos données client 
                sont protégées par le secret médical.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Puis-je arrêter à tout moment ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Bien sûr ! Aucun engagement. Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. 
                Après l'annulation, vous gardez accès à vos données pendant 30 jours pour effectuer une sauvegarde si nécessaire.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Est-ce que c'est compatible avec Doctolib ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Oui ! NutriFlow s'intègre parfaitement avec Doctolib. Vos rendez-vous se synchronisent automatiquement 
                et vous pouvez envoyer les plans nutritionnels directement depuis l'interface. Plus besoin de jongler 
                entre plusieurs outils.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Que se passe-t-il après les 14 jours gratuits ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Après votre essai gratuit, vous pouvez choisir de continuer avec un abonnement mensuel à 39€/mois. 
                Si vous décidez de ne pas continuer, votre compte reste accessible en lecture seule pendant 30 jours, 
                le temps de récupérer vos données si besoin.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Faut-il une formation pour utiliser NutriFlow ?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Non, NutriFlow est conçu pour être intuitif. La configuration prend 2 minutes et nous proposons 
                un accompagnement personnalisé gratuit durant vos premiers pas. De plus, notre équipe support 
                française est disponible pour vous aider à tout moment.
              </p>
            </div>
          </div>

          {/* CTA at the bottom of FAQ */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">
              Vous avez d'autres questions ? Notre équipe est là pour vous aider !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:hello@nutriflow.fr"
                className="inline-flex items-center px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contactez-nous
              </a>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl font-medium hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Commencer l'essai gratuit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">NutriFlow</span>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md">
                La plateforme moderne qui simplifie la gestion de votre cabinet de diététique. 
                Conçue par des professionnels, pour des professionnels.
              </p>
              
              {/* Email subscription */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Restez informé des nouveautés</h4>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm items-stretch">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.com"
                    className="flex-1 min-w-0 h-10 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 whitespace-nowrap flex items-center justify-center min-w-fit shadow-lg"
                  >
                    S'inscrire
                  </button>
                </form>
              </div>
            </div>
            
            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Produit</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#features" className="hover:text-gray-900 transition-colors">Fonctionnalités</a></li>
                <li><a href="#why-us" className="hover:text-gray-900 transition-colors">Pourquoi nous</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Témoignages</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="mailto:hello@nutriflow.fr" className="hover:text-gray-900 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Formation</a></li>
                <li><a href="#" className="hover:text-gray-900 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2024 NutriFlow. Tous droits réservés. Fait avec ❤️ en France.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-gray-900 transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
