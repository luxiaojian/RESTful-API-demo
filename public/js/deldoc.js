(function(){
  $('.del').click(function(e){
    var target = $(e.target);
    var id = target.data('id');
    var tr = $('.item-id-'+id);
    $.ajax({
      type: 'DELETE',
      url:'/admin/docs/'+id
    })
      .done(function(result){
        if(result.success === 1){
          if(tr.length > 0){
            tr.remove();
            console.log('成功删除一个元素！');
          }
        }
      })
  });

})();