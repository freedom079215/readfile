var Menu = (function () {
    function Menu() {
        this.init();
    }
    Menu.prototype.init = function () {
        $("nav #btn-home").click(function (e) {
            e.preventDefault();
            Common.gaEvent("AGENDA_1", "click");
            setTimeout(function () {
                window.location.href = $("nav #btn-home").attr("href");
            }, 250);
        });
        $("nav #btn-game").click(function (e) {
            e.preventDefault();
            Common.gaEvent("AGENDA_2", "click");
            setTimeout(function () {
                window.location.href = $("nav #btn-game").attr("href");
            }, 250);
        });
        $("nav #btn-event").click(function (e) {
            e.preventDefault();
            Common.gaEvent("AGENDA_3", "click");
            window.open($("nav #btn-event").attr("href"), "_blank");
        });
        $("nav #btn-product").click(function (e) {
            e.preventDefault();
            Common.gaEvent("AGENDA_4", "click");
            setTimeout(function () {
                window.location.href = $("nav #btn-product").attr("href");
            }, 250);
        });
        $("nav #btn-rule").click(function (e) {
            e.preventDefault();
            Common.gaEvent("AGENDA_5", "click");
            setTimeout(function () {
                window.location.href = $("nav #btn-rule").attr("href");
            }, 250);
        });
        var href = window.location.href;
        var $subject = $("#mynav span.subject");
        if (href.indexOf(".html") < 0 || href.indexOf("index.html") > -1) {
            $subject.text("首頁");
        }
        else if (href.indexOf("game.html") > -1) {
            $subject.text("2018運勢預言");
        }
        else if (href.indexOf("result_1.html") > -1 || href.indexOf("result_2.html") > -1 || href.indexOf("result_3.html") > -1 || href.indexOf("result_4.html") > -1) {
            $subject.text("2018運勢預言");
        }
        else if (href.indexOf("prod.html") > -1) {
            $subject.text("發財神器");
        }
        else if (href.indexOf("rule.html") > -1) {
            $subject.text("活動辦法");
        }
        var version = this.detectIE();
        if (version === false) {
        }
        else if (version >= 12) {
            $("button.dropdown-toggle").css("top", 4);
        }
        else {
            $("button.dropdown-toggle").css("top", 4);
        }
    };
    Menu.prototype.detectIE = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
        }
        var trident = ua.indexOf("Trident/");
        if (trident > 0) {
            var rv = ua.indexOf("rv:");
            return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
        }
        var edge = ua.indexOf("Edge/");
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
        }
        return false;
    };
    return Menu;
}());
$(function () {
    var menu = new Menu();
});
