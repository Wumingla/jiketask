window.onload = function() {
    var btn = document.getElementById('btn'); //按钮
    var result = document.getElementById('result'); //输入结果
    var res;
    btn.onclick = function() {
        var num = document.getElementById('num').value; //分数
        var subsection = document.getElementById('subsection').value; //分段
        if(num==""){
            alert("请输入分数");
            return false;
        }else if(!(num>=0&&num<=100)){
             alert("输入错误。分数范围为0-100");
            return false;
        }else if (subsection == "") {
            subsection = 10;
        }else if (!(subsection>0)) {
            alert("输入错误。分段必须为正数");
            return false;
        }
        res = subsection - Math.floor(num * subsection / 100);
        if (res == 0) {
            res = 1;
        }
        result.innerHTML = "该学员为" + res + "等生";
    }
}
