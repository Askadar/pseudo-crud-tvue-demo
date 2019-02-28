<template>
	<div class="search-bar-wrap">
		<round-button class="sub z-icon" @click="$emit('search')">&#xe801;</round-button>
		<input
			:value="value"
			type="search"
			class="input adjacent to-left"
			@input="$e => input($e.target.value)"
		/>
	</div>
</template>

<style lang="stylus">
.search-bar-wrap
	height 3rem
	width 11rem
	display flex

	.button
		margin-right - @height
		z-index 1
		flex 0 0 @height
		box-shadow none

	.input
		padding-right 1em
		padding-left 1.5rem + @padding-right
		flex 1 0
		min-width 4em
		border-radius @height
		box-shadow 0 0 2px 0 rgba(0, 0, 0, 0.5)
		transition tr-time min-width ease-in-out
</style>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import RoundButton from '@/components/Form/RoundButton.vue';

@Component({
	components: {
		RoundButton
	}
})
export default class RoundSearchBar extends Vue {
	@Prop({ type: String, default: '_ButtonName_' }) readonly title!: string;

	value: string = ''

	@Emit('input')
	input(value: string) {
		this.value = value
	}
}
</script>
