<template>
  <div>
    <h2>About This Website</h2>
    <p style="display: inline">
      This is a website list for Discord bots and everything else. It's
      originally recovered from an old version of the website called
      <b>ClientCord</b> but unfortunately, <br />
      we have to stopped the service and start rewriting the entire thing to
      make a better and comfortable environment for everyone! <br />
      This website is run by
    </p>
    <div style="display: inline" class="link-card">
      <nuxt-link to="/user/516186529547288576">Reinhardt</nuxt-link>.
      <span v-if="loading" class="link-cardtext">
        <center>
          <div class="card-loader"></div>
        </center>
      </span>
      <span
        v-else-if="bannerURL"
        id="cover"
        :style="{ '--banner': 'url(' + bannerURL + ')' }"
        class="banner-bg link-cardtext"
        @click="redirect('/user/516186529547288576')"
      >
        <p class="unselectable" style="font-size: 20px; margin-right: -10px">
          <b>{{ username }}#{{ discriminator }}</b>
          <span v-if="badges.lead" style="color: #1ec9eb" class="badge-text"
            >Lead</span
          >
        </p>
        <img
          class="unselectable link-avatar"
          draggable="false"
          :src="avatarURL"
          alt="User Profile"
        />
      </span>
      <span
        v-else
        class="link-cardtext"
        @click="redirect('/user/516186529547288576')"
      >
        <p class="unselectable" style="font-size: 20px; margin-right: -10px">
          <b>{{ username }}#{{ discriminator }}</b>
        </p>
        <img
          class="unselectable link-avatar"
          draggable="false"
          :src="avatarURL"
          alt="User Profile"
        />
      </span>
    </div>
    <center>
      <button class="button small" style="margin-top: 5%" @click="backHome">
        No
      </button>
    </center>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AboutComponent",
  data() {
    return {
      avatarURL: "",
      badges: {},
      bannerURL: "",
      discriminator: "",
      loading: true,
      username: "",
    };
  },
  mounted() {
    this.$nextTick(async () => {
      await this.fetchOwner();
    });
  },
  methods: {
    backHome() {
      this.$router.push("/");
    },
    async fetchOwner() {
      await axios
        .get("http://localhost:3000/api/v1/users/516186529547288576")
        .then((req) => {
          this.avatarURL = `https://cdn.discordapp.com/avatars/${req.data.user.id}/${req.data.user.avatar}.png`;
          this.badges = req.data.user.badges;
          this.bannerURL = req.data.user.profile.banner;
          this.discriminator = req.data.user.discriminator;
          this.username = req.data.user.username;
          this.loading = false;
        });
    },
    redirect(param) {
      this.$router.push(param);
    },
  },
};
</script>

<style scoped>
#cover {
  overflow: visible;
  background-size: cover;
  background-position: center;
  outline: none !important;
}

.badge-text {
  background: rgb(10, 10, 10);
  padding: 5px 10px;
  font-size: 12px;
  text-align: center;
  border-radius: 20px;
}

.link-avatar {
  object-fit: cover;
  height: 70px;
  width: 70px;
  border-radius: 6px;
  margin-top: -150px;
  margin-right: 260px;
}

.link-card {
  position: relative;
  display: inline;
  margin-top: 3%;
  transition-duration: 0.4s;
}

.link-card .link-cardtext {
  visibility: hidden;
  width: 350px;
  height: 120px;
  left: 200%;
  margin-top: -50px;
  margin-left: -60px;
  background-color: rgb(63, 63, 63);
  color: rgb(223, 223, 223);
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: 0.4s ease;
}

.link-card:hover .link-cardtext {
  opacity: 1;
  cursor: pointer;
  visibility: visible;
}

span.banner-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    var(--banner) no-repeat;
  background-size: 100%;
}

.card-loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #3a3a3a;
  margin-top: 10%;
  align-items: center;
  width: 30px;
  height: 30px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
