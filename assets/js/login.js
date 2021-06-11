$(function(){
    // 去注册盒子
    $('#link-reg').on('click',function(){
        // $(this).parent().hide().siblings('.reg-box').show();
        $('.reg-box').show();
        $('.login-box').hide();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    })
    // 去登录盒子
    $('#link-login').on('click',function(){
        // $(this).parent().hide().siblings('.login-box').show();    
        $('.login-box').show();
        $('.reg-box').hide();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    })
    var form=layui.form;
    var layer=layui.layer;
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
        ],
    repwd:function(value){
        var pwd=$('.reg-box [name=password]').val();
        if(pwd!==value){
            return '两次密码不一致'
        }

    }
    })
     // 监听注册表单的提交事件
     $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
          username: $('#form_reg [name=username]').val(),
          password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
          if (res.status !== 0) {
            layer.msg('res.message');
          }
          layer.msg('注册成功，请登录');
          $('#link-login').click();
        })
      })
    //   监听登录表单的提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    layer.msg('登录失败'); 
                }
                //console.log(res.token)
                layer.msg('登录成功');
                localStorage.setItem('token',res.token)
                location.href='./index.html'

            }
        })
    })


})