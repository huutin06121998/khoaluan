$(document).on("click",".btn_restore",function(){
    var dulieu = $(this).attr("idtkmh");
    Swal.fire({
        title: 'Thực hiện phục hồi dữ liệu này',
        type: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
        if (result.value) {
            $.ajax({
               async: false,
               type: "delete",
               url: "./tongketcacmonhoc/restore",
               data: {dulieu:dulieu},
               success: function(response){
                   if(response == "1")
                    {
                        Swal.fire(
                            'Bạn thực hiện thành công',
                            'Bạn đã phục hồi dữ liệu vào danh sách',
                            'success'
                        ).then(function(){
                            //reload
                            location.reload();
                        });
                    }
                   }
               ,
               error: function(xhr,ajaxOptions,thrownError){
                Swal.fire(
                    'Báo lỗi',
                    'Vui lòng kiểm tra lại đường truyền',
                    'danger'
                  ).then(function(){
                    location.reload();
                  });
               }
            });
        }
      })
  });
  $(document).on("click",".btn_delete",function(){ 
    var id = $(this).attr("idtkmh");
    Swal.fire({
        title: 'Bạn có chắc chắn xóa ?',
        text: "Bạn sẽ mất dữ liệu này !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
        if (result.value) {
            $.ajax({
               async: false,
               type: "delete",
               url: "./tongketcacmonhoc/deleteall",
               data: {id:id},
               success: function(response){
                   if(response == "1")
                    {
                        Swal.fire(
                            'Bạn đã xóa thành công',
                            'Bạn đã xóa dữ liệu khỏi danh sách',
                            'success'
                        ).then(function(){
                            //reload
                            location.reload();
                        });
                    }
                   }
               ,
               error: function(xhr,ajaxOptions,thrownError){
                Swal.fire(
                    'Báo lỗi',
                    'Vui lòng kiểm tra lại đường truyền',
                    'danger'
                  ).then(function(){
                    location.reload();
                  });
               }
            });
        }
      })
  });
  $(document).on("click",".delete",function(){
    var id = $(this).attr("idtkmh");
    Swal.fire({
        title: 'Bạn có chắc chắn xóa ?',
        text: "Bạn sẽ mất dữ liệu này !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
        if (result.value) {
            $.ajax({
               async: false,
               type: "delete",
               url: "./tongketcacmonhoc/delete",
               data: {id:id},
               success: function(response){
                   if(response == "1")
                    {
                        Swal.fire(
                            'Bạn đã xóa thành công',
                            'Bạn đã xóa dữ liệu khỏi danh sách',
                            'success'
                        ).then(function(){
                            //reload
                            location.reload();
                        });
                    }
                   }
               ,
               error: function(xhr,ajaxOptions,thrownError){
                Swal.fire(
                    'Báo lỗi',
                    'Vui lòng kiểm tra lại đường truyền',
                    'danger'
                  ).then(function(){
                    location.reload();
                  });
               }
            });
        }
      })
}); 
// Phân trang và tìm kiếm
$(document).on("input","#Search", _.throttle(function(){
    let sr,trang,nhomquyen;
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    day=$("#daysearch").val();
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./tongketcacmonhoc/search",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        sr :sr,
        trang : '1'
      },
      success:function(data)
      {
        $("#tb_model").replaceWith(data);
       }
    });
    $.ajax({
      url:"./tongketcacmonhoc/page",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        sr :sr,
        trang:'1'
      },
      success:function(data)
      {
        $("#page").replaceWith(data)
       }
    });
  },100));
  $(document).on("change","#nhomquyen",function (){
    let sr,trang,nhomquyen;
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    day=$("#daysearch").val();;
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./tongketcacmonhoc/search",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        sr :sr,
        trang:'1'
      },
      success:function(data)
      {
        $("#tb_model").replaceWith(data)
       }
    });
    $.ajax({
      url:"./tongketcacmonhoc/page",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        sr :sr
      },
      success:function(data)
      {
        $("#page").replaceWith(data)
       }
    });
  });
  $(document).on("input","#daysearch",_.throttle(function(){
    let sr,trang,nhomquyen;
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    day=$("#daysearch").val();;
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./tongketcacmonhoc/search",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        sr :sr,
        trang:'1'
      },
      success:function(data)
      {
        $("#tb_model").replaceWith(data)
       }
    });
    $.ajax({
      url:"./tongketcacmonhoc/page",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        sr :sr,
        trang:'1'
      },
      success:function(data)
      {
        $("#page").replaceWith(data)
       }
    });
  },100));
  $(document).on("click",".page", function (){
    let sr,trang,day,nhomquyen;
    day=$("#daysearch").val();
    $("#page-now").text($(this).text());
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    trang=$(this).text();
    sr=$('#Search').val();
    $.ajax({
      url:"./tongketcacmonhoc/search",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        sr :sr,
        trang : trang
      },
      success:function(data)
      {
        $("#tb_model").replaceWith(data)
      }
    }).then(function(){    
      var tranght = parseInt($("#page-now").text());
      $(".page").each(function(){
          var sotrang = parseInt($(this).text());
          if(tranght==parseInt($(this).text()))
          {
              $(this).addClass("btn-primary");
              $(this).removeClass("btn-default");
          }
          else
          {
            $(this).addClass("btn-default");
            $(this).removeClass("btn-primary");
          }
      })      
    })
  })
  
  $(document).on("click",".Next", function(){
      var trang_cuoi,tranght = parseInt($("#page-now").text());
      var tongsotrang = parseInt($("#tongtrang").text());
      $(".Previous").removeClass("hidden");
      $(".page").each(function(){
        trang_cuoi=parseInt($(this).text());
          var sotrang = parseInt($(this).text());
          $(this).text(parseInt(sotrang+5));
          if(tranght==parseInt($(this).text()))
          {
              $(this).addClass("btn-primary");
              $(this).removeClass("btn-default");
          }
          else
          {
            $(this).addClass("btn-default");
            $(this).removeClass("btn-primary");
          }
          if (parseInt($(this).text())>parseInt($("#tongtrang").text())) {
              $(this).addClass("hidden");
          }
      })
      if (trang_cuoi>=(parseInt($("#tongtrang").text())-5)) {
          $(".Next").addClass("hidden");
      }
  })
  
  $(document).on("click",".Previous",function(){
      var trang_cuoi,tranght = parseInt($("#page-now").text());
      $(".page").each(function(){
          var sotrang = parseInt($(this).text());
         $(this).text(parseInt($(this).text())-5);
         $(this).removeClass("hidden");
         if(tranght==parseInt($(this).text()))
            {
              $(this).addClass("btn-primary");
              $(this).removeClass("btn-default");
          }
          else
          {
              $(this).addClass("btn-default");
              $(this).removeClass("btn-primary");
          }
      })
      
      $(".Next").removeClass("hidden");
      if (trang_cuoi==1+5) {
          $(".Previous").addClass("hidden");
      }
  });
  $(document).on("keyup","input:text",function(){
    if(baokitudacbiet($(this).val()))
    {
        Swal.fire(
            'Báo lỗi!',
            'chuỗi bạn nhập có ký tự đặc biêt (/^[!@#$%^&*()...',
        )
  }
  });
  function baokitudacbiet(str)
  {
    var format = /^[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]*$/;
    if(str=='')
    {
        return false;
    }
    if(str.match(format)){
        return true;
    }else{
        return false;
    }
  }