<template>
  <Layout>
    <template slot="page-bottom">
			<Feedback />
    </template>
  </Layout>
</template>

<script>
import Layout from "@vuepress/theme-default/layouts/Layout.vue";
export default {
  components: { Layout },
};
</script>
