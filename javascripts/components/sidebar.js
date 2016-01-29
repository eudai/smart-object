var Sidebar = function(array){

    this.initialize = function(array){
        
        var sidebar = makeSidebar()
        var id = _.uniqueId('sidebar')
        sidebar.id = id
        
        var offCanvasBar = makeOffCanvasBar()
        sidebar.appendChild(offCanvasBar)

        var list = makeList(array)
        offCanvasBar.appendChild(list)

        this.id = id
        this.data = array
        this.element = sidebar
    }

    this.makeButton = function(){
        var button = document.createElement('a')
        button.className = "uk-navbar-content uk-navbar-toggle"
        button.setAttribute("data-uk-offcanvas","{target:'#" + this.id + "'}")
        this.buttons = this.togglers || []
        this.buttons.push(button)
        return button
    }

    var makeSidebar = function(element){
        var offCanvas = document.createElement('div')
        offCanvas.className = "uk-offcanvas"
        return offCanvas
    }
    
    var makeOffCanvasBar = function(){
        var offCanvasBar = document.createElement('div')
        offCanvasBar.className = "uk-offcanvas-bar"
        return offCanvasBar
    }

    var makeList = function(array){
        var list = document.createElement('ul')
        list.className = "uk-nav uk-nav-offcanvas"
        for ( var i in array ){
            var settings = array[i]
            var item = makeItem(settings)
            list.appendChild(item)
        }
        if ( list.querySelector('.uk-nav-sub') ){
            list.setAttribute('data-uk-nav','')
            $(list).addClass('uk-nav-parent-icon')
        }
        return list
    }
    
    var makeItem = function(options){
        var li = document.createElement('li')
        var a = document.createElement('a')
        li.appendChild(a)
        if ( options.href){
            a.href = options.href    
        }
        if ( options.onclick ){
            a.addEventListener('click',options.onclick)
        }
        if ( options.icon ){
            var i = document.createElement('i')
            i.className = "uk-icon-" + options.icon
            a.appendChild(i)
        }
        if ( options.title ){
            var span = document.createElement('span')
            span.textContent = "\u00A0\u00A0" + options.title
            a.appendChild(span)
        }

        if ( options.subnavs ){
            li.className = 'uk-parent'
            var sublist = makeList(options.subnavs)
            sublist.className = 'uk-nav-sub'
            a.href= "#"
            li.appendChild(sublist)
        }

        return li
    }

    this.initialize(array) 
     
}