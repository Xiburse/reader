const remote = require("electron").remote;
window.onload = function () {
    window.addEventListener("scroll", function () {
        var re = remote;
        var scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        var b = scrollTop / scrollHeight;
        re.getGlobal("iframeOptions").b = b;
    });
    var b = remote.getGlobal("iframeOptions").b;
    var scrollTop = b * document.body.scrollHeight;
    document.body.scrollTop = scrollTop;
}