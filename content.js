function getActInfo(url){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, true );
    xmlHttp.responseType = 'document';
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            name = xmlHttp.responseXML.getElementsByClassName("portlet-title area_bck_4")[0]
            .children[0].innerHTML
            captured = name.match(/Ficha (.*)/)[1]
            all_fields = xmlHttp.responseXML.getElementById("portlet_info")
                .children[0].children[0].children[1].children
            for (var i = all_fields.length - 1; i >= 0; i--) {
                if(all_fields[i].innerHTML.indexOf("Inicio de la actividad") > 0){
                    console.log(captured, all_fields[i].innerHTML)
                    break;
                }
            }
        }
    }
    xmlHttp.send( null );
}

function showCalendar () {
    let result = document.getElementsByClassName("page-breadcrumb breadcrumb")[0].innerHTML.replace(/\<\/i\>(.+)\<small\>/g, " Mi Calendario")
    document.getElementsByClassName("page-breadcrumb breadcrumb")[0].innerHTML = result
    let rows = document.getElementsByClassName("page-content")[0]
    for (var i = rows.children.length - 1; i >= 1; i--) {
        rows.children[i].remove()
    }

    // Get favourite activities
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "intranet.php", true );
    
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            let html = document.createElement("html")
            html.innerHTML = xmlHttp.responseText
            let listFavouriteActivities = html.getElementsByClassName("slidee")[0].children
            for (var i = listFavouriteActivities.length - 1; i >= 0; i--) {
                console.log(getActInfo(listFavouriteActivities[i].children[0].href))
            }
        }
    }
    xmlHttp.send( null );
}

var sidebar = document.getElementsByClassName("page-sidebar-menu")[0]

var calendar_button = document.createElement("li");
var s = `
<a id="myCalendar" href="#calendar-extension">
    <i class="fa fa-calendar"></i>
        <span class="title">Mi calendario</span>
        <span class=""></span>
</a>`
calendar_button.innerHTML = s
calendar_button.className = "start"

sidebar.insertBefore(calendar_button, sidebar.children[2])

var link = document.getElementById('myCalendar');
link.addEventListener('click', function() {
    showCalendar();
});

