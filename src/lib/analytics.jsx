/* eslint-disable no-unused-vars */

import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-KJQ7WWCEE1";

// ============================================================================
// 📊 VARIABLES D'ÉTAT GLOBAL
// ============================================================================

let isInitialized = false;
const sessionId = generateSessionId();
const pageLoadTime = performance.now();
const conversionGoals = new Map();
let maxScrollDepth = 0;
const scrollMilestones = new Set();
let startTime = Date.now();
let isUserActive = true;
let totalActiveTime = 0;

// ============================================================================
// 🎯 INITIALISATION AVANCÉE
// ============================================================================

export const initGA = () => {
  try {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gtagOptions: {
        allow_google_signals: true,
        allow_ad_personalization_signals: false,
        send_page_view: false,
        custom_map: {
          'custom_dimension_1': 'user_engagement_score',
          'custom_dimension_2': 'page_load_performance', 
          'custom_dimension_3': 'seo_landing_source',
          'custom_dimension_4': 'local_search_query',
          'custom_dimension_5': 'conversion_path'
        }
      }
    });

    isInitialized = true;
    console.log('✅ GA4 SEO Tracking initialisé');
    
    // Setup tous les événements SEO
    setupSEOEvents();
    
  } catch (error) {
    console.error('❌ Erreur initialisation GA4:', error);
  }
};

// ============================================================================
// 🔍 TRACKING PAGE VIEW OPTIMISÉ SEO
// ============================================================================

export const trackPageView = (url, title) => {
  if (!isInitialized) {
    console.warn('GA4 non initialisé');
    return;
  }

  // Utilisation directe de gtag pour les custom dimensions
  ReactGA.gtag('config', GA_MEASUREMENT_ID, {
    page_title: title || document.title,
    page_location: window.location.href,
    custom_dimension_1: getUserEngagementScore(),
    custom_dimension_2: getPagePerformanceScore(),
    custom_dimension_3: getSEOLandingSource(),
  });

  // Page view simple
  ReactGA.send({ hitType: "pageview", page: url });
  
  // Données enrichies via événement
  ReactGA.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_title: title || document.title,
    page_referrer: document.referrer,
    user_engagement: calculateEngagementScore(),
    page_load_time: Math.round(performance.now() - pageLoadTime),
    geo_country: 'CG',
    geo_city: detectUserCity(),
    custom_dimension_1: getUserEngagementScore(),
    custom_dimension_2: getPagePerformanceScore(),
    custom_dimension_3: getSEOLandingSource(),
  });

  trackPageDepth(url);
  
  console.log('📊 Page view tracked:', url);
};

// ============================================================================
// 🚀 SETUP ÉVÉNEMENTS SEO AUTOMATIQUES
// ============================================================================

const setupSEOEvents = () => {
  setupScrollDepthTracking();
  setupTimeOnPageTracking();
  setupClickTracking();
  setupFormTracking();
  setupLocalSearchTracking();
  setupCoreWebVitalsTracking();
};

// ============================================================================
// 📈 SCROLL DEPTH TRACKING
// ============================================================================

const setupScrollDepthTracking = () => {
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollHeight > 0 ? Math.round((window.scrollY / scrollHeight) * 100) : 0;

    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;

      [25, 50, 75, 100].forEach(milestone => {
        if (scrollPercent >= milestone && !scrollMilestones.has(milestone)) {
          scrollMilestones.add(milestone);
          
          ReactGA.gtag('event', 'scroll_depth', {
            event_category: 'User Engagement',
            event_label: `${milestone}%`,
            value: milestone,
            custom_dimension_1: getUserEngagementScore()
          });

          if (milestone === 100) {
            trackHighEngagement('full_page_scroll');
          }
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

// ============================================================================
// ⏱️ TIME ON PAGE TRACKING
// ============================================================================

const setupTimeOnPageTracking = () => {
  const handleVisibilityChange = () => {
    const now = Date.now();
    
    if (document.hidden) {
      if (isUserActive) {
        totalActiveTime += now - startTime;
        isUserActive = false;
      }
    } else {
      if (!isUserActive) {
        startTime = now;
        isUserActive = true;
      }
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('blur', handleVisibilityChange);
  window.addEventListener('focus', handleVisibilityChange);

  // Tracking périodique toutes les 30 secondes
  setInterval(() => {
    if (isUserActive) {
      const currentActiveTime = totalActiveTime + (Date.now() - startTime);
      const timeInSeconds = Math.round(currentActiveTime / 1000);
      
      ReactGA.gtag('event', 'time_on_page', {
        event_category: 'User Engagement',
        event_label: `${timeInSeconds}s`,
        value: timeInSeconds,
        custom_dimension_1: getUserEngagementScore()
      });

      if ([60, 180, 300, 600].includes(timeInSeconds)) {
        trackHighEngagement(`${timeInSeconds}s_engagement`);
      }
    }
  }, 30000);

  // Tracking final au unload
  window.addEventListener('beforeunload', () => {
    const finalTime = isUserActive ? totalActiveTime + (Date.now() - startTime) : totalActiveTime;
    const finalSeconds = Math.round(finalTime / 1000);
    
    ReactGA.gtag('event', 'session_duration', {
      event_category: 'User Engagement',
      event_label: 'page_exit',
      value: finalSeconds
    });
  });
};

// ============================================================================
// 🎯 CLICK TRACKING IMPORTANT
// ============================================================================

const setupClickTracking = () => {
  document.addEventListener('click', (event) => {
    const target = event.target ;
    const link = target.closest('a') 
    
    // Email clicks - super important pour business
    if (link?.href.startsWith('mailto:')) {
      ReactGA.gtag('event', 'email_click', {
        event_category: 'Lead Generation',
        event_label: link.href.replace('mailto:', ''),
        value: 10
      });
      trackConversionGoal('email_contact');
    }
    
    // Phone clicks - ultra important  
    if (link?.href.startsWith('tel:')) {
      ReactGA.gtag('event', 'phone_click', {
        event_category: 'Lead Generation',
        event_label: link.href.replace('tel:', ''),
        value: 15
      });
      trackConversionGoal('phone_contact');
    }

    // CTA buttons
    if (target.classList.contains('cta-button') || 
        target.classList.contains('btn-primary') ||
        target.closest('.cta-button')) {
      
      const ctaText = target.textContent?.trim() || 'CTA Click';
      ReactGA.gtag('event', 'cta_click', {
        event_category: 'Conversion',
        event_label: ctaText,
        value: 8
      });
    }

    // Portfolio clicks
    if (target.closest('.portfolio-item') || target.closest('.project-card')) {
      ReactGA.gtag('event', 'portfolio_view', {
        event_category: 'Portfolio Engagement',
        event_label: target.textContent?.trim() || 'Portfolio Item'
      });
    }

    // Social media clicks
    if (link) {
      const socialPlatforms = ['linkedin', 'github', 'twitter', 'facebook'];
      socialPlatforms.forEach(platform => {
        if (link.href.includes(platform)) {
          ReactGA.gtag('event', 'social_click', {
            event_category: 'Social Media',
            event_label: platform,
            value: 3
          });
        }
      });
    }
  });
};

// ============================================================================
// 📝 FORM TRACKING
// ============================================================================

const setupFormTracking = () => {
  const forms = document.querySelectorAll('form');
  
  forms.forEach((form, index) => {
    const formName = form.getAttribute('name') || `form_${index}`;
    let formTouched = false;
    
    // Form start
    form.addEventListener('focusin', () => {
      ReactGA.gtag('event', 'form_start', {
        event_category: 'Lead Generation',
        event_label: formName,
        value: 5
      });
    }, { once: true });

    // Form input
    form.addEventListener('input', () => { 
      formTouched = true; 
    });

    // Form submit
    form.addEventListener('submit', () => {
      ReactGA.gtag('event', 'form_submit', {
        event_category: 'Conversion',
        event_label: formName,
        value: 20
      });
      trackConversionGoal('form_submission');
    });

    // Form abandon tracking
    window.addEventListener('beforeunload', () => {
      if (formTouched && !form.checkValidity()) {
        ReactGA.gtag('event', 'form_abandon', {
          event_category: 'Lead Generation',
          event_label: formName,
          value: -2
        });
      }
    });
  });
};

// ============================================================================
// 🔍 LOCAL SEARCH TRACKING
// ============================================================================

const setupLocalSearchTracking = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  
  let searchQuery = urlParams.get('q') || urlParams.get('query');
  
  if (!searchQuery && referrer.includes('google')) {
    const match = referrer.match(/[&?]q=([^&]*)/);
    if (match) {
      searchQuery = decodeURIComponent(match[1]);
    }
  }

  if (searchQuery) {
    const isLocal = isLocalSearchQuery(searchQuery);
    
    ReactGA.gtag('event', 'search_arrival', {
      event_category: 'SEO',
      event_label: searchQuery,
      value: isLocal ? 10 : 5,
      custom_dimension_4: searchQuery,
      custom_dimension_3: isLocal ? 'local_search' : 'general_search'
    });

    console.log(`🔍 Requête: "${searchQuery}" (Local: ${isLocal})`);
  }
};

// ============================================================================
// 📊 CORE WEB VITALS TRACKING
// ============================================================================

const setupCoreWebVitalsTracking = () => {
  // Vérifier si PerformanceObserver est disponible
  if (typeof PerformanceObserver === 'undefined') {
    console.warn('PerformanceObserver non supporté');
    return;
  }

  try {
    // LCP - Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcp = Math.round(lastEntry.startTime);
      
      ReactGA.gtag('event', 'core_web_vitals', {
        event_category: 'Performance',
        event_label: 'LCP',
        value: lcp,
        custom_dimension_2: getPerformanceScore(lcp, 'lcp')
      });

      console.log(`📊 LCP: ${lcp}ms`);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // FID - First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const perfEntry = entry;
        const fid = Math.round(perfEntry.processingStart - perfEntry.startTime);
        
        ReactGA.gtag('event', 'core_web_vitals', {
          event_category: 'Performance',
          event_label: 'FID',
          value: fid,
          custom_dimension_2: getPerformanceScore(fid, 'fid')
        });

        console.log(`📊 FID: ${fid}ms`);
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry ; 
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
        }
      }
      
      const cls = Math.round(clsValue * 1000);
      ReactGA.gtag('event', 'core_web_vitals', {
        event_category: 'Performance',
        event_label: 'CLS',
        value: cls,
        custom_dimension_2: getPerformanceScore(cls, 'cls')
      });

      console.log(`📊 CLS: ${clsValue}`);
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    console.warn('Erreur setup Core Web Vitals:', error);
  }
};

// ============================================================================
// 🎯 CONVERSION TRACKING
// ============================================================================

const trackConversionGoal = (goalName) => {
  if (!conversionGoals.has(goalName)) {
    conversionGoals.set(goalName, true);
    
    ReactGA.gtag('event', 'conversion', {
      event_category: 'Goals',
      event_label: goalName,
      value: getConversionValue(goalName)
    });

    // Enhanced ecommerce
    ReactGA.gtag('event', 'purchase', {
      transaction_id: generateTransactionId(),
      value: getConversionValue(goalName),
      currency: 'XAF',
      items: [{
        item_id: goalName,
        item_name: getConversionName(goalName),
        category: 'Lead Generation',
        quantity: 1,
        price: getConversionValue(goalName)
      }]
    });

    console.log(`🎯 Conversion: ${goalName}`);
  }
};

const trackHighEngagement = (type)  => {
  ReactGA.gtag('event', 'high_engagement', {
    event_category: 'User Quality',
    event_label: type,
    value: 10
  });
  trackConversionGoal('high_engagement');
};

// ============================================================================
// 🧮 FONCTIONS UTILITAIRES
// ============================================================================

const calculateEngagementScore = () => {
  const timeOnPage = Date.now() - pageLoadTime;
  let score = 0;
  score += Math.min(timeOnPage / 1000 / 60 * 10, 50);
  score += maxScrollDepth * 0.3;
  score += conversionGoals.size * 20;
  return Math.round(Math.min(score, 100));
};

const getUserEngagementScore = () => {
  const score = calculateEngagementScore();
  if (score >= 80) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
};

const getPagePerformanceScore = () => {
  try {
    const navigation = performance.getEntriesByType('navigation')[0] ;
    if (!navigation) return 'unknown';
    
    const loadTime = navigation.loadEventEnd - navigation.fetchStart;
    
    if (loadTime < 2000) return 'excellent';
    if (loadTime < 4000) return 'good';
    if (loadTime < 6000) return 'average';
    return 'poor';
  } catch (error) {
    return 'unknown';
  }
};

const getPerformanceScore = (value, metric)=> {
  const thresholds= {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 100, poor: 250 }
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'unknown';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

const getSEOLandingSource = () => {
  const referrer = document.referrer;
  if (referrer.includes('google')) return 'google_organic';
  if (referrer.includes('bing')) return 'bing_organic';
  if (referrer.includes('facebook')) return 'facebook_social';
  if (referrer.includes('linkedin')) return 'linkedin_social';
  if (referrer === '') return 'direct_traffic';
  return 'other_referral';
};

const detectUserCity = () => {
  return 'Pointe-Noire';
};

const isLocalSearchQuery = (query) => {
  const localKeywords = [
    'pointe-noire', 'congo', 'brazzaville', 'développeur web pointe-noire',
    'création site web congo', 'freelance congo', 'près de moi',
    'congo-brazzaville', 'agence web pointe-noire'
  ];
  
  return localKeywords.some(keyword => 
    query.toLowerCase().includes(keyword.toLowerCase())
  );
};

const trackPageDepth = (url) => {
  const pageDepth = (url.match(/\//g) || []).length;
  ReactGA.gtag('event', 'page_depth', {
    event_category: 'Site Navigation',
    event_label: `depth_${pageDepth}`,
    value: pageDepth
  });
};

const getConversionValue = (goalName) => {
  const values = {
    'email_contact': 50000,
    'phone_contact': 75000,
    'form_submission': 60000,
    'portfolio_engagement': 10000,
    'high_engagement': 25000
  };
  return values[goalName] || 5000;
};

const getConversionName = (goalName) => {
  const names= {
    'email_contact': 'Contact Email - Développeur Web',
    'phone_contact': 'Appel Téléphonique - Devis Gratuit',
    'form_submission': 'Demande de Devis Web',
    'portfolio_engagement': 'Consultation Portfolio',
    'high_engagement': 'Visiteur Hautement Engagé'
  };
  return names[goalName] || 'Lead Génération';
};

function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

const generateTransactionId = () => {
  return 'txn_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 5);
};

// ============================================================================
// 🚀 FONCTIONS BUSINESS SUPPLÉMENTAIRES
// ============================================================================

export const trackBusinessContact = (method) => {
  const values = { email: 50000, phone: 75000, form: 60000 };
  
  ReactGA.gtag('event', 'generate_lead', {
    currency: 'XAF',
    value: values[method],
    method: method
  });
  
  console.log(`📞 Contact business: ${method}`);
};

export const trackConversion = (type, value) => {
  ReactGA.gtag('event', 'conversion', {
    event_category: 'Business Goals',
    event_label: type,
    value: value || 0
  });
};