'use client';

import { useEffect } from 'react';

/**
 * Accessibility Provider para WCAG 2.1 AA Compliance
 * Implementa melhorias de acessibilidade em toda a aplicação
 */
export default function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Skip links para navegação por teclado
    const createSkipLinks = () => {
      if (typeof document !== 'undefined') {
        const skipLinksContainer = document.createElement('div');
        skipLinksContainer.className = 'skip-links';
        skipLinksContainer.setAttribute('aria-label', 'Links de navegação rápida');

        const skipLinks = [
          { href: '#main-content', text: 'Pular para conteúdo principal' },
          { href: '#navigation', text: 'Pular para navegação' },
          { href: '#footer', text: 'Pular para rodapé' },
        ];

        skipLinks.forEach(link => {
          const skipLink = document.createElement('a');
          skipLink.href = link.href;
          skipLink.textContent = link.text;
          skipLink.className =
            'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-vitale-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:no-underline';
          skipLinksContainer.appendChild(skipLink);
        });

        document.body.insertBefore(skipLinksContainer, document.body.firstChild);
      }
    };

    // Melhorar indicadores de foco
    const enhanceFocusIndicators = () => {
      if (typeof document !== 'undefined') {
        const style = document.createElement('style');
        style.textContent = `
          /* Enhanced focus indicators */
          *:focus-visible {
            outline: 3px solid #2563eb !important;
            outline-offset: 2px !important;
            border-radius: 4px;
          }

          /* High contrast mode support */
          @media (prefers-contrast: high) {
            * {
              border-color: ButtonText !important;
            }
            .text-vitale-primary {
              color: ButtonText !important;
            }
            .bg-vitale-primary {
              background-color: ButtonFace !important;
              color: ButtonText !important;
            }
          }

          /* Reduced motion support */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }

          /* Enhanced text readability */
          @media (prefers-contrast: more) {
            .text-neutral-700 {
              color: #1f2937 !important;
            }
            .text-neutral-600 {
              color: #374151 !important;
            }
          }

          /* Screen reader only class */
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }

          .sr-only:focus {
            position: static;
            width: auto;
            height: auto;
            padding: inherit;
            margin: inherit;
            overflow: visible;
            clip: auto;
            white-space: normal;
          }
        `;
        document.head.appendChild(style);
      }
    };

    // Melhorar navegação por teclado
    const enhanceKeyboardNavigation = () => {
      if (typeof document !== 'undefined') {
        document.addEventListener('keydown', e => {
          // Escape key closes modals/dropdowns
          if (e.key === 'Escape') {
            const modals = document.querySelectorAll('[role="dialog"], [data-modal]');
            modals.forEach(modal => {
              if (modal instanceof HTMLElement && modal.style.display !== 'none') {
                const closeButton = modal.querySelector(
                  '[aria-label*="fechar"], [aria-label*="close"]'
                );
                if (closeButton instanceof HTMLElement) {
                  closeButton.click();
                }
              }
            });
          }

          // Tab trap for modals
          if (e.key === 'Tab') {
            const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
            if (activeModal) {
              const focusableElements = activeModal.querySelectorAll(
                'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
              );
              const firstFocusable = focusableElements[0] as HTMLElement;
              const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

              if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable?.focus();
              } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable?.focus();
              }
            }
          }
        });
      }
    };

    // Adicionar landmarks semânticos automaticamente
    const addLandmarks = () => {
      if (typeof document !== 'undefined') {
        // Main content landmark
        const mainContent = document.querySelector('main');
        if (mainContent && !mainContent.id) {
          mainContent.id = 'main-content';
          mainContent.setAttribute('role', 'main');
          mainContent.setAttribute('aria-label', 'Conteúdo principal');
        }

        // Navigation landmark
        const navigation = document.querySelector('nav');
        if (navigation && !navigation.id) {
          navigation.id = 'navigation';
          navigation.setAttribute('aria-label', 'Navegação principal');
        }

        // Footer landmark
        const footer = document.querySelector('footer');
        if (footer && !footer.id) {
          footer.id = 'footer';
          footer.setAttribute('aria-label', 'Informações do rodapé');
        }
      }
    };

    // Melhorar anúncios para leitores de tela
    const enhanceScreenReaderAnnouncements = () => {
      if (typeof document !== 'undefined') {
        // Live region para anúncios dinâmicos
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        // Function to announce messages
        (window as any).announceToScreenReader = (message: string) => {
          const liveRegion = document.getElementById('live-region');
          if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
              liveRegion.textContent = '';
            }, 1000);
          }
        };
      }
    };

    // Verificar e melhorar contraste automaticamente
    const checkAndImproveContrast = () => {
      if (typeof document !== 'undefined') {
        const textElements = document.querySelectorAll(
          'p, span, div, h1, h2, h3, h4, h5, h6, a, button'
        );
        textElements.forEach(element => {
          if (element instanceof HTMLElement) {
            const styles = window.getComputedStyle(element);
            const color = styles.color;
            const backgroundColor = styles.backgroundColor;

            // Se o texto for muito claro, escurecer
            if (color.includes('rgb(139, 116, 90)') || color.includes('#8b745a')) {
              element.style.color = '#5a4633'; // Cor mais escura para melhor contraste
            }
          }
        });
      }
    };

    // Inicializar todas as melhorias
    createSkipLinks();
    enhanceFocusIndicators();
    enhanceKeyboardNavigation();
    addLandmarks();
    enhanceScreenReaderAnnouncements();

    // Verificar contraste após componentes carregarem
    setTimeout(checkAndImproveContrast, 100);

    // Cleanup
    return () => {
      if (typeof document !== 'undefined') {
        const skipLinks = document.querySelector('.skip-links');
        skipLinks?.remove();
      }
    };
  }, []);

  return <>{children}</>;
}
