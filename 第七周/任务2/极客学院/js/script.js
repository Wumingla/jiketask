define(function(require, exports, module) {
    require('jquery-1.11.3.min');
    require('swiper.min');

    $(function() {
        //滚动
        var mySwiper = new Swiper('.swiper-container', {
                autoplay: 5000,
                direction: 'horizontal',
                loop: true,

                // 前进后退按钮
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',

                // 滚动条
                pagination: '.pagination',
                bulletClass: 'swiper-pagination-switch',
                bulletActiveClass: 'swiper-active-switch',
                paginationClickable: true,
                paginationBulletRender: function(index, className) {
                    return '<span class="' + className + '"></span>';
                }
            })
        // 课程
        $(".lesson ul li").each(function(index) {
            var liThis = $(this);
            liThis.mouseenter(function() {
                $("div.lessonbox-on").removeClass("lessonbox-on");
                $(".lesson ul li.lesson-on").removeClass("lesson-on");
                $("div.z-lessonbox").eq(index).addClass("lessonbox-on");
                liThis.addClass("lesson-on");
            })
        })

        // 回到顶部
        $(window).scroll(function(){
        	if(scrollY==0){
        		$('#gotop-i').css("visibility","hidden");
        	}else{
        		$('#gotop-i').css("visibility","visible");
        	}
        })

        $('#gotop-i').click(function(){
        	 $('body,html').animate({scrollTop:0},500);
        })

    })




})
