$(document).on('click','.button_view',function () {
    var malop = $(this).attr("malop_view");
    $.ajax({
          async: false,
          type: "post",
          url: "./ds_khoilop/data_showall",
          data:{
            malop:malop
            },
          success: function (response) {
            $("#tb_exp").replaceWith(response);          
          },
          error: function (xhr, ajaxOptions, thrownError) {
              alert("Xảy ra lỗi excel")
          }
        });
  })