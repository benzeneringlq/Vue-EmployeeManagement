<script setup>
import { ref, reactive,  onBeforeMount } from 'vue';
import Maintem from './MainTemplate.vue'
import { useToast } from "vue-toastification";
import { useGlobalData } from "../global.js";
const globaldata = useGlobalData()
const toast = useToast();

const headers = [
    { title: '姓名', align: 'start', key: 'name', },
    { title: '实习编号', align: 'end', key: 'probationStaffID' },
    { title: '部门', align: 'end', key: 'departmentID' },
    { title: '岗位', align: 'end', key: 'positionID' },
    { title: '试用期状态', align: 'end', key: 'status' },
    { title: '试用期开始时间', align: 'end', key: 'startDate' },
    { title: '试用期结束时间', align: 'end', key: 'endDate' }
]

const tableSelected = ref([])
const selectResult = ref([])
const filter = reactive({
    probationStaffID: null,
    name: null,
    departmentID: null,
    positionID: null,
    startDate: null,
    endDate: null,
    status: null
})
async function submit() {
    // 把空白日期改成null,避免com.google.gson.JsonSyntaxException: Failed parsing '' as Date; at path $.startDate
    // filter.startDate==""?filter.startDate:null
    // filter.endDate==""?filter.endDate:null
    let result = await globaldata.selectProbation(filter)
    selectResult.value = [...result]
    console.log(selectResult.value)
    toast.info(JSON.stringify(result, null, 2));
}
onBeforeMount(async () => {
    let result = await globaldata.selectProbation(filter)
    selectResult.value = [...result]
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
                        <v-text-field label="员工姓名" v-model="filter.name"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field label="实习编号" v-model="filter.probationStaffID"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-select label="部门" v-model="filter.departmentID" :items="globaldata.departments"
                            item-title="name" item-value="ID"></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-select label="职位" v-model="filter.positionID" :items="globaldata.positions" item-title="name"
                            item-value="ID"></v-select>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="试用期开始日期" v-model="filter.startDate" type="date"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="试用期结束日期" v-model="filter.endData" type="date"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-select label="试用期状态" v-model="filter.status" :items="globaldata.Probationstatus"
                            item-title="status" item-value="status"></v-select>
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
            <v-data-table v-model="tableSelected" :headers="headers" :items="selectResult" item-value="staffID"
                items-per-page="15" return-object show-select>
                <template v-slot:item.startDate="{ value }">
                    {{ (new Date(value)).toLocaleDateString() }}
                </template>
                <template v-slot:item.endDate="{ value }">
                    {{ (new Date(value)).toLocaleDateString() }}
                </template>
                <template v-slot:item.departmentID="{ value }">
                    {{ globaldata.departmentMap.get(value) }}
                </template>
                <template v-slot:item.positionID="{ value }">
                    {{ globaldata.positionMap.get(value) }}
                </template>
            </v-data-table>

            <pre>{{ tableSelected }}</pre>
        </template>
    </Maintem>
</template>
<script>
export default {
    name: "试用期管理"
}
</script>