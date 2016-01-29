var SmartObject = function(object){
	
	this.initialize = function(data){
		
		this.element = makePanel()
		this.head = makeHead()
		this.body = makeBody()
		this.left = makeLeft()
		this.element.appendChild(this.head)
		this.element.appendChild(this.body)
		this.element.appendChild(this.left)
		this.handle(data)
	}

	this.listHandler = function(data){
// 		console.log(data)
		for ( var i in data.rows ){
			var smartObject = new SmartObject(data.rows[i].doc)
			this.children = this.children || []
			this.children.push(smartObject)
			this.body.appendChild(smartObject.element)
		}
	}

	this.docHandler = function(doc){
		var pre = document.createElement('pre')
		pre.textContent = JSON.stringify(doc,null,'\t')
		this.body.appendChild(pre)
	}

	this.handle = function(data){
		this.data = this.data || {}
		data = data || {}
		this.data = data = _.extend(this.data,data)
		this.title = data.title || this.title || data.name || data.id || data._id || ""		
		this.makeNavbar()
		this.makeSidebar()
		var type = determineType(data)
// 		var handler = this[type + "Handler"]
		if ( typeof this[type + "Handler"] == 'function' ){
			this[type + "Handler"](data)
		}
		$.get({url:'/templates/' + type + '.hdb' ,context: this.body},function(string){
			var template = Handlebars.compile(string)
			var html = template(data)
			$(this).empty().html(html)
		})
	}

	var determineType = function(data){
		if ( data._type ) return data._type
		if ( data._id || data.id ) return 'doc'
		if ( data.rows ) return 'list'
		if ( Array.isArray(data) ) return 'array'
		return typeof data
	}

	var makePanel = function(settings){
		var panel = document.createElement('div')
		panel.className = 'smart-object uk-panel uk-panel-box uk-panel-box-secondary'
		return panel
	}

	this.makeNavbar = function(settings){
		settings = settings || [[{title: this.title}]]
		var navbar = new Navbar(settings)
		$(this.head).empty().append(navbar.element)
		this.navbar = navbar
		this.data._navbar = settings
	}

	this.makeSidebar = function(settings){
		settings = settings || this.data._sidebar
		if ( !settings ) return
		var sidebar = new Sidebar(settings)
		var li = document.createElement('li')
		var button = sidebar.makeButton()
		li.appendChild(button)
		$(this.navbar.element).children('ul').first().prepend(li)
		$(this.left).append(sidebar.element)
		this.sidebar = sidebar
	}

	var makeHead = function(){
		var head = document.createElement('div')
		head.className = 'head'
		return head
	}

	var makeBody = function(){
		var body = document.createElement('div')
		body.className = 'body'
		return body
	}

	var makeLeft = function(){
		var left = document.createElement('div')
		left.className = 'left'
		return left
	}

	this.initialize(object)

}