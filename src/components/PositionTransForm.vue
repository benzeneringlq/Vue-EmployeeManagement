<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import Maintem from './MainTemplate.vue'
import { useToast } from "vue-toastification";
import { useGlobalData } from "../global.js";
const globaldata = useGlobalData()
const toast = useToast();

const headers = [
    { title: '编号', align: 'start', key: 'formID', },
    { title: '部门名称', align: 'end', key: 'nowDepartmentID' },
    { title: '原岗位名称', align: 'end', key: 'oldID' },
    { title: '新岗位名称', align: 'end', key: 'newID' },
    { title: '姓名', align: 'end', key: 'name' },
    { title: '性别', align: 'end', key: 'gender' },
    { title: '调动日期', align: 'end', key: 'date' },
    { title: '调动原因', align: 'end', key: 'cause' }
]
const tableSelected = ref([])
const selectResult = ref([])
const departmentType = ref([])
const filter = reactive({
    startDate: '',
    endDate: '',
    departmentID: '',
})
async function submit() {
    let result = await globaldata.getPosTransForm(filter)
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
                <template v-slot:item.nowDepartmentID="{ value }">
                    {{ globaldata.departmentMap.get(value) }}
                </template>
                <template v-slot:item.newID="{ value }">
                    {{ globaldata.positionMap.get(value) }}
                </template>
                <template v-slot:item.oldID="{ value }">
                    {{ globaldata.positionMap.get(value) }}
                </template>
            </v-data-table>

            <pre>{{ tableSelected }}</pre>
        </template>
    </Maintem>
</template>
<script>
export default {
    name: "岗位调动报表"
}
</script>