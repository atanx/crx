var getCookies = function () {
    var objCookes = {};
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var parts = cookies.split('=');
        var k = parts[0];
        var v = parts.slice(1).join('=');
        objCookes[k] = v;
    }
    debugger;
    return objCookes;
};

var encodeCookies = function (objCookies) {
    var cookies = [];
    for (var k in objCookies) {
        var cookie = k + '=' + objCookies[k];
        cookies.push(cookie);
    }
    return cookies.join(';');
};

var setCookie = function (key, value) {
    var cookies = getCookies();
    cookies[key] = value;
    document.cookie += encodeCookies(cookies);
};

var getCookie = function (key) {
    var cookies = getCookies();
    return cookies[key];
};


var state = true;
chrome.browserAction.onClicked.addListener(function (tab) {
    state = !state;
    if (state) {
        chrome.browserAction.setIcon({
            path: {
                '19': '../image/on_19.png'
            }
        });
    }
    else {
        chrome.browserAction.setIcon({
            path: {
                '19': '../image/off_19.png'
            }
        });

        var notification = webkitNotiofications.createNotiofication(
            'image/icon48.png',
            'Notiofication Demo',
            'Merry Christmas'
        ); //建立一个提醒
        notification.show();//创建之后不会立即显示，需要调用show
    }

    //chrome.tabs.create({'url': chrome.extension.getURL('pages/background.html')}, function(tab) { });
});


chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        sendResponse({'state': state});
    });


var sh = {name: 'SH', index: '-', ratio: '-', color: '#ff0000'};
var zz = {name: 'ZZ', index: '-', ratio: '-', color: '#ff0000'};

// 定时获取数据
setInterval(function () {

        $.ajax({
            url: 'https://www.baidu.com/s?wd=上证指数',
            type: 'get',
            success: function (response) {
                var colors = {'+': '#f54545', '-': '#0f990f'};
                var reNumber = /<span class="op-stockdynamic-moretab-cur-num c-gap-right-small">([\d\.]+)<\/span>/;
                var reRatio = /<span class="op-stockdynamic-moretab-cur-info c-gap-right-small">.*\((.*)\)<\/span>/;
                var reColor = /<span class="op-stockdynamic-moretab-cur-info c-gap-right-small">(\S+)/;
                //debugger;
                var mNumber = response.match(reNumber);
                var mRatio = response.match(reRatio);
                var mColor = response.match(reColor);
                if (mNumber || mRatio || mColor) {
                    sh.index = mNumber[1].slice(0, 4);
                    sh.ratio = mRatio[1].slice(1, mRatio[1].length - 1);
                    sh.color = colors[mColor[1][0]];
                }
            },
            error: function (r) {
                chrome.browserAction.setBadgeText({text: 'ERR'});
            }
        });
    }, 2000
)
;

// 定时显示数据
var cycle = function (data) {
    var obj = {};
    obj.data = data;
    obj.popfirst = function () {
        var d = this.data.splice(0, 1);
        this.data = this.data.concat(d);
        return d[0];
    };
    obj.poplast = function () {
        var d = this.data.pop();
        this.data = this.data.splice(0, 0, d);
        return d;
    };
    return obj;
}(['name', 'index', 'ratio']);
setInterval(function () {
    chrome.browserAction.setBadgeBackgroundColor({color: sh['color']});
    chrome.browserAction.setBadgeText({text: sh[cycle.popfirst()]});
}, 1000);