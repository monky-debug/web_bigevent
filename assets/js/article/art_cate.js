$(function(){
    var layer=layui.layer;
    var form=layui.form;
    initArtCateList()
    function initArtCateList(){
        $.ajax({
            method:"GET",
            url:'/my/article/cates',
            success:function(res){
               // console.log(res);
               var htmlStr=template('tpl-table',res);
               $('tbody').html(htmlStr);
            }
        })
    }
    var indexAdd=null;
   $('#btnAddCate').on('click',function(){
      
    indexAdd=layer.open({
        title: '添加文章分类'
        ,content: $('#dialog-add').html()
      });     
        

   })
   $('body').on('submit','#form-add',function(e){
       e.preventDefault();
       $.ajax({
           method:'POST',
           url:'/my/article/addcates',
           data:$(this).serialize(),
           success:function(res){
               if(res.status!==0){
                   return layer.msg('添加文章分类失败');
               }
               layer.msg('添加文章分类成功');
               initArtCateList();
               layer.close(indexAdd);
           }
       })
       
   })
   var indexEdit=null;
   $('tbody').on('click','#btn-edit',function(e){
    e.preventDefault();
    indexEdit=layer.open({
        title: '修改文章分类'
        ,content: $('#dialog-edit').html()
      });
      var id=$(this).attr('data-id')
      $.ajax({
          method:'GET',
          url:'/my/article/cates/'+id,
          success:function(res){
              form.val('form-edit',res.data)
          }
      })
   })
   $('body').on('submit','#form-edit',function(e){
       e.preventDefault();
       $.ajax({
           method:'POST',
           url:'/my/article/updatecate',
           data:$(this).serialize(),
           success:function(res){
               if(res.status!==0){
                   return layer.msg('更新分类信息失败');
               }
               layer.msg('更新分类信息成功');
               layer.close(indexEdit);
               initArtCateList()

           }
       })

   })
   $('tbody').on('click','.btn-delete',function(){
      var id=$(this).attr('data-id');
      layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            method:'GET',
            url:'/my/article/deletecate/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('删除分章分类失败')
                }
                layer.msg('删除文章分类成功')
                layer.close(index);
                initArtCateList();

            }
        })
        
       
      });

   })
   
})