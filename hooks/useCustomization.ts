import { useEffect, useState } from 'react';

interface CustomizationData {
  // Branding
  companyName: string;
  logoUrl: string;
  faviconUrl: string;

  // Cores
  primaryColor: string;
  secondaryColor: string;

  // Contatos
  whatsapp: string;
  email: string;
  emailPrivacidade: string;
  emailDpo: string;
  instagram: string;
  website: string;

  // Configurações
  mensagemDestaque: string;
  infoEntrega: string;
  formasPagamento: string;
  contatoSuporte: string;
}

const defaultCustomization: CustomizationData = {
  companyName: 'Vytalle Estética & Viscosuplementação',
  logoUrl: '/Vytalle_Logo_Gold.png',
  faviconUrl: '/Vytalle_Logo_Gold.png',
  primaryColor: '#d8a75b',
  secondaryColor: '#e79632',
  whatsapp: '5521996192890',
  email: 'admin@vytalle.com.br',
  emailPrivacidade: 'privacidade@vytalle.com.br',
  emailDpo: 'dpo@vytalle.com.br',
  instagram: '@vytalle.estetica',
  website: 'https://vytalle-estetica.vercel.app',
  mensagemDestaque: 'Produtos Premium para Profissionais',
  infoEntrega: 'Entrega em 1-3 dias úteis • Transporte refrigerado especializado',
  formasPagamento: 'PIX • Cartão • Boleto',
  contatoSuporte: 'Suporte especializado via WhatsApp',
};

// Função pura para obter configurações padrão
export function getDefaultCustomization(): CustomizationData {
  return { ...defaultCustomization };
}

// Função pura para aplicar customizações ao DOM
export function applyCustomizationToDOM(data: CustomizationData): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  // Aplicar cores via CSS custom properties
  root.style.setProperty('--vitale-primary', data.primaryColor);
  root.style.setProperty('--vitale-secondary', data.secondaryColor);

  // Atualizar título da página
  document.title = `${data.companyName} - Catálogo Premium`;

  // Atualizar favicon
  const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
  if (favicon) {
    favicon.href = data.faviconUrl;
  }

  // Atualizar meta tags
  updateMetaTags(data);
}

// Função pura para atualizar meta tags
function updateMetaTags(data: CustomizationData): void {
  if (typeof window === 'undefined') return;

  // Meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', `${data.companyName} - ${data.mensagemDestaque}`);

  // Open Graph
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', data.companyName);

  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (!ogDescription) {
    ogDescription = document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    document.head.appendChild(ogDescription);
  }
  ogDescription.setAttribute('content', data.mensagemDestaque);

  let ogImage = document.querySelector('meta[property="og:image"]');
  if (!ogImage) {
    ogImage = document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    document.head.appendChild(ogImage);
  }
  ogImage.setAttribute('content', data.logoUrl);
}

// Função pura para substituir placeholders
export function replacePlaceholders(text: string, customization: CustomizationData): string {
  return text
    .replace(/\{companyName\}/g, customization.companyName)
    .replace(/\{whatsapp\}/g, customization.whatsapp)
    .replace(/\{email\}/g, customization.email)
    .replace(/\{instagram\}/g, customization.instagram)
    .replace(/\{website\}/g, customization.website)
    .replace(/\{mensagemDestaque\}/g, customization.mensagemDestaque)
    .replace(/\{infoEntrega\}/g, customization.infoEntrega)
    .replace(/\{formasPagamento\}/g, customization.formasPagamento)
    .replace(/\{contatoSuporte\}/g, customization.contatoSuporte);
}

// Função pura para gerar URL do WhatsApp
export function getWhatsAppUrl(customization: CustomizationData, message?: string): string {
  const defaultMessage = `Olá! Gostaria de informações sobre os produtos da ${customization.companyName}.`;
  const finalMessage = message || defaultMessage;
  return `https://wa.me/${customization.whatsapp}?text=${encodeURIComponent(finalMessage)}`;
}

export function useCustomization() {
  const [customization, setCustomization] = useState<CustomizationData>(defaultCustomization);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar customizações do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('vytalle-customization');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setCustomization(parsedData);
          applyCustomizationToDOM(parsedData);
        } catch (error) {
          console.error('Erro ao carregar customizações:', error);
        }
      } else {
        applyCustomizationToDOM(defaultCustomization);
      }
      setIsLoaded(true);
    }
  }, []);

  // Salvar customizações
  const saveCustomization = (data: CustomizationData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vytalle-customization', JSON.stringify(data));
      setCustomization(data);
      applyCustomizationToDOM(data);
    }
  };

  // Resetar para padrão
  const resetCustomization = () => {
    saveCustomization(defaultCustomization);
  };

  // Gerar URL do WhatsApp com mensagem personalizada
  const getWhatsAppUrlWithMessage = (message?: string) => {
    return getWhatsAppUrl(customization, message);
  };

  // Substituir placeholders em textos
  const replacePlaceholdersInText = (text: string) => {
    return replacePlaceholders(text, customization);
  };

  // Aplicar customizações
  const applyCustomization = (data: CustomizationData) => {
    applyCustomizationToDOM(data);
  };

  return {
    customization,
    isLoaded,
    saveCustomization,
    resetCustomization,
    getWhatsAppUrl: getWhatsAppUrlWithMessage,
    replacePlaceholders: replacePlaceholdersInText,
    applyCustomization,
  };
}
