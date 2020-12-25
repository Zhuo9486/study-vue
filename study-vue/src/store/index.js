import Vue from 'vue'
import Vuex from 'vuex'

//vuex是一个专门为vue.js应用程序开发的状态管理模式
//state：存储状态（变量）
// getters：对数据获取之前的再次编译，可以理解为state的计算属性。我们在组件中使用 $sotre.getters.fun()
// mutations：修改状态，并且是同步的。在组件中使用$store.commit('',params)。这个和我们组件中的自定义事件类似。
// actions：异步操作。在组件中使用是$store.dispath('')
// modules：store的子模块，为了开发大型项目，方便状态管理而使用的。这里我们就不解释了，用起来和上面的一样。
Vue.use(Vuex)

export default new Vuex.Store({
    //state:包含了store中存储的各个状态
    state:{
        user:{
            //localStorage和sessionStorage属性允许在浏览器中存储key/value对的数据。
            //localStorage用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。localStorage属性是只读的。
            //sessionStorage属性将数据保存在当前会话中，该数据对象临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。
            username: window.localStorage.getItem('user' || '[]') == null
                ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
        }
    },
    //mutations:一组方法，是改变store中状态的执行者，只能是同步操作
    mutations:{
        login(state,user){
            state.user = user
            //JSON.stringify是从一个对象中解析出字符串
            //JSON.parse是从一个字符串中解析出json(键值对)
            window.localStorage.setItem('user',JSON.stringify(user))
        }
    }
})
