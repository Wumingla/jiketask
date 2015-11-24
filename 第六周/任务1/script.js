window.onload = function() {
    var inputBox = document.getElementById('input-box');
    var result = document.getElementById('result');
    var prompt = document.getElementById('prompt');

    addEvent(inputBox, 'click', function(e) {
        var val = e.target.value;
        switch (val) {
            case "退格":
                result.innerHTML = result.innerHTML.slice(0, result.innerHTML.length - 1);
                break;
            case "C":
                result.innerHTML = "";
                prompt.innerHTML = "";
                break;
            case "=":
                var re = count(result.innerHTML);
                prompt.innerHTML = result.innerHTML;
                result.innerHTML = eval(re);
                break;
            default:
                result.innerHTML += e.target.title;
                break;
        }

    })

    function count(str) {
        // var arr = [/sin/g,/cos/g,/tan/g,/ln/g,/log/g]
        var arr  = {
            "Math.sin" : /sin/g,
            "Math.cos" : /cos/g,
            "Math.tan" : /tan/g,
            "Math.log10" : /log/g,
            "Math.log" : /ln/g,
            "* Math.PI" : /\*π/g,
            "*Math.PI" : /π/g,
            "* Math.E": /\*e/g,
            "*Math.E" : /e/g
            // "Math.sqrt" : /√/g,
        }
        for(var i=0;i<Object.keys(arr).length;i++){
            var x = Object.keys(arr)[i];
            str = str.replace(arr[x],x);
            console.log(arr[x]);
        }
        console.log(str);

        // if(/π|e/.test(str)){
        //     console.log(str.indexOf("π"));
        //     if()
        // }

        return str;
        // str = str.replace(/sin/g,"Math.sin");
        // console.log(str);
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
