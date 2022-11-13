$(document).ready(function() {
    $("#form_insert").validate({
        rules: {
            tentaikhoan:
            {
                required: true,
                minlength: 6
            },
            matkhau: 
            {
                required: true,
                minlength: 6
            },
            nhaplaipass:
            {
                required: true,
                minlength: 6,
                equalTo: "#matkhau"
            }
        },
        messages: {
            tentaikhoan:
            {
                required: "Bạn vui lòng nhập vào trường dữ liệu này",
                minlength: "kích thước tối thiểu là 6 kí tự"
            },
            matkhau: 
            {
                required: "Bạn vui lòng nhập vào trường dữ liệu này",
                minlength: "kích thước tối thiểu là 6 kí tự"
            },
            nhaplaipass: 
            {
                required: "Bạn vui lòng nhập vào trường dữ liệu này",
                minlength: "kích thước tối thiểu là 6 kí tự",
                equalTo: "Mật khẩu bạn nhập không khớp với nhau"
            }
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
    $("#formchange1").validate({
        rules: {
            changematkhau: 
            {
                required: true,
                minlength: 6
            },
            changematkhau2:
            {
                required: true,
                minlength: 6,
                equalTo: "#changematkhau1"
            }            
        },
        messages: {
            changematkhau: 
            {
                required: "Bạn vui lòng nhập vào trường dữ liệu này",
                minlength: "kích thước tối thiểu là 6 kí tự"
            },
            changematkhau2:
            {
                required: "Bạn vui lòng nhập vào trường dữ liệu này",
                minlength: "kích thước tối thiểu là 6 kí tự",
                equalTo: "Mật khẩu bạn nhập không khớp với nhau"
            } 
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
    $("#formchinhsua").validate({
        rules: {
            tentaikhoan:
            {
                required: true,
                minlength: 6
            } 
        },
        messages: {
            tentaikhoan:
            {
                required: "Bạn vui lòng nhập vào trường dữ liệu này",
                minlength: "kích thước tối thiểu là 6 kí tự"
            }
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
});
// Tài khoản trùng
$(document).on('keyup',"#tentaikhoan",function(){
    var tentk = $(this).val();
    trungtaikhoan(tentk);
        
});
$(document).on('keyup',"#u_tentaikhoan",function(){
    var tentk = $(this).val();
    trungtaikhoan(tentk);
});
function trungtaikhoan($tentk){
    var tentk = $tentk;
    if(tentk.length >= 6)
        {
        $.ajax({
            async: false,
            type: "POST",
            url: "./taikhoan/chitiet_taikhoan",
            data: {
                tentk:tentk
            },
            success: function(data)
            {
                if(data == 1)
                {
                    Swal.fire(
                        'Thông báo!',
                        'Tài khoản '+tentk+' '+' đã tồn tại',
                    )
                    $(".save_data").attr("disabled","disabled");
                }else{
                    $('.save_data').removeAttr("disabled")
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
               console.log("Error: "+error);
            }
        })
    }
}
$(document).ready(function(){
    $('#Modalthem').on('hide.bs.modal', function () {
        $(".save_data").removeAttr("disabled");
    });
    $('#ModalUpdate').on('hide.bs.modal', function () {
        $(".save_data").removeAttr("disabled");
    });
});
$(document).on("click",".refresh",function(){
    location.reload();
});
$(document).on("click",".change_password",function(){
    var id = $(this).attr("idtk");
    $.ajax({
        async: false,
        type: "POST",
        url: "./taikhoan/chitiet_change",
        data: {
            id:id
        },
        success: function(data)
        {
           $("#iduserchange").val(data.stt);
           $("#username_change").text(data.username == null ? "Không có" : data.username);
           $("#Modalchange").appendTo("body").modal();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            Swal.fire(
                'Báo lỗi!',
                'Không thể kích hoạt',
                'danger'
            )
        }
    })
    ;
});
$(document).on("click",".edit",function(){
    var id_sua = $(this).attr("idtk");
    $.ajax({
        async: false,
        type: "POST",
        url: "./taikhoan/chitiet",
        data: {
            id_sua:id_sua,
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
    $("#tk_hihi").text(data.username);
    $("#id_user_update").val(data.stt);
    $("#u_tentaikhoan").val(data.username);
    $("#quyen option[value="+data.quyen+"]").attr('selected','selected');
    if(data.image_avatar == "" || data.image_avatar == null || data.image_avatar == "noneimage.png")
    {
         $("#upload_up").find("#name_img_cu").attr("value","");
         $("#upload_up").find("#show_img").attr("src","/hinhanh/noneimage.png");
         $("#upload_up").find("#view_img").attr("idt","");
         $("#upload_up").find("#del_img").addClass("hidden");
    }else{
         $("#upload_up").find("#name_img_cu").attr("value",data.image_avatar);
         $("#upload_up").find("#show_img").attr("src","./hinhanh/"+data.image_avatar);
         $("#upload_up").find("#view_img").attr("idt",data.image_avatar)
         $("#upload_up").find("#del_img").removeClass("hidden")
    }
}
$(document).on("click",".delete",function(){
    var id = $(this).attr("idtk");
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
               url: "./taikhoan/delete",
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
$(document).on("click",".btn_restore",function(){
    var dulieu = $(this).attr("idtk");
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
               url: "./taikhoan/restore",
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
    var id = $(this).attr("idtk");
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
               url: "./taikhoan/deleteall",
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
    $("#page-now").text($(this).text());
    sr=$('#Search').val();
    $.ajax({
      url:"./taikhoan/search",
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
      url:"./taikhoan/page",
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
      url:"./taikhoan/search",
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
      url:"./taikhoan/page",
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
      url:"./taikhoan/search",
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
// Upload ảnh thêm
$(document).on('change','#upload_img',function(){
    let anhcu = $(this).parent().parent().parent().parent().parent()
    .find("#name_img").val();
      var file = this.files[0],
      fileName = file.name,
      fileSize = file.size||file.fileSize;
      var ext = fileName.split('.').pop().toLowerCase();
      var form_data = new FormData();
      var oFReader = new FileReader();
      oFReader.readAsDataURL(file);
      if(fileSize > 200000000)
      {
      alert("Image File Size is very big");
      }
      else
      {
        if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1) 
        {
          alert("Đây không phải là file ảnh");
        }
        else 
        {
            form_data.append("file",file);
            form_data.append("anhcu",anhcu);          
            $.ajax({
              url:"./upload/taikhoan_image",
              method:"POST",
              data: form_data,
              contentType: false,
              cache: false,
              processData: false,    
              context: this,
              beforeSend:function(){
              
              },   
              success:function(data)
              {
                if(data==0){
                  Swal.fire(
                      'Báo lỗi!',
                      'Không tải Được Ảnh',
                      'danger'
                  )
                }else{
                  $(this).parent().parent().parent().parent().parent().find("#name_img").attr("value",data);
                  $(this).parent().parent().parent().parent().parent().find("#show_img").attr("src","./hinhanh/"+data)
                  $(this).parent().parent().parent().parent().parent().find("#del_img").removeClass("hidden")
                }
                
              },
              error: function (xhr, ajaxOptions, thrownError) {
                  alert("Xảy ra lỗi2")
              }
            });
          
      }
      
    }
      
  })
// End upload ảnh thêm
// Upload sửa

// End Upload ảnh sửa
// Xóa ảnh
$(document).on("click","#del_img",function(){
    let loai=$(this).parent().parent().parent().attr('id');
    let anhcu= $(this).parent().parent().parent().parent().find("#name_img").attr("value"),
    anh_db= $(this).parent().parent().parent().parent().find("#name_img_cu").attr("value");
    if(anhcu||anh_db){
      Swal.fire({
          title: 'bạn có chắc chắn xóa ảnh này?',
          text: "bạn sẽ mất ảnh này này!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Đồng ý xóa!',
          cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
          if (result.value) {
          $.ajax({
          url:"./upload/taikhoan_image/del_file",
          method:"POST",
          data: {
            anhcu : anhcu,
            anh_db: anh_db
          },
          success:function(data)
          {
            if(data=='1')
             {
              swal.fire({
                  title: "Thông Báo",
                  text: "Xóa thành công",
                  icon: "success",
              }).then((result) => {              
                $("#"+loai).find("#name_img").attr("value","");
                $("#"+loai).find("#name_img_cu").attr("value","");
                $("#"+loai).find("#show_img").removeAttr("src");
                $("#"+loai).find("#view_img").removeAttr("idt");
                $("#"+loai).find("#del_img").addClass("hidden");
                $("#show_img").attr("src",'/hinhanh/noneimage.png');
                $("#upload_up").find("#show_img").attr("src","/hinhanh/noneimage.png");
              })
            }else{
              swal.fire({
                  title: "Thông Báo",
                  text: "Lỗi! Chưa Xóa Được",
                  icon: "error"
              })
            }
           }
        });
        }
      })
    }
  })
  $(document).ready(function(){
    $('#Modalthem').on('hide.bs.modal', function (e) {
        let anhcu= $(this).find("#name_img").attr("value");
        if(anhcu){
          $.ajax({
              url:"./upload/taikhoan_image/del_file",
              method:"POST",            
              context: this,
              data: {
                anhcu : anhcu
              },
              success:function (data) {
                $(this).find("#name_img").attr("value","");
                $(this).find("#show_img").removeAttr("src");
                $(this).find("#view_img").removeAttr("idt");
                $(this).find("#del_img").addClass("hidden");
                $("#show_img").attr("src",'/hinhanh/noneimage.png');
              }
            })
        }
      });
  });
    $(document).ready(function(){
        $('#ModalUpdate').on('hide.bs.modal', function (e) { 
            let anhcu= $(this).find("#name_img").attr("value");
            if(anhcu){
              $.ajax({
                  url:"./upload/taikhoan_image/del_file",
                  method:"POST",            
                  context: this,
                  data: {
                    anhcu : anhcu
                  },
                  success:function (data) {
                    $(this).find("#name_img").attr("value","");
                    $(this).find("#show_img").removeAttr("src");
                    $(this).find("#view_img").removeAttr("idt");
                    $(this).find("#del_img").addClass("hidden");
                    $("#show_img").attr("src",'/hinhanh/noneimage.png');
                  }
                })
            }
          });
    });