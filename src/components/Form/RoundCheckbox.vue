<template>
	<label class="checkbox-wrap">
		<slot />
		<input
			class="checkbox"
			type="checkbox"
			:checked="checked"
			@change="$evt => change($evt.target.checked)"
		>
		<round-button class="checkmark" @click="change(!checked)"><z-icon v-show="checked">apply</z-icon></round-button>
	</label>
</template>

<style lang="stylus">
.checkbox-wrap
	input
		display none

	.checkmark
		display inline-block
		width 2em
		height @width
		text-align center
		vertical-align middle
		margin-left 1em
		// border 1px solid #000
		// background white
		border-radius 20%
</style>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

import ZIcon from '@/components/ZIcon.vue'
import RoundButton from '@/components/Form/RoundButton.vue'

@Component({
	components: {
		ZIcon,
		RoundButton,
	}
})
export default class RoundCheckbox extends Vue {
	@Prop({
		type: Boolean,
		default: false
	}) readonly value!: Boolean

	// focus = false
	checked!: Boolean
	data () {
		return { checked: this.value }
	}

	@Emit('change')
	change (checked: Boolean) {
		this.checked = checked
		return this.checked
	}
}
</script>
