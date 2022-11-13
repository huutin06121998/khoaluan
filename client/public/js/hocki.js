$(document).ready(function(){
    $("#form_insert").validate({
        rules: {
            ma_hk: "required",
            ten_hk: "required",
            heso: "required"
        },
        messages: {
            ma_hk:"Bạn vui lòng nhập vào trường dữ liệu này.",
            ten_hk:"Bạn vui lòng nhập vào trường dữ liệu này.",
            heso:"Bạn vui lòng nhập vào trường dữ liệu này."
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
});
$(document).ready(function(){
    $("#form_update").validate({
        rules: {
            ma_hk: "required",
            ten_hk: "required",
            heso: "required"
        },
        messages: {
            ma_hk:"Bạn vui lòng nhập vào trường dữ liệu này.",
            ten_hk:"Bạn vui lòng nhập vào trường dữ liệu này.",
            heso:"Bạn vui lòng nhập vào trường dữ liệu này."
        },
        errorClass: "my-error-class",
        validClass: "my-valid-class"
    });
});
// Báo kí tự đặt biệt
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
$(document).on("keyup","#bat_event_so",function(){
    var so = $("#bat_event_so").val();
    if(so.length > 0)
    {
        if(so <= 0 || so > 2)
        {
            Swal.fire(
                'Thông báo !',
                'Hệ số học kỳ '+so+' '+'không hợp lệ (hệ số là 1 hoặc 2)'
            );
            $("#bat_event_so").val('')
            $("#luu_event").attr("disabled","disabled");
        }else{
            $("#luu_event").removeAttr("disabled");
        }
    }
    
});
$(document).on("keyup","#bat_event_sua",function(){
    var so = $("#bat_event_sua").val();
    if(so.length > 0)
    {
        if(so <= 0 || so > 2)
        {
            Swal.fire(
                'Thông báo !',
                'Hệ số học kỳ '+so+' '+'không hợp lệ (hệ số là 1 hoặc 2)'
            );
            $("#bat_event_sua").val('')
            $("#luu_event_sua").attr("disabled","disabled");
        }else{
            $("#luu_event_sua").removeAttr("disabled");
        }
    }
    
});
$(document).ready(function(){
    $('#Modalthem').on('hide.bs.modal', function () {
        $("#luu_event").removeAttr("disabled");
    });
    $('#Modalsua').on('hide.bs.modal', function () {
        $("#luu_event_sua").removeAttr("disabled");
    });
});
$(document).on("click",".edit",function(){
    var id_hk = $(this).attr("idhk");
    $.ajax({
        async: false,
        type: "POST",
        url: "./hocki/chitiet",
        data: {
            id_hk:id_hk,
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
    $("#idhk").val(data.stt);
    $("#ma_hk").val(data.ma_hk);
    $("#ten_hk").val(data.ten_hk);
    $("#bat_event_sua").val(data.heso);
} 
$(document).on("click",".delete",function(){
    var id = $(this).attr("idhk");
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
               url: "./hocki/delete",
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
$(document).on("click",".refresh",function(){
    location.reload();
});
$(document).on("keyup","#trungma_i",function(){
    var dulieu = $("#trungma_i").val();
    if(dulieu.length > 0)
    {
        $.ajax({
            async: false,
            type: "POST",
            url: "./hocki/dkhocki",
            data:{dulieu:dulieu},
            success: function(data){
                if(data == 1)
                {
                    Swal.fire(
                        'Thông báo !',
                        'Mã học kì '+dulieu+' '+'đã tồn tại'
                    );
                    $("#trungma_i").val('');
                    $("#luu_event").attr("disabled","disabled");
                }else{
                    $("#luu_event").removeAttr("disabled");
                }
                
            },
            error: function(error){
                alert("Đã xãy ra lỗi: "+error);
            }
        });
    }
});
$(document).on("keyup","#ma_hk",function(){
    var dulieu = $("#ma_hk").val();
    if(dulieu.length > 0)
    {
        $.ajax({
            async: false,
            type: "POST",
            url: "./hocki/dkhocki",
            data:{dulieu:dulieu},
            success: function(data){
                if(data == 1)
                {
                    Swal.fire(
                        'Thông báo !',
                        'Mã học kì '+dulieu+' '+'đã tồn tại'
                    );
                    // $("#ma_hk").val('');
                    $("#luu_event_sua").attr("disabled","disabled");
                }else{
                    $("#luu_event_sua").removeAttr("disabled");
                }
                
            },
            error: function(error){
                alert("Đã xãy ra lỗi: "+error);
            }
        });
    }
});
$(document).on("click",".btn_restore",function(){
    var dulieu = $(this).attr("idhp");
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
               url: "./hocki/restore",
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
    var id = $(this).attr("idhp");
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
               url: "./hocki/deleteall",
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