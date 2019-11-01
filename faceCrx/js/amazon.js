/**
 * Created by jiangbin on 2017/10/22.
 */

function get_trans(src, callback) {
    // callback(res){res.data}
    chrome.runtime.sendMessage({ src: src }, callback);
}


function enableImage() {
    //显示亚马逊所有图片链接
    $("body").append(
        "<div id='imageBox' style='width:400px; padding:20px; border-radius: 10px; background-color:rgba(3, 169, 244, 0.9); position:fixed;top:20px; right:20px; z-index: 9999;  '><button id='downloadBtn' >下载</button></div>"
    );
    $("#imageBox").draggable();
    var getImageLinks = function () {
        var images = $('div#altImages img');
        var fixImages = [];
        for (var i = 0; i < images.length; i++) {
            var tmp = images[i].src.replace(/\._.*_\./, '.');
            fixImages.push(tmp);
        }
        return fixImages;
    };

    var download = function () {
        var images = getImageLinks();
        console.log(images);
        //$("#imageBox").html(str);
    };


    $("#downloadBtn").on('click', download);
}


/** 增加复制建议关键词功能  */

/** 1.添加UI */
$("body").append(
    "<div id='suggestionBox' style='width: 400px; padding: 20px; border-radius: 10px; background-color: rgb(35, 47, 62); position: fixed; top: 27px; right: 20px; z-index: 9999; left: 829px; color: antiquewhite;'>建议关键词 <button id='copyBtn' style='margin-bottom: 5px;' >复制</button><textarea id='hiddenInput' style='margin-top: 0px;margin-bottom: 0px;height: 58px;position: fixed;width: 20px;left: 2000px;' value=''></textarea><div id='container' style='display:flex'><textarea id='src' style='width:180px' rows=12 contenteditable></textarea><textarea id='dst'  style='width:180px'></textarea></div></div>"
);
$("#suggestionBox").draggable();

/** 2.定时更新关键词 */
var src1 = ''
var src2 = ''
setInterval(function () {
    var s = $('#suggestions div');
    var src = s.map(function (idx, d) { return $(d).text(); });
    src = src.toArray().join('\n');

    src1 = src2;
    src2 = src;
    if (src1 != src2) {
        var strs = s.map(function (idx, d) { return "<li>" + $(d).text() + "</li>"; });
        strs = strs.toArray().join('\n');

        strs = "<ol style='color:antiquewhite;'>" + strs + "</ol>";
        $('#suggestionBox #container #src').val(src);

        // get_trans(src, function (res) {
        //     $('#suggestionBox #container #dst').val(res.data);
        // })
    }

}, 1000);

var trans1 = ''
var trans2 = ''
setInterval(function () {
    var src = $('#suggestionBox #container #src').val();
    trans1 = trans2;
    trans2 = src;
    if (trans1 != trans2) {  // 用户编辑了提示词列表
        get_trans(src, function (res) {
            $('#suggestionBox #container #dst').val(res.data);
        })
    }
}, 2000);



/** 3. 定义复制按钮事件 */
$("#copyBtn").on('click', function (e) {
    var str = $('#suggestionBox #container #src').val();
    $('#hiddenInput').val(str);
    $('#hiddenInput').select();
    document.execCommand('Copy');
});

$('#src').on("keyup", function (e) {
    console.log($('#src').val())
})
