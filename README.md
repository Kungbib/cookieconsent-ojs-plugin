# cookieconsent-ojs-plugin

Simple OJS plugin to load some scripts for a specific use-case, probably not interesting to anyone else.

Loads https://github.com/Kungbib/cookie-consent and runs it with the suitable configuration for [Publicera](https://publicera.kb.se/).

Installation
------------
* Download and extract the latest release from the [releases section](https://github.com/Kungbib/cookieconsent-ojs-plugin/releases).

* Place the `cookieConsent` directory in your OJS installation's `plugins/generic` directory, or use "Upload A New Plugin" from within the OJS admin interface, if you don't have direct access to the server.

* Make sure the plugin is enabled under Administration -> Site Settings -> Plugins (under "Generic Plugins").

Note that this is a site-wide plugin. It can only be activated/deactivated on site level.

If you find that the cookie consent dialog is only shown on the main site and not on individual journals, `cd`
to the OJS root directory and run:

  php lib/pkp/tools/installPluginVersion.php plugins/generic/cookieConsent/version.xml

Creating a new release
----------------------
Bump the plugin version in `cookieConsent/version.xml`.

Merge develop into master.

In the root directory (cookienotice-ojs-plugin), create a tar file with the latest code:
```
tar czf cookieConsent.tar.gz --directory=$(pwd) cookieConsent/
```
Create a new GitHub release, tag the new version (`v.<M>.<m>.<p>`) and attach `cookieConsent.tar.gz`. 
