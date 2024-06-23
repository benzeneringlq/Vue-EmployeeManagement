<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { useToast } from "vue-toastification";
import { useGlobalData } from "../global.js"
import axios from 'axios'
defineProps({

})


const toast = useToast();
</script>
<template>
    <!-- <h1 class="container">1111111111111111111111111111111</h1> -->
    <v-card width="1000">

    <!-- <v-container d-flex class="container"  width="1000"> -->
    <!-- <v-flex width="1000"> -->
        <h1 id="title">
            <slot name="header">header</slot>
        </h1>
        <v-divider></v-divider>
        <div id="breadcrumb">
            <slot name="breadcrumb">
                <v-breadcrumbs class="breadcrumb" :items="['Foo', 'Bar', 'Fizz']"></v-breadcrumbs>
            </slot>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">
                <slot name="panel-heading">请输入</slot>
            </div>

            <div class="panel-body">
                <slot name="panel-body"> (name:panel-body)</slot>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <slot name="panel-result-heading"></slot>
            </div>

            <div class="panel-body">
                <slot name="panel-result-body"></slot>
            </div>
        </div>
        </v-card>
        <!-- </v-container> -->
    <!-- </v-flex> -->
</template>

<style>
#breadcrumb {
    background-color: #f5f5f5;
    height: auto;
}


.breadcrumb {
    padding: 8px 15px;
    margin-bottom: 20px;
    list-style: none;
    background-color: #f5f5f5;
    border-radius: 4px;
}

.panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.panel-default {
    border-color: #ddd;
}

.panel-default>.panel-heading {
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
}

.panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
}

.panel-body {
    padding: 15px;
}

#title {

    font-size: 50px;
    flex-grow: 10;
    color: var(--text-reverse);
    margin-bottom: 16px;
}

.container {
    width: 20em;
}
</style>

<script>
export default {
    name: "入职管理"
}
</script>
<style scoped></style>