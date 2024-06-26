<script setup>

import {  ref, onBeforeMount } from 'vue'; // 从Vue导入ref和reactive
import { RouterView } from 'vue-router'
import { useGlobalData } from "./global.js"

// import AdminView from './components/AdminView.vue'
const globaldata = useGlobalData()
const drawer = ref(true)
const group1 = {
  title: "人员管理", icon: 'mdi-home'
}
const group1item = [
  { title: '入职管理', icon: 'mdi-home', route: '/Entry' },
  { title: '人员信息', icon: 'mdi-book-multiple', route: '/StaffInfo' },
  { title: '试用期管理', icon: 'mdi-home', route: '/Probation' },
  { title: '离职信息', icon: 'mdi-book-multiple', route: '/Dimission' }
]

const group2 =
  [
    { title: '部门管理', icon: 'mdi-home', route: '/Department' },
    { title: '岗位管理', icon: 'mdi-book-multiple', route: '/Position' }
  ]
const group3 = { title: "报表管理", icon: 'mdi-home' }
const group3item = [
  { title: '新聘员工报表', icon: 'mdi-home', route: '/NewStaffForm' },
  { title: '离职员工报表', icon: 'mdi-book-multiple', route: '/DimForm' },
  { title: '部门调动报表', icon: 'mdi-home', route: '/DeptTransForm' },
  { title: '岗位调动报表', icon: 'mdi-book-multiple', route: '/PositionTransForm' },
  { title: '人事月报', icon: 'mdi-home', route: '/MonthlyForm' }
]

onBeforeMount(async () => {
  globaldata.getData()
})
</script>
<template>
  <v-app>
    <v-app-bar color="teal-darken-4" :elevation="2" image="https://picsum.photos/1920/1080?random">
      <v-btn color="pink" dark @click.stop="drawer = !drawer">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </v-btn>
      <!-- <RouterLink to="/" class="text-h5 color: inherit">
        <v-app-bar-title class="text-h5">网络书店</v-app-bar-title>
      </RouterLink> -->
      <v-app-bar-title class="text-h5" style="cursor: pointer" @click="$router.push('/')">员工管理系统</v-app-bar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <text class="text-black bg-white text-h3">信息212刘佰通</text>
    </v-app-bar>
    <!-- <v-sheet height="200" class="overflow-hidden" style="position: relative;"> -->
    <v-navigation-drawer v-model="drawer" permanent mini-variant width="200">
      <v-list dense>
        <!-- <v-list-group v-if v-for="(group, index) in itemsGroup" :key="index">

          <v-list-item v-for="item in itemsGroup" :to="item.route" link>
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
<v-list-item-title :elevation="5">{{ item.name }}</v-list-item-title>
</v-list-item>
</v-list-group> -->


        <v-list-group fluid base-color="#2376b7" variant="elevated" value="1">
          <template v-slot:activator="{ props }">
            <v-list-item variant="elevated" v-bind="props" :title="group1.title"></v-list-item>
          </template>

          <v-list-item base-color="#d85916" class="d-flex align-center pl-4" v-for="(item, i) in group1item" :key="i"
            :append-icon="item.icon" :title="item.title" :value="item.title" :to="item.route">
          </v-list-item>
        </v-list-group>
        <!-- ------------------ -->
        <v-list-item base-color="#2376b7" variant="elevated" v-for="(item, i) in group2" :key="i" :title="item.title"
          :value="item.title" :to="item.route">
        </v-list-item>
        <!-- ------------------ -->
        <v-list-group fluid base-color="#2376b7" variant="elevated" value="2">
          <template v-slot:activator="{ props }">
            <v-list-item variant="elevated" v-bind="props" :title="group3.title"></v-list-item>
          </template>

          <v-list-item base-color="#d85916" v-for="(item, i) in group3item" :key="i" :append-icon="item.icon"
            :title="item.title" :value="item.title" :to="item.route">
          </v-list-item>
        </v-list-group>
      </v-list>

    </v-navigation-drawer>
    <!-- </v-sheet> -->
    <v-main class="ml-n16">
      <v-container>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
        <!-- <h1>Main Content</h1>
        <p>This is the main content of the application. The navigation drawer will not cover this content.</p> -->
      </v-container>
    </v-main>
  </v-app>
</template>
<style>
.router-link-exact-active {
  color: inherit;
  /* 继承父元素的颜色 */
  text-decoration: none;
  /* 移除下划线 */
}

.router-link-exact-active:hover {
  color: inherit;

  /* 确保悬停时颜色不变 */
}

.router-link-exact-active:focus {
  outline: none;
  /* 移除聚焦时的外框 */
}

.active-link {
  color: inherit;
  /* 继承父元素的颜色 */
  text-decoration: none;
}
</style>

<!-- <template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div>
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template> -->
