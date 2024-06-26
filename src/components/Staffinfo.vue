<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue';
import Maintem from './MainTemplate.vue'
import { useToast } from "vue-toastification";
import { useGlobalData } from "../global.js";
const globaldata = useGlobalData()
const toast = useToast();

const headers = [
    { title: '姓名', align: 'start', key: 'name', },
    { title: '编号', align: 'end', key: 'staffID' },
    { title: '部门', align: 'end', key: 'departmentID' },
    { title: '岗位', align: 'end', key: 'positionID' },
    { title: '状态', align: 'end', key: 'status' },
    { title: '联系方式', align: 'end', key: 'TEL' },
    { title: '地址', align: 'end', key: 'home' }
]
const filter = reactive({
    staffID: '',
    name: '',
    departmentID: '',
    positionID: ''
})
async function submit() {
    let result = await globaldata.select(filter)
    selectResult.value = [...result]
    // toast.info(JSON.stringify(result, null, 2));
}
const selectResult = ref([])
const tableSelected = ref([])
const selectResultLength = computed(() => tableSelected.value.length)
const tableSelectedID = computed(() => {
    return (tableSelected.value.length == 1) ? tableSelected.value[0].staffID : 0

})
const tableSelectedDepartmentID = computed(() => {
    if (tableSelected.length == 1) {
        tableSelected[0].departmentID
    }
})
const tableSelectedPositionID = computed(() => {
    if (tableSelected.value.length == 1) {
        tableSelected.value[0].positionID
    }
})
const changer = reactive({
    departmentID: '',
    positionID: '',
    cause: '',
    TEL: '',
    home: ''

})
async function update() {
    let data = {
        staffID: tableSelected.value[0].staffID,
        TEL: changer.TEL,
        home: changer.home
    }
    let result = await globaldata.updateStaff(data)
    toast.info(result);
    submit()
}
async function changeDepartmentAndPosition() {
    let data = {
        staffID: tableSelected.value[0].staffID,
        departmentID: changer.departmentID,
        positionID: changer.positionID,
        cause: changer.cause
    }
    let result = await globaldata.changeDepartmentAndPosition(data)
    toast.info(result);
    submit()
}
async function deleteFun() {
    let result = await globaldata.deleteStaff(tableSelected.value[0].staffID)
    toast.info("删除成功:" + result);
    tableSelected.value = []
    submit()
}
async function dimFun() {
    let result = await globaldata.dimStaff(tableSelected.value[0].staffID)
    toast.info("离职成功:" + result);
    tableSelected.value = []
    submit()
}
onBeforeMount(async () => {
    let result = await globaldata.select(filter)
    selectResult.value = [...result]
})
</script>
<template>
    <Maintem>
        <template v-slot:header>
            {{ this.$options.name }}
        </template>
        <template v-slot:breadcrumb>
            <v-breadcrumbs class="breadcrumb" :items="['人员管理', '人员信息']"></v-breadcrumbs>
        </template>
        <template v-slot:panel-heading>请输入</template>
        <template v-slot:panel-body>
            <v-form ref="form">
                <v-row dense>
                    <v-col cols="12" md="3">
                        <v-text-field label="员工姓名" v-model="filter.name"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field label="员工编号" v-model="filter.staffID"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select label="部门" v-model="filter.departmentID" :items="globaldata.departments"
                            item-title="name" item-value="ID"></v-select>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-select label="职位" v-model="filter.positionID" :items="globaldata.positions" item-title="name"
                            item-value="ID"></v-select>
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
            <v-row justify="first">
                <v-col cols="1">
                    <v-btn color="blue-darken-2" @click="this.$router.push('/Entry')">
                        新增
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn :disabled="tableSelected.length != 1" color="error" @click="deleteFun">
                        删除
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-btn :disabled="tableSelected.length != 1 || tableSelected[0].status == '离职'" color="error"
                        @click="dimFun">
                        离职
                    </v-btn>
                </v-col>
                <v-col><v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn :disabled="tableSelected.length != 1" color="warning" v-bind="activatorProps"
                                @click="changer.TEL = tableSelected[0].TEL; changer.home = tableSelected[0].home">
                                修改
                            </v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card title="修改" height="2000px">
                                <v-form ref="updateForm">
                                    <v-text-field label="联系方式" v-model="changer.TEL"
                                        :rules="[value => (value?.length > 9 && /[0-9-]+/.test(value)) || '请填写有效手机号']"></v-text-field>
                                    <v-text-field label="地址" v-model="changer.home"
                                        :rules="[v => !!v || '家庭住址是必填的']"></v-text-field>
                                </v-form>
                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn @click="isActive.value = false">取消</v-btn>
                                    <v-btn @click="update">修改</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog></v-col>
                <v-col cols="2">
                    <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn :disabled="tableSelected.length != 1" color="warning" v-bind="activatorProps">
                                调整部门岗位
                            </v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card title="修改" height="2000px">
                                <v-form ref="updateForm">

                                    <v-select label="部门" v-model="changer.departmentID" :items="globaldata.departments"
                                        item-title="name" item-value="ID">
                                    </v-select>
                                    <v-select label="岗位" v-model="changer.positionID" :items="globaldata.positions"
                                        item-title="name" item-value="ID">
                                    </v-select>
                                    <v-text-field
                                        :disabled="(changer.positionID == tableSelected[0].positionID) && (changer.departmentID == tableSelected[0].departmentID)"
                                        label="调岗原因" v-model="changer.cause"></v-text-field>
                                </v-form>
                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn @click="isActive.value = false">取消</v-btn>
                                    <v-btn @click="changeDepartmentAndPosition">修改</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-col>
            </v-row>
            <v-data-table v-model="tableSelected" :headers="headers" :items="selectResult" item-value="staffID"
                items-per-page="15" return-object show-select>
                <template v-slot:item.departmentID="{ value }">
                    {{ globaldata.departmentMap.get(value) }}
                </template>
                <template v-slot:item.positionID="{ value }">
                    {{ globaldata.positionMap.get(value) }}
                </template>
            </v-data-table>
        </template>
    </Maintem>
</template>
<script>
export default {
    name: "人员信息"
}
</script>