import { Component, Prop, Vue } from 'vue-property-decorator'

export interface TranscribedColumn {
	key: string,
	label: string,
	classComposer?: Function,
	descriptor?: Function,
	editDescriptor?: {
		inputType?: string,
		selectOptions?: { key: string, value: string }[]
	},
}

@Component
export default class transcribedColumnsMixin extends Vue {
	// ts-only declaration
	@Prop() readonly columns!: [any]

	get transcribedColumns() {
		if (!this.columns)
			return []

		return this.columns.map((entry: TranscribedColumn): TranscribedColumn => {
			if (typeof entry === 'string')
				return {
					key: entry,
					label: entry
				}
			else
				return {
					key: entry.key || entry.label,
					label: entry.label || entry.key,
					// ...entry // ma-a-a-aybe?
					classComposer: entry.classComposer,
					descriptor: entry.descriptor,// || entry.filter
					editDescriptor: entry.editDescriptor
				}
		})
	}
}
