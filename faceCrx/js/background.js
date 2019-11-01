

// google翻译
function get_trans(src) {
    // callback(dst)
    if (src.length == 0) {
        return False;
    }
    // var api_url = "https://translate.google.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q={src}";
    var api_url = "https://translate.google.cn/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q={src}";
    url = api_url.replace("{src}", escape(src));
    /**
     * 
     * CORB 跨域读取阻塞导致无法读取跨域的请求数据。。。。。
     */
    var result = '';
    $.ajax({
        method: "GET",
        url: url,
        async: false,
        success: function (data) {
            var dst = data[0].map(function (d, idx) { return d[0] });
            dst = dst.join('');
            result = dst;
        }
    });
    return result;
    // fetch(url)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (myJson) {
    //         console.log(myJson);
    //         var dst = myJson[0].map(function (d, idx) { return d[0] });
    //         dst = dst.join('');
    //         callback({ data: dst });
    //     });
}


// chrome.runtime.sendMessage('Hello');


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // console.log(sender.tab ?
        //     "from a content script:" + sender.tab.url :
        //     "from the extension");
        if (request.src)
            console.log(request.src)
        var result = get_trans(request.src)
        console.log("xxxxxxxxxxxxxx")
        console.log(result);

        sendResponse({ data: result })
    });