var Navbar = function(array){

	var initialize = function(navs){
		var navbar = makeNavbar(navs)
		return {
			element: navbar,
			data: navs
		}
	}

	var makeNavbar = function(array){
        var navbar = document.createElement('nav')
        navbar.className = "uk-navbar"
        for ( var i in array ){
			var nav = makeNav( array[i] )
			navbar.appendChild(nav)
		}
        return navbar
    }

    var makeNav = function(array){
        var nav = document.createElement('ul')
        nav.className = "uk-navbar-nav"
        for ( var i in array ){
            var item = makeNavItem( array[i] )
            nav.appendChild(item)
        }
        return nav
    }

    var makeNavItem = function(settings){
        var item = makeListItem()
        var link = makeLink()
        
        if ( settings.icon ){
            var icon = makeIcon(settings.icon)
            link.appendChild(icon)
            $(link).addClass('uk-navbar-content')
        }

        if ( settings.href ){
            link.href = settings.href
        }
        
        if ( settings.title ){
            var span = makeSpan(settings.title)
            link.appendChild(span)
        }

        if ( settings.onclick ){
            link.addEventListener('click',settings.onclick)
        }

        if ( settings.class ){
            link.className = settings.class
        }

        if ( settings.flip ){
        	link = makeFlip(link)
        }
        
        item.appendChild(link)
        return item
    }

    var makeFlip = function(element){
        var flip = document.createElement('div')
        flip.className = "uk-navbar-flip"
        if ( element.nodeName ) flip.appendChild(element)
        return flip
    }

    var makeListItem = function(){
        var item = document.createElement('li')
        return item
    }

    var makeLink = function(){
        var link = document.createElement('a')
        return link
    }

    var makeSpan = function(text){
        var span = document.createElement('span')
        span.textContent = text
        return span
    }

    var makeIcon = function(name){
        var icon = document.createElement('i')
        icon.className = "uk-icon-" + name
        return icon
    }


	var navbar = initialize(array)
	this.data = navbar.data
	this.element = navbar.element

}