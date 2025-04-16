<?php
import('lib.pkp.classes.plugins.GenericPlugin');

class CookieConsentPlugin extends GenericPlugin {
    public function register($category, $path, $mainContextId = NULL) {
        $success = parent::register($category, $path);

        if ($success && $this->getEnabled()) {
            HookRegistry::register('TemplateManager::display', array($this, 'registerResources'));
        }

        return $success;
    }

    function registerResources($hookName, $params) {
        $request = Application::get()->getRequest();
        $templateMgr = TemplateManager::getManager($request);

        $templateMgr->addHeader(
            'kbCookieConsent',
            '<script src="https://cdn.kb.se/cookie-consent/cookie-consent-latest.umd.js"></script>'
        );

        // Not sure we can easily detect the current OJS locale from JS, hence this somewhat ugly solution...
        $cookieScript = 'cookieConsent-sv.js';
        if (AppLocale::getLocale() == "en_US") {
            $cookieScript = 'cookieConsent-en.js';
        }

        $templateMgr->addJavaScript(
            'cookieConsentScript',
            $request->getBaseUrl() . '/' . $this->getPluginPath() . '/js/' . $cookieScript,
            ['context' => ['backend', 'frontend']]
        );

        return false;
    }

    public function getDisplayName() {
        return __('plugins.generic.cookieConsent.displayName');
    }

    public function getDescription() {
        return __('plugins.generic.cookieConsent.description');
    }

    public function isSitePlugin() {
        return true;
    }

    // Can only be activated at site level.
    function getCanEnable() {
        return !((bool) Application::get()->getRequest()->getContext());
    }

    // Can only be deactivated at site level.
    function getCanDisable() {
        return !((bool) Application::get()->getRequest()->getContext());
    }
}
