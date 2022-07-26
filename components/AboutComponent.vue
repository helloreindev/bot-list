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
