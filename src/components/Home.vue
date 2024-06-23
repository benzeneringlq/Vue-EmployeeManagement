<script setup>
import { ref, onBeforeMount } from 'vue'
import { callApi } from "../global.js"

const data = ref([])
onBeforeMount(() => {
	data.value = callApi('/api/data/getdata', "Position", 'text/plain')
	.then()=> {
		console.log(data)
	}

})

</script>

<template>
	<!-- <v-btn @click="getData()"> 获取数据 </v-btn>
    <v-btn @click="getDataFromDouban()"> 从豆瓣获取 </v-btn>
    <input> -->
	<v-item-group selected-class="bg-primary overflow-y:auto">
		<!-- v-if="data.length > 0" -->
		<v-container>
			<v-row>
				<v-col v-for="item in data" :key=item.name cols="4" md="3">
					<v-item v-slot="{ selectedClass, toggle }">
						<v-card :class="['d-flex align-center', selectedClass]" height="400" dark @click="toggle">
							<div class="text-h8 flex-grow-1 text-center">
								<!-- <img src="https://img1.doubanio.com/view/subject/s/public/s1070959.jpg" width="240"> -->
								<!-- <v-img :width="240" cover :src="/douban/view/subject/s/public/s1070959.jpg" class="mt-0 mx-auto"></v-img> -->
								<!-- {{ isSelected ? 'Selected' : 'Click Me!' }} -->
								<div class="text-h5">{{ item.name }}</div>
								<!-- <v-card-title class="text-h5 mx-n12">{{ item.title }}</v-card-title>
                                <v-card-text>
                                    Body text
                                </v-card-text> -->
							</div>
						</v-card>
					</v-item>
				</v-col>
			</v-row>
		</v-container>
	</v-item-group>
</template>
<script>
export default {
	name: "HomeView"
}
</script>