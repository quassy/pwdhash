/*
 * Remote PwdHash
 * A JavaScript implementation of the PwdHash hashing algorithm for web browsers.
 *
 * Version 1.0 Copyright (C) Stanford University 2004-2006
 * Author: Collin Jackson
 * Other Contributors: Dan Boneh, John Mitchell, Nick Miyake, and Blake Ross
 * Distributed under the BSD License
 * See http://crypto.stanford.edu/PwdHash for more info.
 * Requires the Javascript MD5 library, available here: http://pajhome.org.uk/crypt/md5
 *
 * Version 2.0 Copyright (C) quassy 2015-2018
 * Distributed under the BSD License
 */

var SPH_kPasswordPrefix = "@@";

/*
 * Returns a conforming hashed password generated from the form's field values.
 */
function generate()
{
  var domain = (new SPH_DomainExtractor()).extractDomain(document.getElementById("domain").value);
  var size = SPH_kPasswordPrefix.length;
  var data = document.getElementById('password').value;
  if (data.substring(0, size) == SPH_kPasswordPrefix)
    data = data.substring(size);
  var result = new String(new SPH_HashedPassword(data, domain));
  document.getElementById('hash').value = result;
}

/*
 * Initialize page with default hashing parameters and add listeners to generate
 */
initForm = function () {
  if (typeof chrome != "undefined" && typeof chrome.tabs != "undefined") {
    chrome.tabs.query({'currentWindow': true, 'active': true}, function (tabs) {
      document.getElementById("domain").value = (new SPH_DomainExtractor()).extractDomain(tabs[0].url);
      document.getElementById("password").focus();
    });
  }
  else {
    document.getElementById("domain").value = "";
    document.getElementById("domain").focus();
  }

  document.getElementById("password").value = "";
  document.getElementById("hash").value = "";

  document.getElementById("domain").addEventListener("keyup", generate);
  document.getElementById("password").addEventListener("keyup", generate);

  // Jump to next field on enter
  document.getElementById("domain").addEventListener("keydown", function (e) {
    if (e.which === 13) {
      document.getElementById("password").focus();
    }
  });
  document.getElementById("password").addEventListener("keydown", function (e) {
    if (e.which === 13) {
      document.getElementById("hash").focus();
      document.getElementById("hash").select();
      if (document.execCommand('copy')) {
        window.close();
      }
    }
  });
  document.getElementById("hash").addEventListener("keydown", function (e) {
    if (e.which === 13) {
      window.close();
    }
  });

  // i18n
  document.querySelectorAll('[for="domain"]')[0].textContent   = browser.i18n.getMessage("addressLabel");
  document.getElementById("domain").placeholder                = browser.i18n.getMessage("addressPlaceholder");
  document.querySelectorAll('[for="password"]')[0].textContent = browser.i18n.getMessage("passwordLabel");
  document.getElementById("password").placeholder              = browser.i18n.getMessage("passwordPlaceholder");
  document.querySelectorAll('[for="hash"]')[0].textContent     = browser.i18n.getMessage("pwdhashLabel");
  document.getElementById("hash").placeholder                  = browser.i18n.getMessage("pwdhashPlaceholder");
  document.getElementById("readme").textContent                = browser.i18n.getMessage("readmeText");
  document.getElementById("readme").title                      = browser.i18n.getMessage("readmeTitle");
  document.getElementById("readme").href                       = browser.i18n.getMessage("readmeUrl");
}

window.addEventListener("load", initForm);
if (typeof chrome != "undefined" && typeof chrome.tabs != "undefined") {
  chrome.tabs.onActivated.addListener(initForm);
  chrome.tabs.onUpdated.addListener(initForm);
}