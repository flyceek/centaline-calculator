$(function () {

    //公积金
    $('#showDatePicker').on('click', function () {
        $("body").css("overflow", "hidden");
        $("#birthPicker").show();
        $("#birthPicker_1").hide();
        $("#rateStylePicker_1").hide();
    })

    $('.okPicker,.canclePicker').on('click', function () {
        $("body").css("overflow", "auto");
    })


    //商贷
    $('#dk_showDaTe').on('click', function () {
        $("body").css("overflow", "hidden");
        $("#birthPicker").hide();
        $("#birthPicker_1").show();
        $("#rateStylePicker_1").hide();
    })
    $('#dk_showRate').on('click', function () {
        $("body").css("overflow", "hidden");
        $("#birthPicker").hide();
        $("#birthPicker_1").hide();
        $("#rateStylePicker_1").show();
    })

    //页面初始化
    activeBtn();
    init();




    function init() {
        var a = $('#pub_multiple').val();
        a = Number.parseFloat(a);
        var b = a * 3.1
        b = b.toFixed(2);
        $('#pub_loan_rateResult').html(b + '%');
        var c = $('#sd_lprNum').val();
        $('#sd_lpr').html(c + '%')
        c = Number.parseFloat(c)
        var d = $('#sd_jdNum').val();
        $('#sd_jd').html(d + '‱')
        d = Number.parseFloat(d) / 100;
        var e = c + d;
        e = e.toFixed(2)


        $('#sd_loan_rateResult_1').html(e + '%')


        //影藏头部

        var urlData = window.location.href;
        urlData = urlData.split('?')[1];
        if (urlData != undefined) {
            var href1 = $('.content-nav ul a:nth-child(1)').attr('href')
            console.log(href1 + '?' + urlData)
            $('.content-nav ul a:nth-child(1)').attr('href', href1 + '?' + urlData)
            var href2 = $('.content-nav ul a:nth-child(2)').attr('href')
            console.log(href2 + '?' + urlData)
            $('.content-nav ul a:nth-child(2)').attr('href', href2 + '?' + urlData)
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
    function canShu(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }



    //页面获取数

    //公积金--贷款总额
    $('#pub_loanAllMoney').on('input propertychange', function (event) {
        var pubLmMax=144;
        var pubLm = $('#pub_loanAllMoney').val();
        if (pubLm == ' ' || pubLm == null) {
            pubLm == ''
        }
        //判断是数字后
        if (!isNaN(pubLm)) {
            console.log('是数字')
            if (pubLm <= 0) {
                pubLm = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入>0的金额')
                setTimeout("$('.promptBox').hide()", 1000)
            } else if (pubLm > pubLmMax) {
                pubLm = pubLmMax;
                // $('#pub_loanAllMoney').val(120);
                $('.promptBox_1').show()
                $('.promptBox_1 span').html('目前上海公积金贷款金额上限'+pubLmMax+'万')
                setTimeout("$('.promptBox_1').hide()", 1000);
            } else {


                if (pubLm.indexOf('.') != -1) {
                    if (pubLm.split('.')[1].length > 2) {
                        pubLm = Number.parseFloat(pubLm).toFixed(2)
                    }
                }
            }

        } else {
            pubLm = ''
            $('.promptBox').show()
            $('.promptBox span').html('请输入>0的金额')
            setTimeout("$('.promptBox').hide()", 1000)

        }
        $('#pub_loanAllMoney').val(pubLm);
        activeBtn();
    })

    // $('#pub_loanAllMoney').on('change', function() {
    //     var pubLm = $('#pub_loanAllMoney').val();
    //     if (pubLm == ' ' || pubLm == null) {
    //         pubLm == ''
    //     }
    //     //判断是数字后
    //     if (!isNaN(pubLm)) {
    //         console.log('是数字')
    //         if (pubLm <= 0) {
    //             pubLm = ''
    //             $('.promptBox').show()
    //             $('.promptBox span').html('请输入>0的金额')
    //             setTimeout("$('.promptBox').hide()", 1000)
    //         } else if (pubLm > 120) {
    //             pubLm = 120;
    //             // $('#pub_loanAllMoney').val(120);
    //             $('.promptBox_1').show()
    //             $('.promptBox_1 span').html('目前上海公积金贷款金额上限120万')
    //             setTimeout("$('.promptBox_1').hide()", 1000);
    //         } else {


    //             if (pubLm.indexOf('.') != -1) {
    //                 if (pubLm.split('.')[1].length > 2) {
    //                     pubLm = Number.parseFloat(pubLm).toFixed(2)
    //                 }
    //             }
    //         }

    //     } else {
    //         pubLm = ''
    //         $('.promptBox').show()
    //         $('.promptBox span').html('请输入>0的金额')
    //         setTimeout("$('.promptBox').hide()", 1000)

    //     }
    //     $('#pub_loanAllMoney').val(pubLm);
    //     activeBtn();
    // })



    //公积金--上浮
    $('#pub_multiple').on('input propertychange', function () {
        var pubMul = $('#pub_multiple').val();
        if (pubMul == ' ' || pubMul == null) {
            pubMul == ''
        }
        //判断是否是数字
        if (!isNaN(pubMul)) {
            //是数字
            if (pubMul <= 0) {
                pubMul = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0且小于10的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (pubMul > 10) {
                    pubMul = 1
                    $('.promptBox').show()
                    $('.promptBox span').html('请输入大于0且小于10的数字')
                    setTimeout("$('.promptBox').hide()", 1000)
                } else {
                    if (pubMul.indexOf('.') != -1) {
                        if (pubMul.split('.')[1].length > 2) {
                            pubMul = Number.parseFloat(pubMul).toFixed(2)
                        }
                    }
                }

            }
        } else {
            //非数字
            pubMul = 1
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0且小于10的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }

        $('#pub_multiple').val(pubMul);
        $('#pub_loan_rateResult').html((pubMul * 3.1).toFixed(2) + '%')
        activeBtn();

    })


    //商业贷款--贷款总额
    $('#sd_loanAllMoney').on('input propertychange', function () {
        var sdlAm = $('#sd_loanAllMoney').val();
        if (sdlAm == ' ' || sdlAm == null) {
            sdlAm == ''
        }
        //判断是数字后
        if (!isNaN(sdlAm)) {
            console.log('是数字')
            if (sdlAm <= 0) {
                sdlAm = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入>0的金额')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {

                if (sdlAm.indexOf('.') != -1) {
                    if (sdlAm.split('.')[1].length > 2) {
                        sdlAm = Number.parseFloat(sdlAm).toFixed(2)
                    }
                }
            }

        } else {
            sdlAm = ''
            $('.promptBox').show()
            $('.promptBox span').html('请输入>0的金额')
            setTimeout("$('.promptBox').hide()", 1000)
        }
        $('#sd_loanAllMoney').val(sdlAm);
        activeBtn();
    })

    //商业贷款--旧版--折扣
    $('#sd_benchmark_num').on('input propertychange', function () {
        var sd_benchmark_num = $('#sd_benchmark_num').val();
        if (sd_benchmark_num == ' ' || sd_benchmark_num == null) {
            sd_benchmark_num == ''
        }
        //判断是否是数字
        if (!isNaN(sd_benchmark_num)) {
            //是数字
            if (sd_benchmark_num < 0) {
                sd_benchmark_num = 1
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (sd_benchmark_num.indexOf('.') != -1) {
                    if (sd_benchmark_num.split('.')[1].length > 2) {
                        sd_benchmark_num = Number.parseFloat(sd_benchmark_num).toFixed(2)
                    }
                }

            }
        } else {
            //非数字
            sd_benchmark_num = 1
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }

        $('#sd_benchmark_num').val(sd_benchmark_num);
        $('#sd_loan_rateResult').html(($('#sd_multiple').val() * sd_benchmark_num).toFixed(2) + '%');
        activeBtn();

    })


    $('#sd_multiple').on('input propertychange', function () {
        var sdMul = $('#sd_multiple').val();
        if (sdMul == ' ' || sdMul == null) {
            sdMul == ''
        }
        //判断是否是数字
        if (!isNaN(sdMul)) {
            //是数字
            if (sdMul < 0) {
                sdMul = 1
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0且小于10的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (sdMul > 10) {
                    sdMul = 1
                    $('.promptBox').show()
                    $('.promptBox span').html('请输入大于0且小于10的数字')
                    setTimeout("$('.promptBox').hide()", 1000)
                } else {
                    if (sdMul.indexOf('.') != -1) {
                        if (sdMul.split('.')[1].length > 2) {
                            sdMul = Number.parseFloat(sdMul).toFixed(2)
                        }
                    }
                }

            }
        } else {
            //非数字
            sdMul = 1
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0且小于10的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }

        $('#sd_multiple').val(sdMul);
        $('#sd_loan_rateResult').html((sdMul * $('#sd_benchmark_num').val()).toFixed(2) + '%');
        activeBtn();

    })


    //商贷--lpr
    $('#sd_lprNum').on('input propertychange', function () {
        var sdlpr = $('#sd_lprNum').val();
        if (sdlpr == ' ' || sdlpr == null) {
            sdlpr == ''
        }
        //判断是否是数字
        if (!isNaN(sdlpr)) {
            //是数字
            if (sdlpr <= 0) {
                sdlpr = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0且小于10的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (sdlpr > 10) {
                    sdlpr = 5
                    $('.promptBox').show()
                    $('.promptBox span').html('请输入大于0且小于10的数字')
                    setTimeout("$('.promptBox').hide()", 1000)
                } else {
                    if (sdlpr.indexOf('.') != -1) {
                        if (sdlpr.split('.')[1].length > 2) {
                            sdlpr = Number.parseFloat(sdlpr).toFixed(2)
                        }
                    }
                }

            }
        } else {
            //非数字
            sdlpr = 5
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0且小于10的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }

        $('#sd_lprNum').val(sdlpr);
        $('#sd_lpr').html(sdlpr + '%');

        if (sdlpr == '') {
            sdlpr = 0;
            $('#sd_lpr').html(sdlpr + '%')
        }


        var c_cal = (Number.parseFloat(sdlpr) + Number.parseFloat($('#sd_jd').html().split('‱')[0] / 100)).toFixed(2)
        $('#sd_loan_rateResult_1').html(c_cal + '%')

        activeBtn();


    })

    //商贷--基点增加/减少

    // $('#sd_up').on('click', function() {
    //     $('#sd_up').removeClass('down')
    //     $('#sd_up').addClass('up')
    //     $('#sd_down').removeClass('up')
    //     $('#sd_down').addClass('down')
    //     var jd = $('#sd_jdNum').html();
    //     jd = Number.parseInt(jd)
    //     jd += 1;
    //     console.log(jd)
    //     $('#sd_jdNum').html(jd);
    //     $('#sd_jd').html(jd + '‱')
    //     $('#sd_loan_rateResult_1').html((Number.parseFloat($('#sd_lpr').html().split('%')[0]) + Number.parseFloat($('#sd_jd').html().split('‱')[0] / 100)).toFixed(2) + '%')
    // })


    // $('#sd_down').on('click', function() {
    //     $('#sd_down').removeClass('down')
    //     $('#sd_down').addClass('up')
    //     $('#sd_up').removeClass('up')
    //     $('#sd_up').addClass('down')
    //     var jd = $('#sd_jdNum').html();
    //     jd = Number.parseInt(jd)
    //     if (jd == 0) {
    //         jd = 0
    //     } else {
    //         jd -= 1;
    //     }
    //     console.log(jd)
    //     $('#sd_jdNum').html(jd);
    //     $('#sd_jd').html(jd + '‱')
    //     $('#sd_loan_rateResult_1').html((Number.parseFloat($('#sd_lpr').html().split('%')[0]) + Number.parseFloat($('#sd_jd').html().split('‱')[0] / 100)).toFixed(2) + '%')
    // })


    $('#sd_jdNum').on('input propertychange', function () {
        console.log('1212')
        var dkJdNum = $('#sd_jdNum').val();
        if (dkJdNum == ' ' || dkJdNum == null) {
            dkJdNum = ''
        }
        console.log(dkJdNum)
        if (!isNaN(dkJdNum)) {
            //是数字
            if (Number.parseFloat(dkJdNum) > 1000) {
                console.log('>1000');
                dkJdNum = 0
                $('.promptBox').show()
                $('.promptBox span').html('最大数字不超过1000')
                setTimeout("$('.promptBox').hide()", 1000)

            } else if (0 <= Number.parseFloat(dkJdNum) <= 1000) {


                console.log('<0<1000');
                if (dkJdNum.length > 1) {
                    if (dkJdNum.indexOf('0') == 0 && dkJdNum.split('0')[1] != '.') {

                        dkJdNum = dkJdNum.split('0')[1]
                    }
                }
                if (dkJdNum.indexOf('.') != -1) {
                    $('#sd_jdNum').val(dkJdNum)
                    setTimeout(function () {
                        dkJdNum = Math.round(dkJdNum)
                        $('#sd_jdNum').val(dkJdNum)
                        $('#sd_jd').html(dkJdNum + '‱')
                    }, 500)


                }



            } else if (Number.parseFloat(dkJdNum) < 0) {

                console.log('<0');
                dkJdNum = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于或等于0的整数')
                setTimeout("$('.promptBox').hide()", 1000)
            }

        } else {
            //非数字
            dkJdNum = 0
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于或等于0的整数')
            setTimeout("$('.promptBox').hide()", 1000)
        }
        $('#sd_jdNum').val(dkJdNum)
        if (dkJdNum == '') {
            dkJdNum = 0
        }
        $('#sd_jd').html(dkJdNum + '‱')
        var a_cal = (Number.parseFloat($('#sd_lpr').html().split('%')[0]) + Number.parseFloat(dkJdNum) / 100).toFixed(2)
        $('#sd_loan_rateResult_1').html(a_cal + '%')
        activeBtn();
    })









    //组合--重新填写
    $('#pubAndSd_restart').on('click', function () {
        $('#pub_loanAllMoney').val('')
        $('#showDatePicker span').html('30年(360期)')
        $('#pub_multiple').val(1);
        $('#pub_loan_rateResult').html(3.1 + '%');
        $('#sd_loanAllMoney').val('');
        $('#dk_showRate span').html('LPR浮动利率');
        $('#sd_multiple').val(1);
        $('#sd_loan_rateResult').html(4.9 + '%')
        $('#sd_lprNum').val(4.2);
        $('#sd_jdNum').val(35)
        $('#sd_lpr').html(4.2 + '%');
        $('#sd_jd').html(35 + '‱')
        $('#sd_loan_rateResult_1').html((4.2 + 0.35).toFixed(2) + '%')
        $('#dk_sdRate').hide();
        $('#dk_lpr').show();
        $('#dk_jd').show();
        $('#dk_lprsdRate').show();
    })


    //判断贷款条件是否写完整的方法
    function activeBtn() {
        console.log('进入按钮颜色判断')
        var bl = false;

        var a = $('#dk_showRate span').html();
        if (a == '旧版本基准利率') {
            if ($('#pub_loanAllMoney').val() != null && $('#pub_loanAllMoney').val() != '' && $('#pub_multiple').val() != null &&
                $('#pub_multiple').val() != '' && $('#sd_loanAllMoney').val() != null && $('#sd_loanAllMoney').val() != '' && $('#sd_multiple').val() != null &&
                $('#sd_multiple').val() != '' && $('#sd_benchmark_num').val() != null && $('#sd_benchmark_num').val() != '') {
                bl = true
            }

        } else if (a == 'LPR浮动利率') {

            if ($('#sd_jdNum').val() != null && $('#sd_jdNum').val() != '' && $('#pub_loanAllMoney').val() != null && $('#pub_loanAllMoney').val() != '' && $('#pub_multiple').val() != null && $('#pub_multiple').val() != '' &&
                $('#sd_loanAllMoney').val() != null && $('#sd_loanAllMoney').val() != '' && $('#sd_lprNum').val() != null && $('#sd_lprNum').val() != '') {
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

    $('#calc').on('click', function () {

        //公积金--贷款总额
        var loanAllMoney_1 = $('#pub_loanAllMoney').val();
        //公积金--贷款期限
        var months_1 = $('#showDatePicker span').html().match(/(\S*)年/)[1] * 12;
        //公积金--利率
        var monthRate_1 = $('#pub_loan_rateResult').html().match(/(\S*)%/)[1] / 1200;
        //商贷--贷款总额
        var loanAllMoney_2 = $('#sd_loanAllMoney').val();
        //商贷--贷款期限
        var months_2 = $('#dk_showDaTe span').html().match(/(\S*)年/)[1] * 12;
        //商贷--利率
        var monthRate_2 = ''
        if ($('#dk_showRate span').html() == '旧版本基准利率') {
            monthRate_2 = $('#sd_loan_rateResult').html().match(/(\S*)%/)[1] / 1200;
        } else if ($('#dk_showRate span').html() == 'LPR浮动利率') {
            monthRate_2 = $('#sd_loan_rateResult_1').html().match(/(\S*)%/)[1] / 1200
        }



        activeBtn();

        //跳转页面
        if ($('#calc').hasClass('activeBtn')) {
            //window.location.href = 'result-portfolio.html?EqualPrincipalAndInterest_1=' + escape(JSON.stringify(EqualPrincipalAndInterest_1)) + '&equivalentPrincipal_1=' + escape(JSON.stringify(equivalentPrincipal_1));
            window.location.href = 'result-portfolio.html?loanAllMoney_1=' + loanAllMoney_1 + '&months_1=' + months_1 + '&monthRate_1=' + monthRate_1 + '&loanAllMoney_2=' + loanAllMoney_2 + '&months_2=' + months_2 + '&monthRate_2=' + monthRate_2;
        }





    })




})