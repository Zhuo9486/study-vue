<template>
    <body id="poster">
        <el-form class="login-container" label-position="left" label-width="0px">
            <h3 class="login_title">系统登录</h3>
            <!-- v-model 指令用来在 input、select、textarea、checkbox、radio 等表单控件元素上创建双向数据绑定
                 根据表单上的值，自动更新绑定的元素的值-->
            <el-form-item>
                <el-input type="text" v-model="loginForm.username"
                          auto-complete="off" aria-placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="text" v-model="loginForm.password"
                          auto-complete="off" aria-placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;background: #505458;border:none"
                           v-on:click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </body>
</template>

<script>
    export default {
        name: "Login",
        //data():起到局部变量的作用
        //data()中return的变量和方法只限于当前声明此data()的组件使用
        data(){
            return{
                loginForm:{
                    username:'',
                    password:''
                },
                responseResult:[]
            }
        },
        methods:{
            login() {
                var _this = this;
                console.log(this.$store.state);
                //前缀$，以便与用户定义的属性区分开来
                this.$axios
                    .post('/login', {
                        username: this.loginForm.username,
                        password: this.loginForm.password
                    })
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            _this.$store.commit('login',_this.loginForm);
                            var path = this.$route.query.redirect;
                            this.$router.replace({path: path === '/' || path ===undefined ? 'index' : path})
                        }
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(failResponse => {
                        '/login', alert("登录失败")
                    })
            }
        }
    }
</script>

<style>
    #poster{
        background: url("../assets/eva.jpg") no-repeat center;
        height: 100%;
        width: 100%;
        background-size: cover;
        /*absolute:生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
          fixed	:生成固定定位的元素，相对于浏览器窗口进行定位.元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
          relative:生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
          static:默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
          sticky:粘性定位，该定位基于用户滚动的位置。*/
        position: fixed;
    }
    body{
        margin: 0px;
    }
    .login-container{
        /*圆角度数*/
        border-radius: 15px;
        /*指定背景绘制区域
          border-box:默认值。背景绘制在边框方框内（剪切成边框方框）
          padding-box:背景绘制在衬距方框内（剪切成衬距方框）
          content-box:背景绘制在内容方框内（剪切成内容方框）*/
        background-clip: padding-box;
        /*设置所有外边距属性,可以有1到4个值
          auto:浏览器计算外边距
          length:规定以  具体单位计的外边距值，比如像素、厘米等。默认值是 0px。
          %:规定基于父元素的宽度的百分比的外边距。
          inherit:规定应该从父元素继承外边距。*/
        margin: 90px auto;
        width: 350px;
        /*设置所有填充属性,可以有1到4个值*/
        padding: 35px 35px 35px 35px;
        background: #fff;
        /*border-width	指定边框的宽度
          border-style	指定边框的样式
          border-color	指定边框的颜色
          inherit	指定应该从父元素继承border属性值*/
        border: 1px solid #eaeaea;
        /*box-shadow: h-shadow v-shadow blur spread color inset
         水平阴影 垂直阴影 模糊距离 阴影的大小 阴影的颜色 从外层的阴影改变阴影内侧阴影*/
        box-shadow: 0 0 25px #cac6c6;
    }
    .login_title{
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
</style>