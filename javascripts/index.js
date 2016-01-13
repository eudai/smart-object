var app = function(){

	var db = "http://127.0.0.1:5984"
	$.getJSON(db + '/_all_dbs',function(dbs){
		console.log(dbs)	
	})

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