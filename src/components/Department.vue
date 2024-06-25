<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import Maintem from './MainTemplate.vue'
import { useToast } from "vue-toastification";
import { useGlobalData } from "../global.js";
const globaldata = useGlobalData()
const toast = useToast();

const headers = [
    { title: '编号', align: 'start', key: 'departmentID', },
    { title: '名称', align: 'end', key: 'name' },
    { title: '类型', align: 'end', key: 'type' },
    { title: '电话', align: 'end', key: 'TEL' },
    { title: '传真', align: 'end', key: 'fax' },
    { title: '描述', align: 'end', key: 'description' },
    { title: '上级部门', align: 'end', key: 'superior' },
    { title: '成立时间', align: 'end', key: 'foundingTime' }
]
const tableSelected = ref([])
const selectResult = ref([])
const departmentType = ref([])
const filter = reactive({
    id: '',
    name: '',
    type: ''
})
async function submit() {
    let result = await globaldata.selectDepartment(filter)
    selectResult.value = [...result]
    // console.log(selectResult.value)
    // toast.info(JSON.stringify(result, null, 2));
    return result
}
onBeforeMount(async () => {
    let result = await submit()
    departmentType.value = [...new Set(result.map((item) => item.type))]
    // console.log(departmentType.value)
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
                        <v-text-field label="部门编号" v-model="filter.id"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field label="部门名称" v-model="filter.name"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-select label="部门类型" v-model="filter.type" :items="departmentType">
                        </v-select>
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
            <v-data-table v-model="tableSelected" :headers="headers" :items="selectResult" item-value="departmentID"
                items-per-page="15" return-object show-select>
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
    name: "部门管理"
}
</script>