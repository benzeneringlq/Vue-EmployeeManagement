<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import Maintem from './MainTemplate.vue'
import { useToast } from "vue-toastification";
import { useGlobalData } from "../global.js";
import ConvertToCSV from '../myFunction/ConvertToCSV'
const globaldata = useGlobalData()
const toast = useToast();

const headers = [
    { title: '编号', align: 'start', key: 'formID', },
    { title: '部门名称', align: 'end', key: 'nowDepartmentID' },
    { title: '岗位名称', align: 'end', key: 'newID' },
    { title: '姓名', align: 'start', key: 'name', },
    { title: '性别', align: 'start', key: 'gender', },
    { title: '离职日期', align: 'end', key: 'date' },
    { title: '离职原因', align: 'end', key: 'cause' },
]
const tableSelected = ref([])
const selectResult = ref([])
const dimissionCause = ref([])
const filter = reactive({
    startDate: '',
    endDate: '',
    departmentID: '',
})
async function submit() {
    // 把空白日期改成null,避免com.google.gson.JsonSyntaxException: Failed parsing '' as Date; at path $.startDate
    // filter.dimDate==""?filter.dimDate:null
    // filter.startDate==""?filter.startDate:null
    // filter.endDate==""?filter.endDate:null
    console.log(filter)
    let result = await globaldata.getDimForm(filter)
    selectResult.value = [...result]
    console.log(selectResult.value)
    // toast.info(JSON.stringify(selectResult.value, null, 2));
    return result
}
onBeforeMount(async () => {
    let result = await submit()
    dimissionCause.value = [...new Set(result.map((item) => item.cause))]
})
</script>
<template>
    <Maintem>
        <template v-slot:header>
            {{ this.$options.name }}
        </template>
        <template v-slot:panel-heading>请输入</template>
        <template v-slot:breadcrumb>
            <v-breadcrumbs class="breadcrumb" :items="['报表管理', '离职员工报表管理']"></v-breadcrumbs>
        </template>
        <template v-slot:panel-body>
            <v-form ref="form">
                <v-row dense>
                    <v-col cols="4">
                        <v-text-field label="开始日期" v-model="filter.startDate" type="date"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="结束日期" v-model="filter.endDate" type="date"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-select label="部门" v-model="filter.departmentID" :items="globaldata.departments"
                            item-title="name" item-value="ID"></v-select>
                    </v-col>
                </v-row>
                <v-row justify="end">
                    <v-col cols="2">
                        <v-btn color="#21a675" block @click="submit">查询</v-btn>
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
            panel-result-heading
        </template>
        <!-- <template #panel-result-body>
            panel-result-body
        </template> -->
        <template #panel-result-body>
            <v-data-table v-model="tableSelected" :headers="headers" :items="selectResult" items-per-page="15"
                return-object show-select>
                <template v-slot:item.date="{ value }">
                    {{ (new Date(value)).toLocaleDateString() }}
                </template>
                <template v-slot:item.nowDepartmentID="{ value }">
                    {{ globaldata.departmentMap.get(value) }}
                </template>
                <template v-slot:item.newID="{ value }">
                    {{ globaldata.positionMap.get(value) }}
                </template>
            </v-data-table>
            <v-btn @click="ConvertToCSV(headers,selectResult,'离职员工报表.csv')">生成报表</v-btn>
        </template>
    </Maintem>
</template>
<script>
export default {
    name: "离职管理"
}
</script>