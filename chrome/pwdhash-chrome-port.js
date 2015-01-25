/*
  * File : pwdhash-chrome-port.js
  * Author : Christophe Liou Kee On
  * Created on : 01/09/2009
  
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
*
*/

function PasswordInputListener (field) {
	field.addEventListener('keydown', this, true);
	field.addEventListener('change', this, true);
	this.field = field;
	this.pwdhashit = false;
}

const VK_F2 = 113;
const VK_TAB = 9;
const VK_RETURN = 13;
const SPH_kPasswordKey2 = VK_F2;

PasswordInputListener.prototype = {
	togglePasswordStatus: function (force) {
		if (force == null)
			force = this.pwdhashit;
		else
			force = !force;
		
		if (force) {
			this.pwdhashit = false;
			this.field.style.backgroundColor = '#fff';
		} else {
			this.pwdhashit = true;
			this.field.style.backgroundColor = '#ff0';
		}
	},
	
	submitPassword: function () {
		var field = this.field;
		var password = field.value;
		
		if (password.substr(0,2) == SPH_kPasswordPrefix) {
			password = password.substr(2);
			this.togglePasswordStatus(true);
		}
		
		if (this.pwdhashit && this.notyethashed) {
			this.notyethashed = false;
			
			var uri = new String(field.ownerDocument.location);
			var domain = (new SPH_DomainExtractor()).extractDomain(uri);
			var hasehd = (new SPH_HashedPassword(password, domain));
			field.value = (hasehd);
		}
	},
	
	handleEvent: function(evt) {
		if (evt.type == 'keydown') {
			if (evt.keyCode == SPH_kPasswordKey2) {
				this.togglePasswordStatus();
			}
			if (evt.keyCode != VK_TAB && evt.keyCode != VK_RETURN) {
				this.notyethashed = true;
			}
		}
		
		if (evt.type == 'change') {
			if (this.field.value != '') {
				this.submitPassword();
			}
		}
	},
}

window.addEventListener('load', function () {
	var result = document.evaluate('//input[@type="password"]',
		document, null, 0, null);
	var item;
	while (item = result.iterateNext()) {
		new PasswordInputListener(item);
	}
});

