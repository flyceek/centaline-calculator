$(function() {

    //获取要定位元素距离浏览器顶部的距离
    
    var navH = $("table thead tr").offset().top;

    //获取本页面顶部nav的高度，以及确定定位元素将要定位的高度
    var gprsT = $('.result-nav').outerHeight();


    //滚动条事件        　　
    $(window).scroll(function() {
        //获取滚动条的滑动距离        　　　　
        var scroH = $(this).scrollTop();
        console.log(scroH)
            //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定        　　　　
            // if (scroH >= navH) {　　　　　　
            //     $(".win").css({ "position": "fixed", "top": 0 });　　　　
            // } else if (scroH < navH) {　　　　　　
            //     $(".win").css({ "position": "absolute", "top": 200, "right": 70 });　　　　
            // }　　

        if (scroH >= navH - gprsT) {
            $("#gprs").addClass('gprsTclass')
        } else if (scroH < navH - gprsT) {
            $("#gprs").removeClass('gprsTclass')
        }

    });

    //获取数据
    // function getUrlParam(name) {
    //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //     var r = window.location.search.substr(1).match(reg);
    //     if (r != null) return unescape(r[2]);
    //     return null;
    // }

    //获得传参方法
    function getNum(name) {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf('?') != -1) {
            var str = url.split('?')[1];
            if (str.indexOf('&') != -1) {
                var strs = str.split('&');
                for (var i = 0; i < strs.length; i++) {
                    var a = strs[i].split('=')
                    if (a[0] == name) {
                        return a[1]
                    }
                }

            }
            console.log(str)
        }
    }

    //获取贷款本金，期数，月利率
    var loanAllMoney = getNum('loanAllMoney');
    loanAllMoney = Number.parseFloat(loanAllMoney)
    var months = getNum('months');
    months = Number.parseFloat(months)
    var monthRate = getNum('monthRate');
    monthRate = Number.parseFloat(monthRate)
    console.log('贷款本金(万)，期数，月利率');
    console.log(loanAllMoney, months, monthRate);
    console.log('---------等额本息计算开始---------');
    var monthlySupply = [loanAllMoney * 10000 * monthRate * Math.pow(1 + monthRate, months)] / [Math.pow(1 + monthRate, months) - 1];
    console.log('月供')
    console.log(monthlySupply);
    //还款总额(万)
    var totalRepayment = monthlySupply * months / 10000;
    console.log('还款总额')
    console.log(totalRepayment);
    //利息总额(万)
    var totalInterest = totalRepayment - loanAllMoney;
    console.log('利息总额')
    console.log(totalInterest);
    // //等额本息json数据
    var EqualPrincipalAndInterest = {
        'totalRepayment': totalRepayment,
        'loanAllMoney': loanAllMoney,
        'totalInterest': totalInterest,
        'months': months,
        'table': []
    };
    //月供利息=上月剩余本金*月利率
    var everyMonthlyInterest = [];
    // everyMonthlyInterest[0] = loanAllMoney * 10000 * monthRate;
    // everyMonthlyInterest[i] = residualPrincipal[i - 1] * monthRate;
    //月供本金(everyMonthlyprincipal[i])=月供总额(monthlySupply)-当月月供利息（everyMonthlyInterest[i]）
    var everyMonthlyprincipal = [];
    //剩余本金=上月剩余本金-当月月供本金
    var residualPrincipal = [];
    // residualPrincipal[0] = loanAllMoney* 10000 - everyMonthlyprincipal[i]
    // residualPrincipal[i] = residualPrincipal[i - 1] - everyMonthlyprincipal[i]

    for (var i = 0; i < months; i++) {
        if (i == 0) {
            everyMonthlyInterest[0] = loanAllMoney * 10000 * monthRate;
        } else {
            everyMonthlyInterest[i] = residualPrincipal[i - 1] * monthRate;
        }
        everyMonthlyprincipal[i] = monthlySupply - everyMonthlyInterest[i];
        if (i == 0) {
            residualPrincipal[0] = loanAllMoney * 10000 - everyMonthlyprincipal[i];
        } else {
            residualPrincipal[i] = residualPrincipal[i - 1] - everyMonthlyprincipal[i];
        }
    }

    console.log('月供利息');
    console.log(everyMonthlyInterest);
    console.log('月供本金');
    console.log(everyMonthlyprincipal);
    console.log('剩余本金');
    console.log(residualPrincipal);




    for (var i = 0; i < months; i++) {
        var everyMonthlyprincipal_1 = everyMonthlyprincipal[i];
        var everyMonthlyInterest_1 = everyMonthlyInterest[i];
        var residualPrincipal_1 = residualPrincipal[i];
        //强制最后一期为0
        if (i == months - 1) {
            residualPrincipal_1 = 0.00
        }
        var item = {
            'itemId': i + 1,
            'monthlySupply': monthlySupply,
            'everyMonthlyprincipal': everyMonthlyprincipal_1,
            'everyMonthlyInterest': everyMonthlyInterest_1,
            'residualPrincipal': residualPrincipal_1
        }
        EqualPrincipalAndInterest.table[i] = item
    }
    console.log('等额本息')
    console.log(EqualPrincipalAndInterest)


    //显示结果页时四舍五入（EqualPrincipalAndInterest_1）

    var t_1 = EqualPrincipalAndInterest.totalRepayment.toFixed(2);
    var t_2 = EqualPrincipalAndInterest.loanAllMoney.toFixed(2);
    var t_3 = EqualPrincipalAndInterest.totalInterest.toFixed(2);

    var EqualPrincipalAndInterest_1 = {
        'totalRepayment': t_1,
        'loanAllMoney': t_2,
        'totalInterest': t_3,
        'months': months,
        'table': []
    };
    var m_1 = monthlySupply.toFixed(2)
    for (var i = 0; i < months; i++) {
        var a_1 = EqualPrincipalAndInterest.table[i].everyMonthlyprincipal.toFixed(2);
        var a_2 = EqualPrincipalAndInterest.table[i].everyMonthlyInterest.toFixed(2);
        var a_3 = EqualPrincipalAndInterest.table[i].residualPrincipal.toFixed(2);
        var item = {
            'itemId': i + 1,
            'monthlySupply': m_1,
            'everyMonthlyprincipal': a_1,
            'everyMonthlyInterest': a_2,
            'residualPrincipal': a_3
        }
        EqualPrincipalAndInterest_1.table[i] = item
    }
    console.log('等额本息')
    console.log(EqualPrincipalAndInterest_1)



    console.log('---------等额本金计算开始---------');
    //总利息(万)
    totalInterest = [(loanAllMoney / months + loanAllMoney * monthRate) + loanAllMoney / months * (1 + monthRate)] / 2 * months - loanAllMoney;
    console.log('总利息');
    console.log(totalInterest);
    //还款总额(万)
    totalRepayment = totalInterest + loanAllMoney;
    var equivalentPrincipal = {
        'totalRepayment': totalRepayment,
        'loanAllMoney': loanAllMoney,
        'totalInterest': totalInterest,
        'months': months,
        'table': []
    };
    //月供本金
    everyMonthlyprincipal = loanAllMoney * 10000 / months;
    console.log('月供本金');
    console.log(everyMonthlyprincipal);

    residualPrincipal = [];
    everyMonthlyInterest = [];
    monthlySupply = [];
    for (var i = 0; i < months; i++) {
        residualPrincipal[i] = loanAllMoney * 10000 - (i + 1) * everyMonthlyprincipal;
        if (i == 0) {
            everyMonthlyInterest[0] = loanAllMoney * 10000 * monthRate;
        } else {
            everyMonthlyInterest[i] = residualPrincipal[i - 1] * monthRate;

        }

        monthlySupply[i] = everyMonthlyprincipal + everyMonthlyInterest[i];
        var item = {
            'itemId': i + 1,
            'monthlySupply': monthlySupply[i],
            'everyMonthlyprincipal': everyMonthlyprincipal,
            'everyMonthlyInterest': everyMonthlyInterest[i],
            'residualPrincipal': residualPrincipal[i]
        }
        equivalentPrincipal.table[i] = item;
    }
    console.log('剩余本金')
    console.log(residualPrincipal)
    console.log('月供利息')
    console.log(everyMonthlyInterest)
    console.log('每月月供')
    console.log(monthlySupply)

    console.log('等额本金')
    console.log(equivalentPrincipal)


    //显示结果页时四舍五入（everyMonthlyprincipal_1）


    var dt_1 = totalRepayment.toFixed(2);
    //var dt_1 = Number.parseFloat(totalRepayment).toFixed(2);
    var dt_2 = totalInterest.toFixed(2);
    var dt_3 = loanAllMoney.toFixed(2)
    var everyMonthlyprincipal_1 = {
        'totalRepayment': dt_1,
        'loanAllMoney': dt_3,
        'totalInterest': dt_2,
        'months': months,
        'table': []
    }
    var b = everyMonthlyprincipal.toFixed(2)
    for (var i = 0; i < months; i++) {
        var b_1 = equivalentPrincipal.table[i].monthlySupply.toFixed(2);
        var b_2 = equivalentPrincipal.table[i].everyMonthlyInterest.toFixed(2);
        var b_3 = equivalentPrincipal.table[i].residualPrincipal.toFixed(2);
        var item_1 = {
            'itemId': i + 1,
            'monthlySupply': b_1,
            'everyMonthlyprincipal': b,
            'everyMonthlyInterest': b_2,
            'residualPrincipal': b_3
        }
        everyMonthlyprincipal_1.table[i] = item_1;
    }

    console.log(everyMonthlyprincipal_1)



    //页面初始化
    xr(EqualPrincipalAndInterest_1)

    //等额本息与等额本金的切换
    $('.result-nav ul li').on('click', function() {
        $('.result-nav ul li').removeClass('nav-selected')
        $(this).addClass('nav-selected')
        var a = $(this).find('span').html();
        if (a == '等额本息') {
            console.log('等额本息')
            // $('.explainBg-content span').html('每月还款金额不变')
            $('.explainBg-content').html('<span>每月还款金额不变</span>，其中还款的本金逐月递增，利息逐月递减，计算结果仅供参考。')
            xr(EqualPrincipalAndInterest_1)
        } else if (a = '等额本金') {
            console.log('等额本金')
            var a = everyMonthlyprincipal_1
            // $('.explainBg-content span').html('每月还款金额递减' + a.table[a.table.length - 1].everyMonthlyInterest + '元')
            $('.explainBg-content').html('<span>每月还款金额递减'+  a.table[a.table.length - 1].everyMonthlyInterest +'元</span>，其中还款的本金每月相同，利息逐月递减，计算结果仅供参考。')
            xr(everyMonthlyprincipal_1)

        }
    })


    //渲染页面
    function xr(res) {
        $('.totalRepayment-number span').html(res.totalRepayment)
        $('#result_loanAllMoney span').html(res.loanAllMoney)
        $('#result_totalInterest span').html(res.totalInterest)
        $('#result_monthsy span').html(res.months / 12)
        var str = '';
        for (var i = 0; i < res.table.length; i++) {
            str += '<tr>'
            str += '<td>' + res.table[i].itemId + '</td>'
            str += '<td>' + res.table[i].monthlySupply + '</td>'
            str += '<td>' + res.table[i].everyMonthlyprincipal + '</td>'
            str += '<td>' + res.table[i].everyMonthlyInterest + '</td>'
            str += '<td>' + res.table[i].residualPrincipal + '</td>'
            str += '</tr>'
        }
        $('tbody').html(str)
    }
})