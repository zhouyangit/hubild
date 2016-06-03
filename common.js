//是否显示维护信息
var wx = false;
var rebuild = false;

/*p判断是否是微信*/
var ua = navigator.userAgent.toLowerCase();  
if(ua.match(/MicroMessenger/i)=="micromessenger") { 
	 wx = true;
}

var goodsImg = "_400x400.png"; //首页商品列表图片大小
var goodsDetailImg = "_640x640.png"; //商品列表页图片大小
var bannerImg = "_640x640.png"; //商品列表页图片大小
var rebuildTime = "15:20 - 15:40";
var countDownTime = 180000; //揭晓动画时间
var refundTime = 90 * 24 * 60 * 60 * 1000; //退购时间
var domain = "http://img02.ygqq.com/"; //前台   （头像 、晒单）
var imageURL = "http://img02.ygqq.com"; //后台 （免税商品）
//云购商品图片基本路径
var goodsBaseUrl = "http://img02.ygqq.com/upload/goodsfile/"; //后台  云购商品图片
var dutyfreeGoodsBaseUrl = "http://img02.ygqq.com"; //后台  免稅商品图片

var dialog_val;
var timeout = 20000;
/*
 * 描述：初始化 底部导航菜单选中效果
 * */
$(function() {
    var href = window.location.href;
    if (href.indexOf("cart") > -1) { //会员中心
        $("#nav_cart").addClass("c_menu_this");
    } else if (href.indexOf("goods") > -1) { //商品页面
        $("#nav_goods").addClass("c_menu_this");
    } else if (href.indexOf("member") > -1) { //购物车
        $("#nav_member").addClass("c_menu_this");
    } else if (href.indexOf("publish") > -1) { //免税店
        $("#nav_publish").addClass("c_menu_this");
    } else if (href.indexOf("index") > -1) {
        $("#nav_index").addClass("c_menu_this");
    } else {
        $("#nav_index").addClass("c_menu_this");
    }
});
/*
 * 描述：返回上一页
 * 参数：无
 * 返回值：无
 * */
function goBack() {
    window.history.go(-1);
}
/*
 * 描述：页面弹窗
 * 参数：显示信息
 * */
function dialog(msg, href) {
    layer.open({
        style: 'border:none; background-color:#333; color:#fff;',
        content: msg,
        time: 2,
        end: function() {
            if (typeof(href) != "undefined" && href != "") {
                window.location.href = href;
            }
        }
    });
}
/*
 * 描述:判读值是否为空
 * 参数:exp 需要校验的值
 * 返回值:空返回true; 非空false;
 * */
function checkIsNull(exp) {
    if (!exp && typeof(exp) != "undefined" && exp != null) {
        return true;
    } else {
        return false;
    }
}
/*
 * 描述：验证是否为数字
 * 参数：value  String 将要验证的值
 * 返回值 true/false
 * */
function checkNum(value) {
    var reg = new RegExp("^[0-9]*$");
    return reg.test(value);
}
/*
 * 描述：修改Tab 样式按钮的状态，使其定位到想要的Tab选项上
 * 参数1：class 加字元素 如  .goodsNav ul li a i   找到  goodsNav 下的所有 i 元素
 * 参数2：要选中的元素位数 从0 开始
 * 参数3：选中元素需要添加的 class 值
 * 返回值:无
 * */
function changeTab(className_tag, places_Num, class_Current) {
    $(className_tag).removeClass(class_Current); //移除掉修改标签的 选中 class
    $(className_tag).eq(places_Num).addClass(class_Current); //设置选中位置的class
}
/**              
 * 获取 时分秒 毫秒 组合字符串
 * @param <int> unixTime    待时间戳(秒)
 * @param <bool> isFull    返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
 * @param <int>  timeZone   时区
 */
var formatDate = function(date, format) {
    if (!format) format = "yyyy-MM-dd HH:mm:ss";
    date = new Date(parseInt(date));
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "S": ("" + (date.getMilliseconds() + 1000)).substr(1),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(y+|M+|d+|H+|s+|m+|S)/g, function(a) {
        return dict[a];
    });
};
/* 列表元素 Ajax 请求特效*/
/**
 * 描述：图片延迟加载
 *
 * */
function lazyload(page) {
    //设置图片延迟加载  距离屏幕100像素开始加载图片
    $("img.lazy" + page).lazyload({
        effect: "fadeIn",
        placeholder: "/static/img/loading.jpg",
        threshold: 100,
        skip_invisible: false
    });
}
/*
 * 计算：计算图片高度
 *
 * */
function calcImgHeight(margin, num) {
    var ImgWidth = parseInt(document.body.scrollWidth - margin) / num; //晒单详情 可见总宽度
    if (ImgWidth > 200) {
        ImgWidth = 200;
    }
    return ImgWidth;
}
/*
 * 描述：验证用户是否登录,并生成来源url 传递到登录页面，登录成功后 返回来源页面，
 * 参数： isGoComeUrl 是否跳转的来源页面
 * 返回值：bool (true 已登录 false 未登录）
 **/
function checkLoginState(isGoNewUrl) {
    //绑定商品列表
    var uid = $("#uid").val();
    var goUrl = "/login.do?url=" + encodeURIComponent(window.location.pathname + window.location.search);
    if (uid == "" || uid == null || uid == "0" || uid == 0) {
        if (isGoNewUrl == true) {
            window.location = goUrl;
        }
        return false;
    } else {
        return true;
    }
}
/*
 * 描述：Ajax请求异常处理
 * 参数：(errorJson)系统返回错误Json
 * 返回值：无
 * */
function handlingException(errorJson) {
    layer.open({
        style: 'border:none; background-color:#333; color:#fff;',
        content: '亲！网络环境差,拼命加载中 ... ',
        time: 2
    });
}
/*
 * 描述:云购后台返回json是否正常（验证返回结果不为空、""且状态为true
 * 参数:调用Action返回的json 结果
 * 返回值:成功为true; 失败为false;
 * */
function verification(result, isOutErrorMsg) {
    if (result != null && result != "" && typeof(result) != "undefined" && result.res_code == 1) {
        return true;
    } else {
        if (isOutErrorMsg != false) {
            dialog(result.res_msg);
        }
        return false;
    }
}
/*
 * 描述：Ajax请求前页面展示特效
 * 适用对象：所有带分页的列表展示效果
 * 使用方法：列表页面添加  id="more" 和 id="loading" 的div 对象
 * */
function ajaxBeforeSendOfList() {
    $("#more").hide(); //隐藏加载更多
    $("#loading").show(); //显示正在加载loading.gif 动态图
}
/*
 * 描述：Ajax 请求 前 页面展示特效
 * */
function ajaxCompleteOfList() {
    $("#loading").hide(); //隐藏正在加载	
}
/*详情页面 Ajax 请求特效*/
/*
 * 描述：Ajax请求前页面展示特效
 * 适用对象：列表页面
 * */
function ajaxBeforeSendOfDetail() {
    dialog_val = layer.open({
        type: 2
    }); // 页面填出正在加载框
}
/*
 * 描述：Ajax 请求 前 页面展示特效
 * */
function ajaxCompleteOfDetail() {
    layer.close(dialog_val);
    //layer.closeAll('loading');//关闭 所有弹出层
}
/*
 * 描述：判断是否数据为空及是否显示更多连接
 * 参数：result（数据的json结果）,len(数据集合的长度) ,page（当前页）
 * 返回值：bool ;true继续向下执行 false;直接return
 * */
function isNullOrMore(dataLength, page, pageSize, type, tag) {
    if (dataLength == 0 && page == 1) { //无数据
        $(".no_data_hide").hide();
        var winhg = ($(window).height() * 0.5) - 260;
        var html = '<div id="no_data" style="width:100%;text-align: center;padding-top:' + winhg + 'px;padding-bottom:20px;">';
        switch (type) {
            case "cart": //购物车
                html += '<img src="/static/img/icon/cart.png" width=50% />';
                html += '<p>车车都在等您带回家呢，快去选购吧！</p>';
                html += '<a href="/goods_list.html">立即夺宝</a>';
                break;
            case "expose": //晒单
                html += '<img src="/static/img/icon/wu.png" width=50% />';
                html += '<p>暂无记录~</p>';
                break;
            case "default_no_href": //默认无跳转链接
                html += '<img src="/static/img/icon/record_no.png" width=50% />';
                html += '<p>暂无记录~</p>';
                break;
            case "member_recharge_detail": //积分
                html += '<img src="/static/img/icon/member_recharge_detail.png" width=50% />';
                html += '<p>光是心动怎行，充值行动走起来！</p>';
                break;
            case "null_brokerage": //无佣金记录
                html += '<img src="/static/img/icon/wu_brokerage.png" width=50% />';
                html += '<p style="font-size:21px">赶快邀请好友赚取佣金吧！</p>';
                html += '<a href="/member/invite.do" style="height: 64px;line-height: 64px;font-size: 21px;">我要赚取</a>';
                break;    
            case "null_m_record": //多期参与
                html += '<img src="/static/img/icon/null_m_record.png" width=50% />';
                html += '<p>多期参与，多个机会！</p>';
                html += '<a href="/goods_list.html">立即夺宝</a>';
                break;
            case "null_m_record_all": //夺宝记录
                html += '<img src="/static/img/icon/null_m_record_all.png" width=50% />';
                html += '<p>为自己梦想填双脚印吧！</p>';
                html += '<a href="/goods_list.html">立即夺宝</a>';
                break;
            case "member_redpacket": //夺宝记录
                html += '<img src="/static/img/icon/member_redpacket.png" width=50% />';
                html += '<p>亲，您还没有红包呢</p>';
                html += '<a href="/goods_list.html">立即夺宝</a>';
                break;
            case "member_records_win": //中奖记录
                html += '<img src="/static/img/icon/member_records_win.png" width=50% />';
                html += '<p>幸运女神暂未光顾，继续加油哦！</p>';
                html += '<a href="/goods_list.html">立即夺宝</a>';
                break;
            case "show_indent": //我的晒单
                html += '<img src="/static/img/icon/show_indent.png" width=50% />';
                html += '<p>亲，您还没有晒单记录哦</p>';
                html += '<a href="/goods_list.html">立即夺宝</a>';
                break;
            case "no_wifi": //无网络
                html += '<img src="/static/img/icon/no_wifi.png" width=50% />';
                html += '<p>亲，您还没有晒单记录哦</p>';
                html += '<a href="/goods_list.html">立即夺宝</a>';
                break;
            case "no_site": //无地址
            	html += '<img src="/static/img/icon/record_no.png" width=50% />';
                html += '<p>亲，您还没有收货地址哦</p>';
                html += '<a href="member_address_add.do?url=">添加地址</a>';
                break;
            case "null_m_bank": //无银行卡
            	html += '<img src="/static/img/icon/record_no.png" width=50% />';
                html += '<p>亲，您还没有绑定银行卡哦</p>';
                break;
            case "null_invite": //无邀请好友
            	html += '<img src="/static/img/icon/null_invite.png" width=50% />';
                html += '<p>亲，您还没有邀请好友呢~</p>';
                html += '<a href="invite.do">立即邀请</a>';
                break;
            case "null_valentine": //情人节
            	html += '<img src="/static/img/icon/record_no.png" width=50% />';
                html += '<p>暂无记录~</p>';
                html += '<a href="/static/zt/valentine/valentine.htm">立即购买</a>';
                break;
            default:
                html += '<img src="/static/img/icon/record_no.png" width=50% />';
                html += '<p>暂无记录~</p>';
                html += '<a href="/goods_list.html">立即夺宝</a>';
                break;
        }
        html += '</div>';
      
        if (!tag) {
            tag = "";
        }
        $("#dataList" + tag).html(html);
        isload = false; //停止继续滚动加载
        $("#dataMore").hide(); //隐藏加载更多
        return false;
    } else { //有数据
        //1、不够分页
        if (dataLength < pageSize) {
            isload = false; //停止继续滚动加载
            $("#dataMore").hide(); //隐藏加载更多
        } else { //2、够分页
            isload = true; //可以继续滚动加载
            $("#dataMore").show(); //显示加载更多
            $("#more").show(); //隐藏加载更多
            $("#loading").hide(); //显示正在加载loading.gif 动态图
        }
        return true;
    }
}

/*
 * 描述：无限分页功能，当页面滚动到dataMore 时 触发 调用数据功能
 * 使用方法：需要页面添加  dataMore(滑动加载更多数据)
 * 参数：callBackFun  回调函数 （ajax 请求数据的函数）
 * 返回值：无
 * */
var isload = true;

function scrollPage(callBackFun) {
    $(window).scroll(function() {
        if (isload) { //ajax在后台获取数据时，设值其false，防止页面多次加载
            // var more_top =document.getElementById("dataMore").offsetTop; //加载更多层距离document 顶部的距离
            if ($(this).scrollTop() + $(window).height() + 100 >= $(document).height() && $(this).scrollTop() > 100) {
                //更多出现在滚动区域
                page++;
                isload = false;
                window.setTimeout(function() {
                    callBackFun();
                }, 200);
            }
        }
    });
}

/**
 * @lijianyun@ddtkj.com
 * 2015.07.18
 * 会员账户金额格式化(显示千分位、没有小数)
 * */
function moneyIntFormat (money) {
	if (money == 0) {
		return money;
	} else {
		if(money<0){
			money = money*(-1);
			n = 2;
			money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
					.toFixed(n)
					+ "";
			var l = money.split(".")[0].split("").reverse(), 
			//	r = money.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i]
						+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
								: "");
			}
			return "-"+t.split("").reverse().join("");
		}else{
			n = 2;
			money = parseFloat((money + "").replace(/[^\d\.-]/g, ""))
					.toFixed(n)
					+ "";
			var l = money.split(".")[0].split("").reverse(), 
			//	r = money.split(".")[1];
			t = "";
			for (i = 0; i < l.length; i++) {
				t += l[i]
						+ ((i + 1) % 3 == 0 && (i + 1) != l.length ? ","
								: "");
			}
			return t.split("").reverse().join("");	
		}
	}
};

/*
 * 描述：当滚动条移动超过屏幕 70% 出现 返回顶部
 * 需要<a href="#top" target="_self" class="u_top" >
 * 页面顶部添加<a name="top" id="top"></a>
 * */
function backTop() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > ($(window).height() * 0.7)) {
            $(".u_top").fadeIn(500);
        } else {
            $(".u_top").fadeOut(500);
        }
    });
    $(".u_top").click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
}

/*
 * 描述： js获取url参数
 * */
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}