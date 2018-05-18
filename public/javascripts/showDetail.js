function showHide(that) {
	if (that.parentNode.parentNode.nextSibling.hasAttribute('hidden')) {
		that.parentNode.parentNode.nextSibling.removeAttribute('hidden');
	} else {
		that.parentNode.parentNode.nextSibling.setAttribute('hidden', 'true');	
	}
}

function hideDetail(that) {
	that.parentNode.parentNode.nextSibling.setAttribute('hidden', 'true');
}