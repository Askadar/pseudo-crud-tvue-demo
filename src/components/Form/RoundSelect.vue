<template>
	<div :class="{ 'select-wrap': true, focus }">
		<span class="arrow z-icon">&#xf107;</span>
		<select
			@change="select"
			@focus="focus = true"
			@blur="focus = false"
		>
			<template v-for="item in items">
				<option
					v-if="typeof item !== 'object'"
					:key="item"
					:value="item"
					:selected="item === value"
				>
					{{ item }}
				</option>
				<option
					v-else
					:key="item.label"
					:value="item.value"
					:selected="item.value === value"
				>
					{{ item.label }}
				</option>
			</template>
		</select>
	</div>
</template>

<style lang="stylus">
json('../../assets/variables.json')

.select-wrap
	position relative
	display block
	height 3rem
	width 9rem
	padding 0rem 1rem
	background white
	border-radius 1.5rem
	box-shadow 0 0 2px 0 rgba(0, 0, 0, 0.5)
	transition tr-time box-shadow ease-in-out

	// background red
	select
		padding 0
		width 100%
		height @height
		background none
		appearance none

		&::-ms-expand
			display none

	&.focus
		box-shadow @box-shadow, 0 0 0px 2px rgba(122, 173, 255, 0.5)

		select:focus
			outline none

	.arrow
		position absolute
		right 1.2em
		top 0.95em
		pointer-events none
		user-select none
</style>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator'

@Component({
})
export default class RoundSelect extends Vue {
	@Prop({
		type: Array,
		default: () => (['5', '10', '15'])
	}) readonly items!: (string | { label: string, value: string })[]

	@Prop({
		type: String,
		default: '0'
	}) readonly value!: string

	focus = false

	@Emit('select')
	select (evt: Event) {
		return evt.target.value
	}
}
</script>
