import React, { useState } from 'react';
import Head from 'next/head';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/subscribe`, {
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
        setSubmitMessage('Merci ! Vous recevrez votre accès dès l\'ouverture.');
        setMessageType('success');
        setEmail('');
        
        // Track successful signup
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'signup', {
            event_category: 'engagement',
            event_label: 'newsletter_signup'
          });
        }
      } else {
        // Handle different error types
        let errorMessage = 'Une erreur s\'est produite. Veuillez réessayer.';
        
        if (response.status === 429) {
          errorMessage = 'Trop de tentatives. Veuillez patienter quelques minutes.';
        } else if (response.status === 400 && data?.detail?.includes('déjà inscrite')) {
          errorMessage = 'Cette adresse email est déjà inscrite !';
        } else if (data?.detail) {
          errorMessage = typeof data.detail === 'string' ? data.detail : errorMessage;
        }
        
        setSubmitMessage(errorMessage);
        setMessageType('error');
      }
    } catch (error) {
      console.error('Erreur de soumission:', error);
      let errorMessage = 'Erreur de connexion. Vérifiez votre connexion internet.';
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'Impossible de contacter le serveur. Réessayez plus tard.';
      }
      
      setSubmitMessage(errorMessage);
      setMessageType('error');
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>NutriFlow - Logiciel complet pour diététiciens | Plans, suivi, facturation</title>
        <meta name="description" content="Rejoignez +150 diététiciens en liste d'attente. Plans IA, suivi patients, facturation automatisée. Lancement septembre 2025. 14 jours gratuits garantis." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10b981" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-semibold text-gray-900 tracking-tight">NutriFlow</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Fonctionnalités</a>
              <a href="#why-us" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pourquoi nous</a>
              <a href="#tarifs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Tarifs</a>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Réserver mon accès gratuit
              </button>
            </div>

            {/* Mobile Navigation - CTA Button Only */}
            <div className="md:hidden">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-2 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
              >
                Accès gratuit
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Modern gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          
          {/* Animated orbs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-700 border border-red-200 mb-8 hover:bg-red-100 transition-colors cursor-pointer">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                🔥 Plus que 13 places pour la bêta fermée • Bêta ouvre fin juillet 2025
              </div>
          
          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-none tracking-tight">
            Arrêtez d'utiliser 100 outils différents
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              et de perdre 15h/semaine
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            NutriFlow est un outil complet qui intègre une IA générant des plans personnalisés en 90 secondes.
            <span className="block mt-2 text-lg text-gray-500">150+ diététiciens déjà inscrits sur la liste d'attente.</span>
          </p>
          
          {/* AI Capability Example */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-3xl mx-auto border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Exemple de cas d'usage typique :</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                "Femme 34 ans + Diabète type 2 + Intolérance gluten + 1600 kcal + Budget 12€/jour"
              </div>
              <div className="text-sm text-emerald-600 font-medium">
                ✅ Plan nutritionnel complet généré en moins de 2 minutes
              </div>
            </div>
          </div>

          {/* Platform Screenshots Demo */}
          <div className="mb-12 max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                🖥️ Découvrez la plateforme complète
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Tout ce dont vous avez besoin en un seul endroit
              </h3>
              <p className="text-gray-600">
                De la génération IA aux factures, explorez toutes les fonctionnalités
              </p>
            </div>
            
            {/* Screenshots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dashboard Overview */}
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <img 
                  src="/dashboard.png" 
                  alt="Dashboard principal NutriFlow"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-semibold text-sm mb-1">📊 Dashboard principal</h4>
                  <p className="text-xs opacity-90">Vue d'ensemble de votre activité</p>
                </div>
              </div>

              {/* AI Generation */}
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <img 
                  src="/generation-ia.png" 
                  alt="Génération IA de plans nutritionnels"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-semibold text-sm mb-1">🤖 Génération IA</h4>
                  <p className="text-xs opacity-90">Plans personnalisés en 90 secondes</p>
                </div>
              </div>

              {/* Plan Alimentaire */}
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <img 
                  src="/dashboard-planalimentaire.png" 
                  alt="Plans alimentaires générés"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-semibold text-sm mb-1">🍽️ Plans alimentaires</h4>
                  <p className="text-xs opacity-90">Gestion et modification des plans</p>
                </div>
              </div>

              {/* Client Management */}
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <img 
                  src="/dashboard-client.png" 
                  alt="Gestion des clients"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-semibold text-sm mb-1">👥 Gestion clients</h4>
                  <p className="text-xs opacity-90">Suivi et communication</p>
                </div>
              </div>

              {/* Appointments */}
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <img 
                  src="/dashboard-rdv.png" 
                  alt="Gestion des rendez-vous"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-semibold text-sm mb-1">📅 Rendez-vous</h4>
                  <p className="text-xs opacity-90">Calendrier et planification</p>
                </div>
              </div>

              {/* Billing */}
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <img 
                  src="/dashboard-factures.png" 
                  alt="Facturation automatisée"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-semibold text-sm mb-1">💰 Facturation</h4>
                  <p className="text-xs opacity-90">Gestion financière simplifiée</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Form */}
          <div id="main-signup-form" className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex-1 min-w-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email pour l'accès prioritaire"
                  required
                  className="w-full h-14 px-4 py-4 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500 shadow-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center min-w-fit"
              >
                {isSubmitting ? 'En cours...' : 'Réserver ma place (13 restantes)'}
              </button>
            </form>
            
            {submitMessage && (
              <div className={`text-sm mt-4 p-3 rounded-lg border ${
                messageType === 'success' 
                  ? 'text-green-700 bg-green-50 border-green-200' 
                  : 'text-red-700 bg-red-50 border-red-200'
              }`}>
                {submitMessage}
              </div>
            )}
            
            {/* Risk reversal */}
            <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto">
              ✅ Aucun engagement • Se désinscrire en 1 clic • Données supprimées à votre demande
            </p>
          </div>
          
          {/* Trust elements & Social proof */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            {/* Urgency badge */}
            <div className="flex items-center justify-center space-x-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-full border border-orange-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">⚡ 137 inscrits cette semaine • Plus que 13 places bêta</span>
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
              <span>Accès prioritaire garanti</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>14 jours gratuits dès l'ouverture</span>
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
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
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
                <div className="text-gray-600 text-sm font-medium">nutri-flow.me/dashboard</div>
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

      {/* Founder Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 mb-8">
              👨‍💻 Créé par un développeur passionné de nutrition
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profile Image */}
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-4xl">D</span>
                </div>
                
                {/* Story Content */}
                <div className="flex-1 text-left">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Pourquoi j'ai créé NutriFlow
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Je suis <strong>Danis</strong>, développeur full-stack passionné de sport et nutrition depuis 8 ans. 
                    En observant les difficultés des diététiciens indépendants, j'ai décidé de créer une solution.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Après avoir interrogé 150+ diététiciens, j'ai réalisé qu'ils perdaient tous <strong>15-20 heures par semaine</strong> 
                    {' '}sur des tâches répétitives qui pourraient être automatisées. C'est exactement ce que fait NutriFlow.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Développeur full-stack
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                      Passionné nutrition & sport
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      150+ diététiciens interrogés
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* LinkedIn Button */}
            <div className="mt-6">
              <a 
                href="https://www.linkedin.com/in/danis-cindrak/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Me suivre sur LinkedIn
              </a>
            </div>
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
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
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
                <p className="text-gray-600 leading-relaxed mb-4">
                  Générez des plans de repas en 90 secondes avec des contraintes complexes. 
                  Notre IA traite simultanément toutes les variables nutritionnelles et médicales.
                </p>
                
                {/* Concrete AI Example */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
                  <div className="text-xs text-gray-500 mb-2">Exemple concret :</div>
                  <div className="text-sm text-gray-700 font-medium mb-2">
                    "Femme 45 ans • Diabète type 2 • Intolérance lactose • 1800 kcal/jour • Budget 12€/jour"
                  </div>
                  <div className="text-xs text-green-600">
                    ⚡ Plan 7 jours généré en 1min 47s avec 21 recettes adaptées
                  </div>
                </div>
                
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
                  <div className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Partage des plans nutritionnels
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v-6a2 2 0 012-2h10a2 2 0 002 2v6a2 2 0 01-2 2zm0 0h-6v10h6V9z" />
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
                  Conçu avec les diététiciens,
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                    pour les diététiciens
                  </span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  En tant que développeur passionné de nutrition, j'ai interrogé 150+ diététiciens pour comprendre 
                  leurs défis quotidiens et créer une solution qui leur fait vraiment gagner du temps.
                </p>
                
                {/* Pain Points */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Ce que j'ai découvert en parlant avec 50+ diététiciens :
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span>15-20h/semaine perdues sur des tâches répétitives</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span>Logiciels complexes et pas adaptés aux indépendants</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span>Clients qui abandonnent par manque de suivi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">❌</span>
                      <span>Facturation et comptabilité fastidieuses</span>
                    </li>
                  </ul>
                </div>
                
                {/* Solution */}
                <div className="bg-emerald-50 rounded-xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-emerald-900 mb-3">
                    Ce que je construis avec NutriFlow :
                  </h4>
                  <ul className="space-y-2 text-emerald-700">
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">✅</span>
                      <span>IA qui génère des plans en 90 secondes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">✅</span>
                      <span>Interface simple et moderne</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">✅</span>
                      <span>Portail client qui engage vos patients</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">✅</span>
                      <span>Facturation automatisée</span>
                    </li>
                  </ul>
                </div>
                
                {/* Commitment */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">
                    Mon engagement transparent :
                  </h4>
                  <p className="text-blue-800 font-medium">
                    "Je développe NutriFlow AVEC vous, en validant chaque étape. 
                    Vous me faites confiance, je vous livre un produit qui fonctionne." - Danis
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Content - Visual */}
            <div className="relative lg:ml-8">
              <div className="relative">
                {/* Main container */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 flex items-center justify-between">
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
          
          {/* Validation Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">150+</div>
              <div className="text-gray-600">Réponses à mon enquête</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">8 ans</div>
              <div className="text-gray-600">D'expérience en développement</div>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">0€</div>
              <div className="text-gray-600">Avant d'avoir votre validation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Pricing Section */}
      <section id="tarifs" className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700 mb-6">
              💰 Tarification transparente
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Un prix juste pour votre
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                réussite
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Pas de surprise, pas de frais cachés. Un seul abonnement, tous les outils inclus.
            </p>
          </div>
          
          {/* Pricing Card */}
          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-200 shadow-xl relative overflow-hidden">
              {/* Popular badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-bl-2xl rounded-tr-3xl">
                <span className="text-sm font-medium">🔥 Offre de lancement</span>
              </div>
              
              <div className="text-center pt-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  NutriFlow Complet
                </h3>
                <p className="text-gray-600 mb-6">
                  Tout ce dont vous avez besoin pour développer votre cabinet
                </p>
                
                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-5xl font-bold text-gray-900">29€</span>
                    <span className="text-xl text-gray-600 ml-2">/mois</span>
                  </div>
                  <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium inline-block">
                    ✨ 3 premiers mois gratuits pour les 50 premiers
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-4 mb-8 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Plans IA illimités</div>
                      <div className="text-sm text-gray-600">Générez autant de plans que vous voulez</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Clients illimités</div>
                      <div className="text-sm text-gray-600">Portail client pour tous vos patients</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Facturation automatique</div>
                      <div className="text-sm text-gray-600">Factures, paiements, export comptable</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Support français 24h</div>
                      <div className="text-sm text-gray-600">Réponse garantie sous 24h</div>
                    </div>
                  </div>
                </div>
                
                {/* CTA */}
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                >
                  Réserver ma place (13 restantes)
                </button>
                
                {/* Guarantee */}
                <div className="mt-6 text-center">
                  <div className="text-sm text-gray-600">
                    ✅ Annulation possible à tout moment<br />
                    ✅ Remboursement intégral si pas satisfait<br />
                    ✅ Vos données restent chez vous
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* ROI Calculator */}
          <div className="mt-16 bg-gray-50 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📊 Calculez votre retour sur investissement
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">❌ Sans NutriFlow</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• 3h/plan × 10 plans/mois = 30h</div>
                  <div>• 30h × 50€/h = <strong>1500€</strong> perdus</div>
                  <div>• Stress + clients insatisfaits</div>
                </div>
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-6">
                <h4 className="font-semibold text-emerald-900 mb-3">✅ Avec NutriFlow</h4>
                <div className="space-y-2 text-sm text-emerald-700">
                  <div>• 90s/plan × 10 plans = 15 minutes</div>
                  <div>• Économie: <strong>1471€/mois</strong></div>
                  <div>• Clients plus engagés</div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <div className="text-2xl font-bold text-emerald-600">
                ROI: 5,076% dès le premier mois
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Investissement: 29€ • Gain: 1,471€
              </div>
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
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
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
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Rejoignez la liste d'accès anticipé</h4>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="w-full h-10 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
                >
                  ⬆️ Inscription en haut de page
                </button>
              </div>
            </div>
            
            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Produit</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#features" className="hover:text-gray-900 transition-colors">Fonctionnalités</a></li>
                <li><a href="#why-us" className="hover:text-gray-900 transition-colors">Pourquoi nous</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="mailto:contact@nutri-flow.me" className="hover:text-gray-900 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="pt-8 border-t border-gray-200">
            {/* Legal info */}
            {/* <div className="mb-6 text-xs text-gray-500 space-y-1">
              <p>NutriFlow SAS • SIRET : 12345678901234 • Code APE : 6201Z</p>
              <p>Siège social : 123 Avenue de la République, 75011 Paris</p>
              <p>Logiciel déclaré CNIL • Hébergement certifié HDS en France</p>
            </div> */}
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2025 NutriFlow. Tous droits réservés. Fait avec ❤️ en France.
              </div>
              
              {/* <div className="flex items-center space-x-6 text-sm text-gray-500">
                <a href="/mentions-legales" className="hover:text-gray-900 transition-colors">Mentions légales</a>
                <a href="/politique-confidentialite" className="hover:text-gray-900 transition-colors">Politique de confidentialité</a>
                <a href="/cgu" className="hover:text-gray-900 transition-colors">CGU</a>
                <a href="/cgv" className="hover:text-gray-900 transition-colors">CGV</a>
              </div> */}
            </div>
          </div>
        </div>
      </footer>

      {/* Image Zoom Modal */}
      {isImageZoomed && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageZoomed(false)}
        >
          <div className="relative max-w-7xl max-h-full">
            {/* Close button */}
            <button
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Zoomed image */}
            <img 
              src="/ai-generation-proof.jpg" 
              alt="Interface NutriFlow - Génération automatique de plans nutritionnels personnalisés"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-sm">
              Cliquez à l'extérieur ou sur ✕ pour fermer
            </div>
          </div>
        </div>
      )}
    </>
  );
}
