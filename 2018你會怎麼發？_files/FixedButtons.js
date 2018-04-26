var FixedButtons = (function () {
    function FixedButtons() {
        this.init();
    }
    FixedButtons.prototype.init = function () {
        var href = window.location.href;
        $(".fixed-button-container #btn-top").click(function (e) {
            if (href.indexOf("index.html") > -1 || href.indexOf(".html") < 0) {
                TweenMax.to(window, 0.5, { scrollTo: ".home-container" });
            }
            else {
                TweenMax.to(window, 0.5, { scrollTo: 0 });
            }
        });
    };
    return FixedButtons;
}());
$(function () {
    var fixedButtons = new FixedButtons();
});
