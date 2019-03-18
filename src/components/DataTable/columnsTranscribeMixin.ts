import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class transcribedColumnsMixin extends Vue {
	// ts-only declaration
	@Prop() readonly columns!: [any]

	get transcribedColumns() {
		if (!this.columns)
			return []

		return this.columns.map((entry: any): {
			key: string,
			label: string,
			classComposer?: Function,
			descriptor?: Function,
		} => {
			if (typeof entry === 'string')
				return {
					key: entry,
					label: entry
				}
			else
				return {
					key: entry.key || entry.label,
					label: entry.label || entry.key,
					descriptor: entry.descriptor,// || entry.filter
					classComposer: entry.classComposer,
				}
		})
	}
}
