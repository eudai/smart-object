var Sidebar = function(array){

    var initialize = function(array){
        
        var offCanvas = makeOffCanvas()
        
        var offCanvasBar = makeOffCanvasBar()
        offCanvas.appendChild(offCanvasBar)

        var list = makeList(array)
        offCanvasBar.appendChild(list)

        var button = makeButton()

        return {
            data: array,
            element: offCanvas,
            button: button
        }
    }

    var makeOffCanvas = function(element){
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
        list.className = "uk-nav uk-nav-parent uk-nav-offcanvas"
        for ( var i in array ){
            var settings = array[i]
            var item = makeItem(settings)
            list.appendChild(item)
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
        return li
    }

    var makeButton = function(target){
        var button = document.createElement('a')
        button.className = "uk-navbar-content uk-navbar-toggle"
        button.setAttribute("data-uk-offcanvas","{target:'#" + target + "'}")
        return button
    }

    var sidebar = initialize(array)
    this.data = sidebar.data
    this.element = sidebar.element 
    this.makeButton = makeButton 
     
}