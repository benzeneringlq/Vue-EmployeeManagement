import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue';


async function testAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("hello globa.js")
      resolve("hello111")
    }, 1000);

  })
}
function testFunction(employee) {
  employee['name'] = '信息212李明'
  employee['gender'] = 'true'
  employee['idNumber'] = 'A123456789'
  employee['departmentID'] = '1'
  employee['joinDate'] = '2023-06-01'
  employee['workStartDate'] = '2023-06-15'
  employee['employmentType'] = '正式'
  employee['source'] = '校园招聘'
  this.toast.info("OK!");
}
const useGlobalData = defineStore('globalData', {
  state: () => ({
    Probationstatus: ref([]),
    departments: ref([]),
    positions: ref([]),
    departmentMap: new Map(),
    positionMap: new Map(),
  }),
  actions: {
    async dimStaff (data){
      let result = await this.callApi('/api/staff/dimStaff ', data, 'text/plain')
      return result
    },
    async updateStaff (data){
      let result = await this.callApi('/api/staff/changeDepartmentAndPosition ', data, 'text/plain')
      return result
    },
    async changeDepartmentAndPosition(data) {
      let result = await this.callApi('/api/staff/changeDepartmentAndPosition ', data, 'text/plain')
      return result
    },
    async getPosTransForm(data) {
      let result = await this.callApi('/api/form/getPosTransForm ', data, 'text/plain')
      return result
    },
    async getDepTransForm(data) {
      let result = await this.callApi('/api/form/getDepTransForm ', data, 'text/plain')
      return result
    },
    async getDimForm(data) {
      let result = await this.callApi('/api/form/getDimForm ', data, 'text/plain')
      return result
    },
    async getNewForm(data) {
      let result = await this.callApi('/api/form/getNewForm ', data, 'text/plain')
      return result
    },
    async getMonthlyForm(data) {
      let result = await this.callApi('/api/form/getMonthlyForm ', data, 'text/plain')
      return result
    },
    async deleteStaff(data) {
      let result = await this.callApi('/api/staff/deleteStaff ', data, 'text/plain')
      return result
    },
    async deletePosition(data) {
      let result = await this.callApi('/api/position/deletePosition ', data, 'text/plain')
      return result
    },
    async updatePosition(data) {
      let result = await this.callApi('/api/position/updatePosition ', data, 'application/json')
      return result
    },
    async insertPosition(data) {
      let result = await this.callApi('/api/position/insertPosition ', data, 'application/json')
      return result
    },
    async selectPosition(filter) {
      let result = await this.callApi('/api/position/selectPosition ', filter, 'application/json')
      return result
    },
    async selectDepartment(filter) {
      let result = await this.callApi('/api/department/selectDepartment ', filter, 'application/json')
      return result
    },
    async selectDimission(filter) {
      let result = await this.callApi('/api/dimission/selectDimission ', filter, 'application/json')
      return result
    },
    async selectProbation(filter) {
      // console.log(JSON.stringify(filter))
      let result = await this.callApi('/api/probation/selectProbation', filter, 'application/json')
      return result
    },
    async select(filter) {
      let result = await this.callApi('/api/staff/selectStaff', filter, 'application/json')
      return result
    },
    async getData() {
      let result = await this.callApi('/api/data/getIDNameBytable', "Department", 'text/plain')
      this.departments = [...result]
      result.map((obj) => {
        this.departmentMap.set(obj.ID, obj.name);
      });

      result = await this.callApi('/api/data/getIDNameBytable', "Position", 'text/plain')
      this.positions = [...result]
      this.positions.forEach((item) => {
        this.positionMap.set(item.ID, item.name)
      })
      result = await this.callApi('/api/probation/getProbationStatus', "1", 'text/plain')
      // this.Probationstatus = [...new Set(result.map((item) => item.status))] 已改成查询时去重
      this.Probationstatus = [...result]
      return
    },
    async callApi(argsUrl, argsData, argsContentType) {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: argsUrl, //'/api/data/getdata',
        headers: {
          'Content-Type': argsContentType // 'text/plain'
        },
        data: argsData
      }
      return new Promise(resolve => {
        axios
          .request(config)
          .then((response) => {
            // console.log(response.data)
            resolve(response.data)
          })
          .catch((error) => {
            console.log(error)
          })

      })
    }

  }
})
const testFlag = true
export { testFlag, testFunction, useGlobalData }
