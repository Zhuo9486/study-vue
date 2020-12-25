import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'


//设置反向代理，前端请求默认发送到http://localhost:8443/api
var axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8443/api';
/*
全局注册：注册之后，可以在任何新创建的Vue根实例里使用
局部注册：只能用在注册的实例中（我觉得和全局变量，局部变量是类似的）
 */
//全局注册，之后可在其他组件中通过this.$axios发送数据
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI)


//to:表示即将要进入的路由对象
//from:表示即将要离开的路由对象
//next:是继续跳转或中断的方法
router.beforeEach((to, from, next)=> {
  //如果（即将进入的这个路由需要权限才能进入）
  if(to.meta.requireAuth){
    //如果(能获取到username)
    if(store.state.user.username) {
      //就让其进入这个路由
      next()
    }else{
      //就让其进入login页面
      next({
        path: 'login',
        //把要跳转的地址作为参数传到下一步
        query: {redirect: to.fullPath}
      })
    }
  }else{
    //即将进入的路由不需要权限就能进入，就让其进入这个路由
    next()
  }
})

/*
el属性提供一个在页面上已存在的DOM元素作为Vue对象的挂载目标
router代表该对象包含Vue Router，并使用项目中定义的路由
components表示该对象包含的Vue组件
template是用一个字符串模板作为Vue实例的标识使用，类似于定义一个html标签
$mount和el无本质区别，$mount为手动挂载
 */
new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store,
  components:{ App },
  template:'<App/>'
})
