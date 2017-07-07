/*
 * Remote PwdHash
 * A JavaScript implementation of the PwdHash hashing algorithm for web browsers.
 * Version 1.0 Copyright (C) Stanford University 2004-2006
 * Author: Collin Jackson
 * Other Contributors: Dan Boneh, John Mitchell, Nick Miyake, and Blake Ross
 * Distributed under the BSD License
 * See http://crypto.stanford.edu/PwdHash for more info.
 * Requires the Javascript MD5 library, available here: http://pajhome.org.uk/crypt/md5
 *
 * Version 2.0 modified by quassy
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
 * Get the URL / domain from the currently active tabs
 */
getTabDomain = function () {
  browser.tabs.query({'active': true}, function (tabs) {
    document.getElementById("domain").value = (new SPH_DomainExtractor()).extractDomain(tabs[0].url);
    document.getElementById("password").focus();
  });
}

/*
 * Initialize page with default hashing parameters and add listeners to generate
 */
initForm = function () {
  document.getElementById("domain").value = "";
  document.getElementById("password").value = "";
  document.getElementById("hash").value = "";
  document.getElementById("domain").focus();

  document.getElementById("domain").addEventListener("keyup", generate);
  document.getElementById("password").addEventListener("keyup", generate); 

  getTabDomain();
}
window.addEventListener("load", initForm);
browser.tabs.onActivated.addListener(initForm);