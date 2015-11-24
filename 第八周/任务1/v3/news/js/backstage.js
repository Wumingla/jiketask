$(function() {
    //检测登录状态
    (function() {
        var source = new EventSource('./user.php');
        var admin; //保存用户名
        source.onmessage = function(event) {
            if (event.data == "") {
                alert("请重新登陆");
                location.href = "login.html";
            } else if (admin !== event.data) {
                admin = event.data;
                loading(event.data);
            }
        };
    })()

    //加载全部数据
    function loading(data) {
        if (data != "") {
            $('#admin').html(data);
        }
        Data("backstage.php", "newsData=all", "GET", "json", function(d) {
            if (d[0] === 0) {
                alert(d[1]);
            } else {
                addData(d[1]);
            }
        }, function(event, request, settings) {
            alert(settings.message);
        });
    }

    // 左侧导航
    $('.leftNet').each(function(index, value) {
        $(this).on('click', function() {
            leftSwitch($(this), index);
        })
    });

    //退出登录
    $('#outLogin').on('click', function(e) {
        e.preventDefault();
        Data('login.php', "login=out", "GET", "", function() {
            location.href = "login.html";
        });
    });

    // 新闻内容右侧修改按钮
    $('#newsTable').on('click', '.glyphicon-pencil', function() {
        var str = "dataId=" + $(this).attr("data-id");
        Data("backstage.php", str, "GET", "json", function(d) {
            if (d[0] === 0) {
                alert(d[1]);
            } else {
                addUpdata(d[1][0]);
            }
        })
        leftSwitch($('.leftNet').eq(2), 2);
    });

    $('#newsTable').on('click', '.glyphicon-remove', function() {
        var id = $(this).attr("data-id")
        var str = "delete=" + id;
        Data("updata.php", str, "post", "json", function(d) {
            if (d[0] === 0) {
                alert(d[1]);
            } else {
                $("tr[data-id=" + id + "]").fadeOut("slow");
            }
        })
    });

    // 插入数据
    var fileUpdata1 = {
        fileInput: $("#newsimg").get(0), //Html  file控件
        fileArea: $("#file-area .file-img-area").get(0), //文件所在区域
        inputSub: $("#insert-btn").get(0), //文件上传按钮
        url: $("#form").attr("action"), //文件上传的地址
        checkFile: function() {
            if ($("#newstitle").val() == "") {
                alert("请输入标题");
                $("#newstitle").focus();
                return false;
            } else if ($("#newscontent").val() == "") {
                alert("请输入新闻内容");
                $("#newscontent").focus();
                return false;
            } else {
                return true;
            }
        },
        addFilesFilter: function() {
            var formData = new FormData();
            formData.append("newstitle", $("#newstitle").val());
            formData.append("newscontent", $("#newscontent").val());
            formData.append("headlines", $("#headlines").val());
            for (var i = 0, file; file = this.filesFilter[i]; i++) {
                formData.append('file[]', file, file.name);
            }
            this.updateFile(formData);
        }
    };

    //修改数据
    var fileUpdata2 = {
        fileInput: $("#newsimg1").get(0), //Html  file控件
        fileArea: $("#file-area1 .file-img-area").get(0), //文件所在区域
        inputSub: $("#updataBtn").get(0),
        url: $("#form1").attr("action"), //文件上传的地址
        checkFile: function() {
            if ($("#newstitle1").val() == "") {
                alert("请输入标题");
                $("#newstitle1").focus();
                return false;
            } else if ($("#newscontent1").val() == "") {
                alert("请输入新闻内容");
                $("#newscontent1").focus();
                return false;
            } else {
                return true;
            }
        },
        addFilesFilter: function() {
            var formData = new FormData();
            formData.append("newstitle", $("#newstitle1").val());
            formData.append("newscontent", $("#newscontent1").val());
            formData.append("headlines", $("#headlines1").val());
            var imgStr = "";
            $("#file-area1 img").each(function() {
                if ($(this).attr("data-index") >= 3) {
                    imgStr += $(this).attr("src") + ",";
                }
            });
            formData.append("newsimg", imgStr);
            formData.append("dataId", $("#newstitle1").attr("data-id"));
            for (var i = 0, file; file = this.filesFilter[i]; i++) {
                formData.append('file[]', file, file.name);
            }
            this.updateFile(formData);
        }
    };

    var fileUpFun = {
        getFile: function(files) {
            var filesArr = [];
            var num = 0;
            var fileAreaC = $(this.fileArea).children();
            if (fileAreaC.length > 0) {
                fileAreaC.each(function() {
                    if ($(this).attr("data-index") >= 3) {
                        num++;
                    }
                });
            }
            for (var i = 0; i < files.length; i++) {
                if (this.filesFilter.length + i + num > 2) {
                    alert("只能上传3张");
                    break;
                }
                if (files[i].type.indexOf("image") === 0) {
                    if (files[i].size <= 5120000) {
                        filesArr.push(files[i]);
                    } else {
                        alert(files[i].name + "  文件太大");
                    }
                } else {
                    alert(files[i].name + "  不是图片");
                }
            }
            return filesArr;
        },
        addHtml: function(files) {
            var __self = this;
            var fileReader = new FileReader();
            var i = 0;
            var fileAreaC = $(this.fileArea).children();
            if (fileAreaC.length > 0) {
                fileAreaC.each(function() {
                    if ($(this).attr("data-index") < 3) {
                        $(this).remove();
                    }
                });
            }

            (function add() {
                var file = files[i];
                if (file) {
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        var imgContent = $("<div>").addClass("imgContent").attr("data-index", file.dataIndex).appendTo(__self.fileArea);
                        $("<img>").attr({
                            "src": e.target.result,
                            "data-index": file.dataIndex
                        }).appendTo(imgContent);
                        var imgInfo = $("<div>").addClass("imgInfo").appendTo(imgContent);
                        $("<span>").addClass("img-name").html(file.name).appendTo(imgInfo);
                        $("<span>").addClass("img-delete").attr("data-index", file.dataIndex).html("删除").appendTo(imgInfo);
                        i++;
                        add();
                    }
                } else {
                    $(".img-delete").on('click', function() {
                        __self.deleteImg($(this).attr("data-index"));
                    })
                }
            })();
        },
        removeImg: function(index) {
            $(".imgContent[data-index=" + index + "]").remove();
        },
        fileDragEnter: function() {
            $(this).addClass("img-drop-area");
        },
        fileDragLeave: function() {
            $(this).removeClass("img-drop-area");
        },
        seccessFun: function() {
            Data("backstage.php", "newsData=all", "GET", "json", function(d) {
                if (d[0] === 0) {
                    alert(d[1]);
                } else {
                    $('#newsTable tr').each(function() {
                        if ($(this).attr("data-id") != "") {
                            $(this).remove();
                        }
                    })
                    var fileArea = $(".file-img-area");
                    fileArea.children().each(function() {
                        $(this).remove();
                    });
                    $('#form')[0].reset();
                    $('#form1')[0].reset();
                    addData(d[1]);
                    leftSwitch($('.leftNet').eq(0), 0);
                }
            }, function(event, request, settings) {
                alert(settings.message);
            });
        }
    };

    var insertData = $.extend({}, FileUpdate, fileUpdata1, fileUpFun);
    insertData.init();

    var updataData = $.extend({}, FileUpdate, fileUpdata2, fileUpFun);
    updataData.init();

})


//ajax请求
function Data(url, data, type, dataType, suc, err) {
    var argumentNum = arguments.length;
    $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: dataType,
        success: function(data) {
            if (argumentNum >= 5) {
                suc(data);
            }
        },
        error: function(event, request, settings) {
            if (argumentNum >= 6) {
                err(event, request, settings);
            }
        }
    })
}

// 获取数据，放入html
function addData(data) {
    for (var i = 0; i < data.length; i++) {
        var tr = $('<tr>').attr("data-id", data[i].newsid).appendTo($('#newsTable'));
        $('<td>').html(data[i].newsid).appendTo(tr);
        $('<td>').html(data[i].newstitle).appendTo(tr);
        $('<td>').html(data[i].headlines).appendTo(tr);
        $('<td>').html(data[i].newscontent.slice(0, 40) + "...").appendTo(tr);
        $('<td>').html(data[i].addtime).appendTo(tr);
        var td = $('<td>');
        $("<span>").addClass("glyphicon glyphicon-remove").attr({
            "aria-hidden": "true",
            "data-id": data[i].newsid
        }).appendTo(td);
        $("<span>").addClass("glyphicon glyphicon-pencil").attr({
            "aria-hidden": "true",
            "data-id": data[i].newsid
        }).appendTo(td);
        td.appendTo(tr);
    }
}


// 获取数据，放入修改数据
function addUpdata(data) {
    $("#newstitle1").val(data["newstitle"]).attr("data-id", data["newsid"]);
    $("#newscontent1").val(data["newscontent"]);
    $("#headlines1").val(data["headlines"]);
    var fileArea = $("#file-area1 .file-img-area");
    fileArea.children().each(function() {
        $(this).remove();
    });
    if (data['newsimg'] !== "") {
        var imgArr = data['newsimg'].split(',');
        imgArr = clearArr(imgArr);
        for (var i = 0; i < imgArr.length; i++) {
            if (i < 3) {
                var dataIndex = i + 3;
                var imgContent = $("<div>").addClass("imgContent").attr("data-index", dataIndex).appendTo(fileArea);
                $("<img>").attr({
                    "src": imgArr[i],
                    "data-index": dataIndex
                }).appendTo(imgContent);
                var imgInfo = $("<div>").addClass("imgInfo").appendTo(imgContent);
                $("<span>").addClass("img-delete").attr("data-index", dataIndex).html("删除").appendTo(imgInfo);
            }
        }
        $(".img-delete").on('click', function() {
            var index = $(this).attr("data-index");
            $(".imgContent[data-index=" + index + "]").remove();
        })
    }
}

// 右侧显示/隐藏
function leftSwitch(e, index) {
    $('#sidebar .active').removeClass('active');
    e.addClass('active');
    $('.panelOpt').slideUp("slow").removeClass('panelOpt');
    $('.panelContent').eq(index).slideDown("slow").addClass('panelOpt');
}

//清除数组中的空字符
function clearArr(arr) {
    var  trim  =   function(s)  {
        return  s.replace(/\s+/g, '');
    };
    var  re  =   [];
    for (var  i  =  0,  len  =  arr.length;  i  <  len;  i++)  {
        if (trim(arr[i]).length  >  0)  re[re.length]  =  arr[i];
    }
    return re;
}