<template>
	<div class="container mx-auto">
		<div
			:style="tableHeight && `max-height: ${tableHeight}px`"
			class="table-wrap container"
		>
			<table class="table container">
				<tr ref="heading" class="table__heading">
					<th v-for="column in columns" :key="column">
						{{ column }}
					</th>
					<th key="actions" class="actions">
						actions
					</th>
				</tr>
				<transition-group
					v-if="dataSlice.length > 0"
					appear
					:name="transition"
					tag="tbody"
				>
					<table-row
						v-for="(row, index) in dataSlice"
						:key="row.id"
						ref="rows"
						:class="{ odd: index % 2 === 1 }"
						:data="row"
						:columns="columns"
						@row-edited="rowEdited"
						@row-removed="rowRemoved"
					/>
				</transition-group>
				<tbody v-else class="no-data">
					<tr><td colspan="3">No data found</td></tr>
				</tbody>
			</table>
		</div>
		<pagination
			:current="currentPage"
			:max="maxPage"
			@prev="currentPage -= 1"
			@select="newPage => currentPage = newPage"
			@next="currentPage += 1"
		/>
	</div>
</template>

<style lang="stylus">
@require '../../assets/variables'

.table-wrap
	// max-height 24em
	overflow hidden

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
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator'

import RoundButton from '@/components/Form/RoundButton.vue'
import TableRow from './TableRow.vue'
import Pagination from './Pagination.vue'
import ZIcon from '@/components/ZIcon.vue'

@Component({
	components: {
		RoundButton,
		TableRow,
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

	get filteredData () {
		// const f = this.filter.toLowerCase()
		const f = this.filter.toLocaleLowerCase()
		return this.data.filter(obj => {
			return this.columns.some(column => obj[column].toLocaleLowerCase().indexOf(f) > -1)
		})
	}

	@Watch('filteredData')
	filterChanged (newArr: Array<Object>, oldArr: Array<Object>) {
		if (newArr.length < oldArr.length)
			return this.currentPage = 1
	}

	@Prop({
		// type: number,
		default: 10
	})
	readonly pageSize!: number;

	@Watch('pageSize')
	pageSizeChanged (newPageSize: number, oldPageSize: number) {
		const maxPage = Math.floor(this.filteredData.length / newPageSize)
		const newPage = this.currentPage * (oldPageSize / newPageSize)

		this.calculateTableHeight()

		return this.currentPage = Math.max(
			1,
			Math.min(maxPage, Math.floor(newPage))
		)
	}

	currentPage = 1
	get dataSlice () {
		return this.filteredData.slice(
			(this.currentPage - 1) * this.pageSize,
			this.currentPage * this.pageSize
		)
	}
	get maxPage () {
		return Math.max(1, Math.ceil(this.filteredData.length / this.pageSize))
	}


	/* hackz for sake of prettyness */
	@Prop({
		type: Boolean,
		default: false
	})
	readonly noTransition!: Boolean;

	private tableHeight: number | false = false
	private transition: string | null = 'fade'

	async calculateTableHeight (retry = 0) {
		this.tableHeight = false
		// if (this.filteredData.length === 0)
		// 	return false

		await new Promise(res => setTimeout(res, 16))
		await this.$nextTick()
		try {
			// cause we know we're doing hacks
			// @ts-ignore
			this.tableHeight =
				// @ts-ignore
				this.$refs.heading.offsetHeight +
				// @ts-ignore
				(this.$refs.rows[0]._vnode.elm.offsetHeight * this.pageSize)
		} catch (err) {
			// console.warn(err)
			// just glug the error and try again, we'll just break their browser in worst case,
			// pff, who caaaares
			if (retry >= 25)
				return false
			this.calculateTableHeight(retry + 1)
		}
	}
	mounted () {
		if (this.noTransition)
			return this.transition = null
		this.calculateTableHeight()
	}
	/* hackz end */

	@Emit('row-edited')
	rowEdited (row: any) {
		return row
	}

	@Emit('row-removed')
	rowRemoved (row: any) {
		return row
	}
}
</script>
