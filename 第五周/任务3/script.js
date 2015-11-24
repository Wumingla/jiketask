window.onload = function() {
    var arr = ["a", "x", "b", "d", "m", "a", "k", "m", "p", "j", "a"];

    var text = document.getElementById('text');
    text.value = arr;

    var btn = document.getElementById('btn');
    var result = document.getElementById('result');

    // btn点击事件
    btn.onclick = function() {
        arr = text.value.split(",");
        result.innerHTML = count(arr);
    }

    //计算
    function count(a) {
        var bucket = {};
        var max = 0;
        var maxLetter = [];
        var res = "";
        for (var i = 0; i < a.length; i++) {
            var key = a[i];
            if (bucket[key] === undefined) {
                bucket[key] = {};
                bucket[key].count = 1;
                bucket[key].pos = [];
                bucket[key].pos.push(i);
            } else {
                bucket[key].count++;
                bucket[key].pos.push(i);
            }
            //判断出现次数最多的字母。有可能有几个字母出现相等的情况。
            if (bucket[key].count == max) {
                maxLetter.push(key);
            } else if (bucket[key].count > max) {
                max = bucket[key].count;
                maxLetter = [];
                maxLetter.push(key);
            }
        }

        //把所以可能的结果都打印出来。
        for (var i = 0; i < maxLetter.length; i++) {
            res += "出现最多的字母:" + maxLetter[i] + " 出现次数:" + bucket[maxLetter[i]].count + " 出现位置:" + bucket[maxLetter[i]].pos + "<br/>";
        }
        return res;
    }

}
