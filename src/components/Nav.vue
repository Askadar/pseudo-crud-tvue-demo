<template>
	<nav id="nav">
		<link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet">
		<div class="container mx-auto flex items-center">
			<router-link to="/" class="logo">Wiz Courses</router-link>
			<router-link to="/">Courses</router-link> |
			<router-link to="/users">Users</router-link> |
			<router-link to="/about" class="about">about</router-link>
		</div>
	</nav>
</template>

<style lang="stylus">
@require '../assets/variables'
@require '../assets/transitions'

#nav
	// padding 0 32px
	background color-main
	color color-main--lighten

	a
		// font-weight bold
		color lighten(@color, 20%)
		text-decoration none
		display inline-block
		margin 0 0.5rem
		padding 0 0.5rem
		line-height 3em
		tr()

		&.about
			color color-main--lighten

		&.logo
			margin-right auto
			color color-white
			// pseudo-logo-pseudo-font
			font-weight 200
			font-family cursive

			&:hover
				text-shadow 0 0 8px color-primary

		&:hover
			color darken(color-white, 25%)

		&.router-link-exact-active
			color color-white
</style>
