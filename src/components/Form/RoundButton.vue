<template>
	<button
		type="button"
		class="button rounded-full"
		@click="$emit('click')"
	>
		<slot></slot>
	</button>
</template>

<style lang="stylus">
json('../../assets/variables.json')

.button
	box-shadow-color = #020202
	width 3rem
	height @width
	display block
	box-shadow 0 0 2px 0 box-shadow-color
	transition tr-time box-shadow ease-in-out
	background white
	color color-main

	&.shaded
		color lighten(@color, 50%)

	&.small
		width 2.5rem
		height @width
		margin 0.25rem

	&.disabled, &:disabled
		background #ccc
		cursor default
		box-shadow 0 0 1px 0 box-shadow-color

	&:focus
		outline none
		box-shadow @box-shadow, 0 0 0px 2px #7aadff
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({

})
export default class RoundButton extends Vue {
	@Prop({ type: String, default: '_ButtonName_' }) readonly title!: string;
}
</script>
