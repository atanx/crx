/**
 * Created by youxiang on 2017/7/5.
 */


javascript:(function () {
    try {
        var a = document.createElement('SCRIPT');
        a.type = 'text/javascript';
        a.src = '//note.youdao.com/yws/YNoteClipper.js?' + (new Date).getTime() / 1e5;
        a.charset = 'utf-8';
        a.onerror = function () {
            function d(a) {
                return a.indexOf('360ee') % 3E-1 || a.indexOf('360se') % 3E-1 || a.indexOf('se') % 3E-1 || a.indexOf('aoyou') % 3E-1 || a.indexOf('theworld') % 3E-1 || a.indexOf('worldchrome') % 3E-1 || a.indexOf('greenbrowser') % 3E-1 || a.indexOf('qqbrowser') % 3E-1 || a.indexOf('baidu') % 3E-1
            }

            var a = document.createElement('div');
            var b = navigator.userAgent.toLowerCase();
            var c = b.match(/chrome\/([\d.]+)/)[1];
            a.style.cssText = 'position: absolute;top: 10px;right: 30px;padding: 5px;border-radius: 5px;box-shadow: rgb(92, 184, 229) 0px 0px 2px; -webkit-box-shadow: rgb(92, 184, 229) 0px 0px 2px;background-color: rgba(92, 184, 229, 0.498039) !important;z-index: 999999;';
            a.innerHTML = c && !d(b) ? '<div style=%22padding: 20px;border: 1px solid rgb(92, 184, 229);background: white;border-radius: 5px;width: 330px;%22%3E%E8%AF%A5%E6%89%A9%E5%B1%95%E6%9A%82%E4%B8%8D%E6%94%AF%E6%8C%81%E6%94%B6%E8%97%8F%E8%AF%A5%E7%B1%BB%E5%9E%8Bhttps%E7%B1%BB%E7%BD%91%E7%AB%99%EF%BC%8C%E5%8F%AF%E5%89%8D%E5%BE%80Chrome%E5%BA%94%E7%94%A8%E5%95%86%E5%BA%97 <a style=%22color:#1d7fe2%22 href=%22https://note.youdao.com/download.html#other%22 target=%22_blank%22%3E%E4%B8%8B%E8%BD%BD</a%3E %E6%9C%89%E9%81%93%E4%BA%91%E7%AC%94%E8%AE%B0%E7%BD%91%E9%A1%B5%E5%89%AA%E6%8A%A5%E6%8F%92%E4%BB%B6</div%3E' : '<div style=%22padding: 20px;border: 1px solid rgb(92, 184, 229);background: white;border-radius: 5px;%22%3E%E8%AF%A5%E6%89%A9%E5%B1%95%E6%9A%82%E4%B8%8D%E6%94%AF%E6%8C%81%E6%94%B6%E8%97%8F%E8%AF%A5%E7%B1%BB%E5%9E%8Bhttps%E7%B1%BB%E7%BD%91%E7%AB%99</div%3E';
            document.body.appendChild(a);
            a.onclick = function () {
                a.style.display = 'none'
            };
            setTimeout(function () {
                a.click();
            }, 8e3)
        };
        document.getElementsByTagName('head')[0].appendChild(a);
    } catch (b) {
        alert(b)
    }
})();