document.addEventListener('DOMContentLoaded', function() {
  // aktivera CookieConsent
  KbCookieConsent.run({
    categories: {
      necessary: {
        readOnly: true,
        enabled: true
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              // alla kakor som har "_pk." i namnet = Matomo-kakor
              name: /^_pk.*/
            }
          ]
        }
      }
    },
    language: {
      default: 'sv',
      translations: {
        sv: {
          preferencesModal: {
            sections: [
              // Toppsektion med allmän information
              {
                title: "Om användning av kakor",
                description: "Den här tjänsten använder kakor (cookies). En kaka är en liten textfil som lagras i besökarens dator. KB:s tjänster är designade för att minska risken för spridning av dina uppgifter. Informationen som lagras via kakor kan aldrig användas av tredje part i marknadsföringssyfte."
              },
              // Sektionen för nödvändiga kakor
              {
                title: "Nödvändiga kakor",
                description: "Dessa kakor krävs för att tjänsten ska vara säker och fungera som den ska. Därför går de inte att inaktivera.",
                linkedCategory: "necessary",
                cookieTable: {
                  title: "Lista över kakor",
                  headers: {
                    name: "Namn",
                    description: "Beskrivning",
                    duration: "Varaktighet"
                  },
                  body: [
                    {
                      name: "cc_cookie",
                      description: "Används för att spara dina kakinställningar.",
                      duration: "6 månader"
                    },
                    {
                      name: "OJSSID",
                      description: "Används för att du ska kunna logga in i Publicera.",
                      duration: "Session"
                    }
                  ]
                }
              },
              // Sektionen för analytiska kakor
              {
                title: "Analytiska kakor",
                description:
                  "Kakor som ger oss information om hur webbplatsen används som gör att vi kan underhålla, driva och förbättra användarupplevelsen.",
                linkedCategory: "analytics",
                cookieTable: {
                  title: "Lista över kakor",
                  headers: {
                    name: "Namn",
                    description: "Beskrivning",
                    duration: "Varaktighet"
                  },
                  body: [
                    {
                      name: "_pk_id",
                      description: "Används för att komma ihåg dig genom ett unikt och slumpmässigt utformat ID.",
                      duration: "13 månader"
                    },
                    {
                      name: "_pk_ses",
                      description: "Används för att spara tillfällig data om ditt besök.",
                      duration: "30 minuter"
                    },
                    {
                      name: "mtm_consent",
                      description: "Används för att spara samtycke till analytiska kakor.",
                      duration: "400 dagar"
                    },
                    {
                      name: "mtm_consent_removed",
                      description: "Används för att spara nekat samtycke till analytiska kakor.",
                      duration: "400 dagar"
                    }
                  ]
                }
              },
              // Sektionen i botten för ytterligare allmän information
              {
                title: "Mer information",
                description: "Du kan alltid ändra dina val genom att klicka på “Hantera cookies” längst ner på sidan i sidfoten."
              }
            ]
          }
        }
      }
    },
    onConsent: ({ cookie }) => {
      if (cookie.categories.includes('analytics')) {
        window._paq = window._paq || [];
        window._paq.push(['rememberConsentGiven']);
      }
    },
    onChange: ({ cookie }) => {
      if (cookie.categories.includes('analytics')) {
        window._paq = window._paq || [];
        window._paq.push(['rememberConsentGiven']);
      } else {
        window._paq.push(['forgetConsentGiven']);
      }
    }
  });

  // Terribly fragile and ugly hack but the alternative is even worse
  const ojsFooter = document.querySelector('div.pkp_footer_content');
  if (ojsFooter) {
    const newLink = document.createElement('a');
    newLink.href = "#";
    newLink.setAttribute('data-cc', 'show-preferencesModal');
    newLink.setAttribute('aria-haspopup', 'dialog');
    newLink.textContent = 'Hantera kakor';

    const paragraphs = ojsFooter.querySelectorAll('p');

    if (ojsFooter.textContent.includes('Värdplattform')) {
      for (const paragraph of paragraphs) {
        if (paragraph.textContent.includes('Värdplattform')) {
          paragraph.appendChild(document.createTextNode(' | '));
          paragraph.appendChild(newLink);
          break;
        }
      }
    } else {
      for (const paragraph of paragraphs) {
        if (paragraph.textContent.includes('Om cookies')) {
          paragraph.appendChild(document.createElement('br'));
          paragraph.appendChild(newLink);
          break;
        }
      }
    }
  }
});
