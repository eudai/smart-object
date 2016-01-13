var app = function(){

	var smartObject = new SmartObject({
		_id: "SmartObject",		
		_sidebar: [{
			title: 'Dashboard',
			icon: 'tachometer',
			href: '#/dashboard'
		}]
	})

	document.body.appendChild(smartObject.element)

	this.smartObject = smartObject
	this.router = new Router()
	return this

}

$(document).ready(app)