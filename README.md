# PwdHash Sidebar
[PwdHash](https://crypto.stanford.edu/PwdHash/) (by Stanford) generates passwords resistant to theft and phishing by hashing a combination of the sites address and your password.
It is available as browser extensions ([Firefox](https://addons.mozilla.org/en-US/firefox/addon/pwdhash/), [Chrome](https://chrome.google.com/extensions/detail/dnfmcfhnhnpoehjoommondmlmhdoonca), [Opera <12](https://www.coredump.gr/pwdhash-for-opera/)),
apps ([Android](https://play.google.com/store/apps/details?id=com.uploadedlobster.PwdHash&hl=de), [iOS](https://itunes.apple.com/us/app/keygrinder/id354763605), [Windows](https://github.com/mgutekunst/WP8-PwdHash)),
scripts ([Ruby](https://github.com/kizzx2/pwdhash.rb), [Python](https://pypi.python.org/pypi/pwdhash.py))
or a simple web page which uses Javascript.

Not yet supported:
_[PwdHash by Cambridge](https://www.cl.cam.ac.uk/~dl551/pwdhash/) is a proof-of-concept alteration of the original Stanford PwdHash, but with a number of improvements that fix some of the weaknesses of the original.
PwdHash-PoC uses the Forge implementation of PBKDF2-SHA512 to generate hashes._

This version of PwdHash is both a web extension for common browsers (like [Firefox](https://addons.mozilla.org/de/firefox/addon/pwdhash-sidebar/), Chrome and soon Edge) as well a [simple web page](https://quassy.github.io/pwdhash/).
You can install it as an add-on or just save the whole page locally.

## Usage

**Web**: You can just use the web version, alternatively press `Ctrl`+`S`, save the whole page locally and use it offline. Enter an address and a password. After pressing return on the password field, the hash should be copied to your clipboard.

**Firefox**: Make sure the button ![](icon_16.png) is added to your toolbar, click it or press `F8` to open the toolbar menu. The address is prefilled (but can be modified). After pressing return on the password field, the hash is copied to your clipboard. Alternatively you can press `Ctrl`+`F8` to open the sidebar.

**Chrome** (unpublished): Click on the button ![](icon_16.png) or press `Alt`+`P` to open the toolbar menu. The address is prefilled (but can be modified). After pressing return on the password field, the hash is copied to your clipboard.

**Edge** (unpublished): Click on the button ![](icon_16.png) to open the toolbar menu. The address is prefilled (but can be modified). After pressing return on the password field, the hash is copied to your clipboard.

## Screenshots

![Enter your password to generate a hash for the respective page by opening the sidebar by pressing Ctrl+F8](_screenshots/firefox-sidebar.png)

## Authors
This software was created by quassy and is released under the BSD licence.

It is based on the previous work of several authors:
Standford PwdHash: Blake Ross, Collin Jackson, Nicholas Miyake, Dan Boneh, John C. Mitchell (BSD)
[md5.js](http://pajhome.org.uk/crypt/md5): Paul Johnston & Greg Holt, Andrew Kepert, Ydnar, Lostinet (BSD)
domain extractor from genpass: Chris Zarate (public domain)