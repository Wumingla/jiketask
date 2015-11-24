window.onload = function() {
    var btn = document.getElementById('btn');
    var operator = document.getElementById('operator');
    var num1 = document.getElementById('num1');
    var num2 = document.getElementById('num2');
    var res = document.getElementById('res');
    var num1V, num2V, result;

    //点击
    btn.onclick = function() {
        if (checkout()) {
            var oper = operator.options[operator.selectedIndex].text;
            result = calculate(num1V, num2V, oper);
            if (isFinite(result)) {
                res.innerHTML = "结果为：" + result.toFixed(2);
            } else {
                res.innerHTML = "结果值超出范围";
            }
        };

    }

    //判断值是否正确
    function checkout() {
        num1V = num1.value - 0;
        num2V = num2.value - 0;
        if (num1V === "" || isNaN(num1V)) {
            console.log(num1V);
            alert("输入错误");
            num1.focus();
            num1.select();
            return false;
        } else if (num2V === "" || isNaN(num2V)) {
            alert("输入错误");
            num2.focus();
            num2.select();
            return false;
        } else {
            return true;
        }
    }

    //计算
    function calculate(x, y, char) {

        if (char == "+") {
            result = x + y;
        } else if (char == "-") {
            result = x - y;
        } else if (char == "*") {
            result = x * y;
        } else if (char == "/") {
            result = x / y;
        }
        return result;
    }

}
