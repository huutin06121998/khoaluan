$(document).ready(function(){
    $("#form_insert").validate({
        rules: {
            ma_lop: "required",
            ten_lop: "required",
        },
        messages: {
            ma_lop:"Bạn vui lòng nhập vào trường dữ liệu này.",
            ten_lop:"Bạn vui lòng nhập vào trường dữ liệu này.",
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
});
$(document).ready(function(){
    $("#form_update").validate({
        rules: {
            ma_lop: "required",
            ten_lop: "required",
        },
        messages: {
            ma_lop:"Bạn vui lòng nhập vào trường dữ liệu này.",
            ten_lop:"Bạn vui lòng nhập vào trường dữ liệu này.",
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
});
$(document).on("click",".refresh",function(){
location.reload();
});
$(document).on("click",".edit",function(){
    var id_lop = $(this).attr("id_lop");
    $.ajax({
        async: false,
        type: "POST",
        url: "./lop/chitiet",
        data: {
            id_lop:id_lop,
        },
        success: function(response)
        {
            view_data(response);
            $("#ModalUpdate").appendTo("body").modal();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            Swal.fire(
                'Báo lỗi!',
                'Không thể kích hoạt',
                'danger'
            )
        }
    })
});
function view_data(data)
{
    $("#id_lop").val(data.stt);
    $("#ma_lop").val(data.ma_lop);
    $("#ten_lop").val(data.ten_lop);
    $("#gvcn_u option[value="+data.ma_gv+"]").attr('selected','selected');
}
$(document).on("click",".delete",function(){
    var id_lop = $(this).attr("id_lop");
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
               url: "./lop/delete",
               data: {id_lop:id_lop},
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
//phân trang tìm kiếm
// Phân trang và tìm kiếm
$(document).on("input","#Search", _.throttle(function(){
    let sr,trang,nhomquyen;
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./lop/search",
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
      url:"./lop/page",
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
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./lop/search",
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
      url:"./lop/page",
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
  $(document).on("click",".page", function (){
    let sr,trang,nhomquyen;
    $("#page-now").text($(this).text());
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    trang=$(this).text();
    sr=$('#Search').val();
    $.ajax({
      url:"./lop/search",
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
            'chuổi bạn nhập có ký tự đặc biêt (/^[!@#$%^&*()...',
        )
    }
});
function baokitudacbiet(str)
{
    var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
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
$(document).on("click",".btn_restore",function(){
  var dulieu = $(this).attr("idlop");
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
             url: "./lop/restore",
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
  var id = $(this).attr("idlop");
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
             url: "./lop/deleteall",
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
$(document).on('keyup',"#malop_i",function(){
  var malop = $(this).val();
      if(malop.length > 1)
      {
      $.ajax({
          async: false,
          type: "POST",
          url: "./lop/chitiet_lop",
          data: {
            malop:malop
          },
          success: function(data)
          {
              if(data == 1)
              {
                  Swal.fire(
                      'Thông báo!',
                      'Mã lớp '+malop+' '+' đã tồn tại',
                  )
                  $("#luu_i").attr("disabled","disabled");
              }else{
                  $('#luu_i').removeAttr("disabled")
              }
          },
          error: function (xhr, ajaxOptions, thrownError) {
             console.log("Error: "+error);
          }
      })
  }
});
$(document).on('keyup',"#ma_lop",function(){
  var malop = $(this).val();
      if(malop.length > 1)
      {
      $.ajax({
          async: false,
          type: "POST",
          url: "./lop/chitiet_lop",
          data: {
            malop:malop 
          },
          success: function(data)
          {
              if(data == 1)
              {
                  Swal.fire(
                      'Thông báo!',
                      'Mã lớp '+malop+' '+' đã tồn tại',
                  )
                  $("#luu_u").attr("disabled","disabled");
              }else{
                  $('#luu_u').removeAttr("disabled")
              }
          },
          error: function (xhr, ajaxOptions, thrownError) {
             console.log("Error: "+error);
          }
      })
  }
});
$(document).ready(function(){
  $('#Modalthem').on('hide.bs.modal', function () {
      $("#luu_i").removeAttr("disabled");
  });
  $('#ModalUpdate').on('hide.bs.modal', function () {
      $("#luu_u").removeAttr("disabled");
  });
});