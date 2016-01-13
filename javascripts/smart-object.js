var SmartObject = function(object){
	
	var initialize = function(object){

		if ( !object ) object = {}

		var id = object.id || object._id

		var title = object._title || id

		if ( !object._navbar ) object._navbar = [[{
			title: title
		}]]
		
		var panel = makeSmartObject(object.id || object._id)

		var navbar = new Navbar(object._navbar)
		panel.appendChild(navbar.element)

		if (object._sidebar){
			var sidebar = new Sidebar(object._sidebar)
			var sidebarId = id + '-offcanvas'
			sidebar.element.id = sidebarId
			panel.appendChild(sidebar.element)
			var li = document.createElement('li')
			var button = sidebar.makeButton(sidebarId)
			li.appendChild(button)
			$(navbar.element).children('ul').first().prepend(li)
		}

		return {
			data: object,
			title: title,
			element: panel,
			navbar: navbar
		}

	}

	var makeSmartObject = function(settings){
		var panel = document.createElement('div')
		panel.className = 'smart-object'
		return panel
	}

	var makeSidebar = function(settings,navbar){
		var sidebar = new Sidebar(settings)
		var sidebarId = id + '-offcanvas'
		sidebar.element.id = sidebarId
		panel.appendChild(sidebar.element)
		var li = document.createElement('li')
		var button = sidebar.makeButton(sidebarId)
		li.appendChild(button)
		$(navbar.element).children('ul').first().prepend(li)
	}

	var smartObject = initialize(object)
	this.data = object
	this.title = smartObject.title
	this.element = smartObject.element
	this.navbar = smartObject.navbar


}