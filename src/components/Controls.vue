<template>
	<div class="controls container mx-auto flex justify-between">
		<div class="left flex ">
			<round-button
				class="primary mr-3"
				@click="elementAdded"
			><z-icon>add</z-icon></round-button>
			<round-search-bar
				@input="searchUpdated"
			/>
		</div>
		<h2 class="center title text-center">{{ title }}</h2>
		<round-select
			class="right"
			@select="pageSizeUpdated"
		/>
	</div>
</template>

<style lang="stylus">
.controls
	margin 2rem auto

	.left
		margin-right auto

	.title
		margin-top 0.6em

	.right
		margin-left auto
</style>


<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

import RoundSelect from '@/components/Form/RoundSelect.vue'
import RoundButton from '@/components/Form/RoundButton.vue'
import RoundSearchBar from '@/components/Form/RoundSearchBar.vue'
import ZIcon from '@/components/ZIcon.vue'

@Component({
	components: {
		RoundSelect,
		RoundButton,
		RoundSearchBar,
		ZIcon,
	}
})
export default class Controls extends Vue {
	@Prop({ type: String, default: '_Courses_' }) readonly title!: string;

	@Emit('search-updated')
	searchUpdated (searchString: string) {
		return searchString
	}

	@Emit('page-size-updated')
	pageSizeUpdated (pageSize: number) {
		return pageSize
	}

	@Emit('element-added')
	elementAdded () { }
}
</script>
