$(document).ready(function(){
    $("#form_insert").validate({
        rules: {
            ma_gv: "required",
            ten_gv: "required",
            ngaysinh: "required",
            diachi: "required",
            trinhdo: "required",
            monhoc: "required"
        },
        messages: {
            ma_gv:"Bạn vui lòng nhập vào trường dữ liệu này.",
            ten_hs:"Bạn vui lòng nhập vào trường dữ liệu này.",
            ngaysinh:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diachi:"Bạn vui lòng nhập vào trường dữ liệu này.",
            trinhdo:"Bạn vui lòng nhập vào trường dữ liệu này.",
            monhoc:"Bạn vui lòng nhập vào trường dữ liệu này."
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
});
$(document).ready(function(){
    $("#form_update").validate({
        rules: {
            ma_gv: "required",
            ten_gv: "required",
            ngaysinh: "required",
            diachi: "required",
            trinhdo: "required",
            monhoc: "required"
        },
        messages: {
            ma_gv:"Bạn vui lòng nhập vào trường dữ liệu này.",
            ten_hs:"Bạn vui lòng nhập vào trường dữ liệu này.",
            ngaysinh:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diachi:"Bạn vui lòng nhập vào trường dữ liệu này.",
            trinhdo:"Bạn vui lòng nhập vào trường dữ liệu này.",
            monhoc:"Bạn vui lòng nhập vào trường dữ liệu này."
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
});
$(document).on("keyup","#kiemtra_insert",function(){
 var giatri_giaovien = $("#kiemtra_insert").val();
    if(giatri_giaovien.length >= 4)
    {
        $.ajax({
            async: false,
            type: "POST",
            url: "./giaovien/dkmagiaovien",
            data:{giatri_giaovien:giatri_giaovien},
            success: function(data){
                if(data == 1)
                {
                    Swal.fire(
                        'Thông báo !',
                        'Mã giáo viên '+giatri_giaovien+' '+'đã tồn tại'
                    );
                    $("#kiemtra_insert").val('');
                    $("#save_data_insert").attr("disabled","disabled");
                }else{
                    $("#save_data_insert").removeAttr("disabled");
                }
                
            },
            error: function(error){
                alert("Đã xãy ra lỗi: "+error);
            }
        });
    }
});
$(document).ready(function(){
    $('#Modalthem').on('hide.bs.modal', function () {
        $("#save_data_insert").removeAttr("disabled");
    });
    $('#Modalsua').on('hide.bs.modal', function () {
        $("#save_data_update").removeAttr("disabled");
    });
});
$(document).on("keyup","#kiemtra_update",function(){
    var giatri_giaovien = $("#kiemtra_update").val();
       if(giatri_giaovien.length >= 4)
       {
           $.ajax({
               async: false,
               type: "POST",
               url: "./giaovien/dkmagiaovien",
               data:{giatri_giaovien:giatri_giaovien},
               success: function(data){
                   if(data == 1)
                   {
                       Swal.fire(
                           'Thông báo !',
                           'Mã giáo viên '+giatri_giaovien+' '+'đã tồn tại'
                       );
                       $("#kiemtra_update").val('');
                       $("#save_data_update").attr("disabled","disabled");
                   }else{
                       $("#save_data_update").removeAttr("disabled");
                   }
                   
               },
               error: function(error){
                   alert("Đã xãy ra lỗi: "+error);
               }
           });
       }
   });
$(document).on("click",".edit",function(){
    var idgv = $(this).attr("idgv");
    $.ajax({
        async: false,
        type: "POST",
        url: "./giaovien/chitiet",
        data: {
            idgv:idgv,
        },
        success: function(response)
        {
            view_data(response);
            $("#Modalsua").appendTo("body").modal();
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
    $("#stt").val(data.stt);
    $("#kiemtra_update").val(data.ma_gv);
    $("#ten_gv").val(data.ten_gv);
    $("#gioitinh option[value="+data.gioitinh+"]").attr('selected','selected');
    $("#ngaysinh").val(data.ngaysinh_chitiet);
    $("#diachi").val(data.diachi);
    $("#trinhdo").val(data.trinhdo);
    $("#monhoc_api option[value="+data.id_mh+"]").attr('selected','selected');
}
$(document).on("click",".refresh",function(){
    location.reload();
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
$(document).on("click",".delete",function(){
    var id = $(this).attr("idgv");
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
               url: "./giaovien/delete",
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
    let sr,trang,day,nhomquyen;
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    day=$("#daysearch").val();
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./giaovien/search",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        day: day,
        sr :sr,
        trang : '1'
      },
      success:function(data)
      {
        $("#tb_model").replaceWith(data);
       }
    });
    $.ajax({
      url:"./giaovien/page",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        day: day,
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
    let sr,trang,day,nhomquyen;
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    day=$("#daysearch").val();;
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./giaovien/search",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        day: day,
        sr :sr,
        trang:'1'
      },
      success:function(data)
      {
        $("#tb_model").replaceWith(data)
       }
    });
    $.ajax({
      url:"./giaovien/page",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        day: day,
        sr :sr
      },
      success:function(data)
      {
        $("#page").replaceWith(data)
       }
    });
  });
  $(document).on("input","#daysearch",_.throttle(function(){
    let sr,trang,day,nhomquyen;
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    day=$("#daysearch").val();;
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./giaovien/search",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        day: day,
        sr :sr,
        trang:'1'
      },
      success:function(data)
      {
        $("#tb_model").replaceWith(data)
       }
    });
    $.ajax({
      url:"./giaovien/page",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        day: day,
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
      url:"./giaovien/search",
      method:"POST",
      data: {
        nhomquyen:nhomquyen,
        day: day,
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
  $(document).on("click",".btn_restore",function(){
    var dulieu = $(this).attr("idgv");
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
               url: "./giaovien/restore",
               data: {dulieu:dulieu},
               success: function(response){
                   if(response == "1")
                    {
                        Swal.fire(
                            'Bạn thực hiện thành công',
                            'Bạn đã chuyển dữ liệu vào danh sách',
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
    var id = $(this).attr("idgv");
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
               url: "./giaovien/deleteall",
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