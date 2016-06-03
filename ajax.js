/*
 * Description : 所有接口 请求函数
 * Author : gaoxiaopeng@ddtkj.com
 * Time : 2015年 6月10日
 *   */
/*
 * 方法描述：获取分类
 * 参数1： pid Int 父ID
 * 参数2：layer int  层次ID
 * 参数3：priceArea  价格区间  （10元 专区 100元专区）
 * 返回值：Json格式   往期揭晓集合
 * 返回值主体：class_list
 */

function ajaxClassList(pid, layer, priceArea, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        cache: true,
        url: "/main_controller/class_list.do?t=" + Math.random(),
        data: {
            pid: pid,
            layer: layer
        },
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result, pid, layer);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：获取商品列表
 * 参数1： operation String 排序 //1、favorate:人气2、publictime:即将揭晓addtime:添加时间totalpriceup:价格升totalpricedown:价格降)
 * 参数2：category_id   int  分类Id
 * 参数3：brand_id   int  品牌Id
 * 参数3：page      int  页码
 * 参数4：priceArea Int
 * 返回值：Json格式   往期揭晓集合
 * 返回值主体：yg_goods_array
 */
function ajaxGoodsList(operation, category_id, brand_id, page, priceArea, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/goods_list.do?t=" + Math.random(),
        data: {
            operation: operation,
            category_id: category_id,
            brand_id: brand_id,
            page: page,
            priceArea: priceArea
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：更具商品Id获取商品列表  用于购物车校验 商品购买次数
 * 参数1： goods_ids String 商品Ids
 * 返回值：Json格式   往期揭晓集合
 * 返回值主体：goods_list
 */
function ajaxGoodsListByIds(goods_ids, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        async: false,
        url: "/main_controller/goods_List_byids.do?t=" + Math.random(),
        data: {
            goods_ids: goods_ids
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：根据关键字获取商品列表
 * 参数1： keywords String 关键字
 * 参数2：page      int  页码
 * 返回值：Json格式   往期揭晓集合
 * 返回值主体：yg_goods_array
 */
function ajaxGoods_ListByKeyWords(keywords,operation, page, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/goods_list_keywords.do?t=" + Math.random(),
        data: {
            keywords: keywords,
            operation:operation,
            page: page
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：根据商品ID获取商品详情
 * 参数1：goods_id int  商品Id
 * 返回值：Json格式   往期揭晓集合
 * 返回值主体：goodsDetail
 */
function ajaxGoodsDetail(goods_id, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/goods_detail.do?t=" + Math.random(),
        data: {
            goods_id: goods_id
        },
        beforeSend: ajaxBeforeSendOfDetail,
        complete: ajaxCompleteOfDetail,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：根据商品ID获取商品详情
 * 参数1：goods_id int  商品Id
 * 返回值：Json格式   往期揭晓集合
 * 返回值主体：goodsDetail
 */
function ajaxGoodsBuyRecords(goods_id, period, page, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/goods_buy_records.do?t=" + Math.random(),
        data: {
            goods_id: goods_id,
            period: period,
            page: page
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：最新揭晓列表 - 揭晓结果
 * 参数1：jsdCard   int  晋商贷卡（1卡、0非卡）
 * 参数2：page      int  页码
 * 参数3：pageSize  int  每页显示条数
 * 返回值：Json格式   往期揭晓集合
 * 返回志主体 ：publish_array
 */
function ajaxPublishListResult(jsdCard, page, pageSize, z_index, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/publish_list.do?t=" + Math.random(),
        data: {
            jsdCard: jsdCard,
            page: page,
            pageSize: pageSize,
            z_index: z_index
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
        	setTimeout(function(){
        		ajaxPublishListResult(jsdCard, page, pageSize, z_index, callbackFun);
        	},1000)
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：最新揭晓列表 - 等待揭晓
 * 参数1：jsdCard   int  晋商贷卡（1卡、0非卡）
 * 参数2：page      int  页码
 * 参数3：pageSize  int  每页显示条数
 * 参数4：callbackFun  执行成功后调用的函数
 * 返回值：Json格式   往期揭晓集合
 * 返回值主体：publish_wait_array
 */
function ajaxPublishListWait(jsdCard, page, pageSize, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/publish_list_wait.do?t=" + Math.random(),
        data: {
            jsdCard: jsdCard,
            page: page,
            pageSize: pageSize
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 描述：获取商品预计揭晓时间
 * 参数：goods_id Int 商品Id
 * 参数：period   Int 期数Id
 * 参数：callbackFun 回调函数
 */

function ajaxPublishWaitTime(goods_id, period, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/expect_publish_time.do?t=" + Math.random(),
        data: {
            goods_id: goods_id,
            period: period
        },
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result); // 
            }
        },
        error: function(r) {
        	setTimeout(function(){
        		ajaxPublishWaitTime(goods_id, period, callbackFun)
        	},1000);
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：根据商品Id和期数ID获取揭晓详情
 * 参数1：goods_id  int  商品Id
 * 参数2：period    int  期数
 * 返回值：Json格式   往期揭晓集合
 * 返回值主体：publishDetail
 */
function ajaxPublishDetail(goods_id, period, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/publish_detail.do?t=" + Math.random(),
        data: {
            goods_id: goods_id,
            period: period
        },
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result, goods_id, period);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：获取往期揭晓列表
 * 参数1：goods_id  int  商品ID
 * 参数2：period    int  期数
 * 参数3：page      int  页码
 * 参数4：size      int  每页记录数
 * 返回值：Json格式   往期揭晓集合
 */
function ajaxPublishListHistory(goods_id, period, page, size, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/publish_history.do?t=" + Math.random(),
        data: {
            goods_id: goods_id,
            period: period,
            page: page,
            size: size
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：获取商品揭晓结果计算详情
 * 参数:goods_id int 商品Id
 * 参数:period int 期数
 * 返回值：无
 */
function ajaxPublishDetailCalculate(goods_id, period, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/publish_detail_calculate.do?t=" + Math.random(),
        data: {
            goods_id: goods_id,
            period: period
        },
        beforeSend: ajaxBeforeSendOfDetail,
        complete: ajaxCompleteOfDetail,
        success: function(result) {
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：获取个人云购记录
 * 参数1：user_id  int  用户ID
 * 参数2：status   int  状态1进行中2正在揭晓3已揭晓
 * 参数3：page     int 分页
 * 返回值：Json格式   往期揭晓集合
 * 返回主体：buyRecordsList
 */
function ajaxPerson_Record_List_Buy(user_id, page, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/person_records_buy.do?t=" + Math.random(),
        data: {
            user_id: user_id,
            page: page
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：获取个人中奖记录
 * 参数1：user_id   int  商品ID
 * 参数2：isMobileCard   int  商品ID
 * 参数3：page      int  页码
 * 返回值：Json格式   往期揭晓集合
 * 返回值主体：winRecordsList
 */
function ajaxPerson_Record_List_Win(user_id, isMobileCard, page, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/person_records_win.do?t=" + Math.random(),
        data: {
            user_id: user_id,
            isMobileCard: isMobileCard,
            page: page
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：晒单列表
 * 参数1：user_id  int  用户Id
 * 参数2：goods_id Int  商品Id
 * 参数3:page     int  分页
 * 参数4：pageSize Int  每页条数
 * 返回值：Json格式   晒单列表集合
 */
function ajaxExposeList(user_id, goods_id, page, pageSize, callbackFun) {
    $.ajax({
        type: "get",
        timeout: timeout,
        dataType: "json",
        cache: true,
        url: "/main_controller/expose_list.do",
        data: {
            goods_id: goods_id,
            user_id: user_id,
            pageSize: pageSize,
            page: page
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：根据晒单Id获取晒单详情
 * 参数1：expose_id  int  晒单ID
 * 参数1：user_id   int  用户ID
 * 参数1：page      int  当前页数
 * 返回值：Json格式
 */
function ajaxExposeDetail(show_id, user_id, page, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/expose_detail.do?t=" + Math.random(),
        data: {
            show_id: show_id,
            user_id: user_id,
            page: page
        },
        beforeSend: ajaxBeforeSendOfDetail,
        complete: function() {
            layer.closeAll('loading');
            $("#loading").hide();
        },
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：获取热门搜索
 * 参数1：size  热门搜索的个数
 * 返回值：Json格式
 */
function ajaxGetHotSearch(size, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/hot_search.do?t=" + Math.random(),
        data: {
            size: size
        },
        beforeSend: ajaxBeforeSendOfDetail,
        complete: ajaxCompleteOfDetail,
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：根据晒单Id获取晒单详情
 * type = 1;首页banner图
 * 返回值：Json格式
 */
function ajaxBannerImg(type, callbackFun) {
    $.ajax({
        type: "get",
        timeout: timeout,
        dataType: "json",
        cache: true,
        url: "/main_controller/banner_img.do",
        data: {
            type: type
        },
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：用户签到
 * 返回值：Json格式
 */
function ajaxSign(signToken, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/member_controller/sign.do?t=" + Math.random(),
        data: {
            signToken: signToken
        },
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            } else {
                isSign = true;
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：判断用户是否登录
 * 返回值：Json格式
 */
function ajaxIsLogin(callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/member_controller/islogin.do?t=" + Math.random(),
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：根据商品Id、期数Id  查询 用户 是否有云购码（登录状态） 未登录同一显示 （您还没有云购码）
 * 参数：goods_id 商品Id
 * 参数：period  期数
 * 返回值：Json格式
 */
function ajaxQueryCodes(goods_id, period, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        data: {
            goods_id: goods_id,
            period: period
        },
        url: "/member_controller/querycodes.do?t=" + Math.random(),
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：根据中奖用户id、商品Id、期数  查询 中奖用户的云购码(用于获取上一期中奖用户的云购码)
 * 参数：uid 中奖用户Id
 * 参数：goods_id 商品Id
 * 参数：period  期数
 * 返回值：Json格式
 */
function ajaxBeforeWinnerCodes(uid, goods_id, period, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        data: {
            uid: uid,
            goods_id: goods_id,
            period: period
        },
        url: "/main_controller/querycodes.do?t=" + Math.random(),
        success: function(result) {
            //调用绑定页面数据方法
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：获取防止用户提交时token的值
 * 参数1：tokenName  String  session中存放token的key值，用于判断是哪个token
 * 参数3：callbackFun    function  成功时的回调函数
 * 返回值：Json格式       产品详情
 */
function ajaxGetToken(tokenName, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/member_controller/getToken.do?t=" + Math.random(),
        data: {
            tokenName: tokenName
        },
        beforeSend: ajaxBeforeSendOfDetail(),
        complete: ajaxCompleteOfDetail(),
        success: function(result) {
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            } else {
                if (result.res_msg == "请登录") {
                    dialog(result.res_msg, "/login.html");
                }
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：获取晒单详情
 * 参数1：show_id   int  晒单ID
 * 参数2：user_id   int  用户ID
 * 参数3：page      int  当前页数
 * 参数4：callbackFun    function  成功时的回调函数
 * 返回值：Json格式        晒单详情集合
 */
function ajaxShowDetail(show_id, user_id, page, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        url: "/main_controller/expose_detail.do?t=" + Math.random(),
        data: {
            show_id: show_id,
            user_id: user_id,
            page: page
        },
        beforeSend: ajaxBeforeSendOfList,
        complete: ajaxCompleteOfList,
        success: function(result) {
            if (verification(result)) { //验证result 是否有效
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
/*
 * 方法描述：检查购物车中的预购商品，上期未结束的预购商品，不可预购
 * 返回值：Json格式
 */
function ajaxCheckPresellGoods(cart, callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",
        data: {
            cart: cart
        },
        url: "/member_controller/checkPresellGoods.do?t=" + Math.random(),
        beforeSend: ajaxBeforeSendOfDetail,
        complete: ajaxCompleteOfDetail,
        success: function(result) {
            if (verification(result)) {
                callbackFun(result);
            }
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}

/*
 * 描述：首页最新揭晓  (待揭晓+已揭晓)集合
 * 参数：page Int  1
 * 参数：pageSize Int  4 
 * 参数：callbackFun  回调函数
 * 返回值：json
 * */
function ajaxIndexPublishList(page,pageSize,callbackFun,z_index){
	 $.ajax({
	        type: "get",
	        timeout: timeout,
	        dataType: "json",
	        async: false,
	        url: "/main_controller/publish_list_index.do?t=" + Math.random(),
	        data: { 
	            page: page,
	            pageSize: pageSize,
	            z_index:z_index
	        },
	        success: function(result) {
	            //调用绑定页面数据方法
	        	
	            if (verification(result)) { //验证result 是否有效
	                callbackFun(result);
	            }
	        },
	        error: function(r) {
	        	setTimeout(function(){
	        		ajaxIndexPublishList(page, pageSize, callbackFun);
	        	},1000)
	            handlingException(r);
	        } //错误处理
	    });
}


/*
 * 方法描述：累计注册人数
 * 返回值：Json格式
 */
function ajaxAccumulativePeople(callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",     
        url: "/main_controller/total.do?t=" + Math.random(),
        success: function(result) {
         callbackFun(result);
           
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}

/*
 * 方法描述：累计注册人数
 * 返回值：Json格式
 */
function ajaxMobileDiscovery(callbackFun) {
    $.ajax({
        type: "post",
        timeout: timeout,
        dataType: "json",     
        url: "/main_controller/selectMobileDiscovery.do?t=" + Math.random(),
        data: { 
            page: 1,
            size: 100
        },
        success: function(result) {
        	callbackFun(result);
        },
        error: function(r) {
            handlingException(r);
        } //错误处理
    });
}
