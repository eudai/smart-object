var Router = function(){
	
	this.initialize = function(){
		page('*', handler)
		page()
	}

	var handler = function(context){
		var database = context.pathname.split('/')[2]
		if ( !database ) return
		var id = context.pathname.split('/')[3]
		var defaultOptions = { include_docs: true, limit: 10 }
		var options = formatQueryString(context.querystring)
		options = _.extend(defaultOptions,options)
		var db = new PouchDB("http://localhost:5984/" + database)
		var smartObject = new SmartObject({title: id || database })
		$(document.smartObject.body).empty().append(smartObject.element)
		if ( id ){
			updateBreadCrumbs([database])
			db.get(id,options,function(error,data){
				smartObject.handle( error || data )
			})
		} else {
			updateBreadCrumbs([])
			db.allDocs(options,function(error,data){
				smartObject.handle( error || data )
			})
		}
		
// 		db.get('_design/docs',function(error,data){
// 			for ( var view in data.views ) {
// 				db.query( 'docs/' + view , function(error,data,req) {
// 					console.log(data)
// 					data._id = view
// 					var smartObject = new SmartObject(data)
// 					document.smartObject.body.appendChild(smartObject.element)
// 				})
// 			}
// 		})

	}

	var makeBreadCrumbs = function(){
		var breadcrumbs = document.createElement('ul')
		breadcrumbs.className = 'breadcrumbs uk-navbar-nav'
		document.smartObject.navbar.element.appendChild(breadcrumbs)
		return breadcrumbs
	}

	var updateBreadCrumbs = function(crumbs){
		crumbs = crumbs || location.hash.split('/')
        if ( $('.breadcrumbs').length < 1 ) makeBreadCrumbs()
        var breadcrumbs = $('.breadcrumbs')
        breadcrumbs.empty()
        for ( var i in crumbs ){
            var crumb = makeCrumb(crumbs[i])
            breadcrumbs.append(crumb)
        }
	}

	var makeCrumb = function(title){
        var li = document.createElement('li')
        var a = document.createElement('a')
        a.textContent = title
        var path = location.hash
        var start = path.indexOf(title)
        var root = path.substring(0,start)
        a.href = root + title
        li.appendChild(a)
        return li
    }

	var formatQueryString = function(queryString){
		var options = {}
		var pairs = queryString.split('&')
		for ( var i in pairs ){
			var pair = pairs[i].split('=')
			options[pair[0]] = pair[1]
		}
		return options
	}

	this.initialize()

}