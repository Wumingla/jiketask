var FileUpdate = {
    fileInput: "", //Html  file控件
    fileArea: "", //文件所在区域
    url: "", //文件上传的地址
    filesFilter: [], //过滤后的文件数组

    fileDragOver: function() {}, //文件拖拽
    fileDragLeave: function() {}, //文件拖拽
    addHtml: function() {}, //把图片加入html
    removeImg: function() {}, //html删除图片
    addFilesFilter: function() {}, //补充filesFilter
    checkFile: function() {}, //检测数据
    seccessFun: function(){},
    //文件放下
    fileDrop: function(e) {
        this.funDragHover(e);
        files = e.target.files || e.dataTransfer.files;
        this.filesFilter = this.filesFilter.concat(this.getFile(files));
        for (var i = 0; i < this.filesFilter.length; i++) {
            this.filesFilter[i].dataIndex = i;
        }
        this.addHtml(this.filesFilter);
    },
    //获取文件
    getFile: function(files) {
        return files;
    },

    //文件拖放
    funDragHover: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this[e.type === "dragover" ? "fileDragOver" : "fileDragLeave"].call(e.target);
        // return this;
    },
    
    //删除图片
    deleteImg: function(index) {
        var fileArr = [];
        for (var i = 0, file; file = this.filesFilter[i]; i++) {
            if (file.dataIndex != index) {
                fileArr.push(file);
            } else {
                this.removeImg(index);
            }
        }
        this.filesFilter = fileArr;
    },

    fileSuccess: function() {}, //文件上传成功
    fileError: function() {}, //文件上传失败

    //文件上传
    updateFile: function(formData) {
        var __self = this;
        $.ajax({
            url: this.url,
            type: "post",
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if(data[0]==1){
                    alert("上传成功");
                    __self.seccessFun();
                }else if(data[0]==0){
                    alert("上传失败"+data[1]);
                }else{
                    alert("上传失败");
                }
            },
            error: function() {
                alert("修改失败,请重试");
            }

        });
    },
    //初始化
    init: function() {
        var __self = this;
        if (this.fileArea) {
            this.fileArea.addEventListener("dragover", function(e) {
                __self.funDragHover(e);
            }, false);
            this.fileArea.addEventListener("dragleave", function(e) {
                __self.funDragHover(e);
            }, false);
            this.fileArea.addEventListener("drop", function(e) {
                __self.fileDrop(e);
            }, false);
        }
        if (this.fileInput) {
            this.fileInput.addEventListener("change", function(e) {
                __self.fileDrop(e);
            }, false);
            this.fileInput.addEventListener("click", function(e) {
                e.target.value = "";
            }, false);
            this.inputSub.addEventListener("click", function() {
                if (__self.checkFile()) {
                    __self.addFilesFilter();
                }
            })
        }
    }
}
