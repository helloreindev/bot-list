<template>
  <div v-if="loading"></div>
  <div v-else-if="!loggedIn">
    <h3 style="margin-top: 10%">
      It seems you're not authorised yet. Please click the <b>Login</b> button
      below to authorise yourself.
    </h3>
    <center>
      <button @click="redirectLogin"><span class="text">Login</span></button>
    </center>
  </div>
  <div v-else-if="hasAccess">
    <h2>{{ user.username }}#{{ user.discriminator }}</h2>
    <form @submit.prevent="updateProfile">
      <div>
        <input v-model="description" type="text" placeholder="Description" />
      </div>
      <div>
        <input v-model="banner" type="text" placeholder="Banner URL" />
      </div>
      <center>
        <button style="margin-top: 5%"><span class="text">Update</span></button>
      </center>
    </form>
    <center>
      <button style="margin-top: 1%" @click="redirectBack">
        <span class="text">Back</span>
      </button>
    </center>
  </div>
  <div v-else>
    <h1>Error - 403</h1>
    <h2>Unauthorised</h2>
  </div>
</template>

<script>
import axios from "axios";
import { POSITION } from "vue-toastification";

export default {
  name: "ProfileEditComponent",
  data() {
    return {
      banner: "",
      description: "",
      hasAccess: false,
      loading: true,
      loggedIn: false,
      user: {},
    };
  },
  mounted() {
    this.$nextTick(async () => {
      await this.fetchUser();
      await this.checkUserOwner();
    });
  },
  methods: {
    async checkUserOwner() {
      await axios.get("http://localhost:3000/api/v1/users/@me").then((req) => {
        if (req.data.user.id === this.user.id) {
          this.hasAccess = true;
        } else if (
          req.data.profile.badges.lead ||
          req.data.profile.badges.admin
        ) {
          this.hasAccess = true;
        }
      });
    },
    async fetchUser() {
      await axios
        .get(`http://localhost:3000/api/v1/users/${this.$route.params.action}`)
        .then((req) => {
          this.loggedIn = true;
          this.user = req.data.user;
          this.banner = req.data.user.profile.banner;
          this.description = req.data.user.profile.description;
          setTimeout(() => (this.loading = false), 200);
        });
    },
    async updateProfile() {
      if (this.banner.length !== 0) {
        if (
          this.user.badges.lead ||
          this.user.badges.admin ||
          this.user.badges.mod ||
          this.user.badges.approval ||
          this.user.badges.verified ||
          this.user.badges.supporter
        ) {
          await axios
            .patch(
              `http://localhost:3000/api/v1/users/${this.$route.params.action}`,
              {
                banner: this.banner,
                description: this.description,
              },
              {
                headers: {
                  Authorization: "rein2008041501",
                },
              }
            )
            .catch(() => {});
        } else {
          return this.$toast.error("You are not allowed to add banner!", {
            position: POSITION.TOP_RIGHT,
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: true,
            hideProgressBar: false,
            closeButton: "button",
            icon: true,
            rtl: false,
          });
        }
      }

      await axios
        .patch(
          `http://localhost:3000/api/v1/users/${this.$route.params.action}`,
          {
            banner: this.banner,
            description: this.description,
          },
          {
            headers: {
              Authorization: "testtoken",
            },
          }
        )
        .catch(() => {});

      this.$toast.success("Profile Successfully Edited!", {
        position: POSITION.TOP_RIGHT,
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: true,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
    redirectBack() {
      this.$router.go(-1);
    },
    redirectLogin() {
      location.href = "/login";
    },
  },
};
</script>

<style></style>
