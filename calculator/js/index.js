$(function() {

    //按揭比例
    $('#showDatePicker').on('click', function() {
        $("body").css("overflow", "hidden");
        $("#birthPicker").show();
        $("#rateStylePicker").hide();
        $("#birthPicker_1").hide();
        $("#rateStylePicker_1").hide();
        $("#typePicker").hide();

    })
    $('#showTypePicker').on('click', function() {
        $("body").css("overflow", "hidden");
        $("#birthPicker").hide();
        $("#rateStylePicker").hide();
        $("#birthPicker_1").hide();
        $("#rateStylePicker_1").hide();
        $("#typePicker").show();

    })
    $('#showRateStyle').on('click', function() {
        $("body").css("overflow", "hidden");
        $("#birthPicker").hide();
        $("#rateStylePicker").show();
        $("#birthPicker_1").hide();
        $("#rateStylePicker_1").hide();
        $("#typePicker").hide();
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
        $("#rateStylePicker").hide();
        $("#birthPicker_1").show();
        $("#rateStylePicker_1").hide();
        $("#typePicker").hide();
    })

    $('#dk_showRate').on('click', function() {
        $("body").css("overflow", "hidden");
        $("#birthPicker").hide();
        $("#rateStylePicker").hide();
        $("#birthPicker_1").hide();
        $("#rateStylePicker_1").show();
        $("#typePicker").hide();
    })

    //页面初始化按钮
    activeBtn();
    init();





    function init() {
        //按揭
        var a = $('#aj_lprNum').val();
        a = Number.parseFloat(a)
        console.log(a);
        var b = $('#aj_jdNum').val();
        b = Number.parseFloat(b)
        console.log(b);
        $('#aj_sdlpr').html(a + '%');
        $('#aj_sdjd').html(b + '‱');
        $('#loan_rateResult_1').html((a + b / 100).toFixed(2) + '%');
        //贷款总额
        var c = $('#dk_lprNum').val();
        c = Number.parseFloat(c);
        var d = $('#dk_jdNum').val();
        d = Number.parseFloat(d)
        $('#dk_sdlpr').html(c + '%');
        $('#dk_sdjd').html(d + '‱');
        $('#dk_loan_rateResult_1').html((c + d / 100).toFixed(2) + '%');

        //影藏头部
        var urlData = window.location.href;
        urlData = urlData.split('?')[1];
        if (urlData != undefined) {
            var href2 = $('.content-nav ul a:nth-child(2)').attr('href')
            console.log(href2 + '?' + urlData)
            $('.content-nav ul a:nth-child(2)').attr('href', href2 + '?' + urlData)
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


    //页面信息处理

    //按揭页面获取数

    //房屋总价获取数
    $('#houseMoney').on('input propertychange', function() {
        var hmAll = $('#houseMoney').val();
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
        $('#houseMoney').val(hmAll);
        activeBtn();
    })

    //首付比例获取数
    $('#first_houseRate').on('input propertychange', function() {
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
                //首付比例《50

                if ($('#showDatePicker span').html().match(/(\S*)年/)[1] > 5) {
                    $('#aj_sdlpr').html(4.45 + '%')
                    $('#aj_lprNum').val(4.45)
                    $('#aj_jdNum').val(35)
                    $('#aj_sdjd').html(35 + '‱')
                    $('#loan_rateResult_1').html(4.45 + 0.35 + '%')
                } else if ($('#showDatePicker span').html().match(/(\S*)年/)[1] <= 5) {
                    $('#aj_sdlpr').html(3.7 + '%')
                    $('#aj_lprNum').val(3.7)
                    $('#aj_jdNum').val(0)
                    $('#aj_sdjd').html(0 + '‱')
                    $('#loan_rateResult_1').html(3.7 + 0 + '%')
                }


            } else if (fhRate >= 50) {

                if ($('#showDatePicker span').html().match(/(\S*)年/)[1] > 5) {
                    $('#aj_sdlpr').html(4.45 + '%')
                    $('#aj_lprNum').val(4.45)
                    $('#aj_jdNum').val(105)
                    $('#aj_sdjd').html(105 + '‱')
                    $('#loan_rateResult_1').html(4.45 + 1.05 + '%')
                } else if ($('#showDatePicker span').html().match(/(\S*)年/)[1] <= 5) {
                    $('#aj_sdlpr').html(3.7 + '%')
                    $('#aj_lprNum').val(3.7)
                    $('#aj_jdNum').val(0)
                    $('#aj_sdjd').html(0 + '‱')
                    $('#loan_rateResult_1').html(3.7 + 0 + '%')
                }

            }
            activeBtn();
        })
        //旧版本基准利率---商贷利率折扣
        $('#aj_benchmark_num').on('input propertychange', function() {
            var aj_benchmark_num = $('#aj_benchmark_num').val();
            if (aj_benchmark_num == ' ' || aj_benchmark_num == null) {
                aj_benchmark_num == ''
            }
            //判断是否是数字
            if (!isNaN(aj_benchmark_num)) {
                //是数字
                if (aj_benchmark_num < 0) {
                    aj_benchmark_num = 1
                    $('.promptBox').show()
                    $('.promptBox span').html('请输入大于0的数字')
                    setTimeout("$('.promptBox').hide()", 1000)
                } else {
                    if (aj_benchmark_num.indexOf('.') != -1) {
                        if (aj_benchmark_num.split('.')[1].length > 2) {
                            aj_benchmark_num = Number.parseFloat(aj_benchmark_num).toFixed(2)
                        }
                    }
                }
            } else {
                //非数字
                aj_benchmark_num = 1
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            }
    
            $('#aj_benchmark_num').val(aj_benchmark_num);
            $('#loan_rateResult').html(($('#aj_multiple').val() * aj_benchmark_num).toFixed(2) + '%')
            activeBtn();
        });

    $('#aj_multiple').on('input propertychange', function() {
        var ajMul = $('#aj_multiple').val();
        console.log(ajMul)
        if (ajMul == ' ' || ajMul == null) {
            ajMul == ''
        }
        //判断是否是数字
        if (!isNaN(ajMul)) {
            //是数字
            if (ajMul < 0) {
                ajMul = 1
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
        $('#loan_rateResult').html((ajMul * $('#aj_benchmark_num').val()).toFixed(2) + '%')
        activeBtn();
    });
    //lpr手动修改
    $('#aj_lprNum').on('input propertychange', function() {
        var ajLpr = $('#aj_lprNum').val();
        if (ajLpr == ' ' || ajLpr == null) {
            ajLpr = ''
        }
        if (!isNaN(ajLpr)) {
            //是数字
            if (ajLpr <= 0) {
                ajLpr = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0且小于10的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (ajLpr > 10) {
                    ajLpr = 4.45
                    $('.promptBox').show()
                    $('.promptBox span').html('请输入大于0且小于10的数字')
                    setTimeout("$('.promptBox').hide()", 1000)
                } else {
                    if (ajLpr.indexOf('.') != -1) {
                        if (ajLpr.split('.')[1].length > 2) {
                            ajLpr = Number.parseFloat(ajLpr).toFixed(2)
                        }
                    }
                }

            }

        } else {
            //非数字
            ajLpr = 4.45
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0且小于10的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }
        $('#aj_lprNum').val(ajLpr)
        $('#aj_sdlpr').html(ajLpr + '%')
        console.log('ajLpr')
        console.log(ajLpr)
        console.log($('#aj_sdjd').html().split('‱')[0] / 100)
        if (ajLpr == '') {
            ajLpr = 0;
            $('#aj_sdlpr').html(ajLpr + '%')
        }
        var a_cal = (Number.parseFloat(ajLpr) + $('#aj_sdjd').html().split('‱')[0] / 100).toFixed(2)
        $('#loan_rateResult_1').html(a_cal + '%')
        activeBtn();
    })


    //基点增加
    // $('#aj_up').on('click', function() {
    //     $('#aj_up').removeClass('down')
    //     $('#aj_up').addClass('up')
    //     $('#aj_down').removeClass('up')
    //     $('#aj_down').addClass('down')
    //     var jd = $('#aj_jdNum').html();
    //     jd = Number.parseInt(jd)
    //     jd += 1;
    //     console.log(jd)
    //     $('#aj_jdNum').html(jd);
    //     $('#aj_sdjd').html(jd + '‱')
    //     var a_cal = (Number.parseFloat($('#aj_sdlpr').html().split('%')[0]) + $('#aj_sdjd').html().split('‱')[0] / 100).toFixed(2)
    //     $('#loan_rateResult_1').html(a_cal + '%')

    // })


    // $('#aj_down').on('click', function() {
    //     $('#aj_down').removeClass('down')
    //     $('#aj_down').addClass('up')
    //     $('#aj_up').removeClass('up')
    //     $('#aj_up').addClass('down')
    //     var jd = $('#aj_jdNum').html();
    //     jd = Number.parseInt(jd)
    //     if (jd == 0) {
    //         jd = 0
    //     } else {
    //         jd -= 1;
    //     }
    //     console.log(jd)
    //     $('#aj_jdNum').html(jd);
    //     $('#aj_sdjd').html(jd + '‱')
    //     var a_cal = (Number.parseFloat($('#aj_sdlpr').html().split('%')[0]) + $('#aj_sdjd').html().split('‱')[0] / 100).toFixed(2)
    //     $('#loan_rateResult_1').html(a_cal + '%')
    // })

    $('#aj_jdNum').on('input propertychange', function() {
        console.log('1212')
        var ajJdNum = $('#aj_jdNum').val();
        if (ajJdNum == ' ' || ajJdNum == null) {
            ajJdNum = ''
        }
        if (!isNaN(ajJdNum)) {
            //是数字
            if (Number.parseFloat(ajJdNum) > 1000) {
                console.log('>1000');
                ajJdNum = 0
                $('.promptBox').show()
                $('.promptBox span').html('最大数字不超过1000')
                setTimeout("$('.promptBox').hide()", 1000)

            } else if (0 <= Number.parseFloat(ajJdNum) <= 1000) {
                console.log('<0<1000');
                if (ajJdNum.length > 1) {
                    if (ajJdNum.indexOf('0') == 0 && ajJdNum.split('0')[1] != '.') {
                        ajJdNum = ajJdNum.split('0')[1]
                    }
                }
                if (ajJdNum.indexOf('.') != -1) {
                    $('#aj_jdNum').val(ajJdNum)
                    setTimeout(function() {
                        ajJdNum = Math.round(ajJdNum)
                        $('#aj_jdNum').val(ajJdNum)
                        $('#aj_sdjd').html(ajJdNum + '‱')
                    }, 500)

                }



            } else if (Number.parseFloat(ajJdNum) < 0) {

                console.log('<0');
                ajJdNum = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于或等于0的整数')
                setTimeout("$('.promptBox').hide()", 1000)
            }

        } else {
            //非数字
            ajJdNum = 0
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于或等于0的整数')
            setTimeout("$('.promptBox').hide()", 1000)
        }
        $('#aj_jdNum').val(ajJdNum)
        if (ajJdNum == '') {
            ajJdNum = 0
        }
        $('#aj_sdjd').html(ajJdNum + '‱')
        var a_cal = (Number.parseFloat($('#aj_sdlpr').html().split('%')[0]) + Number.parseFloat(ajJdNum) / 100).toFixed(2)
        $('#loan_rateResult_1').html(a_cal + '%')
        activeBtn();
    })



    //重新填写--按揭
    $('#aj_restart').on('click', function() {
        $('#houseMoney').val('')
        $('#first_houseRate').val(35)
        $('#showDatePicker span').html('30年(360期)')
        $('#showRateStyle span').html('LPR浮动利率')
        $('#aj_multiple').val(1);
        $('#loan_rateResult').html(4.9 + '%')
        $('#aj_lprNum').val(4.45)
        $('#aj_jdNum').val(35)
        $('#aj_sdlpr').html(4.45 + '%')
        $('#aj_sdjd').html(35 + '‱')
        $('#loan_rateResult_1').html((4.45 + 0.35).toFixed(2) + '%')
        $('#aj_sdRate').hide();
        $('#aj_lpr').show();
        $('#aj_jd').show();
        $('#aj_lprsdRate').show();
        activeBtn();
    })





    //贷款总额页面
    //贷款总额判断
    $('#dk_loanAllMoney').on('input propertychange', function() {
        var dk_loanAllMoney = $('#dk_loanAllMoney').val();
        console.log(dk_loanAllMoney)
        if (dk_loanAllMoney == ' ' || dk_loanAllMoney == null) {
            dk_loanAllMoney = '';
        }
        if (!isNaN(dk_loanAllMoney)) {
            //是数字
            if (dk_loanAllMoney < 0) {
                dk_loanAllMoney = '';
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                console.log('进入的是这')
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
        $('#dk_loanAllMoney').val(dk_loanAllMoney)
        activeBtn();

    })

    //旧基准版本利率-商贷利率倍数

    $('#dk_benchmark_num').on('input propertychange', function() {
        var dk_benchmark_num = $('#dk_benchmark_num').val();
        if (dk_benchmark_num == ' ' || dk_benchmark_num == null) {
            dk_benchmark_num == ''
        }
        //判断是否是数字
        if (!isNaN(dk_benchmark_num)) {
            //是数字
            if (dk_benchmark_num < 0) {
                dk_benchmark_num = 1
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (dk_benchmark_num.indexOf('.') != -1) {
                    if (dk_benchmark_num.split('.')[1].length > 2) {
                        dk_benchmark_num = Number.parseFloat(dk_benchmark_num).toFixed(2)
                    }
                }

            }
        } else {
            //非数字
            dk_benchmark_num = 1
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }

        $('#dk_benchmark_num').val(dk_benchmark_num);
        $('#dk_loan_rateResult').html((dk_benchmark_num * $('#dk_multiple').val()).toFixed(2) + '%')
        activeBtn();

    })

    $('#dk_multiple').on('input propertychange', function() {
        var dkMul = $('#dk_multiple').val();
        if (dkMul == ' ' || dkMul == null) {
            dkMul == ''
        }
        //判断是否是数字
        if (!isNaN(dkMul)) {
            //是数字
            if (dkMul < 0) {
                dkMul = 1
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
            dkMul = 1
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0且小于10的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }

        $('#dk_multiple').val(dkMul);
        $('#dk_loan_rateResult').html(($('#dk_benchmark_num').val() * dkMul).toFixed(2) + '%')
        activeBtn();

    })

    //lpr手动修改
    $('#dk_lprNum').on('input propertychange', function() {
        var ajLpr = $('#dk_lprNum').val();
        if (ajLpr == ' ' || ajLpr == null) {
            ajLpr = ''
        }
        if (!isNaN(ajLpr)) {
            //是数字
            if (ajLpr <= 0) {
                ajLpr = ''
                $('.promptBox').show()
                $('.promptBox span').html('请输入大于0且小于10的数字')
                setTimeout("$('.promptBox').hide()", 1000)
            } else {
                if (ajLpr > 10) {
                    ajLpr = 5
                    $('.promptBox').show()
                    $('.promptBox span').html('请输入大于0且小于10的数字')
                    setTimeout("$('.promptBox').hide()", 1000)
                } else {
                    if (ajLpr.indexOf('.') != -1) {
                        if (ajLpr.split('.')[1].length > 2) {
                            ajLpr = Number.parseFloat(ajLpr).toFixed(2)
                        }
                    }
                }

            }

        } else {
            //非数字
            ajLpr = 5
            $('.promptBox').show()
            $('.promptBox span').html('请输入大于0且小于10的数字')
            setTimeout("$('.promptBox').hide()", 1000)
        }
        $('#dk_lprNum').val(ajLpr)
        $('#dk_sdlpr').html(ajLpr + '%')
        console.log(ajLpr)
        console.log($('#dk_sdjd').html().split('‱')[0])
        if (ajLpr == '') {
            ajLpr = 0;
            $('#dk_sdlpr').html(ajLpr + '%')
        }


        var b_cal = (Number.parseFloat(ajLpr) + $('#dk_sdjd').html().split('‱')[0] / 100).toFixed(2)
        console.log('b_cal' + b_cal)
        $('#dk_loan_rateResult_1').html(b_cal + '%')
        activeBtn();


    })

    //基点增加减少
    // $('#dk_up').on('click', function() {
    //     $('#dk_up').removeClass('down')
    //     $('#dk_up').addClass('up')
    //     $('#dk_down').removeClass('up')
    //     $('#dk_down').addClass('down')
    //     var dkJdNum = Number.parseInt($('#dk_jdNum').html());
    //     dkJdNum += 1;
    //     $('#dk_jdNum').html(dkJdNum)
    //     $('#dk_sdjd').html(dkJdNum + '‱')
    //     var b_cal = (Number.parseFloat($('#dk_sdlpr').html().split('%')[0]) + dkJdNum / 100).toFixed(2)
    //     $('#dk_loan_rateResult_1').html(b_cal + '%')

    // })
    // $('#dk_down').on('click', function() {
    //     $('#dk_down').removeClass('down')
    //     $('#dk_down').addClass('up')
    //     $('#dk_up').removeClass('up')
    //     $('#dk_up').addClass('down')
    //     var dkJdNum = Number.parseInt($('#dk_jdNum').html());
    //     if (dkJdNum == 0) {
    //         dkJdNum = 0;
    //     } else {
    //         dkJdNum -= 1;
    //     }

    //     $('#dk_jdNum').html(dkJdNum)
    //     $('#dk_sdjd').html(dkJdNum + '‱')
    //     var b_cal = (Number.parseFloat($('#dk_sdlpr').html().split('%')[0]) + dkJdNum / 100).toFixed(2)
    //     $('#dk_loan_rateResult_1').html(b_cal + '%')

    // });


    $('#dk_jdNum').on('input propertychange', function() {
        console.log('1212')
        var dkJdNum = $('#dk_jdNum').val();
        if (dkJdNum == ' ' || dkJdNum == null) {
            dkJdNum = ''
        }
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
                    $('#dk_jdNum').val(dkJdNum)
                    setTimeout(function() {
                        dkJdNum = Math.round(dkJdNum)
                        $('#dk_jdNum').val(dkJdNum)
                        $('#dk_sdjd').html(dkJdNum + '‱')
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
        $('#dk_jdNum').val(dkJdNum)
        if (dkJdNum == '') {
            dkJdNum = 0
        }
        $('#dk_sdjd').html(dkJdNum + '‱')
        var a_cal = (Number.parseFloat($('#aj_sdlpr').html().split('%')[0]) + Number.parseFloat(dkJdNum) / 100).toFixed(2)
        $('#dk_loan_rateResult_1').html(a_cal + '%')
        activeBtn();

    })



    //重新填写--贷款总额
    $('#dk_restart').on('click', function() {
        $('#dk_loanAllMoney').val('');
        $('#dk_showDaTe span').html('30年(360期)');
        $('#dk_showRate span').html('LPR浮动利率');
        $('#dk_multiple').val(1);
        $('#dk_loan_rateResult').html(4.9 + '%');
        $('#dk_lprNum').val(4.45);
        $('#dk_jdNum').val(35);
        $('#dk_sdlpr').html(4.45 + '%');
        $('#dk_sdjd').html(35 + '‱');
        $('#dk_loan_rateResult_1').html((4.45 + 0.35).toFixed(2) + '%')
        $('#dk_sdRate').hide();
        $('#dk_lpr').show();
        $('#dk_jd').show();
        $('#dk_lprsdRate').show();
        activeBtn();
    })


    //判断贷款条件是否写完整的方法
    function activeBtn() {
        console.log('进入按钮颜色判断')
        var bl = false;
        var typeStyle = $('.accordingTypeSelected span').html();
        if (typeStyle == '根据按揭比例') {
            console.log($('#houseMoney').val())
            var a = $('#showRateStyle span').html()
            if (a == '旧版本基准利率') {
                if ($('#houseMoney').val() != null && $('#houseMoney').val() != '' && $('#first_houseRate').val() != null && $('#first_houseRate').val() != '' && $('#aj_multiple').val() != null && $('#aj_multiple').val() != '' && $('#aj_benchmark_num').val() != null && $('#aj_benchmark_num').val() != '') {
                    bl = true
                }
            } else if (a == 'LPR浮动利率') {
                if ($('#aj_jdNum').val() != null && $('#aj_jdNum').val() != '' && $('#houseMoney').val() != null && $('#houseMoney').val() != '' && $('#first_houseRate').val() != null && $('#first_houseRate').val() != '' && $('#aj_lprNum').val() != null && $('#aj_lprNum').val() != '') {
                    bl = true
                }
            }


        } else if (typeStyle == '根据贷款总额') {
            var b = $('#dk_showRate span').html();
            if (b == '旧版本基准利率') {
                if ($('#dk_loanAllMoney').val() != null && $('#dk_loanAllMoney').val() != '' && $('#dk_multiple').val() != null && $('#dk_multiple').val() != ''  && $('#dk_benchmark_num').val() != null && $('#dk_benchmark_num').val() != '') {
                    bl = true
                }
            } else if (b == 'LPR浮动利率') {
                if ($('#dk_jdNum').val() != null && $('#dk_jdNum').val() != '' && $('#dk_loanAllMoney').val() != null && $('#dk_loanAllMoney').val() != '' && $('#dk_lprNum').val() != null && $('#dk_lprNum').val() != '') {
                    bl = true
                }
            }
        }

        if (bl) {
            $('#calc').addClass('activeBtn')
        } else {
            $('#calc').removeClass('activeBtn')
        }


    }


    //点击按钮进行等额本息和等额本金的计算

    $('#calc').on('click', function() {

        var sdType = $('.accordingTypeSelected span').html()
        var loanAllMoney = '';
        var months = '';
        var monthRate = '';



        if (sdType == '根据按揭比例') {
            console.log('根据按揭比例');


            //房屋总价
            var houseMoney = $('#houseMoney').val();
            //首付比例
            var first_houseRate = $('#first_houseRate').val() / 100;
            //贷款期数(月份)
            months = $('#showDatePicker span').html().match(/(\S*)年/)[1] * 12;
            //通过利率方式获得月利率

            if ($('#showRateStyle span').html() == '旧版本基准利率') {
                console.log(1);
                monthRate = $('#loan_rateResult').html().match(/(\S*)%/)[1] / 1200

            } else if ($('#showRateStyle span').html() == 'LPR浮动利率') {
                monthRate = $('#loan_rateResult_1').html().match(/(\S*)%/)[1] / 1200
            }

            //等额本息计算
            console.log('等额本息数据');
            //贷款总额(单位万)
            loanAllMoney = houseMoney * (1 - first_houseRate);

        } else if (sdType == '根据贷款总额') {
            console.log('根据贷款总额')
            loanAllMoney = $('#dk_loanAllMoney').val();
            months = $('#dk_showDaTe span').html().match(/(\S*)年/)[1] * 12;
            if ($('#dk_showRate span').html() == '旧版本基准利率') {
                monthRate = $('#dk_loan_rateResult').html().match(/(\S*)%/)[1] / 1200

            } else if ($('#dk_showRate span').html() == 'LPR浮动利率') {
                monthRate = $('#dk_loan_rateResult_1').html().match(/(\S*)%/)[1] / 1200
            }

        }

        activeBtn();

        //跳转页面
        if ($('#calc').hasClass('activeBtn')) {
            //window.location.href = 'result-indexOrPublic.html?EqualPrincipalAndInterest_1=' + escape(JSON.stringify(EqualPrincipalAndInterest_1)) + '&everyMonthlyprincipal_1=' + escape(JSON.stringify(everyMonthlyprincipal_1));
            window.location.href = 'result-indexOrPublic.html?loanAllMoney=' + loanAllMoney + '&monthRate=' + monthRate + '&months=' + months;
        }
    })





})