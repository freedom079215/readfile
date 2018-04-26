var Index = (function () {
    function Index() {
        this.init();
    }
    Index.prototype.init = function () {
        var _this = this;
        var tl = new TimelineMax({ onComplete: function () { _this.start(); } });
        tl.fromTo(".box-container", 0.5, { scale: 1.1, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: Back.easeOut }).
            fromTo(".box", 0.5, { y: "+=50", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Back.easeOut }, "-=0.5").
            fromTo(".wealth-god", 0.5, { x: "+=150", autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Back.easeOut }, "-=0.3").
            fromTo(".staff", 0.5, { x: "-=150", autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Back.easeOut }, "-=0.5").
            fromTo(".light", 0.5, { scale: 1.2, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: Back.easeOut }, "-=0.5").
            fromTo(".tiny-wealth-god-1", 0.5, { y: "+=50", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Back.easeOut }, "-=0.4").
            fromTo(".tiny-wealth-god-2", 0.5, { y: "+=50", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Back.easeOut }, "-=0.4").
            fromTo(".tiny-wealth-god-3", 0.5, { y: "+=50", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Back.easeOut }, "-=0.4").
            fromTo(".title", 0.5, { y: "-=50", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Back.easeOut }, "-=0.4").
            fromTo("p.desc", 0.5, { y: "+=50", autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Back.easeOut }, "-=0.4").
            fromTo(".hand", 0.5, { x: "-=50", autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: Back.easeOut }, "-=0.4");
        TweenMax.set(".paper-container", { autoAlpha: 0 });
        $("a#btn-go").click(function (e) {
            e.preventDefault();
            Common.gaEvent("GO", "click");
            setTimeout(function () {
                window.location.href = $("a#btn-go").attr("href");
            }, 250);
        });
        $(window).resize(function () {
            _this.onResize();
        });
        this.onResize();
    };
    Index.prototype.start = function () {
        TweenMax.to(".paper-container", 0.5, { autoAlpha: 1 });
        var tween;
        tween = TweenMax.to(".paper-1", 1 + Math.random(), { y: "+=35", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        tween.progress(0.2);
        tween = TweenMax.to(".paper-1", 1 + Math.random(), { x: "+=35", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        tween.progress(0.2);
        tween = TweenMax.to(".paper-2", 1 + Math.random(), { y: "+=25", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        tween.progress(0.4);
        tween = TweenMax.to(".paper-2", 1 + Math.random(), { x: "+=25", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        tween.progress(0.4);
        tween = TweenMax.to(".paper-3", 1 + Math.random(), { y: "-=30", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        tween.progress(0.6);
        tween = TweenMax.to(".paper-3", 1 + Math.random(), { x: "+=30", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        tween.progress(0.6);
        tween = TweenMax.to(".paper-4", 1 + Math.random(), { y: "-=20", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        tween.progress(0.8);
        tween = TweenMax.to(".paper-4", 1 + Math.random(), { x: "-=20", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        tween.progress(0.8);
        TweenMax.to(".paper-5", 1 + Math.random(), { y: "+=25", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        TweenMax.to(".paper-5", 1 + Math.random(), { x: "-=15", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        TweenMax.to(".light", 0.4, { alpha: 0.5, scale: 1.3, transformOrigin: "50% 50%", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        TweenMax.to(".wealth-god", 0.5, { y: "+=15", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        TweenMax.to(".staff", 0.4, { x: "+=5", yoyo: true, repeat: -1, ease: Power1.easeInOut });
        TweenMax.fromTo(".hand", 0.6, { rotation: -2 }, { rotation: 5, transformOrigin: "10% 90%", yoyo: true, repeat: -1, ease: Power1.easeInOut });
    };
    Index.prototype.onResize = function () {
        if ($(window).height() > $("body").height()) {
            $(".fixed-button-container").hide();
        }
        else {
            $(".fixed-button-container").show();
        }
    };
    return Index;
}());
$(function () {
    window["page"] = new Index();
});
