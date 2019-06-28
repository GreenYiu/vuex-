<template>
  <div class="page-home">
    <h1>我是首页 -- {{ name }}</h1>
  <div class="todoList">
    <div class="todoList__top">
  <!-- <input type="text" placeholder="请输入代办事项"> -->
  <el-input ref="todoInput" placeholder="请输入..." v-model="inputVal" ></el-input>
  <!-- <button>ADD</button> -->
  <el-button type="primary" :disabled="!inputVal" @click="addTodo">ADD</el-button>
    </div>

  {{ todoListNum }}
<!-- 第一种方式 $store.state.todoList 从仓库中拿到todoList数据 -->
  <el-table
    :data="todoList"
  >
      <el-table-column label="序号" prop="id"></el-table-column>
      <el-table-column label="事项" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- slot-scope 接收传递给插槽的prop 声明了被接收的prop对象会作为scope变量存在于<template>
            作用域中
             -->
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据， -->
            <!-- <el-button type="danger" @click="delTodo(scope.$index)">Delete - {{ scope.row.name }}</el-button>
                    scope.roe.row 拿到输入的name
             -->
            <el-button type="danger" @click="DEL_TODO({index:scope.$index})">Delete</el-button>
        </template>
      </el-table-column>
  </el-table>
  </div>
  </div>
</template>


<script>
import { mapState, mapMutations, mapGetters, mapActions} from 'vuex';

export default {
  name:'home',

  data () {
    return {
      inputVal: '',
      // todoList:[]
    }
  },

 /*  computed: {
    //第二种方式
    //key - 名称  value -方法
    todoList () {
      //将仓库中的数据返回组件自身的数据
      return this.$store.state.todoList
    }
  }, */

  computed: {
    ...mapState(['todoList', 'name']),
    
    ...mapGetters(['todoListNum'])
  },

  methods: {
    ...mapMutations(['DEL_TODO']),
    /* DEL_TODO (payload) {
        this.store.commit({
          type:'DEL_TODO',
          ...payload
        })
    }    等价于 ...mapMutations(['DEL_TODO'])
    */
   //异步操作的辅助函数方法
   ...mapActions(['ADD_TODO_ACT']),
    //添加todo
      addTodo (){
      //拿到最后一项
      let lastTodo = this.todoList[this.todoList.length - 1]
      //最后一项可能不存在 如果存在 用todoList里面的id+1  如果不存在 则为1
      let id = lastTodo ? lastTodo.id + 1 : 1
      // console.log(this.todoList)
      // this.todoList.push({
      //   id,
      //   name:this.inputVal
      // })

    //异步操作
    this.$store.dispatch('ADD_TODO_ACT',{
      id,
      name:this.inputVal
    })
    //type方式 报错
    // this.$store.dispatch({
    //   type:'ADD_TODO_ACT',
    //   id,
    //   name:this.inputVal
    // })
    //辅助函数方法
    // this.ADD_TODO_ACT({
    //   id,
    //   name:this.inputVal
    // })
    
    this.inputVal = '';
    this.$refs.todoInput.focus()

    // setTimeout(() => {
    //    this.$store.commit({
    //     type:'ADD_TODO',
    //     id,
    //     name:this.inputVal
    //   })
      
    //   //当数据添加完成后 inputVal重置清空
    //   this.inputVal = ''

    //   //当数据添加完成 重置 主动获取焦点 on focus  获取dom节点 使用 ref $ref方式获取
    //   //ref 放在普通标签上得到的是 dom对象
    //   //    放在el组件上得到的是 组件实例对象
    //   // 在vue组件实例对象上找到 focus方法
    //   // console.log(this.$refs.todoInput);
    //   this.$refs.todoInput.focus()
    // }, 2000);
     
    },
     //删除todo  通过下标删除
      //  delTodo (index) {
      //   //  console.log(index);
      //   // this.todoList.splice(index,1);
      //   this.$store.commit({
      //     type:'DEL_TODO',
      //     index
      //   })
      //   //发现这个delTodo 方法 里面的代码只有提交mutation 那么推荐使用辅助函数
      //  }
    },

    // mounted () {
    //   console.log(this.$store);
    // }
  }
</script>



<style lang="scss">
.todoList {
  width: 500px;
  margin:0 auto;

  
  &__top {   //&  上一级
    display: flex;

    .el-input{
      margin-right: 10px;
    }
  }
}

</style>


