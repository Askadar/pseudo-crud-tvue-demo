<template>
	<div class="select-wrap">
		<div class="before" />
		<span class="arrow z-icon">&#xf107;</span>
		<select>
			<option value="1">one</option>
			<option value="2">two</option>
			<option value="3">three</option>
		</select>
		<div class="after" />
	</div>
</template>

<style lang="stylus">
.select-wrap
	position relative
	display block
	height 3rem
	width 11rem
	padding 0rem 3rem

	// background red
	select
		padding 0
		width 5rem
		height @height
		background white
		appearance none

		&::-ms-expand
			display none

	.arrow
		position absolute
		right 3.2em
		top 0.95em
		pointer-events none
		user-select none

	.before, .after
		content ''
		display block
		position absolute
		top 0
		height @height
		width @height
		border-radius 100%
		background white
		z-index -1

	.before
		left (@height / 2)

	.after
		right (@height / 2)
</style>
