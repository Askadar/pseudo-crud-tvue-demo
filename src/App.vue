<template>
  <div id="app">
    <nav id="nav">
			<div class="container mx-auto flex items-center">
				<router-link to="/" class="logo">Wiz Courses</router-link>
				<router-link to="/">Courses</router-link> |
				<router-link to="/users">Users</router-link> |
				<router-link to="/about">_About</router-link>
			</div>
    </nav>
    <router-view/>
		<link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet">
  </div>
</template>

<style lang="stylus">
// grab normalizer
// which we don't need since tailwind bundlesone
// (without option to discard it)
// @import '../node_modules/normalize.css/normalize.css'
@import './assets/tailwind'
@require './assets/transitions'

color-main = #2e303f
color-main--lighten = #575761
// 
color-sub = #64c07d
color-primary = #4e99c5
color-danger = #f44739
// 
color-white = #f5f5f5
color-white-background = #f1f1f1

body
	background color-white-background

#app
	font-family 'Raleway', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	// color #2c3e50

#nav
	// padding 0 32px
	background color-main
	color color-main--lighten

	a
		font-weight bold
		color @color
		text-decoration none
		margin 0 8px
		display inline-block
		line-height 3em
		tr()

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
