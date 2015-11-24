window.setInterval('showTime()', 1000)
//表格第一格画图
function draw() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.lineTo(47, 0);
    context.lineTo(141, 50);
    context.fillStyle = "#000";
    context.fill();
    context.stroke();
    context.lineTo(0, 20);
    context.lineTo(141, 50);
    context.fillStyle = "#000";
    context.fill();
    context.stroke();
    context.closePath();

    context.font = "bold 15pt Arial";
    context.fillStyle = "#000";
    context.fillText('星期', 95, 20);
    context.rotate(Math.PI / 9);
    context.fillText('节次', 23, 8);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.fillText('时间', 0, 46);

    showTime();

}
//显示当前的时间
function showTime() {
    var t = new Date();
    var data = null;
    var day;
    switch (t.getDay()) {
        case 0:
            day = "星期日";
            break;
        case 1:
            day = "星期一";
            break;
        case 2:
            day = "星期二";
            break;
        case 3:
            day = "星期三";
            break;
        case 4:
            day = "星期四";
            break;
        case 5:
            day = "星期五";
            break;
        case 6:
            day = "星期六";
            break;
    };
    var footer = document.getElementById("footer");
    footer.innerHTML = "当前时间：" + t.toLocaleDateString() + " " + day + " " + t.toLocaleTimeString();
    showCourse(t.getDay(), t.getHours(), t.getMinutes())
}
// 获取课程元素 
function showCourse(d, h, m) {
    if (d == 0) {
        d = 7;
    }
    var tr = document.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        for (var x = 1; x <= 7; x++) {
            showColor(tr, i, x, "rgba(255,255,255,0.9);");
        }
        showColor(tr, i, d, "rgba(126, 242, 180, 0.5)")
    }
    if (h == 8 && m < 45) {
        showColor(tr, 1, d, "red");
    }
    if (h == 9 && m < 45) {
        showColor(tr, 2, d, "red");
    }
    if (h == 10 && m < 45) {
        showColor(tr, 3, d, "red");
    }
    if (h == 11 && m < 45) {
        showColor(tr, 4, d, "red");
    }
    if (h == 15 && m < 45) {
        showColor(tr, 5, d, "red");
    }
    if (h == 16 && m < 45) {
        showColor(tr, 6, d, "red");
    }

}
// 给课程加颜色 
function showColor(tr, i, d, c) {

    if (i == 1 || i == 5) {
        tr[i].childNodes[2 * d + 3].style.background = c;
    } else {
        tr[i].childNodes[2 * d + 1].style.background = c;
    }
}
