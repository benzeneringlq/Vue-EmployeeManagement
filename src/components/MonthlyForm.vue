<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import Maintem from './MainTemplate.vue'
import { useToast } from "vue-toastification";
import { useGlobalData } from "../global.js";
import ConvertToCSV from '../myFunction/ConvertToCSV'
const globaldata = useGlobalData()

const headers = [
    { title: '部门名称', align: 'start', key: 'departmentID', },
    { title: '月初人数', align: 'end', key: 'beginMonth' },
    { title: '月末人数', align: 'end', key: 'endMonth' },
    { title: '本月新入职', align: 'end', key: 'newEntry' },
    { title: '本月离职', align: 'end', key: 'dim' },
    { title: '本月调入', align: 'end', key: 'in' },
    { title: '本月调出', align: 'end', key: 'out' },
    { title: '研究生', align: 'end', key: 'master' },
    { title: '本科生', align: 'end', key: 'graduate' },
    { title: '大专', align: 'end', key: 'college' },
    { title: '高中及以下', align: 'end', key: 'highSchool' }
]
const tableSelected = ref([])
const selectResult = ref([])
const departmentType = ref([])
const datePicker = ref(new Date().toISOString().split('T')[0])
async function submit() {
    let date = new Date(datePicker.value)
    let year = date.getFullYear();
    let month = date.getMonth();
    let startDate = new Date(year, month, 1);
    let endDate = new Date(year, month + 1, 0);
    let data = {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
    }
    console.log(data)
    let result = await globaldata.getMonthlyForm(data)
    selectResult.value = [...result]
    // console.log(selectResult.value)
    // toast.info(JSON.stringify(result, null, 2));
    return result
}
onBeforeMount(async () => {
    // let a=new Date().toISOString().split('T')[0]
    // datePicker.value=a
    submit()
    // departmentType.value = [...new Set(result.map((item) => item.type))]
    // console.log(departmentType.value)
})
</script>
<template>
    <Maintem>
        <template v-slot:header>
            {{ this.$options.name }}
        </template>
        <template v-slot:breadcrumb>
            <v-breadcrumbs class="breadcrumb" :items="['报表管理', '人事月报']"></v-breadcrumbs>
        </template>
        <template v-slot:panel-heading>请输入</template>
        <template v-slot:panel-body>
            <v-form ref="form">
                <v-row dense>
                    <v-col cols="12" md="6">
                        <v-text-field label="月份" v-model="datePicker" type="date"></v-text-field>
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
                items-per-page="5" return-object show-select>
                <template v-slot:item.departmentID="{ value }">
                    {{ globaldata.departmentMap.get(value.toString()) }}
                </template>
            </v-data-table>
            <v-btn @click="ConvertToCSV(headers,selectResult,'人事月报.csv')">生成报表</v-btn>
        </template>
    </Maintem>
</template>
<script>
export default {
    name: "人事月报"
}
</script>