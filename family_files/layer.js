var posFixNav;
var svgIsLoading = false;
if (window.console == undefined) {
    var em = function() {};
    window.console = { log: em, debug: em, info: em, warn: em };
}


if (typeof(console) == '') {
    var em = function() {};
    console = { log: em, debug: em, info: em, warn: em };
}

if (console.log == undefined || console.log == 'undefined') {
    var em = function() {};
    console.log = em;
}

if (console.debug == undefined || console.debug == 'undefined') {
    var em = function() {};
    console.debug = em;
}

if (console.info == undefined || console.info == 'undefined') {
    var em = function() {};
    console.info = em;
}

if (console.warn == undefined || console.warn == 'undefined') {
    var em = function() {};
    console.warn = em;
}

var hash = window.location.hash;			
if(hash.indexOf('#') != -1) {
	window.location = '?t=' + hash.substring(1,hash.length);
}

$(document).on('focus', 'input, textarea', function(){
    $('body').addClass('fixfixed');
});

$(document).on('blur', 'input, textarea', function(){
    $('body').removeClass('fixfixed');
});

$(document).ready(function() {
	

    // 判斷的IE 

    var IE;
    //@cc_on IE = navigator.appVersion;  


    // IE FIX Animate 

    /*@cc_on 
     // conditional IE < 9 only fix 
     @if (@_jscript_version <= 9) 
     (function(f){ 
     window.setTimeout = f(window.setTimeout); 
     window.setInterval = f(window.setInterval); 
     })(function(f){return function(c,t){var a=[].slice.call(arguments,2);return f(function(){c instanceof Function?c.apply(this,a):eval(c)},t)}}); 
     @end 
     @*/

    showSVG();

    // Block4 Location active
    $('.loaction-list').find('li').on('click', function(e){
        e.preventDefault();
        $('.loaction-list > li').find('img').attr('src', 'images/icon-pin.svg');
        $('.loaction-list').find('li').removeClass('active');
        $(this).addClass('active');
        $(this).find('img').attr('src', 'images/icon-pin-active.svg');
    });


    // FIX Nav
    posFixNav = $('.fix-nav-block').offset().top;
    $('.fix-nav-list li:not(.active-bg)').on('click',function(e){
        e.preventDefault();
        var id = $(this).find('a').attr('href');

        moveNav($(this));

        var minHeight = 0;
        if( (id != '#Point1') && (id != '#Point3')){
            minHeight = $(window).width() > 767? 0 : 58;
        }
        else{
            minHeight = $(window).width() > 767? 63 : 58;

        }


        GardenUtils.plugin.screenMoveToEle({
            moveToObj: $(id),
            minHeight: minHeight

        });

    });

    //  判斷手機的瀏覽器就要的加上ios class

    function detectmob() {
        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            ){
            return true;
        }
        else {
            return false;
        }
    }


    if(detectmob()){
        $('.tashin-event').addClass('ios');
    }


    var window_w = $(window).width();
    $(window).resize(function(){
        posFixNav = $('.fix-nav-block').position().top;

        $('.block-inpage.active').css({
            height : $(window).height()
        });

        var current_window_w = $(window).width();
        if( current_window_w != window_w ){
            window_w = current_window_w;
            var activeId = $('.fix-nav-list li.active-bg').attr('current');
            var activeLi = $('.fix-nav-list [href="'+activeId+'"]').parent();
            setTimeout(function(){
                // console.warn('activeLi', activeLi, activeLi.position().left);
                activeLi.trigger('click');
            }, 500);
        }

    });

    //回置頂
    $('.scroll-top-btn').on('click', function(e){
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        },800);
    });

    // 錨點點擊後滑到該區塊　(用於新戶加碼送)
    GardenUtils.display.anchorScrollTo({
    });


    // 第一頻的錨點
    $(".nav-btn-block > li").find('a').on('click', function(e){
        e.preventDefault();

        var id = $(this).attr('href');
        var minHeight = 0;

        if( (id != '#Point1') && (id != '#Point3')){
            minHeight = $(window).width() > 767? 0 : 58;
        }
        else{
            minHeight = $(window).width() > 767? 63 : 58;
        }

        if($(window).width() == 768){
            minHeight += 100;
        }else {
            minHeight += 42;
        }

        GardenUtils.plugin.screenMoveToEle({
            moveToObj: $(id),
            minHeight: minHeight
        });

        var activeA = $('.fix-nav-list li a[href="'+id+'"]');

        if(activeA.length != 0) {
            console.debug(activeA.length);
            moveNav(activeA.parent());
        }
    });


    //小版的錨點
    $('.menu-list > li a').on('click',function(e){
        e.preventDefault();
        var id =  $(this).attr('href');
        GardenUtils.plugin.screenMoveToEle({
            moveToObj: $(id),
            minHeight: $(window).width() > 767? 80 : 58
        });

    });


    //點更多飛出來1.5層
    var posCurrent;
    $(".btn-show-step-1,.btn-show-step-2,.btn-show-step-3,.btn-show-step-4").on("click", function(e){
        e.preventDefault();
        posCurrent = $(window).scrollTop();
        var data = $(this).attr('data');
        var navIsVisible = $('.top-fix:visible').length;
        var betweet = navIsVisible ? 60 : 0;

        //var windowHeight = $(window).height();
        var windowHeight = window.innerHeight;

        //因為safari底下有一條bar，要加那個高度

		
        var inpageDom = $('.' + data);
        inpageDom.show();
        inpageDom.addClass('active');
        
        inpageDom.css({
            height : windowHeight
        });
		
        inpageDom.stop().animate({
            left: 0,
            opacity: 1
        },1300,function(){
			$('body').addClass('inpage-mode');
			$('html').addClass('inpage-mode');
			//$(window).trigger('resize');
		});



        //$(".header").hide();
    });


    $('.inpage-icon-close').on('click', function(e){

        e.preventDefault();
        
        console.debug('close');


        var inpageDom = $(this).parent().parent().parent();
        // inpageDom.hide();
        inpageDom.removeClass('active');
        inpageDom.animate({
            left: '100%'
        },1300,function(){
			inpageDom.hide();
			$('body').removeClass('inpage-mode');
        $('html').removeClass('inpage-mode');
		});

        //$(".header").show();
    });

    //當移動時如果視頻出現的話，上面nav也要一起移動
    $(window).on('scroll',function(){

        //當都載入完才進去
        if(svgIsLoading) {
		
			// fix the nav list
				if($(window).scrollTop() >= posFixNav){
	                $('.fix-nav-list').addClass('top-fix');
	                $('.scroll-top-btn').fadeIn();
	            }
	            else{
	                $('.fix-nav-list').removeClass('top-fix');
	                $('.scroll-top-btn').fadeOut();
	            }
		
            if(!GardenUtils.plugin.screenMoving) {
			
                var betObj = {
                    Point1 : 150,
                    Point2 : 430,
                    Point3 : 150,
                    Point4 : 150,
                    // Point5 : 150,
                    Location : 190
                };

                // var detectArray = ['Point1','Point2','Point3','Location'];
				// var detectArray = ['Point1','Point2','Point3','Point4','Point5','Location'];

                var detectArray = ['Point1','Point2','Point3','Point4','Location'];
                //var nowTop = $(window).scrollTop();
                var nowTop = $(window).scrollTop() + $(window).height();

                var lastId;

                $.each(detectArray,function(i,id){
                    var bet = betObj[id];
                    if($(window).width() == 768) {
                        bet += 500;
                    }

                    var now = $('#' + id).offset().top;

                    //當視頻超過區塊且差距多少才切換
                    if(nowTop > now && (nowTop - now) >= bet) {
                        lastId = id;
                    }
                });

                if(lastId != undefined) {
                    var activeA = $('.fix-nav-list li a[href="#'+lastId+'"]');

                    if(activeA.length != 0) {
                        console.debug(activeA.length);
                        moveNav(activeA.parent());
                    }
                }
				
				
				
            }
        }

    });
});

function moveNav(nextLi) {
    var activeBg = $('.active-bg');
    var posActiveBg = nextLi.position().left;
    var textValue = nextLi.find('a').text();

    var href = nextLi.find('a').attr('href');
    var activeHref = activeBg.attr('current');

    // if(href != activeHref) // 移除：因為 resize 也要重算位置
    {
        activeBg.attr('current',href);
        console.debug('active textValue = ' + activeBg.text());
        console.debug('textValue = ' + textValue);
        console.debug('posActiveBg:' + posActiveBg);
        activeBg.text('');
        activeBg.stop().animate({left: posActiveBg}, 800);
        activeBg.text(textValue);
    }

}

function showSVG(){
    // 1. LOAD SVG
    var P1 = Snap("#p1");
    P1.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var P2 = Snap("#p2");
    P2.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var P3 = Snap("#p3");
    P3.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var P4 = Snap("#p4");
    P4.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var P5 = Snap("#p5");
    P4.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var Num = Snap("#Num");
    Num.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });

    Snap.load("images/B1-P1.svg", P1Load);

    function FinalB1Load(svg) {
        Num.append(svg);

        var $P2Group = P2.select("#B1-P2");
        $P2Group.attr({ transform: 't400,-330', opacity: 0 });

        var $P1Group = P1.select("#B1-P1");
        var $P2Group = P2.select("#B1-P2");
        var $P3Group = P3.select("#B1-P3");
        var $P4Group = P4.select("#B1-P4");
        var $text = Num.select("#TextNum");

        $P1Group.attr({ transform: 't-90,-90', opacity: 0 });
        $P2Group.attr({ transform: 't400,-330', opacity: 0 });
        $P3Group.attr({ transform: 't41,600', opacity: 0 });
        $P4Group.attr({ transform: 't0,100', opacity: 0 });
        $text.attr({ transform: 't-3,-230', opacity: 0 });


        $P2Group.animate({transform:'t0,-330', opacity: 1},600, mina.easeinout);
        setTimeout(
			function(){
				$P1Group.animate({transform:'t-10,21', opacity: 1},1200, mina.easeinout);
				svgLoadingDone();
			},600
		);
        setTimeout(function(){$('.B1-Text').find('h1').animate({
            top: 0,
            opacity: 1
        }, 1200);},1000);
        setTimeout(function(){$('.B1-Text').find('h2').animate({
            top: 0,
            opacity: 1

        }, 1200);},2000);
        setTimeout(function(){$('.quick-nav').animate({
            top: 0,
            opacity: 1
        }, 1200);},3000);
        setTimeout(function(){
            $text.animate({transform: 't-3 -96', opacity: 1}, 1200, mina.easeinout);

            Snap.animate(0, 2230, function(value) {
                Num.select("#number").attr({ text: Math.round(value) });
            }, 3000);

        },3200);

        setTimeout(function(){$P3Group.animate({transform:'t41,556', opacity: 1},1200, mina.easeinout);},3500);
        setTimeout(function(){
            $P4Group.animate({transform:'t0,-2', opacity: 1},1200, mina.easeinout);
        },3700);



    }

    // 2. 
    var Stair1 = Snap("#stair-level1");
    Stair1.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });

    var Stair2 = Snap("#stair-level2");
    Stair2.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });

    var Stair3 = Snap("#stair-level3");
    Stair3.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var Stair4 = Snap("#stair-level4");
    Stair4.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });

    var Stair5 = Snap("#stair-level5");
    Stair5.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var Stair5_5 = Snap("#stair-level5-sub");
    Stair5_5.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var Stair5_5_top = Snap("#sub-p-top");
    Stair5_5_top.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var Stair5_5_left = Snap("#sub-p-left");
    Stair5_5_left.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var Stair5_5_left_2 = Snap("#sub-p-left-2");
    Stair5_5_left_2.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    var Stair5_5_right = Snap("#sub-p-right");
    Stair5_5_right.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
     var Stair5_5_right_2 = Snap("#sub-p-right-2");
    Stair5_5_right_2.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });


    Snap.load("images/L1.svg", StairLoad);

    function StairLoad(svg1) {
        Stair1.append(svg1);
        Snap.load("images/L2.svg", StairLoad2);

    }

    function StairLoad2(svg) {
        Stair2.append(svg);

        Snap.load("images/L3.svg", StairLoad3);
    }

    function StairLoad3(svg) {
        Stair3.append(svg);
        Snap.load("images/L4-new.svg", StairLoad4);
    }
    function StairLoad4(svg) {
        Stair4.append(svg);
        Snap.load("images/L4.svg", StairLoad5);
    }
    function StairLoad5(svg) {
        Stair5.append(svg);
        
        Snap.load("images/L4-5-p-top.svg", StairLoad5_5_top);
    }
    function StairLoad5_5_top(svgtop) {
        Stair5_5_top.append(svgtop);
        
        Snap.load("images/L4-5-p-left-1.svg", StairLoad5_5_left_1);
    }
    function StairLoad5_5_left_1(svgleft) {
        
        Stair5_5_left.append(svgleft);
        Snap.load("images/L4-5-p-left-2.svg", StairLoad5_5_left_2);
        
    }
    function StairLoad5_5_left_2(svgleft) {
        
        Stair5_5_left_2.append(svgleft);
        Snap.load("images/L4-5-p-right-1.svg", StairLoad5_5_right_1);
        
    }
    function StairLoad5_5_right_1(svgright) {
        
        Stair5_5_right.append(svgright);
        Snap.load("images/L4-5-p-right-2.svg",  StairLoad5_5_right_2);
        
    }
    function StairLoad5_5_right_2(svgright) {
        Stair5_5_right_2.append(svgright);
        Excute();
    }
    

    function Excute() {
        var $L1Block = $('.L1-block');
        var $L2Block = $('.L2-block');
        var $L3Block = $('.L3-block');
        var $L4Block = $('.L4-block');
        var $L5Block = $('.L5-block');

        var $L1Steps = Stair1.selectAll("[id^='L1Step1-']");
        var $L2Steps = Stair2.selectAll("[id^='L2Step2-']");
        var $L3Steps = Stair3.selectAll("[id^='L3Step3-']");

        var $L1Stars = Stair1.selectAll("[id^='star1-']");


        // var bottom_of_object1 = $L1Block.outerHeight() +  $L1Block.offset().top;
        // var bottom_of_object2 = $L2Block.outerHeight() +  $L2Block.offset().top;
        var bottom_of_object1 =  $L1Block.offset().top;
        var bottom_of_object2 =  $L2Block.offset().top;
        var bottom_of_object3 =  $L3Block.offset().top;
        var bottom_of_object4 =  $L4Block.offset().top;
        var bottom_of_object5 =  $L5Block.offset().top;


        $L1Steps.attr({opacity:1});
        $L2Steps.attr({opacity:1});
        $L1Stars.attr({opacity:1});

        var PosL1Step = [], PosL2Step = [], PosL3Step = [];
        var SumL1Step = $L1Steps.length, SumL2Step = $L2Steps.length, SumL3Step = $L3Steps.length;

        $L1Steps.forEach(function(element, index){
            PosL1Step[index] = element.getBBox().y + element.getBBox().h + 50;

        })
        $L2Steps.forEach(function(element, index){
            PosL2Step[index] = element.getBBox().y + element.getBBox().h + 50;

        })
        $L3Steps.forEach(function(element, index){
            PosL3Step[index] = element.getBBox().y + element.getBBox().h + 50;

        })

        console.debug('L1 pos:' + $('.L1-block').offset().top);

        var currentL1Step = 1, currentL2Step = 1, currentL3Step = 1;


        // 第一層動畫
        var L1m1 = Stair1.select("#L1-m1");
        var L1m2 = Stair1.select("#L1-m2");
        var L1m3 = Stair1.select("#L1-m3");


        L1moneyNone();

        function L1moneyNone(){
           L1m1.attr({"opacity": 0});
           L1m2.attr({"opacity": 0});
           L1m3.attr({"opacity": 0});

           L1moneyShow();
        }

        
        function L1moneyShow(){
           setTimeout(function(){
              L1m1.attr({"opacity": 1});
           },800);

           setTimeout(function(){
              L1m2.attr({"opacity": 1});
           },1200);
           setTimeout(function(){
              L1m3.attr({"opacity": 1});
           },1450);
           setTimeout(function(){
               L1moneyNone();
           },2050);
        }




        // END OF 第一層動畫

        // 第二層
       
        


        // end of 第二層


         // 第三層動畫
         var m1 = Stair3.select("#m1");
         var m2 = Stair3.select("#m2");
         var m3 = Stair3.select("#m3");


         moneyNone();

         function moneyNone(){
            m1.attr({"opacity": 0});
            m2.attr({"opacity": 0});
            m3.attr({"opacity": 0});

            moneyShow();
         }

         
         function moneyShow(){
            setTimeout(function(){
               m1.attr({"opacity": 1});
            },800);

            setTimeout(function(){
               m2.attr({"opacity": 1});
            },1200);
            setTimeout(function(){
               m3.attr({"opacity": 1});
            },1450);
            setTimeout(function(){
                moneyNone();
            },2050);
         }


         // 連線動畫

         L3ConnetLine();

         function L3ConnetLine(){
             Stair3.select("#L3-l1").stop().animate({"stroke-dashoffset": 150}, 1800, mina.easeinout, function(){
                 Stair3.select("#L3-l1").attr({"stroke-dashoffset" : 50 });

                
             });
             Stair3.select("#L3-l2").stop().animate({"stroke-dashoffset": 150}, 1800, mina.easeinout, function(){
                 Stair3.select("#L3-l2").attr({"stroke-dashoffset" : 50 });
                 L3ConnetLine();
             });
             
         }

         // end of 連線動畫


         // end of 第三層動畫



         //  第四層動畫

         var L4m1 = Stair4.select("#Money1");
         var L4m2 = Stair4.select("#Money2");
         var L4m3 = Stair4.select("#Money3");


         moneyL4None();

         function moneyL4None(){
            L4m1.attr({"opacity": 0});
            L4m2.attr({"opacity": 0});
            L4m3.attr({"opacity": 0});

            moneyL4Show();
         }

         
         function moneyL4Show(){
            setTimeout(function(){
               L4m1.attr({"opacity": 1});
            },800);

            setTimeout(function(){
               L4m2.attr({"opacity": 1});
            },1200);
            setTimeout(function(){
               L4m3.attr({"opacity": 1});
            },1450);
            setTimeout(function(){
                moneyL4None();
            },2050);
         }




         // end of 第四層動畫
         

        
        //  第五層動畫

        
        // 精靈飛

        god_fly_top();
        
        function god_fly_top(){
            Stair5.select('#god').animate({transform:'t3,2'},2500,  function(){
                setTimeout(function(){
                    god_fly_down();

                }, 250)
            });
            
        }
        
        function god_fly_down(){

            Stair5.select('#god').animate({transform:'t-3,-2'},1500,  function(){
                setTimeout(function(){ 
                    god_fly_top();
                    }, 250);
            });

        }


        // end of 精靈飛


        // 網路通訊動畫

        WifiLineInf();

        function WifiLineInf(){
            Stair5.select("#line-dot").stop().animate({"stroke-dashoffset": 150}, 1800, mina.easeinout, function(){
                Stair5.select("#line-dot").attr({"stroke-dashoffset" : 50 });
                WifiLineInf();
            });
        }

        // end of 網路通訊動畫


        // 精靈星光閃爍

        var god_star = Stair5.select("#stars-shine");

        StarShine1();
        

        function StarShine1(){
            god_star.attr({"transform": "r40"});
            setTimeout(function(){
                StarShine2();
            },1500);
           
        }

        function StarShine2(){
                god_star.attr({"transform" : "r0" });
                setTimeout(function(){
                   StarShine1();
                },1500);
                
            
        }

        // end of 精靈星光閃爍

        // 樓梯掉下來
        // var subStair = Stair5.select("#sub-stair");

        // subStair.attr({"transform": "t-50, -50, r-20,0,0"});
        // setTimeout(function(){
        //     subStair.animate({"transform": "t0, 0,r0,0,0"}, 2000, mina.bounce);
        // },800)
        


        //  end of 

        
        

        
        // end of 第四層動畫


        // 4.5 Layer
        textGiveDown();

        function textGiveDown(){
            $(".text-give").animate({"bottom": "-15px"}, 800, function(){
                textGiveUp();
            });
        }
        

        function textGiveUp(){
            $(".text-give").animate({"bottom": "-20px"}, 800, function(){
                textGiveDown();
            });
        }

        // end of 4.5 Layer


      
        $(window).scroll(function() {


            var PosLocation = $('#Location').offset().top;
            var PosPoint1 = $('#Point1').offset().top;
            var PosPoint2 = $('#Location').offset().top;
            var PosPoint3 = $('#Location').offset().top;

            var bottom_of_window = $(window).scrollTop() + $(window).height();


            // 滑到某Layer 就出現Layer  

            function starBlink(){
                $L1Stars.forEach(function(ele,index){
                    ele.animate({opacity:1},400*index, function(){
                        ele.animate({opacity:0.7}, 400*index);
                    });
                });
            }


            if (bottom_of_window > bottom_of_object1) {
                $L1Block.animate({opacity:1}, 1700);
                setInterval(starBlink, 1500);

                for(var $i=currentL1Step; $i <= SumL1Step; $i++){
                    if(bottom_of_window > PosL1Step[$i] ){
                        setTimeout(function(){ Stair1.select('#L1Step1-'+ $i).animate({ 'opacity': '1' }, 500, mina.easeinout);}, 400*$i);
                        currentL1Step = $i+1;
                        break;
                    }
                }

            }
            if (bottom_of_window > bottom_of_object2) {
                $L2Block.animate({opacity:1}, 1700);
                for(var $i=currentL2Step; $i <= SumL2Step; $i++){
                    if(bottom_of_window > PosL2Step[$i] ){
                        setTimeout(function(){ Stair2.select('#L2Step2-'+ $i).animate({ 'opacity': '1' }, 500, mina.easeinout);}, 400*$i);
                        currentL2Step = $i+1;
                        break;
                    }
                }
            }
            if (bottom_of_window > bottom_of_object3) {
                $L3Block.animate({opacity:1}, 1700);
                for(var $i=currentL3Step; $i <= SumL3Step; $i++){
                    if(bottom_of_window > PosL3Step[$i] ){
                        setTimeout(function(){ Stair3.select('#L3Step3-'+ $i).animate({ 'opacity': '1' }, 500, mina.easeinout);}, 400*$i);
                        currentL3Step = $i+1;
                        break;
                    }
                }
            }
            if (bottom_of_window > bottom_of_object4) {
                $L4Block.animate({opacity:1}, 1700);
                
                
            }
            if (bottom_of_window > bottom_of_object5) {
                $L5Block.animate({opacity:1}, 1700);
                
            }

        });



    };

    //  B3 Banner
	/**
    var B3bg = Snap("#B3-bg");
    B3bg.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });

    var B3P1 = Snap("#B3-P1");
    B3P1.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });

    var B3P2 = Snap("#B3-P2");
    B3P2.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });


    Snap.load("images/B3-bg.svg", BG);

    function BG(svg) {
        B3bg.append(svg);
        Snap.load("images/B3-P1.svg", B3P1Load);

    }
    function B3P1Load(svg){
        B3P1.append(svg);
        Snap.load("images/B3-P2.svg", B3P2Load);
    }
    function B3P2Load(svg){
        B3P2.append(svg);
    }

    var B3Text = Snap("#B3-Text");
    B3Text.attr({
        width: '100%',
        height: '100%',
        viewBox: [0, 0, '100%', '100%']
    });
    Snap.load("images/B3-Text.svg", B3TextLoad);

    function B3TextLoad(svg){
        B3Text.append(svg);
    }

	**/
    function P1Load(svg) {
        P1.append(svg);

        Snap.load("images/B1-P2.svg", P2Load);
    }
    function P2Load(svg) {
        P2.append(svg);
        Snap.load("images/B1-P3.svg", P3Load);

    }
    function P3Load(svg) {
        P3.append(svg);
        Snap.load("images/B1-P4.svg", P4Load);
    }
    function P4Load(svg) {
        P4.append(svg);
        Snap.load("images/num-text.svg", FinalB1Load);
		
    }

    // 橫螢幕出現建議轉直
    $('.mobile-full').hide();

    if($(window).width()< 768 && !$('body').hasClass('fixfixed')){
            if(window.innerHeight > window.innerWidth){
                //portrait
                $('.mobile-full').hide();
            }
            else if(window.innerWidth > window.innerHeight){
                //landscape
                $('.mobile-full').fadeIn().css('display','table');
            }
	
		/**
	
        if(window.innerHeight > window.innerWidth){
            //portrait
            $('.mobile-full').hide();
        }
        else if(window.innerWidth > window.innerHeight){
            //landscape
            $('.mobile-full').fadeIn().css('display','table');
        }
		**/
    }


    $(window).on("resize", function(){
        if($(window).width()< 768 && !$('body').hasClass('fixfixed')){
            if(window.innerHeight > window.innerWidth){
                //portrait
                $('.mobile-full').hide();
            }
            else if(window.innerWidth > window.innerHeight){
                //landscape
                $('.mobile-full').fadeIn().css('display','table');
            }
        }
    });





}



function svgLoadingDone() {
	svgIsLoading = true;
	$(window).trigger('scroll');

    //  進來的時候 點錨點
	var queryString = window.location.search;						
	if(queryString != '' && queryString.indexOf('?') != -1 && queryString.length > 2) {
			
		var id = '#'+getQueryStringValue('t');
		var activeA = $('.fix-nav-list li a[href="'+id+'"]');

		if(activeA.length != 0) {		    
			$('.fix-nav-list').addClass('top-fix');
			$('.scroll-top-btn').fadeIn();
			activeA.parent().trigger('click');
		}
	}
}

function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  