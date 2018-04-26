var Common = (function () {
    function Common() {
    }
    Common.gaPageview = function (page) {
        if (window["ga"] && typeof (window["ga"]) === "function") {
            ga("send", "pageview", page);
        }
    };
    Common.gaEvent = function (eventCategory, eventAction) {
        if (window["ga"] && typeof (window["ga"]) === "function") {
            ga("send", "event", eventCategory, eventAction);
        }
    };
    return Common;
}());
