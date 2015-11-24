$(function() {
    var newsNum = 0;
    var channel = "推荐";
    var searchStr = "headlines=" + channel + "&startNum=0";
    connetPhp(searchStr,1);

    // 切换频道
    $('.article-title td').on('click', function(e) {
        $('.news-content').empty();
        channel = e.target.innerHTML;
        newsNum = 0;
        $(".load-box").css("display","block");
        var str = "headlines=" + channel + "&startNum=0";
        connetPhp(str,1);
    });

    // 加载更多
    $('#more-btn').on('click', function() {
        $('#more-btn').attr('disabled',true);
        var str = "headlines=" + channel + "&startNum=" + newsNum;
        connetPhp(str,1);
    });

    // 新闻内容
    $('.news-content').on('click','div[class^="article-main"]',function(){
        $('article').css("display","none");
        $('header').css("display","none");
        $('.section').css("display","block");
        $('.header2').css("display","block");
        var str = "dataId="+$(this).attr("data-id");
        connetPhp(str,2);
        // console.log($(this).attr("data-id"));
    });

    // 返回
    $('.headeri-h').on('click',function(){
        $('.section').css("display","none");
        $('.header2').css("display","none");
        $('article').css("display","block");
        $('header').css("display","block");
        $('.section').empty();
    });

    // 连接数据库
    function connetPhp(str,page) {
        $.ajax({
            url: "a.php",
            type: "GET",
            data: str,
            success: function(data) {
                if(data.length==0){
                    $(".load-box").css("display","none");
                    alert("没有搜索到数据");
                }else{
                    addData(data,page);
                    newsNum += data.length;
                    $(".load-box").css("display","none")
                }
            },
            error: function(){
                alert('连接数据出错');
            }
        })
    }

    // 添加数据
    function addData(data,page) {
        if(page==1){
            for (var i = 0; i < data.length; i++) {
                var div = $('<div>');
                var main1 = $('<div>').addClass("article-main1").attr("data-id",data[i].newsid);
                var main2 = $('<div>').addClass("article-main2").attr("data-id",data[i].newsid);
                var nImg = $('<div>').addClass("news-image");
                var nTitle = $('<div>').addClass("news-title");
                $('<span>').html(data[i].newstitle).appendTo(nTitle);
                var nTime = $('<div>').addClass("news-time");
                $('<b>').html(data[i].addtime).appendTo(nTime);
                var imgArr = data[i].newsimg.split(",");
                imgArr = clearArr(imgArr);
                if (imgArr.length >= 3) {
                    main2.appendTo($('.news-content'));
                    nTitle.appendTo(main2);
                    for (var n = 0; n < 3; n++) {
                        var div = $('<div>');
                        $('<img>').attr("src", imgArr[n]).appendTo(div);
                        div.appendTo(nImg);
                    }
                    nImg.appendTo(main2);
                    nTime.appendTo(main2);
                } else {
                    main1.appendTo($('.news-content'));
                    $('<img>').attr("src", imgArr[0]).appendTo(nImg);
                    nImg.appendTo(main1);
                    nTitle.appendTo(main1);
                    nTime.appendTo(main1);
                }
            }
            $('#more-btn').attr('disabled',false);
        }else if(page==2){
            $('.header2 span').html(data[0].headlines);
            var seHeader = $('<div>').addClass("se-header").appendTo($('.section'));
            $('<h4>').html(data[0].newstitle).appendTo(seHeader);
            $('<p>').html(data[0].addtime).appendTo(seHeader);
            var seContent = $('<div>').addClass("se-content").appendTo($('.section'));
            if(data[0].newsimg!=""){
                var imgArr = data[0].newsimg.split(",");
                imgArr = clearArr(imgArr);
                for(var i =0;i<imgArr.length;i++){
                    $('<img>').attr("src",imgArr[i]).appendTo(seContent);
                }
            }
            $('<p>').html(data[0].newscontent).appendTo(seContent);
        }
    }
});

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