define(function(require, exports, module) {
    require('jquery-1.11.3.min');

    // 天气api
    require('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js');
    $.ajax({
        type: "GET",
        url: "http://api.map.baidu.com/telematics/v3/weather",
        data: "location=" + remote_ip_info.city + "&output=json&ak=85d24e4fb4c514fd72cf49ee890a4ae2",
        dataType: "jsonp",
        success: function(result) {
            var data = result.results[0];
            var weathericon = data["weather_data"][0]["dayPictureUrl"];
            var temperature = data["weather_data"][0]["temperature"];
            $('#h-city').html(remote_ip_info.city + ":");
            $('.weather-icon').css({
                "background": "url(" + weathericon + ")",
                "background-size": "18px 18px"
            });
            $('#h-temperature').html(temperature)
        }
    });

    // 更多产品

    $('#more').mouseenter(function() {
        $('#rightnav').css("visibility", "visible");
    });
    $('#rightnav').mouseleave(function() {
        $('#rightnav').css("visibility", "hidden");
    });

    // 设置
    $('#setUp-gloup').mouseenter(function() {
        $('#setUp-nav').css("visibility", "visible");
        $('.menu-arrow em').css("visibility", "visible");
    });
    $('#setUp-gloup').mouseleave(function() {
        $('#setUp-nav').css("visibility", "hidden");
        $('.menu-arrow em').css("visibility", "hidden");
    });

    // 中间导航切换
    var mContnetNum = 0; //记录位置
    $('.main-nav a').each(function(index, value) {
        $(this).click(function() {
            $('.main-nav-n').removeClass('main-nav-n');
            // 根据位置执行动画
            if (index > mContnetNum) {
                $('.m-content-n').animate({
                    "top": "-381px"
                }, 500);
                $('.m-content-n').css({
                    "position": "absolute"
                }).removeClass("m-content-n");
                $('.m-content').eq(index).addClass("m-content-n").css({
                    "display": "block",
                    "top": "381px"
                });
            } else if (index < mContnetNum) {
                $('.m-content-n').animate({
                    "top": "381px"
                }, 500);
                $('.m-content-n').css({
                    "position": "absolute"
                }).removeClass("m-content-n");
                $('.m-content').eq(index).addClass("m-content-n").css({
                    "display": "block",
                    "top": "-381px"
                });
            }

            mContnetNum = index;

            $('.m-content-n').animate({
                "top": "0"
            }, 500);
            $('.m-content-n').css("position", "relative");
        })
    });

    // 新闻滚轮
    var imgNum = 0; //选择的图片的位置
    var viewerNum = 0; //滚动屏下面整条的位置
    // 左按钮
    $('.mnl-btn-left').click(function() {
        imgNum--;
        if (imgNum < 0) {
            imgNum = 7;
        }
        $('.viewer-cell').css("left", imgNum * -425 + "px");
        mnlBottom(imgNum);
        $('.viewer-on').removeClass('viewer-on');
        $('.mnl-bot-viewer a img').eq(imgNum).addClass('viewer-on');
    });

    // 右按钮
    $('.mnl-btn-right').click(lright);
    // 循环执行
    setInterval(lright, 4000);

    function lright() {
        imgNum++;
        if (imgNum >= 8) {
            imgNum = 0;
        }
        $('.viewer-cell').css("left", imgNum * -425 + "px");
        mnlBottom(imgNum);
        $('.viewer-on').removeClass('viewer-on');
        $('.mnl-bot-viewer a img').eq(imgNum).addClass('viewer-on');
    }


    // 滚动屏下面图片点击事件
    $('.mnl-bot-viewer a').each(function(index, value) {
        $(this).click(function() {
            imgNum = index;
            if (imgNum == viewerNum && imgNum != 0) {
                mnlBottom(imgNum - 1);
            } else if (imgNum == viewerNum + 4 && imgNum != 7) {
                mnlBottom(imgNum + 1);
            } else {
                mnlBottom(imgNum);
            }
            $('.viewer-cell').css("left", imgNum * -425 + "px");
            $('.viewer-on').removeClass('viewer-on');
            $('.mnl-bot-viewer a img').eq(imgNum).addClass('viewer-on');
        })
    });

    // 滚动屏下面图片定位
    function mnlBottom(num) {
        if (num > (viewerNum + 4)) {
            viewerNum = num - 4;
        } else if (num < viewerNum) {
            viewerNum = num;
        }
        $('.mnl-bot-viewer').animate({
            "left": -viewerNum * 82 + "px"
        })
    }

    // 导航面板，我的导航/推荐导航切换
    $('#mn1 a').each(function(index, value) {
        var val = $(this);
        $(this).click(function() {
            $('.mn1-n').removeClass('mn1-n');
            $(this).addClass("mn1-n");
            if (index == 0) {
                $('.mn-ul1').css("display", "block");
                $('.mn-ul2').css("display", "none");
            } else if (index == 1) {
                $('.mn-ul1').css("display", "none");
                $('.mn-ul2').css("display", "block");
            }
        })
    });
    // 
});
