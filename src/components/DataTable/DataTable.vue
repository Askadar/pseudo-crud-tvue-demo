<template>
	<div class="container mx-auto">
		<table class="table container">
			<tr class="table__heading">
				<th v-for="column in columns" :key="column">
					{{ column }}
				</th>
				<th key="actions" class="actions">
					actions
				</th>
			</tr>
			<transition-group appear name="fade" tag="tbody" v-if="dataSlice.length > 0">
				<tr
					v-for="(row, index) in dataSlice"
					:key="row.id"
					:class="{ odd: index % 2 === 1 }"
				>
					<td v-for="key in columns" :key="key">
						{{ row[key] }}
					</td>
					<td key="actions" class="actions">
						<round-button class="sub" @click="$show"><z-icon>edit</z-icon></round-button>
						<round-button class="danger"><z-icon>delete</z-icon></round-button>
					</td>
				</tr>
			</transition-group>
			<tbody v-else class="no-data">
				<div>No data found</div>
			</tbody>
		</table>
		<pagination
			:current="currentPage"
			:max="maxPage"
			@prev="currentPage -= 1"
			@select="newPage => currentPage = newPage"
			@next="currentPage += 1"
		></pagination>
	</div>
</template>

<style lang="stylus">
@require '../../assets/variables'

.table
	position relative

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
			padding 0.6rem 1.6rem

			// background none
			&.actions
				display flex
				justify-content space-around

		&.odd
			background #fafafa

	.no-data
		column-span 3
		background white
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import RoundButton from '@/components/Form/RoundButton.vue';
import Pagination from './Pagination.vue';
import ZIcon from '@/components/ZIcon.vue';

@Component({
	components: {
		RoundButton,
		Pagination,
		ZIcon,
	}
})
export default class DataTable extends Vue {
	@Prop({
		type: Array,
		default: () => (['_courses_', '_users_'])
	})
	readonly columns!: [string];

	@Prop({
		type: Array,
		default: () => ([{ name: '_first-course_', user: '_first-user_' }])
	})
	readonly data!: [{ [key: string]: string }];

	@Prop({
		type: String,
		default: ''
	})
	readonly filter!: string;

	get filteredData() {
		// const f = this.filter.toLowerCase()
		const f = this.filter.toLocaleLowerCase()
		return this.data.filter(obj => {
			return this.columns.some(column => obj[column].toLocaleLowerCase().indexOf(f) > -1)
		})
	}

	@Prop({
		// type: number,
		default: 10
	})
	readonly pageSize!: number;

	currentPage = 1
	get dataSlice() {
		return this.filteredData.slice(
			(this.currentPage - 1) * this.pageSize,
			this.currentPage * this.pageSize
		)
	}
	get maxPage() {
		return Math.ceil(this.filteredData.length / this.pageSize)
	}
}
</script>
