<template>
	<table class="table container mx-auto">
		<tr class="table__heading">
			<th v-for="column in columns" :key="column">
				{{ column }}
			</th>
		</tr>
		<tr v-for="(row, index) in data" :key="index">
			<td v-for="column in row" :key="column">
				{{ column }}
			</td>
		</tr>
	</table>
</template>

<style lang="stylus">
@require '../assets/variables'

.table
	th
		padding 0.9rem 1.6rem 0.7rem
		text-align left

	.table__heading
		background color-main--lighten
		color color-white
		text-transform uppercase

	td
		padding 0.8rem 1.6rem
		background white
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import RoundButton from '@/components/Form/RoundButton.vue';

@Component({
	components: {
		RoundButton,
	}
})
export default class Controls extends Vue {
	@Prop({
		type: Array,
		default: () => (['_courses_', '_users_', 'actions'])
	}) readonly columns!: [string];

	@Prop({
		type: Array,
		default: () => ([['_first-course_', '_first-user_', 'actions']])
	}) readonly data!: [[string]];
}
</script>
