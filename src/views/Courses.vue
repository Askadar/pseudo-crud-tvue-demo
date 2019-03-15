<template>
	<div class="courses">
		<controls
			page="courses"
			title="Courses"
			@search-updated="newSearch => searchFilter = newSearch"
		/>
		<data-table
			:data="courses"
			:columns="['name', 'speaker']"
			:page-size="pageSize"
			:filter="searchFilter"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Controls from '@/components/Controls.vue' // @ is an alias to /src
import DataTable from '@/components/DataTable/DataTable.vue' // @ is an alias to /src

// mock ajax api
import api from '../api'

@Component({
	components: {
		Controls,
		DataTable,
	}
})
export default class Courses extends Vue {
	courses = []

	pageSize = 5

	searchFilter = ''

	async mounted() {
		const courses = (await api.get('/courses')).data
		this.courses = courses
	}
}
</script>
