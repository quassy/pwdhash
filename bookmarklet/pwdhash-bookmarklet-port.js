
var result = document.evaluate('//input[@type="password"]',
	document, null, 0, null);
var item;
while (item = result.iterateNext()) {
	var field = item;
	var password = item.value;
	var uri = new String(field.ownerDocument.location);
	var domain = (new SPH_DomainExtractor()).extractDomain(uri);
	var hasehd = (new SPH_HashedPassword(password, domain));
	field.value = (hasehd);
}
