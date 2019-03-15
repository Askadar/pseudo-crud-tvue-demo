<template>
	<div class="search-bar-wrap">
		<round-button class="sub z-icon" @click="search">
			<z-icon>search</z-icon>
		</round-button>
		<input
			:value="searchString"
			type="search"
			class="input adjacent to-left"
			@input="$e => input($e.target.value)"
		/>
	</div>
</template>

<style lang="stylus">
json('../../assets/variables.json')

.search-bar-wrap
	height 3rem
	width 11rem
	display flex

	.button
		margin-right - @height
		z-index 1
		flex 0 0 @height
		// overlays input's shadow, but oh well for now
		// box-shadow none

	.input
		padding-right 1em
		padding-left 2.5rem + @padding-right
		flex 1 0
		min-width 4em
		border-radius @height
		box-shadow 0 0 2px 0 rgba(0, 0, 0, 0.5)
		transition tr-time box-shadow ease-in-out

		&:focus
			outline none
			box-shadow @box-shadow, 0 0 0px 2px rgba(122, 173, 255, 0.5)
</style>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import RoundButton from '@/components/Form/RoundButton.vue';
import ZIcon from '@/components/ZIcon.vue';

@Component({
	components: {
		RoundButton,
		ZIcon,
	}
})
export default class RoundSearchBar extends Vue {
	@Prop({ type: String, default: '_ButtonName_' }) readonly title!: string;

	searchString: string = ''

	@Emit('input')
	input(searchString: string) {
		this.searchString = searchString
	}
	@Emit('search')
	search() {
		return this.searchString
	}
}
</script>
