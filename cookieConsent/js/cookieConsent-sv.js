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
                linkedCategory: "necessary", // här länkar vi samman beskrivningen med respektive kategori
              },
              // Sektionen för analytiska kakor
              {
                title: "Analytiska kakor",
                description:
                  "Kakor som ger oss information om hur webbplatsen används som gör att vi kan underhålla, driva och förbättra användarupplevelsen.",
                linkedCategory: "analytics"
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
    }
  });
});
