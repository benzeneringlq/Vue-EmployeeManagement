<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import Maintem from './MainTemplate.vue'
import { useToast } from "vue-toastification";
import { useGlobalData } from "../global.js";
const globaldata = useGlobalData()
const toast = useToast();

const headers = [
    { title: '编号', align: 'start', key: 'positionID', },
    { title: '名称', align: 'end', key: 'name' },
    { title: '岗位类型', align: 'end', key: 'type' },
    { title: '编制', align: 'end', key: 'establishmentQuantity' }
]
const tableSelected = ref([])
const selectResult = ref([])
const positionType = ref([])
const filter = reactive({
    id: '',
    name: '',
    type: ''
})
async function submit() {
    let result = await globaldata.selectPosition(filter)
    selectResult.value = [...result]
    console.log(selectResult.value)
    toast.info(JSON.stringify(result, null, 2));
    return result
}
onBeforeMount(async () => {
    let result = await submit()
    positionType.value = [...new Set(result.map((item) => item.type))]
})
</script>
<template>
    <Maintem>
        <template v-slot:header>
            {{ this.$options.name }}
        </template>
        <template v-slot:panel-heading>请输入</template>
        <template v-slot:panel-body>
            <v-form ref="form">
                <v-row dense>
                    <v-col cols="3">
                        <v-text-field label="岗位编号" v-model="filter.id"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field label="岗位名称" v-model="filter.name"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-select label="岗位类型" v-model="filter.type" :items="positionType"></v-select>
                    </v-col>
                </v-row>
                <v-row justify="end">
                    <v-col cols="2">
                        <v-btn color="#21a675" block @click="submit">提交</v-btn>
                    </v-col>

                    <v-col cols="2">
                        <v-btn color="warning" block type="reset">
                            重置
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </template>
        <template #panel-result-heading>
            查询结果
        </template>
        <!-- <template #panel-result-body>
            panel-result-body
        </template> -->
        <template #panel-result-body>
            <v-row justify="first">
                <v-col cols="1">
                    <v-btn  color="success"   @click="insert">
                        新增
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn  color="error"   @click="delete">
                        删除
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn  color="warning"  @click="修改">
                        删除
                    </v-btn>
                </v-col>
            </v-row>
            <v-data-table v-model="tableSelected" :headers="headers" :items="selectResult" item-value="positionID"
                items-per-page="5" return-object show-select>
                <template v-slot:item.foundingTime="{ value }">
                    {{ (new Date(value)).toLocaleDateString() }}
                </template>
            </v-data-table>

            <pre>{{ tableSelected }}</pre>
        </template>
    </Maintem>
</template>
<script>
export default {
    name: "岗位管理"
}
</script>