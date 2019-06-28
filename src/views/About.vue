<template>
  <div class="about">
    <h1>This is an about page -- {{ name }}</h1>

    <el-button @click="CHG_NAME({name:'张无忌',age:19})">修改仓库中的 name</el-button>

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
          <el-button type="danger" @click="delTodo(scope.$index)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations} from "vuex";

export default {
  name:'About',

  computed:{
    ...mapState(['todoList','name'])
  },

  methods: {
    ...mapMutations(['CHG_NAME']),   //相当于在组件内部 定义了一个跟 mutation名字一样的 一个方法的名字
                                    //后面可以直接调用这个方法 
    // chgName () {
    //   // this.name = "李四"   不能直接修改 
    //   //commit 里面是 mutation的名字
    //   // this.$store.commit('CHG_NAME',{
    //   //   name:'张三丰',
    //   //   age: 18
    //   // });

    //   this.$store.commit({
    //     type:'CHG_NAME',
    //     name:'张三丰',
    //     age:19
    //   })
    // }
  }
}
</script>

