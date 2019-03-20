import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

import RoundSelect from '@/components/Form/RoundSelect.vue'
import RoundCheckbox from '@/components/Form/RoundCheckbox.vue'
// import Pagination from './Pagination.vue'
// import ZIcon from '@/components/ZIcon.vue'

import { Course, User } from '@/api/data'
import { TranscribedColumn } from './columnsTranscribeMixin'

@Component({
})
export default class TableCell extends Vue {
	@Prop({
		type: Object,
		default: () => ({})
	})
	readonly editDescriptor!: TranscribedColumn['editDescriptor']

	@Prop({
		type: Boolean,
		default: false
	})
	readonly editing!: Boolean

	@Prop({
		type: [String, Number, Boolean],
		default: false
	})
	readonly value!: any

	@Emit('input')
	// @ts-ignore - typescript doesn't seem to be keen on providing dom event
	// and even checking them correctly per se, so who cares
	plaintextEdited (evt: Event){ return evt.target.innerText }

	@Emit('input')
	// @ts-ignore
	selectEdited (selected: string){ return selected}

	@Emit('input')
	checkboxEdited (checked: Boolean){ return checked}

	// @ts-ignore
	render(h) {
		const {
			editDescriptor, editing, value,

			$slots,

			plaintextEdited, selectEdited, checkboxEdited
		} = this

		if (!editDescriptor || !editDescriptor.inputType)
			return (<td
				attrs={{ contenteditable: editing }}
				on={{ input: plaintextEdited }}
			>
				{ $slots.default }
			</td>)

		let editor
		const inputType = editDescriptor.inputType || 'text'

		// jsx doesn't seem to work properly for some reason
		// so we're sticking with h()
		switch(inputType) {
			case 'select':
				editor = h(RoundSelect, {
					on: { select: selectEdited },
					props: {
						value,
						items: editDescriptor.selectOptions
							.map(({ key, value }) => ({ label: key, value}))
					}
				})
			break;
			case 'checkbox':
				editor = h(RoundCheckbox,
						{
							props: { value },
							on: { change: checkboxEdited }
						},
						['Deactivated'],
					)
			// default:
		}

		const innerContent = editing ?
				[editor] :
				$slots.default

		return (<td>{ innerContent }</td>)
	}
}
