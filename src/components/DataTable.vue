<template>
	<table class="table container mx-auto">
		<tr class="table__heading">
			<th v-for="column in columns" :key="column">
				{{ column }}
			</th>
			<th key="actions" class="actions">
				actions
			</th>
		</tr>
		<tr v-for="(row, index) in data" :key="index" :class="{
			odd: index % 2 === 1
		}">
			<td v-for="key in columns" :key="key">
				{{ row[key] }}
			</td>
			<td key="actions" class="actions">
				<round-button class="sub"><z-icon>edit</z-icon></round-button>
				<round-button class="danger"><z-icon>delete</z-icon></round-button>
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

		&.actions
			width 10rem

	.table__heading
		background color-main--lighten
		color color-white
		text-transform uppercase

	tr
		background #ffffff

		td
			padding 0.8rem 1.6rem

			// background none
			&.actions
				display flex
				justify-content space-around

		&.odd
			background #fafafa
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import RoundButton from '@/components/Form/RoundButton.vue';
import ZIcon from '@/components/ZIcon.vue';

@Component({
	components: {
		RoundButton,
		ZIcon,
	}
})
export default class DataTable extends Vue {
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
