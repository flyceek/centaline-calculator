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
    var loanAllMoney_1 = getNum('loanAllMoney_1');
    loanAllMoney_1 = Number.parseFloat(loanAllMoney_1)
    var months_1 = getNum('months_1');
    months_1 = Number.parseFloat(months_1)
    var monthRate_1 = getNum('monthRate_1');
    monthRate_1 = Number.parseFloat(monthRate_1)
    var loanAllMoney_2 = getNum('loanAllMoney_2');
    loanAllMoney_2 = Number.parseFloat(loanAllMoney_2)
    var months_2 = getNum('months_2');
    months_2 = Number.parseFloat(months_2)
    var monthRate_2 = getNum('monthRate_2');
    monthRate_2 = Number.parseFloat(monthRate_2)
    console.log('贷款本金(万)，期数，月利率');
    console.log(loanAllMoney_1, months_1, monthRate_1);
    console.log('贷款本金(万)，期数，月利率');
    console.log(loanAllMoney_2, months_2, monthRate_2);

    console.log('--------------等额本息计算开始---------------');
    var monthlySupply_1 = loanAllMoney_1 * 10000 * monthRate_1 * Math.pow(1 + monthRate_1, months_1) / (Math.pow(1 + monthRate_1, months_1) - 1)
    console.log('公积金月供');
    console.log(monthlySupply_1);
    var monthlySupply_2 = loanAllMoney_2 * 10000 * monthRate_2 * Math.pow(1 + monthRate_2, months_2) / (Math.pow(1 + monthRate_2, months_2) - 1)
    console.log('商业贷款每月月供');
    console.log(monthlySupply_2);
    //总利息=还款月数*每月月供-贷款金额
    var totalInterest = (monthlySupply_1 * months_1 - loanAllMoney_1 * 10000) / 10000 + (monthlySupply_2 * months_2 - loanAllMoney_2 * 10000) / 10000;
    console.log('总利息');
    console.log(totalInterest);
    //贷款本金
    var loanAllMoney = loanAllMoney_1 + loanAllMoney_2;
    console.log('贷款本金');
    console.log(loanAllMoney);
    //还款总额=总利息+贷款本金
    var totalRepayment = totalInterest + loanAllMoney;
    console.log('还款总额');
    console.log(totalRepayment);
    //贷款期限（取高的那个）
    var months = months_1 > months_2 ? months_1 : months_2;
    console.log('贷款期限（取高的那个）');
    console.log(months);
    //等额本息json数据
    var EqualPrincipalAndInterest = {
        'totalRepayment': totalRepayment,
        'loanAllMoney': loanAllMoney,
        'totalInterest': totalInterest,
        'months': months,
        'table': []
    };

    var gjj_monthlySupply = [];
    for (var i = 0; i < months_1; i++) {
        gjj_monthlySupply[i] = monthlySupply_1;
    }
    var sd_monthlySupply = [];
    for (var i = 0; i < months_2; i++) {
        sd_monthlySupply[i] = monthlySupply_2;
    }
    for (var i = 0; i < months; i++) {
        var monthlySupply_1;
        var monthlySupply_2;
        var totalMonthlySupply;
        if (i < months_1) {

            monthlySupply_1 = gjj_monthlySupply[i]
        } else {
            monthlySupply_1 = 0.00
        }
        if (i < months_2) {
            monthlySupply_2 = sd_monthlySupply[i]
        } else {
            monthlySupply_2 = 0.00
        }
        totalMonthlySupply = Number.parseFloat(monthlySupply_1) + Number.parseFloat(monthlySupply_2);
        var item = {
            'itemId': i + 1,
            'totalMonthlySupply': totalMonthlySupply,
            'monthlySupply_2': monthlySupply_2,
            'monthlySupply_1': monthlySupply_1,
        }
        EqualPrincipalAndInterest.table[i] = item;
    }
    console.log(EqualPrincipalAndInterest);

    //等额本息---渲染数据
    var t_1 = Number.parseFloat(totalRepayment).toFixed(2);
    var t_3 = Number.parseFloat(totalInterest).toFixed(2);
    var t_2 = Number.parseFloat(loanAllMoney).toFixed(2)
    var EqualPrincipalAndInterest_1 = {
        'totalRepayment': t_1,
        'loanAllMoney': t_2,
        'totalInterest': t_3,
        'months': months,
        'table': []
    };
    for (var i = 0; i < EqualPrincipalAndInterest.table.length; i++) {
        var m_1 = EqualPrincipalAndInterest.table[i].totalMonthlySupply.toFixed(2)
        var m_2 = EqualPrincipalAndInterest.table[i].monthlySupply_2.toFixed(2)
        var m_3 = EqualPrincipalAndInterest.table[i].monthlySupply_1.toFixed(2)
        var item = {
            'itemId': i + 1,
            'totalMonthlySupply': m_1,
            'monthlySupply_2': m_2,
            'monthlySupply_1': m_3
        }
        EqualPrincipalAndInterest_1.table[i] = item;
    }
    console.log(EqualPrincipalAndInterest_1)

    console.log('-------------等额本金计算开始--------------');
    totalInterest = [(loanAllMoney_1 / months_1 + loanAllMoney_1 * monthRate_1) + loanAllMoney_1 / months_1 * (1 + monthRate_1)] / 2 * months_1 - loanAllMoney_1 + [(loanAllMoney_2 / months_2 + loanAllMoney_2 * monthRate_2) + loanAllMoney_2 / months_2 * (1 + monthRate_2)] / 2 * months_2 - loanAllMoney_2
    console.log('总利息');
    console.log(totalInterest);
    totalRepayment = totalInterest + loanAllMoney
    console.log('还款总额');
    console.log(totalRepayment);
    var equivalentPrincipal = {
        'totalRepayment': totalRepayment,
        'loanAllMoney': loanAllMoney,
        'totalInterest': totalInterest,
        'months': months,
        'table': []
    };

    for (var i = 0; i < months; i++) {
        var monthlySupply_1;
        var monthlySupply_2;
        if (i <= months_1) {
            monthlySupply_1 = (loanAllMoney_1 * 10000 / months_1) + (loanAllMoney_1 * 10000 - loanAllMoney_1 * 10000 / months_1 * i) * monthRate_1
        } else {
            monthlySupply_1 = 0.00
        }
        if (i <= months_2) {
            monthlySupply_2 = (loanAllMoney_2 * 10000 / months_2) + (loanAllMoney_2 * 10000 - loanAllMoney_2 * 10000 / months_2 * i) * monthRate_2
        } else {
            monthlySupply_2 = 0.00
        }
        var totalMonthlySupply = monthlySupply_1 + monthlySupply_2;
        var item = {
            'itemId': i + 1,
            'totalMonthlySupply': totalMonthlySupply,
            'monthlySupply_2': monthlySupply_2,
            'monthlySupply_1': monthlySupply_1,
        }
        equivalentPrincipal.table[i] = item;
    }

    console.log(equivalentPrincipal);
    //每月递减 
    var monthlyMinus = loanAllMoney_1 * 10000 / months_1 * monthRate_1 + loanAllMoney_2 * 10000 / months_2 * monthRate_2;

    console.log('每月递减' + monthlyMinus);
    //等额本金渲染数据
    var s_1 = Number.parseFloat(totalRepayment).toFixed(2);
    var s_2 = Number.parseFloat(totalInterest).toFixed(2);
    var s_3 = Number.parseFloat(loanAllMoney).toFixed(2);
    var s_4 = Number.parseFloat(monthlyMinus).toFixed(2)
    var equivalentPrincipal_1 = {
        'monthlyMinus': s_4,
        'totalRepayment': s_1,
        'loanAllMoney': s_3,
        'totalInterest': s_2,
        'months': months,
        'table': []
    };

    for (var i = 0; i < equivalentPrincipal.table.length; i++) {
        var m_1 = Number.parseFloat(equivalentPrincipal.table[i].totalMonthlySupply).toFixed(2);
        var m_2 = Number.parseFloat(equivalentPrincipal.table[i].monthlySupply_2).toFixed(2);
        var m_3 = Number.parseFloat(equivalentPrincipal.table[i].monthlySupply_1).toFixed(2);
        var item = {
            'itemId': i + 1,
            'totalMonthlySupply': m_1,
            'monthlySupply_2': m_2,
            'monthlySupply_1': m_3,
        }
        equivalentPrincipal_1.table[i] = item;
    }
    console.log(equivalentPrincipal_1)











    //等额本息
    // var EqualPrincipalAndInterest_1 = getUrlParam('EqualPrincipalAndInterest_1')

    //等额本金
    //var equivalentPrincipal_1 = getUrlParam('equivalentPrincipal_1')

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
            var a = equivalentPrincipal_1
            var b = Number.parseFloat(a.monthlyMinus).toFixed(2)
            // $('.explainBg-content span').html('每月还款金额递减' + b + '元')
            $('.explainBg-content').html('<span>每月还款金额递减'+  b +'元</span>，其中还款的本金每月相同，利息逐月递减，计算结果仅供参考。')
            xr(equivalentPrincipal_1)

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
            str += '<td>' + res.table[i].totalMonthlySupply + '</td>'
            str += '<td>' + res.table[i].monthlySupply_2 + '</td>'
            str += '<td>' + res.table[i].monthlySupply_1 + '</td>'
            str += '</tr>'
        }
        $('tbody').html(str)
    }






})