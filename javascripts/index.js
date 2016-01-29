var app = function(){

	var data = {
		_id: "SmartObject",	
		_sidebar: [{
			title: 'Things',
			subnavs: [{
				title: 'Thing 1'
			},{
				title: 'Thing 2'
			}]
		}]
	}

	var dbs = {}

	
	var smartObject = new SmartObject({title: "SmartObject"})
	var nav = smartObject.data._navbar
	nav[0].push({class: 'breadcrumbs'})
	smartObject.handle({_navbar: nav})

	document.body.appendChild(smartObject.element)
// 	$(smartObject.element).addClass('uk-container-center')
	
	$.getJSON('http://localhost:5984/_all_dbs',function(databases){
		var list = []
		for ( var i in databases ){
			var database = databases[i]
			dbs[database] = new PouchDB(database)
			list.push({
				title: database,
				href: "/#/" + database
			})
		}
		smartObject.makeSidebar(list)
	})
	
	this.dbs = dbs
	this.smartObject = smartObject
	this.router = new Router()

}

$(document).ready(app)

