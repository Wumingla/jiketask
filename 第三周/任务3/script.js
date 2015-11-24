window.onload = function() {

    //获取焦点

    var bdText = document.getElementById("bdText");
    var inputText = document.getElementById("inputText");
    var clear = document.getElementById("clear");
    var x = document.getElementsByTagName("nobr");

    inputText.onfocus = function() {
        bdText.style.borderColor = "#4791ff";
    }
    inputText.onblur = function() {
        bdText.style.borderColor = "#ccc";
    }
    inputText.onkeyup = function() {
        if (bdText != "") {
            clear.style.visibility = "visible";
        } else {
            clear.style.visibility = "hidden";
        }
    }

    // 输入框右侧清除按钮
    document.getElementById("inputText").focus();
    inputText.onkeyup = function() {
        if (inputText.value != "") {
            document.getElementById("clear").style.visibility = "visible";
        } else {
            document.getElementById("clear").style.visibility = "hidden";
        }
    }

    clear.onclick = function() {
        inputText.value = "";
        clear.style.visibility = "hidden";
    }

    // 右侧导航

    var more = document.getElementById("more");
    var moreNav = document.getElementById("more-nav");

    more.onmouseover = function() {
        moreNav.style.visibility = "visible";
    }
    moreNav.onmouseout = function(e) {
        if (!e) e = window.event;
        var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
        while (reltg && reltg != this) reltg = reltg.parentNode;
        if (reltg != this) {
            moreNav.style.visibility = "hidden";
        }
    }

    // 设置
    // var setup = document.getElementById("setup");
    // var setupGloup = document.getElementById("setup-gloup");
    // var setupNav = document.getElementById("setup-nav");
    // setup.onmouseover = function() {
    //     setupNav.style.visibility = "visible";
    // }
    // setupGloup.onmouseout = function(e) {
    //     if (!e) e = window.event;
    //     var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
    //     while (reltg && reltg != this) reltg = reltg.parentNode;
    //     if (reltg != this) {
    //         setupNav.style.visibility = "hidden";
    //     }
    // }


}
