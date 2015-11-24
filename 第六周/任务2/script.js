window.onload = function() {
    var setColor = document.getElementById('set-color');
    var theme = document.getElementsByClassName('theme');
    var themeA = document.getElementsByClassName('theme-a');
    if (localStorage.themeColor != "") {
        setColor.value = localStorage.themeColor;
        changeColor();
    }
    var themeColor = setColor.value;
    //修改主题监听事件   
    setColor.addEventListener('change', changeColor);

    function changeColor() {
        theme[0].style.cssText = "border-top-color:" + setColor.value + "!important";
        theme[1].style.cssText = "background-color:" + setColor.value;
        for (var i = 0; i < themeA.length; i++) {
            themeA[i].style.color = setColor.value;
        }
        themeColor = setColor.value;
        localStorage.themeColor = setColor.value;
    }

    //body 导航换过的主题
    var bodyNav = document.getElementById('body-nav');
    bodyNav.addEventListener('mouseover', function(e) {
        e.target.style.color = themeColor;
    })
    bodyNav.addEventListener('mouseout', function(e) {
        e.target.style.color = "#333";
    })

    //搜索框选择
    var seName = document.getElementById('se-name');
    var seOption = document.getElementById('se-option');
    seName.addEventListener('click', function() {
        if (seOption.style.visibility == "visible") {
            seOption.style.visibility = "hidden";
        } else {
            seOption.style.visibility = "visible";

        }
    })

    seOption.addEventListener('click', function(e) {
        e.preventDefault();
        seOption.style.visibility = "hidden";
        seName.innerHTML = e.target.innerHTML;
    })
}
