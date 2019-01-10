<template>
  <div id="app">
    <Navbar />
    <router-view />
    <div><FlashMessage></FlashMessage></div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "app",
  components: {
    Navbar
  },
  mounted() {
    this.flashMessage.show({
      status: "success",
      title: "Welcome to ninja Smoothies",
      message: "Let us know if you need assistance!"
    });
  }
};
</script>

<style></style>
