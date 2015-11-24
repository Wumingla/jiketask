$(function() {
    //点击登陆
    $("#loginbtn").on('click', login);
    //在密码行回车登陆
    $("#password").on('keydown', function(e) {
        if (e.keyCode === 13) {
            login();
        }
    });

    function login() {
        var user = $("#username").val();
        var password = $("#password").val();
        if (user.trim() == "") {
            alert('请输入用户名');
            $('#username').focus();
            return false;
        }
        if (password.trim() == "") {
            alert('请输入密码');
            $('#password').focus();
            return false;
        }
        $.ajax({
            url: "login.php",
            type: "POST",
            data: "user=" + user + "&password=" + password,
            success: function(data) {
                if (data) {
                    alert("登陆成功");
                    location.href = "backstage.html";
                } else {
                    alert("用户名或密码错误");
                    $('#username').focus();
                    $('#username').select();
                }
            }
        })
    }
});
