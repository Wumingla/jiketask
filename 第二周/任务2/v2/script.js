window.onload = function() {
    //基本信息选项数据
    var year = new Array("year")
    var knowledgeS = new Array("knowledge", "大专以下", "大专", "本科", "硕士", "博士");
    var degree = new Array("degree", "大专在读", "本科大一", "本科大二", "本科大三", "本科大四", 
                                            "本科大五","在读硕士生", "硕士进修老师", "在读博士生", "其他学生");
    var nativePlace = new Array("nativePlace", "青岛市南", "青岛市北", "青岛四方", "青岛李沧",
                                                "青岛崂山", "青岛城阳", "青岛黄岛", "青岛即墨", "青岛胶州", "青岛胶南",
                                                "青岛平度", "青岛莱西", "--------", "山东", "北京", "天津", "上海", "重庆", "安徽",
                                                "江苏", "浙江", "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南",
                                                "黑龙江", "湖北", "湖南", "吉林", "江西", "辽宁", "内蒙", "宁厦", "青海",
                                                "山西", "陕西", "四川", "西藏", "香港", "新疆", "云南");
    var Colleges = new Array("Colleges", "海大鱼山校区", "海大崂山校区", "海大浮山校区", 
                                                "青大浮山校区", "青大东部校区", "青大四方校区", "青大登州路校区", 
                                                "青岛大学师范学院", "青理工四方校区", "青理工黄岛校区", 
                                                "青科大四方校区", "青科大崂山校区", "中国石油大学", "青岛农业大学", 
                                                "山东科技大学", "求实学院", "恒星学院", "远洋船员学院", "青岛飞洋学院", "其它")
    var home = new Array("home", "非青岛地区", "市南---团岛", "市南---火车站（栈桥）", 
                                        "市南---中山路", "市南---海大鱼山校区（大学路）", "市南---汇泉广场",
                                         "市南---八大关", "市南---市政府", "市南---书城", "市南---广电大厦（大福源）",
                                          "市南---澳柯玛立交桥（百安居）", "市南---青岛大学（麦岛）", 
                                          "市南---东部市立医院", "市南---湛山", "市北---小港", "市北---市立医院（西部）", 
                                          "市北---电子信息城", "市北---台东", "市北---内蒙古路长途汽车站", 
                                          "市北---错埠岭小区", "市北---浮山后", "市北---山东路家乐福", 
                                          "市北---敦化路", "市北---青岛图书馆", "四方---四方利群", "四方---青岛理工大学（抚顺路）", 
                                          "四方---兴隆路", "四方---杭州路", "四方---瑞昌路", "四方---宜昌路", "四方---孤山村", 
                                          "四方---东方家园（公交四公司）", "四方---水清沟（市肿瘤医院）", "四方---青岛科技大学（胜利桥）", 
                                          "四方---海琴广场", "四方---北岭", "四方---杨家群", "李沧---太原路", "李沧---沧口", 
                                          "李沧---振华路立交桥", "李沧---李沧区政府", "李沧---李沧广场", "李沧---李村公园", 
                                          "李沧---九水路立交桥", "李沧---侯家庄", "李沧---永安路", "李沧---百通花园", 
                                          "李沧---百通馨园", "崂山---颐中体育场", "崂山---辽阳路立交桥", 
                                          "崂山---青岛国际啤酒城", "崂山---青岛科技大学东部校区", "崂山---石老人", 
                                          "崂山---青岛市博物馆", "崂山---海大崂山校区", "崂山---中韩", "崂山---沙子口", 
                                          "崂山---北村", "城阳", "黄岛", "即墨", "胶州", "胶南", "平度", "莱西");
    var home2 = new Array("home2", "非青岛地区", "市南---团岛", "市南---火车站（栈桥）", 
                                            "市南---中山路", "市南---海大鱼山校区（大学路）", "市南---汇泉广场",
                                             "市南---八大关", "市南---市政府", "市南---书城", "市南---广电大厦（大福源）",
                                             "市南---澳柯玛立交桥（百安居）", "市南---青岛大学（麦岛）", 
                                             "市南---东部市立医院", "市南---湛山", "市北---小港", "市北---市立医院（西部）", 
                                             "市北---电子信息城", "市北---台东", "市北---内蒙古路长途汽车站", 
                                             "市北---错埠岭小区", "市北---浮山后", "市北---山东路家乐福", "市北---敦化路", 
                                             "市北---青岛图书馆", "四方---四方利群", "四方---青岛理工大学（抚顺路）", 
                                             "四方---兴隆路", "四方---杭州路", "四方---瑞昌路", "四方---宜昌路", 
                                             "四方---孤山村", "四方---东方家园（公交四公司）", "四方---水清沟（市肿瘤医院）", 
                                             "四方---青岛科技大学（胜利桥）", "四方---海琴广场", "四方---北岭", "四方---杨家群",
                                             "李沧---太原路", "李沧---沧口", "李沧---振华路立交桥", "李沧---李沧区政府", 
                                             "李沧---李沧广场", "李沧---李村公园", "李沧---九水路立交桥", "李沧---侯家庄", 
                                             "李沧---永安路", "李沧---百通花园", "李沧---百通馨园", "崂山---颐中体育场", 
                                             "崂山---辽阳路立交桥", "崂山---青岛国际啤酒城", "崂山---青岛科技大学东部校区", 
                                             "崂山---石老人", "崂山---青岛市博物馆", "崂山---海大崂山校区", "崂山---中韩", 
                                             "崂山---沙子口", "崂山---北村", "城阳", "黄岛", "即墨", "胶州", "胶南", "平度", "莱西");
    var language = new Array("language", "日语", "韩语", "法语", "德语", "西班牙语", "葡萄牙语", "阿拉伯语", "俄语", "其他");
    var languagelevel = new Array("languagelevel", "一级", "二级", "三级", "四级", "六级", "专四", "专八", "精通", "熟练");
    var language2 = new Array("language2", "日语", "韩语", "法语", "德语", "西班牙语", "葡萄牙语", "阿拉伯语", "俄语", "其他");
    var languagelevel2 = new Array("languagelevel2", "一级", "二级", "三级", "四级", "六级", "专四", "专八", "精通", "熟练");
    for(var i=1;i<71;i++){
        year[i] = i+1944;
    }

    var data = new Array(year,knowledgeS, degree, nativePlace, Colleges, home, home2, language, languagelevel, language2, languagelevel2);
    var text;
    var elementId;

    //添加基本信息选项到页面
    for (var i = 0; i < data.length; i++) {
        for (var n = 1; n < data[i].length; n++) {
            var text = document.createElement("option");
            text.value = data[i][n];
            text.innerHTML = data[i][n];
            elementId = document.getElementById(data[i][0]);
            elementId.appendChild(text);
        }
    }
    //可辅导的科目数据
    var xx = new Array("xx", "小学语文", "小学数学", "小学英语", "小学奥数", "小学全科");
    var cz = new Array("cz", "初中语文", "初中英语", "初中数学", "初中物理", "初中化学", 
                                    "初中地理", "初中生物", "初中数理化", "初中全科", "初中奥数", "中考语文", 
                                    "中考英语", "中考数学", "中考物理", "中考化学", "中考数理化", "中考全科");
    var gz = new Array("gz", "高一高二语文", "高一高二英语", "高一高二数学", "高一高二物理", 
                                     "高一高二化学", "高一高二地理", "高一高二生物", "高考语文", "高考英语", 
                                     "高考数学", "高考物理", "高考化学", "高考数理化", "高考美术", "高考理综", 
                                     "高考文综", "高考心理辅导");
    var dx = new Array("dx", "高等数学", "考研数学");
    var yy = new Array("yy", "英语口语", "新概念英语", "牛津英语", "英语四级", "英语六级", "GRE",
                                     "托福", "雅思", "初级商务英语", "高级商务英语", "剑桥英语");
    var xyz = new Array("xyz", "日语", "法语", "德语", "韩语", "俄语", "西班牙语", "葡萄牙语", "阿拉伯语");
    var ys = new Array("ys", "摄影", "书法", "美术", "漫画", "中国画", "西洋画", "交谊舞", "芭蕾舞", 
                                    "声乐（美声）", "声乐（民族）");
    var yq = new Array("yq", "钢琴", "电子琴", "小提琴", "大提琴", "长笛", "吉它", "手风琴", "萨克斯", 
                                    "打击乐", "小号", "大号", "圆号", "二胡", "笛子", "琵琶", "古筝", "古琴");
    var jsj = new Array("jsj", "计算机基本操作", "数据库", "网页设计与制作", "计算机应用能力", 
                                    "Linux或Unix", "网站开发", "图像处理软件", "动画制作", "程序设计", 
                                    "程序设计高级", "微软证书");
    var ql = new Array("ql", "围棋", "中国象棋", "国际象棋", "中国武术散打", "拳击", "截拳道", "跆拳道", 
                                    "空手道", "瑜珈", "滑冰旱冰", "游泳", "乒乓球", "羽毛球", "网球");
    //添加可辅导的科目
    var data2 = new Array(xx, cz, gz, dx, yy, xyz, ys, yq, jsj, ql);
    for (var i = 0; i < data2.length; i++) {
        for (var n = 1; n < data2[i].length; n++) {
            var text = document.createElement("input");
            text.type = "checkbox";
            text.name = "job";
            text.value = data2[i][n];
            elementId = document.getElementById(data2[i][0]);
            elementId.appendChild(text);
            elementId.innerHTML += data2[i][n];
        }
    }
    //方便授课区域数据
    var area1 = new Array("area1", "团岛", "火车站（栈桥）", "中山路", "海大鱼山校区（大学路）", 
                                        "汇泉广场", "八大关", "市政府", "书城", "广电大厦（大福源）", "澳柯玛立交桥（百安居）", 
                                        "青岛大学（麦岛）", "东部市立医院", "湛山");
    var area2 = new Array("area2", "小港", "市立医院（西部）", "电子信息城", "台东", "内蒙古路长途汽车站", 
                                        "错埠岭小区", "浮山后", "山东路家乐福", "敦化路", "青岛图书馆");
    var area3 = new Array("area3", "四方利群", "青岛理工大学（抚顺路）", "兴隆路", "杭州路", "瑞昌路",
                                         "宜昌路", "孤山村", "东方家园（公交四公司）", "水清沟（市肿瘤医院）", 
                                         "青岛科技大学（胜利桥）", "海琴广场", "北岭", "杨家群")
    var area4 = new Array("area4", "太原路", "沧口", "振华路立交桥", "李沧区政府", "李沧广场", "李村公园", 
                                        "九水路立交桥", "侯家庄", "永安路", "百通花园", "百通馨园");
    var area5 = new Array("area5", "颐中体育场", "辽阳路立交桥", "青岛国际啤酒城", "青岛科技大学东部校区", 
                                        "石老人", "青岛市博物馆", "海大崂山校区", "中韩", "沙子口", "北村");
    //添加方便授课区域
    var data3 = new Array(area1, area2, area3, area4, area5);
    for (var i = 0; i < data3.length; i++) {
        for (var n = 1; n < data3[i].length; n++) {
            var text = document.createElement("input");
            text.type = "checkbox";
            text.name = "area";
            text.value = data3[i][n];
            elementId = document.getElementById(data3[i][0]);
            elementId.appendChild(text);

            elementId.innerHTML += data3[i][n];
        }
    }



}

//判定
      function trim(str)
         { 
             return str.replace(/(^\s*)|(\s*$)/g, ""); 
     }
    function checkForm(){
        var name = document.getElementById('name');
        var year = document.getElementById('year');
        var major = document.getElementById('major');
        name.value = trim(name.value);
        if(name.value == ""){
            alert("请输入姓名");
            name.focus();
            name.select();
            return false;
        }
        if(year.value == ""){
            alert("请选择年龄");
            year.focus();
            year.select();
            return false;
        }
        major.value = trim(major.value);
        if(major.value ==""){
            alert("请输入专业");
            major.focus();
            name.select();
            return false;
        }
    }