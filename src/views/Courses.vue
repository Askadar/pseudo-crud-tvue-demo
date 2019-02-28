<template>
	<div class="courses">
		<controls page="courses" title="Courses" />
		<data-table :data="courses" />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Controls from '@/components/Controls.vue'; // @ is an alias to /src
import DataTable from '@/components/DataTable.vue' // @ is an alias to /src

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

	async mounted() {
		const courses = (await api.get('/courses')).data
		this.courses = courses
	}
}
</script>
