<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue';
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
const selectResult = ref([])
const tableSelected = ref([])
const selectResultLength = computed(() => tableSelected.value.length)
const departmentType = ref([])
const filter = reactive({
    id: '',
    name: '',
    type: '',
    TEL: '',
    fax: '',
    description: '',
    superior: '',
    foundingTime: '',
})
const newer = reactive({
    name: '',
    type: '',
    establishmentQuantity: ''
})
async function update() {
    let data = {
        DepartmentID: tableSelected.value[0].DepartmentID,
        name: newer.name,
        type: newer.type,
        establishmentQuantity: newer.establishmentQuantity
    }
    let result = await globaldata.updateDepartment(data)
    toast.info("修改成功"+JSON.stringify(result, null, 2));
    submit()
}
async function deleteFun() {
    console.log(tableSelected.value[0].ID)
    let result = await globaldata.deleteDepartment(tableSelected.value[0].DepartmentID)
    toast.info("删除成功");
    submit()
}
async function insert() {
    let result = await globaldata.insertDepartment(newer)
    toast.info("添加成功,主键为:"+result);
    submit()
}
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
        <template v-slot:breadcrumb>
            <v-breadcrumbs class="breadcrumb" :items="['部门管理']"></v-breadcrumbs>
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
            <v-row justify="first">
                <v-col cols="1">
                    <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn color="blue-darken-2" v-bind="activatorProps">
                                新增
                            </v-btn></template>
                        <template v-slot:default="{ isActive }">
                            <v-card title="新增">
                                <v-form ref="insertForm">

                                    <v-text-field label="部门名称" v-model="newer.name"></v-text-field>
                                    <v-combobox label="部门类型" v-model="newer.type" :items="departmentType"> </v-combobox>
                                    <v-text-field label="电话" v-model="newer.TEL"></v-text-field>
                                    <v-text-field label="传真" v-model="newer.fax"></v-text-field>
                                    <v-text-field label="描述" v-model="newer.description"></v-text-field>
                                    <v-text-field label="上级部门" v-model="newer.superior"></v-text-field>
                                </v-form>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="warning" @click="isActive.value = false">
                                        取消
                                    </v-btn>
                                    <v-btn color="#21a675" @click="insert">提交</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-col>
                <v-col cols="1">
                    <v-btn :disabled="!(selectResultLength == 1)" color="error" @click="deleteFun">
                        删除
                    </v-btn>
                </v-col>
                <v-col cols="1">
                    <v-dialog max-width="500">
                        <template v-slot:activator="{ props: activatorProps }">

                            <v-btn :disabled="(!selectResultLength == 1)" color="warning" v-bind="activatorProps">
                                修改
                            </v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card title="修改">
                                <v-form ref="updateForm">
                                    <v-text-field label="部门名称" v-model="newer.name"></v-text-field>
                                    <v-combobox label="部门类型" v-model="newer.type" :items="departmentType"> </v-combobox>
                                    <v-text-field label="电话" v-model="newer.TEL"></v-text-field>
                                    <v-text-field label="传真" v-model="newer.fax"></v-text-field>
                                    <v-text-field label="描述" v-model="newer.description"></v-text-field>
                                    <v-text-field label="上级部门" v-model="newer.superior"></v-text-field>
                                </v-form>
                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn @click="isActive.value = false">取消</v-btn>
                                    <v-btn @click="update">修改</v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-col>
            </v-row>




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