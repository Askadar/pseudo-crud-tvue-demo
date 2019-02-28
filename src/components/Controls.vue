<template>
	<div class="controls container mx-auto flex justify-between">
		<div class="left flex ">
			<round-button class="primary z-icon mr-3">&#xe802;</round-button>
			<round-search-bar />
		</div>
		<h2 class="center title text-center">{{title}}</h2>
		<round-select class="right"/>
	</div>
</template>

<style lang="stylus">
.controls
	margin 2rem auto

	& > *
		max-width 33%

	.left
		margin-right auto

	.title
		margin-top 0.6em

	.right
		margin-left auto
</style>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import RoundSelect from '@/components/Form/RoundSelect.vue';
import RoundButton from '@/components/Form/RoundButton.vue';
import RoundSearchBar from '@/components/Form/RoundSearchBar.vue';

@Component({
	components: {
		RoundSelect,
		RoundButton,
		RoundSearchBar,
	}
})
export default class Controls extends Vue {
	@Prop({ type: String, default: "_Courses_" }) readonly title!: string;
}
</script>
