<template>
  <div v-if="loading"></div>
  <div v-else-if="!loggedIn">
    <h3 style="margin-top: 10%">
      It seems you're not authorised yet. Please click the <b>Login</b> button
      below to authorise yourself.
    </h3>
    <center>
      <button class="small button" @click="redirectLogin">Login</button>
    </center>
  </div>
  <div v-else-if="hasAccess" id="edit" class="section">
    <img
      class="avatar unselectable"
      draggable="false"
      :src="avatarURL"
      alt="User Profile"
    />
    <h2>{{ user.username }}#{{ user.discriminator }}</h2>
    <form class="center" @submit.prevent="updateProfile">
      <div class="input-holder">
        <input
          v-model="description"
          class="input unselectable"
          type="text"
          placeholder=" "
        />
        <div class="placeholder">Description</div>
      </div>
      <br />
      <div class="input-holder">
        <input
          v-model="banner"
          class="input unselectable"
          type="text"
          placeholder=" "
        />
        <div class="placeholder">Banner</div>
      </div>
      <br />
      <div
        v-if="selfUser.profile.badges.lead || selfUser.profile.badges.admin"
        style="
          display: inline-block;
          flex-flow: row wrap;
          justify-content: center;
          align-items: center;
        "
      >
        <h2>Badges</h2>
        <label class="container"
          >Administrator
          <input v-model="badges.admin" type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Moderator
          <input v-model="badges.mod" type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Bot Reviewer Team
          <input v-model="badges.approvalLvl2" type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Bot Reviewer
          <input v-model="badges.approval" type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Verified
          <input v-model="badges.verified" type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Contributor
          <input v-model="badges.contributor" type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Bug Hunter Expert
          <input v-model="badges.hunterLvl2" type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Bug Hunter
          <input v-model="badges.hunter" type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="container"
          >Supporter
          <input v-model="badges.supporter" type="checkbox" />
          <span class="checkmark"></span>
        </label>
      </div>
      <center>
        <button class="button" style="margin-top: 5%">Update</button>
      </center>
    </form>
    <center>
      <button class="button" style="margin-top: 1%" @click="redirectBack">
        Back
      </button>
    </center>
  </div>
  <div v-else-if="loggedIn && !hasAccess">
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
      avatarURL: "",
      badges: {},
      banner: "",
      description: "",
      hasAccess: false,
      loading: true,
      loggedIn: false,
      selfUser: {},
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
        this.selfUser = req.data;

        if (req.data.user.id === this.user.id) {
          this.loggedIn = true;
          this.hasAccess = true;
        } else if (
          req.data.profile.badges.lead ||
          req.data.profile.badges.admin
        ) {
          this.loggedIn = true;
          this.hasAccess = true;
        }
      });
    },
    async fetchUser() {
      await axios
        .get(`http://localhost:3000/api/v1/users/${this.$route.params.action}`)
        .then((req) => {
          this.avatarURL = `https://cdn.discordapp.com/avatars/${req.data.user.id}/${req.data.user.avatar}.png`;
          this.user = req.data.user;
          this.banner = req.data.user.profile.banner;
          this.description = req.data.user.profile.description;
          this.badges = req.data.user.badges;
          setTimeout(() => (this.loading = false), 400);
        });
    },
    async updateProfile() {
      if (this.banner && this.banner.length !== 0) {
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
                badges: this.badges,
                banner: this.banner,
                description: this.description,
              },
              {
                headers: {
                  Authorization: process.env.authToken,
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
      } else {
        await axios
          .patch(
            `http://localhost:3000/api/v1/users/${this.$route.params.action}`,
            {
              badges: this.badges,
              banner: this.banner,
              description: this.description,
            },
            {
              headers: {
                Authorization: process.env.authToken,
              },
            }
          )
          .catch(() => {});
      }

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
