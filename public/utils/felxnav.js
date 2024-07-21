/*! flexnav https://github.com/indyplanets/flexnav http://unlicense.org/ 2013-11-28 */ ! function() {
    var a;
    a = jQuery, a.fn.flexNav = function(b) {
        var c, d, e, f, g, h, i, j, k, l, m, n;
        return k = a.extend({
            animationSpeed: 250,
            transitionOpacity: !0,
            buttonSelector: ".menu-button",
            hoverIntent: !1,
            hoverIntentTimeout: 150,
            calcItemWidths: !1,
            hover: !0
        }, b), c = a(this), c.addClass("with-js"), k.transitionOpacity === !0 && c.addClass("opacity"), c.find("li").each(function() {
            return a(this).has("ul").length ? a(this).addClass("item-with-ul").find("ul").hide() : void 0
        }), k.calcItemWidths === !0 && (d = c.find(">li"), f = d.length, h = 100 / f, g = h + "%"), c.data("breakpoint") && (e = c.data("breakpoint")), l = function() {
            return c.hasClass("lg-screen") === !0 && k.hover === !0 ? k.transitionOpacity === !0 ? a(this).find(">ul").addClass("flexnav-show").stop(!0, !0).animate({
                height: ["toggle", "swing"],
                opacity: "toggle"
            }, k.animationSpeed) : a(this).find(">ul").addClass("flexnav-show").stop(!0, !0).animate({
                height: ["toggle", "swing"]
            }, k.animationSpeed) : void 0
        }, i = function() {
            return c.hasClass("lg-screen") === !0 && a(this).find(">ul").hasClass("flexnav-show") === !0 && k.hover === !0 ? k.transitionOpacity === !0 ? a(this).find(">ul").removeClass("flexnav-show").stop(!0, !0).animate({
                height: ["toggle", "swing"],
                opacity: "toggle"
            }, k.animationSpeed) : a(this).find(">ul").removeClass("flexnav-show").stop(!0, !0).animate({
                height: ["toggle", "swing"]
            }, k.animationSpeed) : void 0
        }, j = function() {
            var b;
            if (a(window).width() <= e) return c.removeClass("lg-screen").addClass("sm-screen"), k.calcItemWidths === !0 && d.css("width", "100%"), b = k.buttonSelector + ", " + k.buttonSelector + " .touch-button", a(b).removeClass("active"), a(".one-page li a").on("click", function() {
                return c.removeClass("flexnav-show")
            });
            if (a(window).width() > e) {
                if (c.removeClass("sm-screen").addClass("lg-screen"), k.calcItemWidths === !0 && d.css("width", g), c.removeClass("flexnav-show").find(".item-with-ul").on(), a(".item-with-ul").find("ul").removeClass("flexnav-show"), i(), k.hoverIntent === !0) return a(".item-with-ul").hoverIntent({
                    over: l,
                    out: i,
                    timeout: k.hoverIntentTimeout
                });
                if (k.hoverIntent === !1) return a(".item-with-ul").on("mouseenter", l).on("mouseleave", i)
            }
        }, a(k.buttonSelector).data("navEl", c), n = ".item-with-ul, " + k.buttonSelector, a(n).append('<span class="touch-button"><i class="navicon">&#9660;</i></span>'), m = k.buttonSelector + ", " + k.buttonSelector + " .touch-button", a(m).on("click", function(b) {
            var c, d, e;
            return a(m).toggleClass("active"), b.preventDefault(), b.stopPropagation(), e = k.buttonSelector, c = a(this).is(e) ? a(this) : a(this).parent(e), d = c.data("navEl"), d.toggleClass("flexnav-show")
        }), a(".touch-button").on("click", function() {
            var b, d;
            return b = a(this).parent(".item-with-ul").find(">ul"), d = a(this).parent(".item-with-ul").find(">span.touch-button"), c.hasClass("lg-screen") === !0 && a(this).parent(".item-with-ul").siblings().find("ul.flexnav-show").removeClass("flexnav-show").hide(), b.hasClass("flexnav-show") === !0 ? (b.removeClass("flexnav-show").slideUp(k.animationSpeed), d.removeClass("active")) : b.hasClass("flexnav-show") === !1 ? (b.addClass("flexnav-show").slideDown(k.animationSpeed), d.addClass("active")) : void 0
        }), c.find(".item-with-ul *").focus(function() {
            return a(this).parent(".item-with-ul").parent().find(".open").not(this).removeClass("open").hide(), a(this).parent(".item-with-ul").find(">ul").addClass("open").show()
        }), j(), a(window).on("resize", j)
    }
}.call(this);