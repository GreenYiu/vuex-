
# vuex 

## 使用
1. npm install --save vuex
2. 创建一个store.js文件 用来实例化vuex仓库  new Vuex.Store()
3. 在 new Vue配置 store选项

## 从仓库中获取state的数据

> 使用vuex之后，会提供一个 this.$store的对象，就是store的实例对象
1. this.$store.state.xxxx      (不推荐)
2. computed 计算属性来获取 store 中的数据  哪个组件需要用上store数据 就在哪个组件是使用computed
```js
    computed: {
        todoList () {
            return this.$store.state.todoList
        }
    }
```
3. 使用 mapState 辅助函数， (会直接返回一个对象)
```js
import { mapState } from 'vuex'

computed: mapState(['todoList'])
//mapState 里面是个数组 数组的每一项是仓库中的数据的名字

```
4. 第三种写法然我们无法实现组件自身的计算属性 ( 推荐)
```js
import { mapState } from 'vuex'

computed: {
    ...mapState(['todoList']),

    //下面就可以写自己组件的计算属性了
    key: value
}
```

## "..."的方式返回对象 "..." (展开运算符) 
> 可以实现拷贝
```js
let obj = { name:'张三', name: 18}

let obj1 = { ...obj }  //将obj里面的数据源拿到obj1里面使用

obj1 //返回 { name:'张三', name: 18}
//展开运算符 将obj里面的数据源拿到obj1里面使用 并去掉了 {} 的外壳
```
```js
    let obj = { name:'张三', name: 18}

    let obj2 = { ...obj }
    obj2    //{ name:'张三', name: 18}
    let obj3 = {...obj, sex:'男'}
    obj3    //{ name:'张三', name: 18, sex:'男'}
    
```

## 修改仓库中的数据

>ps: 
1. 绝对不能直接去修改，会报错，报computed 不允许被修改
2. 参数不能传递多个 如果需要多个， 需要弄个对象的方式 传递过来
3. commit() 还可以接收 对象形式 一定需要一个type属性来指定 mutation的名字


使用步骤
1. state 中的数据要改变，先定义好 mutation 
2. 在组件中 提交这个 mutation 
    2.1 直接使用 this.$store (推荐)
```js
this.$store.commit('mutation 的名字')

this.$store.commit({
    type:'mutation的名字',
    //其余的属性就是payload中能到拿到的参数
})
```
    2.2  使用 mapMutations 这个辅助函数 (推荐)
```js
import { mapMutations } from 'vuex';

methods:{
    ...mapMutations(['CHG_NAME'])
}
```

## 如何使用 getters

1. 定义好getter
2. 组件中使用
    1. this.$store.getters.todListNum
    2. mapGetters 辅助函数
    ```js
    import { mapGetters } from 'vuex';

    computed: {
        ...mapGetters(['todoListNum'])
    }
    ```
    
## 如何使用异步

? 如何让我们的add操作 延迟2秒 之后添加
 1. 能不能在mutation 里面写 setTimeout （不允许） mutation里面只能写同步代码
 2. 在组件外面先把异步代码走完 再做 commit
 3. 使用 actions
    1. 定义 action
    2. 在组件中 派发 action
        1. this.$store.dispathch('action 的名字')
        2. mapActions 辅助函数
        ```js
        import { mapActions } from 'vuex'

        methods: {
            ...mapAction(['action 的名字'])
        }

state           里面放数据
getters         是对state里面的数据 或者是其他的getters 做一个二次计算 必须要有返回值
mutation        是仓库中 唯一能够改变state仓库中的数据的东西
actions         是能够在里面写异步代码的地方

组件中 如何拿取仓库中的数据去使用呢？
    通过计算属性 
    用的最多的 this.$store.state 拿数据
    通过 this.$store.getters  拿 getters中的数据
    通过 this.$store.commit  提交mutations 中的某个mutation
    通过 this.$store.dispathch去派发某个动作 
