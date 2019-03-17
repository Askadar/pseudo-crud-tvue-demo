<template>
	<div id="app">
		<Nav />
		<transition
			appear
			name="page"
			mode="out-in"
		>
			<router-view :key="$route.name" />
		</transition>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Nav from '@/components/Nav.vue'

@Component({
	components: {
		Nav
	}
})
export default class App extends Vue { }
</script>

<style lang="stylus">
// grab normalizer
// which we don't need since tailwind bundles one
// (without option to discard it)
// @import '../node_modules/normalize.css/normalize.css'
@require './assets/variables'
@import './assets/imports'

body
	background color-white-background

#app
	font-family 'Raleway', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
</style>
