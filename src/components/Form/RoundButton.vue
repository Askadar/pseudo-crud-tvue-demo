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
	width 3rem
	height 3rem
	display block
	box-shadow 0 0 2px 0 #020202
	transition tr-time box-shadow ease-in-out

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
