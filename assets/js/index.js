$(function(){
    getUserInfo()
    $('#btnLogOut').on('click',function(){
        var layer=layui.layer;
        layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='./login.html'
            layer.close(index);
          });
    })

})
// 获取用户信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''

        // },
        success:function(res){
           if(res.status!==0){
               return layui.layer.msg('获取用户信息失败');
           }
        //    渲染用户头像
           renderAvatar(res.data)
        },
        // complete:function(res){
        //     if(res.responseJSON.status==1&&res.responseJSON.message==='身份认证失败！')
        //     {
        //         localStorage.removeItem('token');
        //         location.href='./login.html'
        //     }

        // }
    })
}
function renderAvatar(user){
    // 获取用户名称
    var name=user.nickname||user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp'+name);
    // 渲染图片头像
 
    if(user.user_pic!==null){
        // 渲染图像头像
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();

    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first=name[0].toUpperCase();
        $('.text-avatar').html(first).show();

    }


}