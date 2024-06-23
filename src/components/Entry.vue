<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { useToast } from "vue-toastification";
import { useGlobalData } from "../global.js"
import axios from 'axios'
defineProps({

})

const globaldata=useGlobalData()
const toast = useToast();
const valid = ref(false);
const employee = reactive({
    name: '',
    gender: '',
    birthdate: '',
    idNumber: '',
    departmentID: '',
    joinDate: '',
    workStartDate: '',
    employmentType: '',
    source: '',
})
// const departments = ref([]);
const employmentTypes = ['正式', '临时'];
const sources = ['校园招聘', '社会招聘', '其他'];
const gender = [{
    value: true,
    title: "男"
}, {
    value: false,
    title: "女"
}]
function test() {
    employee['name'] = '信息212李明'
    employee['gender'] = 'true'
    employee['idNumber'] = 'A123456789'
    employee['departmentID'] = '1'
    employee['joinDate'] = '2023-06-01'
    employee['workStartDate'] = '2023-06-15'
    employee['employmentType'] = '正式'
    employee['source'] = '校园招聘'
    toast.info("OK!");
}
async function submit() {
    // alert(JSON.stringify(employee));
    toast.info(JSON.stringify(employee, null, 2));
    console.log(JSON.stringify(employee))
    let result = await globaldata.callApi('/api/staff/entryStaff', JSON.stringify(employee), 'application/json')
    toast.info(result);
}

onBeforeMount(async () => {
    // test()

    // let result = await globaldata.callApi('/api/data/getIDNameBytable', "Department", 'text/plain')
    // departments.value.push(...result)

    // console.log(result)
})
</script>
<template>
    <v-card class="mx-auto" prepend-icon="$vuetify" subtitle="The #1 Vue UI Library" width="1000">
        <template v-slot:title>
            <span class="font-weight-black">Welcome to Vuetify</span>
        </template>
        <v-form ref="form" v-model="valid">
            <v-container>

                <v-row dense>
                    <v-col cols="12" md="6">
                        <v-text-field label="员工姓名" v-model="employee.name" :rules="[v => !!v || '员工姓名是必填的']"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select label="员工性别" v-model="employee.gender" :items="gender" item-title="title"
                            item-value="value" :rules="[v => !!v || '请选择员工性别']" required></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <!-- <v-date-input v-model="model" label="Select a date" max-width="368" ></v-date-input> -->
                        <v-text-field label="出生日期" v-model="employee.birthdate" type="date"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field label="身份证号" v-model="employee.idNumber" :rules="[v => !!v || '身份证号是必填的']"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select label="部门" v-model="employee.departmentID" :items="globaldata.departments" item-title="name"
                            item-value="ID" :rules="[v => !!v || '请选择部门']" required></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field label="入职日期" v-model="employee.joinDate" type="date"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field label="参加工作日期" v-model="employee.workStartDate" type="date"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select label="用工形式" v-model="employee.employmentType" :items="employmentTypes"
                            :rules="[v => !!v || '请选择用工形式']" required></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-select label="人员来源" v-model="employee.source" :items="sources"
                            :rules="[v => !!v || '请选择人员来源']" required></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn color="#21a675" block @click="submit">提交</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn color="#158bb8" block @click="test">测试</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn color="warning" block type="reset">
                            重置
                        </v-btn>
                    </v-col>
                </v-row>

            </v-container>
        </v-form>

    </v-card>

</template>
<style>
v-col {
    height: 20
}

v-row {
    height: 20
}
</style>

<script>
export default {
    name: "入职管理"
}
</script>
<style scoped></style>