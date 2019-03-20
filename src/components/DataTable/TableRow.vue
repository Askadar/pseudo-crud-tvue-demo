<template>
	<tr ref="row">
		<td
			v-for="{ key, descriptor, classComposer } in columns"
			:key="key"
			:contenteditable="editing"
			:class="classComposer ? classComposer(data[key]) : null"
			@input="$evt => editorData[key] = $evt.target.innerText"
		>{{ !descriptor ? data[key] : descriptor(data[key]) }}</td>
		<td key="actions" class="actions">
			<template v-if="editing">
				<round-button
					key="apply"
					class="primary"
					@click="apply"
				><z-icon>apply</z-icon></round-button>
				<round-button
					key="cancel"
					class="warn"
					@click="cancel"
				><z-icon>cancel</z-icon></round-button>
			</template>
			<template v-else>
				<round-button
					key="edit"
					class="sub"
					@click="edit"
				><z-icon>edit</z-icon></round-button>
				<round-button
					key="remove"
					class="danger"
					@click="remove"
				><z-icon>delete</z-icon></round-button>
			</template>
		</td>
	</tr>
</template>

<style lang="stylus">
@require '../../assets/variables'
</style>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

import RoundButton from '@/components/Form/RoundButton.vue'
import Pagination from './Pagination.vue'
import ZIcon from '@/components/ZIcon.vue'

import { Course, User } from '@/api/data'
import { TranscribedColumn } from './columnsTranscribeMixin'

@Component({
	components: {
		RoundButton,
		Pagination,
		ZIcon,
	}
})
export default class TableRow extends Vue {
	@Prop({
		type: Array,
		default: () => ([{ key: '_courses_' }, { key: '_users_' }])
	})
	readonly columns!: TranscribedColumn[];

	@Prop({
		type: Object,
		default: () => ({ _courses_: '_course-name_', _users_: '_user-name_' })
	})
	readonly data!: Course|User;

	editorData!: Course|User
	editing = false

	assignData () { this.editorData = { ...this.data } }
	created () {
		this.assignData()
	}

	edit () {
		this.assignData()
		this.editing = true
	}

	@Emit('row-edited')
	apply () {
		this.editing = false
		return this.editorData
	}

	cancel () {
		this.editing = false
		this.assignData()
	}

	@Emit('row-removed')
	remove () {
		return this.data.id
	}

}
</script>
