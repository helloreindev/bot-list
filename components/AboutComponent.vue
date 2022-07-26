<template>
  <div>
    <link
      rel="stylesheet"
      href="https://site-assets.fontawesome.com/releases/v6.1.1/css/all.css"
    />
    <h2>About This Website</h2>
    <p style="display: inline">
      This is a website list for Discord bots and everything else. It's
      originally recovered from an old version of the website called
      <b>ClientCord</b> but unfortunately, <br />
      we have to stopped the service and start rewriting the entire thing to
      make a better and comfortable environment for everyone! <br />
      This website is run by
    </p>
    <ProfileCardComponent name="Reinhardt" :profileLink="profileLink" :username="username" :avatarURL="avatarURL" :badges="badges" :bannerURL="bannerURL" :loading="loading" :discriminator="discriminator" :description="description" />
    <center>
      <button class="button small" style="margin-top: 5%" @click="backHome">
        Home
      </button>
    </center>
  </div>
</template>

<script>
import axios from "axios";
import ProfileCardComponent from "./User/ProfileCardComponent.vue";

export default {
  name: "AboutComponent",
  components: { ProfileCardComponent },
  data() {
    return {
      avatarURL: "",
      badges: {},
      bannerURL: "",
      description: "",
      discriminator: "",
      loading: true,
      profileLink: "",
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
          this.description = req.data.user.profile.description;
          this.discriminator = req.data.user.discriminator;
          this.profileLink = `/user/${req.data.user.id}`;
          this.username = req.data.user.username;
          this.loading = false;
        });
    }
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
  display: flex;
  position: absolute;
  bottom: 50px;
  left: 13px;
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
  margin-top: 0px;
  margin-left: -70px;
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

.tooltip-badge {
  position: relative;
  margin-top: 3%;
  transition-duration: 0.2s;
}

.tooltip-badge .tooltip-badgetext {
  visibility: hidden;
  width: 100px;
  height: 15px;
  bottom: 120%;
  left: 50%;
  margin-left: -50px;
  margin-bottom: -5px;
  background-color: rgb(10, 10, 10);
  color: rgb(223, 223, 223);
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: 0.2s ease;
}

.tooltip-badge .tooltip-badgetext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -7px;
  border-width: 7px;
  border-style: solid;
  border-color: rgb(10, 10, 10) transparent transparent transparent;
}

.tooltip-badge:hover .tooltip-badgetext {
  opacity: 1;
  visibility: visible;
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
