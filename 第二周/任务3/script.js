window.onload = function() {
    // 显示/隐藏更多产品
    var rightnav = document.getElementById("rightnav");
    var more = document.getElementById("more");
    more.onmouseover = function() {
        rightnav.style.visibility = "visible";
    }
    rightnav.onmouseout = function(e) {
        if (!e) e = window.event;
        var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
        while (reltg && reltg != this) reltg = reltg.parentNode;
        if (reltg != this) {
            rightnav.style.visibility = "hidden";
        }
    }

    // 显示/隐藏设置
    var setUp = document.getElementById("setUp");
    var setUpGloup = document.getElementById("setUp-gloup");
    var setUpnav = document.getElementById("setUpnav");
    setUp.onmouseover = function() {
        setUpnav.style.visibility = "visible";
    }
    setUpGloup.onmouseout = function(e) {
        if (!e) e = window.event;
        var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
        while (reltg && reltg != this) reltg = reltg.parentNode;
        if (reltg != this) {
            setUpnav.style.visibility = "hidden";
        }
    }

}
