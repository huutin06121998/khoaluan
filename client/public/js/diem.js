//bắt lỗi và clean code
$(document).on("keyup","#mieng",function(){
    var giatri = $("#mieng").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#mieng").val('');
            $("#btn_insert").attr("disabled","disabled");
        }else{
            $("#btn_insert").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#15_1",function(){
    var giatri = $("#15_1").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#15_1").val('');
            $("#btn_insert").attr("disabled","disabled");
        }else{
            $("#btn_insert").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#15_2",function(){
    var giatri = $("#15_2").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#15_2").val('');
            $("#btn_insert").attr("disabled","disabled");
        }else{
            $("#btn_insert").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#15_3",function(){
    var giatri = $("#15_3").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#15_3").val('');
            $("#btn_insert").attr("disabled","disabled");
        }else{
            $("#btn_insert").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#1tiet_1",function(){
    var giatri = $("#1tiet_1").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#1tiet_1").val('');
            $("#btn_insert").attr("disabled","disabled");
        }else{
            $("#btn_insert").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#1tiet_2",function(){
    var giatri = $("#1tiet_2").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#1tiet_2").val('');
            $("#btn_insert").attr("disabled","disabled");
        }else{
            $("#btn_insert").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#d_thi",function(){
    var giatri = $("#d_thi").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#d_thi").val('');
            $("#btn_insert").attr("disabled","disabled");
        }else{
            $("#btn_insert").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#mieng_u",function(){
    var giatri = $("#mieng_u").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#mieng_u").val('');
            $("#btn_update").attr("disabled","disabled");
        }else{
            $("#btn_update").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#15_1_u",function(){
    var giatri = $("#15_1_u").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#15_1_u").val('');
            $("#btn_update").attr("disabled","disabled");
        }else{
            $("#btn_update").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#15_2_u",function(){
    var giatri = $("#15_2_u").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#15_2_u").val('');
            $("#btn_update").attr("disabled","disabled");
        }else{
            $("#btn_update").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#15_3_u",function(){
    var giatri = $("#15_3_u").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#15_3_u").val('');
            $("#btn_update").attr("disabled","disabled");
        }else{
            $("#btn_update").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#1tiet_1_u",function(){
    var giatri = $("#1tiet_1_u").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#1tiet_1_u").val('');
            $("#btn_update").attr("disabled","disabled");
        }else{
            $("#btn_update").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#1tiet_2_u",function(){
    var giatri = $("#1tiet_2_u").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#1tiet_2_u").val('');
            $("#btn_update").attr("disabled","disabled");
        }else{
            $("#btn_update").removeAttr("disabled");
        }
    }
});
$(document).on("keyup","#d_thi_u",function(){
    var giatri = $("#d_thi_u").val();
    if(giatri.length > 0)
    {
        if(giatri < 0 || giatri > 10)
        {
            Swal.fire(
                'Thông báo !',
                'Dữ liệu '+giatri+' '+'không hợp lệ!'
            );
            $("#d_thi_u").val('');
            $("#btn_update").attr("disabled","disabled");
        }else{
            $("#btn_update").removeAttr("disabled");
        }
    }
});
$(document).ready(function(){
    $('#Modalthem').on('hide.bs.modal', function () {
        $("#btn_insert").removeAttr("disabled");
    });
    $('#Modalsua').on('hide.bs.modal', function () {
        $("#btn_update").removeAttr("disabled");
    });
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
$(document).on("click",".refresh",function(){
 location.reload();
});
$(document).on("click",".view",function(){
 var dulieu = $(this).attr("iddiem");
    $.ajax({
        async: false,
        type: "POST",
        url: "./diem/chitiet_hhhh",
        data: {
            dulieu:dulieu,
        },
        success: function(response)
        {
            view_data(response);
            $("#view").appendTo("body").modal();
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
   $("#mahs_v").text(data.ma_hs).prop("disabled",true);
   $("#tenhs_v").text(data.ten_hs).prop("disabled",true);
   $("#tenmh_v").text(data.ten_mh).prop("disabled",true);
   $("#hk_v").text(data.ten_hk).prop("disabled",true);
   $("#namhoc_v").text(data.namhoc);
   $("#dm_v").text(data.diem_mieng).prop("disabled",true);
   $("#15p_1").text(data.diem15_1 == null ? 'Chưa cập nhật' : data.diem15_1).prop("disabled",true);
   $("#15p_2").text(data.diem15_2 == null ? 'Chưa cập nhật' : data.diem15_2).prop("disabled",true);
   $("#15p_3").text(data.diem15_3 == null ? 'Chưa cập nhật' : data.diem15_3).prop("disabled",true);
   $("#1t_1").text(data.diem1_t_1 == null ? 'Chưa cập nhật' : data.diem1_t_1).prop("disabled",true);
   $("#1t_2").text(data.diem1_t_2 == null ? 'Chưa cập nhật' : data.diem1_t_2).prop("disabled",true);
   $("#diemthi_v").text(data.diem_thi == null ? 'Chưa cập nhật' : data.diem_thi).prop("disabled",true);
   $("#diemtbm_v").text(data.dtb_m == null ? 'Chưa cập nhật' : data.dtb_m).prop("disabled",true);
}
$(document).ready(function(){
    $("#form_insert").validate({
        rules: {
            diemmieng: "required",
            diem15_1: "required",
            diem15_2: "required",
            diem15_3: "required",
            diem1tiet_1: "required",
            diem1tiet_2: "required",
            diemthi: "required",
            namhoc: "required"
        },
        messages: {
            diemmieng:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem15_1:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem15_2:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem15_3:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem1tiet_1:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem1tiet_2:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diemthi:"Bạn vui lòng nhập vào trường dữ liệu này.",
            namhoc: "Bạn vui lòng nhập vào trường dữ liệu này."
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
});
$(document).ready(function(){
    $("#form_update").validate({
        rules: {
            diemmieng: "required",
            diem15_1: "required",
            diem15_2: "required",
            diem15_3: "required",
            diem1tiet_1: "required",
            diem1tiet_2: "required",
            diemthi: "required",
            namhoc: "required"
        },
        messages: {
            diemmieng:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem15_1:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem15_2:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem15_3:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem1tiet_1:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diem1tiet_2:"Bạn vui lòng nhập vào trường dữ liệu này.",
            diemthi:"Bạn vui lòng nhập vào trường dữ liệu này.",
            namhoc: "Bạn vui lòng nhập vào trường dữ liệu này."
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
});
$(document).on("click",".edit",function(){
    var dulieu = $(this).attr("iddiem");
    $.ajax({
        async: false,
        type: "POST",
        url: "./diem/chitiet_hhhh",
        data: {
            dulieu:dulieu,
        },
        success: function(response)
        {
            insert_data(response);
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
function insert_data(data)
{
    $("#mahocsinh_u option[value="+data.ma_hs+"]").attr('selected','selected','readonly');
    $("#mamonhoc_u option[value="+data.id_mh+"]").attr('selected','selected');
    $("#hocki_u option[value="+data.ma_hk+"]").attr('selected','selected','readonly');
    $("#madiem").val(data.stt);
    $("#namhoc").val(data.namhoc);
    $("#mieng_u").val(data.diem_mieng);
    $("#15_1_u").val(data.diem15_1);
    $("#15_2_u").val(data.diem15_2);
    $("#15_3_u").val(data.diem15_3);
    $("#1tiet_1_u").val(data.diem1_t_1);
    $("#1tiet_2_u").val(data.diem1_t_2);
    $("#d_thi_u").val(data.diem_thi);
}
$(document).on("click",".delete",function(){
    var id = $(this).attr("iddiem");
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
               url: "./diem/delete",
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
/*$("#indiem").click(function () {
    $(".modal-header").hide();
    $(".modal-footer").hide();
    $(".modal-content").css('border','none');
    window.print();
    setTimeout(function () { 
        $(".modal-header").show();
        $(".modal-footer").show();
    }, 100);
}); */
// Phân trang và tìm kiếm
$(document).on("input","#Search", _.throttle(function(){
    let sr,trang,nhomquyen;
    nhomquyen=$("#nhomquyen").find(" :selected").val();
    day=$("#daysearch").val();
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./diem/search",
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
      url:"./diem/page",
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
      url:"./diem/search",
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
      url:"./diem/page",
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
      url:"./diem/search",
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
      url:"./diem/page",
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
      url:"./diem/search",
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
  $(document).on("click",".btn_restore",function(){
    var dulieu = $(this).attr("iddiem");
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
               url: "./diem/restore",
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
    var id = $(this).attr("iddiem");
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
               url: "./diem/deleteall",
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
  $(document).on("click",".result",function(){
    var tongmonhoc = $(this).attr("idmh");
    var tenhs = $(this).attr("tenhs");
    Swal.fire({
        title: 'Thực hiện tổng kết môn học cả năm',
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
               url: "./diem/result",
               data: {tongmonhoc:tongmonhoc,tenhs:tenhs},
               success: function(response){
                   if(response == "1")
                    {
                        Swal.fire(
                            'Bạn thực hiện thành công',
                            'Bạn đã tổng kết môn học',
                            'success'
                        ).then(function(){
                            //reload
                            location.reload();
                        });
                    }
                   }
               ,
               error: function(xhr,ajaxOptions,thrownError){
                    location.reload();
               }
            });
        }
      })
  });
//   Theo học kì
$(document).on("click",".result_hk",function(){
    var mahk = $(this).attr("mahk");
    var tenhs = $(this).attr("tenhs");
    Swal.fire({
        title: 'Thực hiện tổng kết môn học theo học kì ',
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
               url: "./diem/result_hk",
               data: {tenhs:tenhs,mahk:mahk},
               success: function(response){
                   if(response == "1")
                    {
                        Swal.fire(
                            'Bạn thực hiện thành công',
                            'Bạn đã tổng kết học kỳ',
                            'success'
                        ).then(function(){
                            //reload
                            location.reload();
                        });
                    }
                   }
               ,
               error: function(xhr,ajaxOptions,thrownError){
                    location.reload();
               }
            });
        }
      })
  });
  $(document).ready(function(){ 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#toTop').fadeIn(); 
        } else { 
            $('#toTop').fadeOut(); 
        } 
    }); 
    $('#toTop').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
 });
 $(document).ready(function() {
    $("#mahocsinh_i").change(function(){
        var dulieu =  $(this).val();
        if(dulieu != null)
        {
            $.ajax({
                async: false,
                type: "POST",
                url: "./diem/ktraselectoption",
                data: {
                    dulieu:dulieu,
                },
                success: function(response)
                {
                   if(response == "1"){
                    //    $("#mahocsinh_i").prop('disable',true);
                        Swal.fire(
                            'Thông báo',
                            'Dữ liệu học sinh này đã đủ',
                            'warning'
                        ).then(function(){
                            $("#mahocsinh_i option[value=" + dulieu + "]").hide();
                            $("#mahocsinh_i").prop("selectedIndex",-1);
                        });
                   }
                   if(response == "0"){
                        $("#mahocsinh_i option[value=" + dulieu + "]").removeClass("hidden");
                   }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    Swal.fire(
                        'Báo lỗi!',
                        'Không thể kích hoạt',
                        'danger'
                    )
                }
        });
        }
    });
});