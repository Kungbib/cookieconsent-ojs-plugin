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
      default: 'en',
      translations: {
        en: {
          preferencesModal: {
            sections: [
              // Toppsektion med allmän information
              {
                title: "About the use of cookies",
                description: "This service uses cookies. A cookie is a small text file stored in the visitor's computer. KB's services are designed to minimize the risk of spreading your data. The information stored via cookies can never be used by third parties for marketing purposes."
              },
              // Sektionen för nödvändiga kakor
              {
                title: "Essential cookies",
                description: "These cookies are required for the service to be secure and function as intended. Therefore they cannot be disabled.",
                linkedCategory: "necessary", // här länkar vi samman beskrivningen med respektive kategori
              },
              // Sektionen för analytiska kakor
              {
                title: "Analytical cookies",
                description:
                  "Cookies that provide us with information about how the website is used, so that we can maintain and improve user experience.",
                linkedCategory: "analytics"
              },
              // Sektionen i botten för ytterligare allmän information
              {
                title: "More information",
                description: "You can always change your choices by clicking on ”Manage cookies” in the footer at the bottom of the page."
              }
            ]
          }
        }
      }
    }
  });
});
