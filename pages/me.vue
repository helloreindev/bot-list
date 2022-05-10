<template>
  <center>
    <div v-if="loading"></div>
    <div v-else-if="!loggedIn">
      <h3 style="margin-top: 10%">
        It seems you're not authorised yet. Please click the <b>Login</b> button
        below to authorise yourself.
      </h3>
      <button class="button" @click="redirectLogin">Login</button>
    </div>
  </center>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfilePage",
  data() {
    return {
      loading: true,
      loggedIn: false,
      user: {},
    };
  },
  mounted() {
    this.$nextTick(async () => {
      await this.fetchSelfUser();
      await this.fetchLogin();
    });

    setTimeout(() => (this.loading = false), 200);
  },
  methods: {
    fetchLogin() {
      if (this.loggedIn) {
        this.$router.push(`/user/${this.user.id}`);
      }
    },
    async fetchSelfUser() {
      await axios.get(`http://localhost:3000/api/v1/users/@me`).then((req) => {
        this.loggedIn = true;
        this.loading = false;
        this.user = req.data.user;
      });
    },
    redirectLogin() {
      location.href = "/login?backUrl=me";
    },
  },
};
</script>

<style></style>
