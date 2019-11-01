var oSelector = {
  'www.runoob.com': [
      '.article-heading-ad',
        '.ad-box',
        '#footer',
        '#respond',
        '#htmlfeedback-more',
        '.fixed-btn',
        '.search'
    ],
    'www.baidu.com': [
        '#s_main',          // 下方推荐
        "#s_menu_gurd",
        "#s_top_wrap",      // 顶部 背景
        "#s_upfunc_menus",  // 左上角天气
        "#u_sp",            // 右上角 菜单
        "#bottom_container", // 下方备案
        '#content_right'
    ],
    'blog.csdn.net':[
        '#layerd',
        '.csdn-tracking-statistics',
        '#nav_show_top_stop',
        '#ad_cen',
        'iframe'
    ],
    'bbs.csdn.net':[
        '#Topic_Top',
        '.bbs_top_ad',
        '#ad_pop',
        'iframe',
        '.csdn-tracking-statistics'
    ],
    'wiki.mbalib.com':['iframe'],
    'www.w3school.com.cn':['#ad','#ad_head'],
    'www.jb51.net':['.mb10, .logom, .logor, .toolBar, .r300, #imgRow0, .lbd, .rFixedBox'],
    'www.dataguru.cn':['#float_l','#float_r','.bm img','iframe'],
    'zhidao.baidu.com': ['#qb-side'],
    'www.sohu.com':['#right-side-bar,#god_bottom_banner,.groom-read'],
    'www.yiibai.com':['iframe,div#adv-javalive,div#SOHUCS,div ins,div a#btn-reward,div.article-meta']

};

/**
 * 隐藏所有标签。
 * @param selectors
 */



/**
 * 隐藏指定标签
 * */
var hideAll = function (selectors) {
    $.each(selectors, function (idx, selector) {
        $(selector).hide();
        console.log(selector);
    });
};

var host = window.location.host;
if (oSelector[host] != undefined){
    /* 给background发送消息请求，获取功能开关状态。 */
    chrome.extension.sendRequest({}, function(response) {
            if (response.state) {
                hideAll(oSelector[host]);
            }
        }
        );

    setInterval(function () {
         chrome.extension.sendRequest({}, function(response){
             if(response.state){
                 hideAll(oSelector[host]);
             }
        });
    },1000)
}

/*

if (window.location.host == 'open.chrome.360.cn') {
    alert("Hello");
}

*/

