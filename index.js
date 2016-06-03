var goods_list_url = "goods_list_search",
	publish_detail_result_url = "/publish_detail_result",
	publish_detail_being_url = "/publish_detail_being",
	person_records_win_url = "/person_records_win",
	goods_detail_url = "/goods_detail",
	z_index = 0,
	page = 1,
	pageSize = 6,
	category_id = 0,
	brand_id = 0,
	operation = "publictime",
	priceArea = 0;
$(function() {
	new Swiper(".swiper-container", {
		pagination: ".swiper-pagination",
		paginationClickable: !0,
		spaceBetween: 30,
		autoplay: 2E3,
		loop: !0
	});
	$(".b_float").find("em").click(function() {
		$(".b_float").hide()
	});
	bindPrefecture();
	ajaxIndexPublishList(1, 4, bindIndexPublishList);
	getGoodsList();
	scrollPage(getGoodsList);
	actionChoose();
	backTop();
	b_fixed();
	ajaxAccumulativePeople(bindAccumulativePeople)
});

function bindPrefecture() {
	var b = "";
	Menus = eval(menus);
	for (var e = 0; e < Menus.length; e++) b += "\x3cli\x3e", b += '\x3ca href\x3d"' + Menus[e].url + '"\x3e', b += '\x3cspan\x3e\x3cimg src\x3d"' + imageURL + Menus[e].icon + '" height\x3d"43px"\x3e\x3c/span\x3e', b += "\x3cb\x3e" + Menus[e].name + "\x3c/b\x3e", b += "\x3c/a\x3e", b += "\x3c/li\x3e";
	$("#c_main_Prefecture").append(b)
}

function bindAccumulativePeople(b) {
	var e = b.total.toString();
	$("#People").val(e);
	for (i = 0; i < e.length; i++) html = "", html += '\x3cspan class\x3d"yNumList"\x3e', html += '\x3cul style\x3d"margin-top: -180px"\x3e', html += '\x3cli t\x3d"9"\x3e9\x3c/li\x3e', html += '\x3cli t\x3d"8"\x3e8\x3c/li\x3e', html += '\x3cli t\x3d"7"\x3e7\x3c/li\x3e', html += '\x3cli t\x3d"6"\x3e6\x3c/li\x3e', html += '\x3cli t\x3d"5"\x3e5\x3c/li\x3e', html += '\x3cli t\x3d"4"\x3e4\x3c/li\x3e', html += '\x3cli t\x3d"3"\x3e3\x3c/li\x3e', html += '\x3cli t\x3d"2"\x3e2\x3c/li\x3e', html += '\x3cli t\x3d"1"\x3e1\x3c/li\x3e', html += '\x3cli t\x3d"0"\x3e0\x3c/li\x3e', html += "\x3c/ul\x3e", html += "\x3c/span\x3e", $(".allNums").append(html);
	var f = [];
	for (i = b = 0; i < e.length; i++) b = e.slice(i, i + 1), f.push(b);
	$(".yNumList ul").css("marginTop", "-180px");
	var g = 0;
	for (i = 0; i < f.length; i++) g = e[i], $($(".yNumList ul")[i]).animate({
		marginTop: 20 * g - 180
	}, 1E3);
	if ($(".yNumList").length < f.length) for (b = f.length - $(".yNumList").length, i = 0; i < b; i++) $($(".yNumList")[0]).clone(!0).insertAfter($($(".yNumList")[$(".yNumList").length - 1]));
	setInterval(function() {
		$(".yJoinNum input").val(parseInt($(".yJoinNum input").val()));
		f = [];
		e = $(".yJoinNum input").val();
		for (i = 0; i < e.length; i++) {
			var b = e.slice(i, i + 1);
			f.push(b)
		}
		if ($(".yNumList").length < f.length) for (b = f.length - $(".yNumList").length, i = 0; i < b; i++) $($(".yNumList")[0]).clone(!0).insertAfter($($(".yNumList")[$(".yNumList").length - 1]));
		$(".yNumList ul").css("marginTop", "-180px");
		for (i = 0; i < f.length; i++) g = e[i], $($(".yNumList ul")[i]).animate({
			marginTop: 20 * g - 180
		}, 1E3)
	}, 3E3)
}

function bindIndexPublishList(b) {
	var e = $("#c_newest_publish"),
		f = b.publish_wait_array,
		g = b.now;
	if (0 < f.length) for (var d = 0, k = f.length; d < k; d++) {
		var c = "",
			a = f[d];
		if (a) {
			var h;
			null != a.showImages && "undefined" != typeof a.showImages && (h = goodsBaseUrl + a.showImages.split(",")[0] + goodsImg);
			var l = publish_detail_being_url + "-" + a.gid + "-" + a.periods + ".html",
				n = a.expectPublishTime - g,
				m = a.gid + "_" + a.periods,
				c = 0 == d % 2 ? c + "\x3cli\x3e" : c + '\x3cli class\x3d"c_no_border"\x3e',
				c = c + '\x3cdiv class\x3d"c_newest_publish_text"\x3e',
				c = c + ('\x3cdiv style\x3d"height:40px;  overflow: hidden;line-height: 20px;"\x3e\x3ca href\x3d"' + l + '"\x3e' + a.title + "\x3c/a\x3e\x3c/div\x3e"),
				c = c + ('\x3cp class\x3d"c_publish_time" id\x3d"time_' + m + '"\x3e'),
				c = c + ('\x3cspan id\x3d"hh_0_' + m + '"\x3e0\x3c/span\x3e\x3cspan id\x3d"hh_1_' + m + '"\x3e0\x3c/span\x3e\x3cspan class\x3d"c_colon"\x3e:\x3c/span\x3e'),
				c = c + ('\x3cspan id\x3d"mm_0_' + m + '"\x3e0\x3c/span\x3e\x3cspan id\x3d"mm_1_' + m + '"\x3e0\x3c/span\x3e\x3cspan class\x3d"c_colon"\x3e:\x3c/span\x3e'),
				c = c + ('\x3cspan id\x3d"ss_0_' + m + '"\x3e0\x3c/span\x3e\x3cspan id\x3d"ss_1_' + m + '"\x3e0\x3c/span\x3e'),
				c = c + "\x3c/p\x3e\x3c/div\x3e",
				c = c + '\x3cdiv class\x3d"c_newest_publish_img"\x3e',
				c = c + ('\x3ca href\x3d"' + l + '"\x3e'),
				c = c + ('\x3cimg src\x3d"' + h + '" class\x3d"img-responsive publish" style\x3d"width:100%"  alt\x3d"' + a.title + '"\x3e'),
				c = c + "\x3c/a\x3e",
				c = c + "\x3c/div\x3e",
				c = c + "\x3c/li\x3e";
			e.append(c);
			actionTimer(n, a.gid, a.periods)
		}
	}
	if (4 > f.length) for (b = b.publish_array, d = 0, k = b.length; d < k; d++) c = "", a = b[d], h = goodsBaseUrl + a.showImages.split(",")[0] + goodsImg, f = publish_detail_result_url + "-" + a.gid + "-" + a.period + ".html", g = $.parseJSON(a.userInfo), l = g.nickname, 6 < l.length && (l = l.substring(0, 6) + "..."), c += '\x3cli class\x3d"c_no_border"\x3e', c += '\x3cdiv class\x3d"c_newest_publish_text"\x3e', c += '\x3cdiv style\x3d"height:40px;  overflow: hidden;line-height: 20px;"\x3e\x3ca href\x3d"' + f + '"\x3e' + a.title + "\x3c/a\x3e\x3c/div\x3e", c += '\x3cp class\x3d"c_publish_time"\x3e\u83b7\u5f97\u8005\uff1a\x3ca href\x3d"' + person_records_win_url + "-" + g.mid + '.html" class\x3d"c_index_a"\x3e' + l + "\x3c/a\x3e\x3c/p\x3e", c += "\x3c/div\x3e", c += '\x3cdiv class\x3d"c_newest_publish_img"\x3e', c += '\x3ca href\x3d"' + f + '"\x3e', c += '\x3cimg src\x3d"' + h + '" class\x3d"img-responsive publish" style\x3d"width:100%;/"   alt\x3d"' + a.title + '"\x3e', c += "\x3c/a\x3e\x3c/div\x3e", c += "\x3c/li\x3e", e.append(c);
	lazyload("publish")
}

function getGoodsList() {
	ajaxGoodsList(operation, category_id, brand_id, page, priceArea, bindGoodsList)
}

function getResult(b, e) {
	$("#time_" + b + "_" + e).html('\x3cp class\x3d"c_publish_time c_calculation"\x3e\u6b63\u5728\u8ba1\u7b97 ...\x3c/p\x3e');
	setTimeout(function() {
		ajaxPublishDetail(b, e, bindResult)
	}, 3E3)
}

function bindResult(b, e, f) {
	b = b.publishDetail;
	"" == b || null == b ? $("#time_" + e + "_" + f).html('\x3cp class\x3d"c_publish_time c_calculation"\x3e\u6b63\u5728\u8ba1\u7b97 ...\x3c/p\x3e') : (b = $.parseJSON(b.userInfo), b = '\u83b7\u5f97\u8005\uff1a\x3ca  href\x3d"' + person_records_win_url + "-" + b.mid + '.html"\x3e' + b.nickname + "\x3c/a\x3e", $("#time_" + e + "_" + f).html(b))
}

function bindGoodsList(b) {
	var e = b.yg_goods_array.length;
	if (0 != isNullOrMore(e, page, pageSize)) {
		for (var f = $("#dataList"), g = 0; g < e; g++) {
			var d = b.yg_goods_array[g],
				k = goodsBaseUrl + d.showImages.split(",")[0] + goodsImg,
				c = parseInt(d.priceTotal / d.priceArea),
				c = parseInt(d.priceSell / c * 100);
			0 == c && 0 < d.priceSell && (c = 1);
			var a = "",
				h = 99999 == d.cid ? goods_detail_url + "-" + d.gid + "-" + d.periodCurrent + ".html?cid\x3d9" : goods_detail_url + "-" + d.gid + "-" + d.periodCurrent + ".html",
				a = a + "\x3cdd\x3e",
				a = a + '\x3cdiv class\x3d"c_goods_size"\x3e',
				a = a + ('\x3ca href\x3d"' + h + '"\x3e'),
				a = a + ('\x3cimg id\x3d"img_' + d.gid + '"  data-original\x3d"' + k + '" class\x3d"img-responsive lazy' + page + '" style\x3d"width:100%;" \x3e'),
				a = a + "\x3c/a\x3e\x3c/div\x3e",
				a = a + ('\x3ca href\x3d"' + h + '"\x3e(\u7b2c' + d.periodCurrent + "\u671f) " + d.title + "\x3c/a\x3e"),
				a = a + ("\x3cp\x3e\u5f00\u5956\u8fdb\u5ea6\x3cspan\x3e" + c + "%\x3c/span\x3e\x3c/p\x3e"),
				a = a + '\x3cdiv class\x3d"c_shopping_cart"\x3e',
				a = a + '\x3cdiv class\x3d"c_progress_box"\x3e',
				a = a + ('\x3cspan style\x3d"width:' + c + '%"\x3e\x3c/span\x3e'),
				a = a + "\x3c/div\x3e",
				a = 99999 == d.cid ? a + ('\x3cdiv class\x3d"c_addshopping_cart"\x3e\x3ca href\x3d"' + h + '" style\x3d height:25px;width:25px;\x3e\x3c/a\x3e\x3c/div\x3e') : a + ('\x3cdiv class\x3d"c_addshopping_cart" onclick\x3d"actionAddCart(' + d.gid + "," + d.periodCurrent + "," + d.priceArea + ')"\x3e\x3c/div\x3e'),
				a = a + "\x3c/div\x3e";
			99999 == d.cid ? a += '\x3cdiv class\x3d"c_region_icon c_newDedicated"\x3e\x3c/div\x3e' : 0 < d.maxBuy ? a += '\x3cdiv class\x3d"c_region_icon c_limit"\x3e\x3c/div\x3e' : 10 == d.priceArea ? a += '\x3cdiv class\x3d"c_region_icon c_ten"\x3e\x3c/div\x3e' : 100 == d.priceArea && (a += '\x3cdiv class\x3d"c_region_icon c_hundred"\x3e\x3c/div\x3e');
			a += "\x3c/dd\x3e";
			f.append(a)
		}
		lazyload(page)
	}
}

function actionChoose() {
	$(".c_goods_title li").click(function() {
		var b = $(this).index(".c_goods_title li");
		$(".c_goods_title li").removeClass("c_hot_color");
		$(".c_goods_title li").removeClass("c_price_up_other");
		$(".c_goods_title li").removeClass("c_price_down_other");
		$(this).addClass("c_hot_color");
		3 == b && $(this).addClass("c_price_up_other");
		4 == b && $(this).addClass("c_price_down_other");
		operation = $(this).attr("val-data");
		page = 1;
		$("#dataList").html("");
		getGoodsList()
	})
}

function actionTimer(b, e, f) {
	var g = window.setInterval(function() {
		var d = 0,
			k = 0,
			c = 0,
			a = 0;
		0 < b && (a = b, d = parseInt(a / 36E5), a = b % 36E5, k = parseInt(a / 6E4), a = b % 6E4, c = parseInt(a / 1E3), a = b % 1E3, a = parseInt(a / 10));
		9 >= d && (d = "0" + d);
		9 >= k && (k = "0" + k);
		9 >= c && (c = "0" + c);
		99 >= a && (a = "0" + a);
		9 >= a && (a = "00" + a);
		var d = d.toString(),
			k = k.toString(),
			c = c.toString(),
			h = e + "_" + f;
		36E5 <= b ? (document.getElementById("hh_0_" + h).innerHTML = d[0], document.getElementById("hh_1_" + h).innerHTML = d[1], document.getElementById("mm_0_" + h).innerHTML = k[0], document.getElementById("mm_1_" + h).innerHTML = k[1], document.getElementById("ss_0_" + h).innerHTML = c[0], document.getElementById("ss_1_" + h).innerHTML = c[1]) : 36E5 > b && 0 <= b ? (document.getElementById("hh_0_" + h).innerHTML = k[0], document.getElementById("hh_1_" + h).innerHTML = k[1], document.getElementById("mm_0_" + h).innerHTML = c[0], document.getElementById("mm_1_" + h).innerHTML = c[1], document.getElementById("ss_0_" + h).innerHTML = a[1], document.getElementById("ss_1_" + h).innerHTML = a[2]) : 0 > b && (window.clearInterval(g), getResult(e, f));
		b -= 10
	}, 10)
}

function actionAddCart(b, e, f) {
	var g = new CartItem;
	g.price = f;
	g.freight = 0;
	g.type = 2;
	g.times = 1;
	g.buyPeriod = 1;
	g.gid = b;
	g.period = e;
	e = new CartHelper;
	e.add(g);
	$("#c_total_num").html(e.read().Count);
	b = $("#img_" + b);
	var d = b.clone().css("opacity", .75);
	$("body").append(d);
	d.css({
		"z-index": 9E3,
		display: "block",
		position: "absolute",
		top: b.offset().top + "px",
		left: b.offset().left + "px",
		width: b.width() + "px",
		height: b.height() + "px"
	});
	b = $("#nav_cart").offset().top;
	g = $("#nav_cart").offset().left;
	e = .08 * $(window).width();
	d.animate({
		top: b,
		left: g + e,
		width: 10,
		height: 6
	}, "slow", function() {
		d.remove()
	})
}

function b_fixed() {
	$(window).scroll(function() {
		$(window).scrollTop() >= $(".b_index_fixed1").offset().top ? ($(".b_float").hide(), $(".b_index_fixed").css({
			position: "fixed",
			top: "0",
			left: "0",
			zIndex: "149"
		})) : ($(".b_index_fixed").css({
			position: "relative"
		}), $(".b_float").show())
	})
};