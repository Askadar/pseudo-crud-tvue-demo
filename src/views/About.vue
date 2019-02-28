<template>
  <div class="about">
    <About msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import About from "@/components/_About.vue"; // @ is an alias to /src

@Component({
	components: {
		About
	}
})
export default class Home extends Vue {}
</script>
