import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    //state放置共享的数据
    state: {
        todoList: [
            { id: 1, name: '吃饭' },
            { id: 2, name: '睡觉'}
        ],

        name: '王富贵'
    },

    getters: {
        //获取仓仓库 todoList 长度信息
        //state -- 仓库store中的state store.state
        //getters  store.getters
        todoListNum(state, getters) {
            return state.todoList.length;
        }
    },

    mutations: {//存放所有mutation集合
        //key : value  每一个key value 代表一个mutation
        //每个方法 都会接收到一个state state就是仓库中的 state
        //修改 name 这个状态
        //payload 参数 负载  接收 About 里面 commit传进来的参数
        //接收多个参数是 payload是一个对象 
        CHG_NAME(state, payload) {
            // console.log(payload)
            state.name = payload.name
            // console.log(payload.name);
            console.log(payload.age)
        },


        //新增todo

        ADD_TODO(state,payload) {
           state.todoList.push(payload)
        },
        
        //删除todo

        DEL_TODO(state, payload) {
            state.todoList.splice(payload.index, 1)
        }
    },

    actions: {
        //一个添加 todo 的动作
        //两个参数 第一个 context 是一个对象 可以简单理解为 store
        //第二个参数 payload 传递过来的参数 是一个对象
        //仓库中的数据发生改变 只能通过mutation actions只能读取 不能修改
        //ADD_TODO_ACT({ state, getters, commit, dispatch}, payload)
        ADD_TODO_ACT({ commit}, payload) {
            // console.log(payload)
            setTimeout(() => {
                //commit('ADD_TODO', payload); commit字符串写法
                
                // commit({     commit对象写法
                //     type: 'ADD_TODO',
                //     id: payload.id,
                //     name:payload.name
                // })

                //展开对象写法
                commit({
                    type: 'ADD_TODO',
                    ...payload  
                })
            }, 2000);
        }
    }

   
})