<template>
  <center>
    <div v-if="loading"></div>
    <div v-else-if="!loggedIn">
      <h1>Hello World!</h1>
      <button @click="redirectLogin"><span class="text">Login</span></button>
    </div>
    <div v-else>
      <h1>Hello World! {{ user.username }}#{{ user.discriminator }}</h1>
      <button @click="redirectMe"><span class="text">Profile</span></button>
    </div>
  </center>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeComponent",
  data() {
    return {
      loading: true,
      loggedIn: false,
    };
  },
  mounted() {
    this.$nextTick(async () => {
      await this.fetchUser();
    });

    setTimeout(() => (this.loading = false), 200);
  },
  methods: {
    async fetchUser() {
      await axios.get(`http://localhost:3000/api/v1/users/@me`).then((req) => {
        this.loading = false;
        this.loggedIn = true;
        this.user = req.data.user;
      });
    },
    redirectLogin() {
      location.href = "/login";
    },
    redirectMe() {
      this.$router.push("/me");
    },
  },
};
</script>

<style></style>
