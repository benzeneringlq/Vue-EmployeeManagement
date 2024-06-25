<script setup>
import { ref, reactive, computed, onBeforeMount } from 'vue';
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

const selectResult = ref([])
const tableSelected = ref([])
const selectResultLength = computed(() => tableSelected.value.length)
const tableSelectedID = computed(() => {
    if (tableSelected.value.length == 1) {
        tableSelected.value[0].positionID
    }
})
const positionType = ref([])
const newer = reactive({
    name: '',
    type: '',
    establishmentQuantity: ''
})
const filter = reactive({
    positionID: '',
    name: '',
    type: ''
})
async function update() {
    let data = {
        positionID: tableSelected.value[0].positionID,
        name: newer.name,
        type: newer.type,
        establishmentQuantity: newer.establishmentQuantity
    }
    let result = await globaldata.updatePosition(data)
    toast.info("修改成功"+JSON.stringify(result, null, 2));
    submit()
}
async function deleteFun() {
    console.log(tableSelected.value[0].positionID)
    let result = await globaldata.deletePosition(tableSelected.value[0].positionID)
    toast.info("删除成功");
    submit()
}
async function insert() {
    let result = await globaldata.insertPosition(newer)
    toast.info("添加成功,主键为:"+result);
    submit()
}
async function submit() {
    let result = await globaldata.selectPosition(filter)
    selectResult.value = [...result]
    console.log(selectResult.value)
    tableSelected.value=[]
    // toast.info(JSON.stringify(result, null, 2));
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
                        <v-text-field label="岗位编号" v-model="filter.positionID"></v-text-field>
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

                                    <v-text-field label="岗位名称" v-model="newer.name"></v-text-field>

                                    <v-combobox label="岗位类型" v-model="newer.type" :items="positionType">
                                    </v-combobox>

                                    <v-text-field label="岗位编制" v-model="newer.establishmentQuantity"></v-text-field>

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
                                    <v-text-field label="岗位名称" v-model="newer.name"></v-text-field>

                                    <v-combobox label="岗位类型" v-model="newer.type" :items="positionType">
                                    </v-combobox>
                                    <v-text-field label="岗位编制" v-model="newer.establishmentQuantity"></v-text-field>
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




            <v-data-table v-model="tableSelected" :headers="headers" :items="selectResult" item-value="positionID"
                items-per-page="15" return-object show-select>
                <template v-slot:item.foundingTime="{ value }">
                    {{ (new Date(value)).toLocaleDateString() }}
                </template>
            </v-data-table>
            <h1>{{ tableSelectedID }}</h1>
            <pre>{{ selectResultLength }}</pre>
            <pre>{{ tableSelected }}</pre>
        </template>
    </Maintem>
</template>
<script>
export default {
    name: "岗位管理"
}
</script>