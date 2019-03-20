<template>
	<div class="courses">
		<controls
			page="courses"
			title="Courses"
			@search-updated="newSearch => searchFilter = newSearch"
			@page-size-updated="newPageSize => pageSize = newPageSize"
			@element-added="courseAdded"
		/>
		<data-table
			:data="courses"
			:columns="['name', 'speaker']"
			:page-size="pageSize"
			:filter="searchFilter"
			@row-edited="courseEdited"
			@row-removed="courseRemoved"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Controls from '@/components/Controls.vue' // @ is an alias to /src
import DataTable from '@/components/DataTable/DataTable.vue' // @ is an alias to /src

import { Course } from '@/api/data'
// mock ajax api
import api from '../api'

@Component({
	components: {
		Controls,
		DataTable,
	}
})
export default class Courses extends Vue {
	courses: Array<Course> = []

	pageSize = 5

	searchFilter = ''

	async mounted () {
		const courses = (await api.get('/courses')).data
		this.courses = courses
	}

	courseAdded () {
		// we could do it properly, but why bother
		this.courses.splice(0, 0, new Course({
			name: 'New course name...', speaker: 'New course speaker...'
		}))
	}

	async courseEdited (course: Course) {
		const result = await api.post(`/courses/${course.id}`, course).catch(console.warn)
		const index = this.courses.findIndex((a: Course) => a.id === course.id)
		// this.courses[index] = result.data
		this.courses.splice(index, 1, result.data)
	}

	async courseRemoved (courseId: string) {
		const result = await api.delete(`/courses/${courseId}`).catch(console.warn)
		const index = this.courses.findIndex((a: Course) => a.id === courseId)
		// this.courses[index] = result.data
		if (result.data.deleted)
			this.courses.splice(index, 1)
	}
}
</script>
