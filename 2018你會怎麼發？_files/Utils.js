var Utils = (function () {
    function Utils() {
    }
    Utils.disableScroll = function () {
        if (window.addEventListener) {
            window.addEventListener("DOMMouseScroll", Utils.preventDefault, false);
        }
        window.onwheel = Utils.preventDefault;
        window.onmousewheel = document.onmousewheel = Utils.preventDefault;
        window.ontouchmove = Utils.preventDefault;
    };
    Utils.enableScroll = function () {
        if (window.removeEventListener) {
            window.removeEventListener("DOMMouseScroll", Utils.preventDefault, false);
        }
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
    };
    Utils.preventDefault = function (e) {
        e = e || window.event;
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.returnValue = false;
    };
    Utils.getParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    Utils.formatNumber = function (str, glue) {
        if (isNaN(str)) {
            return NaN;
        }
        glue = (typeof glue === "string") ? glue : ",";
        var digits = str.toString().split(".");
        var integerDigits = digits[0].split("");
        var threeDigits = [];
        while (integerDigits.length > 3) {
            threeDigits.unshift(integerDigits.splice(integerDigits.length - 3, 3).join(""));
        }
        threeDigits.unshift(integerDigits.join(""));
        digits[0] = threeDigits.join(glue);
        return digits.join(".");
    };
    Utils.addGrid = function () {
        $("body").append("<div class='grid-container' style='position: fixed;left: 0;top: 0;width: 100%;z-index: 10000000;pointer-events: none;'></div>");
        var $line;
        var $p;
        var h = $(document).height();
        var step = Math.floor(h / 50);
        for (var i = 1; i < step; i++) {
            $line = $("<div></div>");
            $line.css({
                position: "absolute",
                left: 0,
                top: i * 50,
                width: "100%",
                height: 1,
                backgroundColor: "red",
                opacity: 0.5,
            });
            $(".grid-container").append($line);
            $p = $("<p>" + (i * 50) + "</p>");
            $p.css({
                position: "absolute",
                left: 0,
                top: i * 50,
                backgroundColor: "red",
                opacity: 0.5,
                margin: 0,
            });
            $(".grid-container").append($p);
        }
        var w = $(document).width();
        step = Math.floor(w / 50);
        for (var i = 1; i < step; i++) {
            $line = $("<div></div>");
            $line.css({
                backgroundColor: "red",
                height: "100%",
                left: i * 50,
                opacity: 0.5,
                position: "fixed",
                top: 0,
                width: 1,
            });
            $(".grid-container").append($line);
        }
    };
    Utils.getNaturalDimension = function (img, callback) {
        var poll = setInterval(function () {
            if (img.naturalWidth && img.naturalHeight) {
                clearInterval(poll);
                callback();
            }
        }, 100);
        $(img).one("load", function () {
            callback();
        });
    };
    return Utils;
}());
