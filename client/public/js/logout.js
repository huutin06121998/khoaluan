$(document).on("click",".logout",function(){
    Swal.fire({
      title: 'Bạn chắc chắn chứ?',
      text: "Bạn sẽ không vào được hệ thống sau khi đăng xuất !",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đăng xuất!'
    }).then((result) => {
      if (result.value) {
        window.location.href = "./logout";
      }
    })
  })