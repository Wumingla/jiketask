window.onload = function() {
    var inputBox = document.getElementById('input-box');
    var result = document.getElementById('result');
    var prompt = document.getElementById('prompt');

    //按钮点击事件
    addEvent(inputBox, 'mousedown', function(e) {
        e.target.style.background = "#E8E8E8";
    });

    addEvent(inputBox, 'mouseup', function(e) {
        e.target.style.background = "#fff";
    });

    addEvent(inputBox, 'click', function(e) {
        var tavl = e.target.value;
        if (tavl == "C") {
            result.innerHTML = "";
            result.title = "";
            prompt.innerHTML = "";
        } else if (tavl == "=") {
            prompt.innerHTML = result.innerHTML;
            var st = clearArr(result.title.split(','));
            var x = figure(st);
            result.innerHTML = x;
            result.title = x;
        } else if (tavl == "退格") {
            result.innerHTML = result.innerHTML.substr(0, result.innerHTML.length - 1);
            if (result.title.substr(result.title.length - 1) == ",") {
                result.title = result.title.substr(0, result.title.length - 2);
            } else {
                result.title = result.title.substr(0, result.title.length - 1);
            }
            if (result.title.substr(result.title.length - 1) == ",") {
                result.title = result.title.substr(0, result.title.length - 1);
            }
        } else if (/^s|^c|t|l/.test(tavl)) {
            result.innerHTML += tavl + "(";
            result.title += "," + tavl + ",(,";
        } else {
            result.innerHTML += tavl;
            if (!isNaN(tavl) || tavl == ".") {
                result.title += tavl;
            } else {
                result.title += "," + tavl + ","
            }
        }
    });

    //判断优先级,提取出数据用count()计算
    function figure(arr) {
        var startPosition;
        var endPosition;
        var y, num1, num2;
        if (arr.indexOf("(") >= 0 && arr.indexOf(")") >= 0) {
            endPosition = arr.indexOf(")") + 1;
            startPosition = arr.lastIndexOf("(", endPosition - 1);
            var x = arr.slice(startPosition + 1, endPosition - 1);
            y = figure(x);
        } else if (arr.indexOf("π") >= 0 || arr.indexOf("e") >= 0) {
            if (arr.indexOf("π") >= 0) {
                startPosition = arr.indexOf("π");
                if (arr[startPosition - 1] != "*" && startPosition > 0) {
                    arr.splice(startPosition, 0, "*");
                    startPosition++;
                }
                endPosition = startPosition + 1;
                y = Math.PI;
            } else if (arr.indexOf("e") >= 0) {
                startPosition = arr.indexOf("e");
                if (arr[startPosition - 1] != "*" && startPosition > 0) {
                    arr.splice(startPosition, 0, "*");
                    startPosition++;
                }
                endPosition = startPosition + 1;
                y = Math.E;
            }
        } else if (/^s|^c|^t|^l|√/.test(arr)) {
            var arrs = ["sin", "cos", "tan", "ln", "log", "√"];
            for (var i = 0; i < arrs.length; i++) {
                startPosition = arr.indexOf(arrs[i]);
                if (startPosition >= 0) {
                    endPosition = startPosition + 2;
                    num1 = arr.slice(startPosition + 1, endPosition);
                    y = count(arrs[i], num1);
                    break;
                }
            }
        } else if (arr.indexOf("!") >= 0) {
            startPosition = arr.indexOf("!") - 1;
            endPosition = startPosition + 2;
            num1 = arr.slice(startPosition, endPosition - 1);
            y = count("!", num1);
        } else if (arr.indexOf("^") >= 0) {
            startPosition = arr.indexOf("^") - 1;
            endPosition = startPosition + 3;
            num1 = arr.slice(startPosition, startPosition + 1);
            num2 = arr.slice(endPosition - 1, endPosition);
            y = count("^", num1, num2);
        } else if (arr.length == 1) {
            return arr[0];
        } else if (/\*|\/|\+|-/.test(arr)) {
            var arrs = ["*", "/", "+", "-"];
            for (var i = 0; i < arrs.length; i++) {
                startPosition = arr.indexOf(arrs[i]);
                if (startPosition >= 1) {
                    startPosition--;
                    endPosition = startPosition + 3;
                    num1 = arr.slice(startPosition, startPosition + 1);
                    num2 = arr.slice(endPosition - 1, endPosition);
                    y = count(arrs[i], num1, num2);
                    var re = /^[0-9]*[1-9][0-9]*$/;
                    if((arrs[i]=="+"||arrs[i]=="-")&&(!re.test(num1)||!re.test(num2))){
                        y = y.toFixed(10);
                    }
                    break;
                } else if (startPosition == 0) {
                    return NaN;
                }
            }
        } else {
            return "错误"
        }
        if (isNaN(y)) {
            return NaN;
        }
        arr.splice(startPosition, endPosition - startPosition, y)
        return figure(arr);
    }

    //计算 
    function count(char, num1, num2) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        switch (char) {
            case "sin":
                return Math.sin(num1);
                break;
            case "cos":
                return Math.cos(num1);
                break;
            case "tan":
                return Math.tan(num1);
                break;
            case "ln":
                return Math.log(num1);
                break;
            case "log":
                return Math.log10(num1);
                break;
            case "√":
                return Math.sqrt(num1);
                break;
            case "π":
                return num1 * Math.PI;
                break;
            case "*":
                return num1 * num2;
                break;
            case "/":
                return num1 / num2;
                break;
            case "!":
                return factorial(num1);
                break;
            case "^":
                return power(num1, num2);
                break;
            case "*":
                return num1 * num2;
                break;
            case "/":
                return num1 / num2;
                break;
            case "+":
                return num1 + num2;
                break;
            case "-":
                return num1 - num2;
                break;
            default:
                return NaN;
                break;
        }
    }

    //阶乘
    function factorial(n) {
        var re = /^[0-9]*[1-9][0-9]*$/;
        if (re.test(n)) {
            return (n <= 1) ? 1 : n * factorial(n - 1);
        } else {
            return NaN
        }
    }
    //次方
    function power(n, i) {
        var re = /^[0-9]*[1-9][0-9]*$/;
        if (re.test(i)) {
            return (i <= 1) ? n : n * power(n, i - 1);
        } else {
            return NaN
        }
    }

    //清除数组中的空字符
    function clearArr(arr) {
        var  trim  =   function(s)  {
            return  s.replace(/\s+/g, '');
        };
        var  re  =   [];
        for (var  i  =  0,  len  =  arr.length;  i  <  len;  i++)  {
            if (trim(arr[i]).length  >  0)  re[re.length]  =  arr[i];
        }
        return re;
    }
};

//兼容ie的监听事件
function addEvent(element, type, handler) {
    // assign each event handler a unique ID
    if (!handler.$$guid) handler.$$guid = addEvent.guid++;
    // create a hash table of event types for the element
    if (!element.events) element.events = {};
    // create a hash table of event handlers for each element/event pair
    var handlers = element.events[type];
    if (!handlers) {
        handlers = element.events[type] = {};
        // store the existing event handler (if there is one)
        if (element["on" + type]) {
            handlers[0] = element["on" + type];
        }
    }
    // store the event handler in the hash table
    handlers[handler.$$guid] = handler;
    // assign a global event handler to do all the work
    element["on" + type] = handleEvent;
}
// a counter used to create unique IDs
addEvent.guid = 1;

function removeEvent(element, type, handler) {
    // delete the event handler from the hash table
    if (element.events && element.events[type]) {
        delete element.events[type][handler.$$guid];
    }
}

function handleEvent(event) {
    // grab the event object (IE uses a global event object)
    event = event || window.event;
    // get a reference to the hash table of event handlers
    var handlers = this.events[event.type];
    // execute each event handler
    for (var i in handlers) {
        this.$$handleEvent = handlers[i];
        this.$$handleEvent(event);
    }
}