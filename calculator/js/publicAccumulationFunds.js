$(function() {

    //按揭比例
    $('#showDatePicker').on('click', function() {
        $("body").css("overflow", "hidden");
        $("#birthPicker").show();
        $("#birthPicker_1").hide();
    })

    $('.okPicker,.canclePicker').on('click', function() {
        $("body").css("overflow", "auto");
    })
    $('.accordingType ul li').on('click', function() {
        $('.accordingType ul li').removeClass('accordingTypeSelected')
        $(this).addClass('accordingTypeSelected')
        if ($('.accordingTypeSelected span').html() == '根据按揭比例') {
            $('#aj_content').show();
            $('#dk_content').hide();
        } else if ($('.accordingTypeSelected span').html() == '根据贷款总额') {
            $('#aj_content').hide();
            $('#dk_content').show();
        }
        activeBtn();
    })

    //贷款总额
    $('#dk_showDaTe').on('click', function() {
        $("body").css("overflow", "hidden");
        $("#birthPicker").hide();
        $("#birthPicker_1").show();
    })

    //页面按钮初始化 

    activeBtn();
    init();

    function init() {
        //按揭
        var a = $('#aj_multiple').val();
        a = Number.parseFloat(a)
        var b = 3.1 * a;
        b = b.toFixed(2);
        $('#aj_loan_rateResult').html(b + '%');
        //贷款总额
        var c = $('#dk_multiple').val();
        c = Number.parseFloat(c);
        var d = 3.1 * c;
        d = d.toFixed(2);
        $('#dk_loan_rateResult').html(d + '%')

        //影藏头部
        var urlData = window.location.href;
        urlData = urlData.split('?')[1];
        if (urlData != undefined) {
            var href1 = $('.content-nav ul a:nth-child(1)').attr('href')
            console.log(href1 + '?' + urlData)
            $('.content-nav ul a:nth-child(1)').attr('href', href1 + '?' + urlData)
            var href3 = $('.content-nav ul a:nth-child(3)').attr('href')
            console.log(href3 + '?' + urlData)
            $('.content-nav ul a:nth-child(3)').attr('href', href3 + '?' + urlData)
        }

        var dataC = canShu('Source')
        console.log(dataC)
        if (dataC == null) {
            $('.index-titleBg').removeClass('marTop120')
        } else if (dataC == 'Android' || dataC == 'iOS') {
            $('.index-titleBg').addClass('marTop120')
        } else {
            $('.index-titleBg').removeClass('marTop120')
        }
    }


    //截取参数
    function  canShu(name)  { 
        var  reg  =  new  RegExp("(^|&)"  +  name  +  "=([^&]*)(&|$)",  "i");        
        var  r  =  window.location.search.substr(1).match(reg);        
        if  (r  !=  null) 
            return  unescape(r[2]);        
        return  null;    
    }







    //页面获取数据

    //按揭--房屋总价
    $('#aj_houseMoney').on('input propertychange', function() {
            var hmAll = $('#aj_houseMoney').val();
            // console.log(hmAll.split('.')[0])
            if (hmAll == ' ' || hmAll == null) {
                hmAll == ''
            }
            //判断是数字后
            if (!isNaN(hmAll)) {
                console.log('是数字')
                if (hmAll <= 0) {
                    hmAll = ''
                    $('.promptBox').show()
                    $('.promptBox span').html('贷款金额大于0万元')
                    setTimeout("$('.promptBox').hide()", 1000)
                } else {
                    if (hmAll.indexOf('.') != -1) {
                        if (hmAll.split('.')[1].length > 2) {
                            hmAll = Number.parseFloat(hmAll).toFixed(2)
                        }
                    }
                }

            } else {
                hmAll = ''
                $('.promptBox').show()
                $('.promptBox span').html('输入金额限>0的数字')
                setTimeout("$('.promptBox').hide()", 1000)

            }
            $('#aj_houseMoney').val(hmAll);
            //获取首付比例
            var fhRate = $('#first_houseRate').val();
            console.log(fhRate / 100)
            var loanAllMoneyMax=144;
            var loanAllMoney = hmAll * (1 - fhRate / 100);
            if (loanAllMoney <= loanAllMoneyMax) {
                loanAllMoney = loanAllMoney.toFixed(2)
                if (loanAllMoney == 0.00) {
                    loanAllMoney = ''
                }
            } else {
                loanAllMoney = loanAllMoneyMax;
                $('.promptBox_1').show()
                $('.promptBox_1 span').html('目前上海公积金贷款金额上限'+loanAllMoneyMax+'万')
                setTimeout("$('.promptBox_1').hide()", 1000)
            }
            $('#gjj_loanAllMoney').val(loanAllMoney);

            activeBtn();

        })
        //按揭--首付比例
    $('#first_houseRate').on('input propertychange', function() {
        //获取房屋总价
        var hmAll = $('#aj_houseMoney').val();
        var loanAllMoneyMax=144;
        console.log(hmAll);

        var fhRate = $('#first_houseRate').val();
        if (fhRate == ' ' || fhRate == null) {
            fhRate == ''
        }
        //判断是否是数字
        if (!isNaN(fhRate)) {
            //是数字
            if (fhRate <= 0) {
                fhRate = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else if (fhRate < 100) {
                if (fhRate.indexOf('.') != -1) {
                    if (fhRate.split('.')[1].length > 2) {
                        fhRate = Number.parseFloat(fhRate).toFixed(2)
                    }
                }

                if (hmAll != null || hmAll != '') {
                    var loanAllMoney = Number.parseFloat(hmAll) * (1 - (Number.parseFloat(fhRate) / 100));
                    if (!isNaN(loanAllMoney)) {
                        if (loanAllMoney <= loanAllMoneyMax) {
                            if (loanAllMoney < 0) {
                                loanAllMoney = 0;
                            } else {
                                loanAllMoney = loanAllMoney.toFixed(2);
                            }

                        } else {
                            $('.promptBox_1').show()
                            $('.promptBox_1 span').html('目前上海公积金贷款金额上限'+loanAllMoneyMax+'万')
                            console.log(hmAll);
                            setTimeout("$('.promptBox_1').hide()", 1000)
                            loanAllMoney = loanAllMoneyMax;
                        }
                        $('#gjj_loanAllMoney').val(loanAllMoney);
                    }
                }


            } else {
                fhRate = 35
                $('.promptBox').show()
                $('.promptBox span').html('首付比例应小于100%')
                setTimeout("$('.promptBox').hide()", 1000)
            }
        } else {
            //非数字
            fhRate = 35
            $('.promptBox').show()
            $('.promptBox span').html('输入限>0的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }
        $('#first_houseRate').val(fhRate);

        if (fhRate < 50) {
            //按首套算
            $('#aj_multiple').val(1)
            $('#aj_loan_rateResult').html(3.1 * 1 + '%')

        } else if (fhRate >= 50) {
            //按二套算
            $('#aj_multiple').val(1.1)
            $('#aj_loan_rateResult').html(3.1 * 1.1 + '%')

        }

        //获取房屋总价
        var hmAll = $('#aj_houseMoney').val();
        console.log(hmAll)
        if (hmAll != null && hmAll != '') {
            var loanAllMoney = Number.parseFloat(hmAll) * (1 - (Number.parseFloat(fhRate) / 100));
            console.log(loanAllMoney)
            if (loanAllMoney <= loanAllMoneyMax) {
                if (loanAllMoney < 0) {
                    loanAllMoney = 0;
                } else {
                    loanAllMoney = loanAllMoney.toFixed(2);
                }

            } else {
                // $('.promptBox_1').show()
                // $('.promptBox_1 span').html('目前上海公积金贷款金额上限120万')
                // setTimeout("$('.promptBox_1').hide()", 800)
                loanAllMoney = loanAllMoneyMax;
            }
            $('#gjj_loanAllMoney').val(loanAllMoney);
        }
        activeBtn();
    });

    //按揭--公积金贷款

    $('#gjj_loanAllMoney').on('input propertychange', function() {
        var lAmoneyMax=144;
        var lAmoney = $('#gjj_loanAllMoney').val();
        if (lAmoney == ' ' || lAmoney == null) {
            lAmoney == ''
        }
        //判断是数字后
        if (!isNaN(lAmoney)) {
            console.log('是数字')
            if (lAmoney < 0) {
                lAmoney = ''
                $('.promptBox').show()
                $('.promptBox span').html('贷款金额大于0万元')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (lAmoney.indexOf('.') != -1) {
                    if (lAmoney.split('.')[1].length > 2) {
                        lAmoney = Number.parseFloat(lAmoney).toFixed(2)
                    }
                }
            }
        } else {
            lAmoney = ''
            $('.promptBox').show()
            $('.promptBox span').html('输入金额限>0的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }

        if (lAmoney > lAmoneyMax) {
            $('.promptBox_1').show()
            $('.promptBox_1 span').html('目前上海公积金贷款金额上限'+lAmoneyMax+'万')
            setTimeout("$('.promptBox_1').hide()", 1000)
            lAmoney = lAmoneyMax
        }

        $('#gjj_loanAllMoney').val(lAmoney);

        activeBtn();

    })


    //按揭--公积金上浮
    $('#aj_multiple').on('input propertychange', function() {
        var ajMul = $('#aj_multiple').val();
        console.log(ajMul)
        if (ajMul == ' ' || ajMul == null) {
            ajMul == ''
        }
        //判断是否是数字
        if (!isNaN(ajMul)) {
            //是数字
            if (ajMul <= 0) {
                ajMul = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0且小于10的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (ajMul > 10) {
                    ajMul = 1
                    $('.promptBox').show()
                    $('.promptBox span').html('请输入大于0且小于10的数字')
                    setTimeout("$('.promptBox').hide()", 1000)
                } else {
                    if (ajMul.indexOf('.') != -1) {
                        if (ajMul.split('.')[1].length > 2) {
                            ajMul = Number.parseFloat(ajMul).toFixed(2)
                        }
                    }
                }

            }
        } else {
            //非数字
            ajMul = 1
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0且小于10的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }

        $('#aj_multiple').val(ajMul);
        $('#aj_loan_rateResult').html((3.1 * ajMul).toFixed(2) + '%')

        activeBtn();
    })


    //贷款--贷款总额

    $('#dk_loanALLMoney').on('input propertychange', function() {
        var dk_loanAllMoneyMax=144;
        var dk_loanAllMoney = $('#dk_loanALLMoney').val();
        console.log(dk_loanAllMoney)
        if (dk_loanAllMoney == null || dk_loanAllMoney == ' ') {
            dk_loanAllMoney = ''
        }
        if (!isNaN(dk_loanAllMoney)) {
            //是数字
            if (dk_loanAllMoney < 0) {
                dk_loanAllMoney = '';
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else if (dk_loanAllMoney > dk_loanAllMoneyMax) {
                dk_loanAllMoney = dk_loanAllMoneyMax;
                $('.promptBox_1').show()
                $('.promptBox_1 span').html('目前上海公积金贷款金额上限'+dk_loanAllMoneyMax+'万')
                setTimeout("$('.promptBox_1').hide()", 1000)
            } else {
                console.log(dk_loanAllMoney)
                if (dk_loanAllMoney.indexOf('.') != -1) {
                    if (dk_loanAllMoney.split('.')[1].length > 2) {
                        dk_loanAllMoney = Number.parseFloat(dk_loanAllMoney).toFixed(2)
                    }
                }
            }


        } else {
            //非数字
            dk_loanAllMoney = '';
            $('.promptBox').show()
            $('.promptBox span').html('输入限大于0的数字')
            setTimeout("$('.promptBox').hide()", 1000)

        }

        $('#dk_loanALLMoney').val(dk_loanAllMoney)
        activeBtn();
    })

    //贷款--公积金上浮

    $('#dk_multiple').on('input propertychange', function() {
        var dkMul = $('#dk_multiple').val();
        console.log(dkMul)
        if (dkMul == ' ' || dkMul == null) {
            dkMul == ''
        }
        //判断是否是数字
        if (!isNaN(dkMul)) {
            //是数字
            if (dkMul <= 0) {
                dkMul = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0且小于10的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (dkMul > 10) {
                    dkMul = 1
                    $('.promptBox').show()
                    $('.promptBox span').html('请输入大于0且小于10的数字')
                    setTimeout("$('.promptBox').hide()", 1000)
                } else {
                    if (dkMul.indexOf('.') != -1) {
                        if (dkMul.split('.')[1].length > 2) {
                            dkMul = Number.parseFloat(dkMul).toFixed(2)
                        }
                    }
                }

            }
        } else {
            //非数字
            ajMul = 1
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0且小于10的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }

        $('#dk_multiple').val(dkMul);
        $('#dk_loan_rateResult').html((3.1 * dkMul).toFixed(2) + '%')

        activeBtn();
    })



    //按揭--重新填写
    $('#aj_restart').on('click', function() {
        $('#aj_houseMoney').val('');
        $('#first_houseRate').val(35);
        $('#gjj_loanAllMoney').val('');
        $('#showDatePicker span').html('30年(360期)')
        $('#aj_multiple').val(1);
        $('#aj_loan_rateResult').html(3.1 + '%');
        activeBtn();
    })

    //贷款--重新填写
    $('#dk_restart').on('click', function() {
        $('#dk_loanALLMoney').val('');
        $('#dk_showDaTe span').html('30年(360期)')
        $('#dk_multiple').val(1);
        $('#dk_loan_rateResult').html(3.1 + '%');
        activeBtn();
    })



    function activeBtn() {
        console.log('进入按钮颜色判断')
        var bl = false;
        // var typeStyle = $('.accordingTypeSelected span').html();
        var typeStyle = '根据贷款总额';
        if (typeStyle == '根据按揭比例') {
            if ($('#gjj_loanAllMoney').val() != null && $('#gjj_loanAllMoney').val() != '' && $('#aj_houseMoney').val() != null && $('#aj_houseMoney').val() != '' && $('#first_houseRate').val() != null && $('#first_houseRate').val() != '' && $('#aj_multiple').val() != null && $('#aj_multiple').val() != '') {
                bl = true
            }
        } else if (typeStyle == '根据贷款总额') {
            if ($('#dk_loanALLMoney').val() != null && $('#dk_loanALLMoney').val() != '' && $('#dk_multiple').val() != null && $('#dk_multiple').val() != '') {
                bl = true
            }

        }

        if (bl) {
            $('#calc').addClass('activeBtn')
        } else {
            $('#calc').removeClass('activeBtn')
        }
    }


    //贷款计算

    $('#calc').on('click', function() {
        // var sdType = $('.accordingTypeSelected span').html()
        var sdType = '根据贷款总额'
        var loanAllMoney = '';
        var months = '';
        var monthRate = '';
        if (sdType == '根据按揭比例') {
            console.log('根据按揭比例');

            loanAllMoney = Number.parseFloat($('#gjj_loanAllMoney').val());
            //贷款期数(月份)
            months = $('#showDatePicker span').html().match(/(\S*)年/)[1] * 12;
            monthRate = $('#aj_loan_rateResult').html().match(/(\S*)%/)[1] / 1200;

        } else if (sdType == '根据贷款总额') {
            console.log('根据贷款总额');
            loanAllMoney = $('#dk_loanALLMoney').val();
            months = $('#dk_showDaTe span').html().match(/(\S*)年/)[1] * 12;
            monthRate = $('#dk_loan_rateResult').html().match(/(\S*)%/)[1] / 1200

        }
        activeBtn();

        //跳转页面
        if ($('#calc').hasClass('activeBtn')) {
            //window.location.href = 'result-indexOrPublic.html?EqualPrincipalAndInterest_1=' + escape(JSON.stringify(EqualPrincipalAndInterest_1)) + '&everyMonthlyprincipal_1=' + escape(JSON.stringify(everyMonthlyprincipal_1));
            window.location.href = 'result-indexOrPublic.html?loanAllMoney=' + loanAllMoney + '&monthRate=' + monthRate + '&months=' + months;
        }


    })
})