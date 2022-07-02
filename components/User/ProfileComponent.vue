<template>
  <div>
    <center>
      <link
        rel="stylesheet"
        href="https://site-assets.fontawesome.com/releases/v6.1.1/css/all.css"
      />
      <div v-if="loading" class="loader"></div>
      <div v-else>
        <div
          v-if="bannerURL"
          id="bgslide"
          class="hero-bg"
          :style="{ '--banner': 'url(' + bannerURL + ')' }"
        >
          <img
            class="avatar unselectable"
            draggable="false"
            :src="avatarURL"
            alt="User Profile"
          />
          <div class="unselectable" style="margin-top: 2%"></div>
          <div v-if="user.badges.lead" class="tooltip">
            <i
              style="font-size: 40px; color: #1ec9eb"
              class="badge fa-3x fal fa-crown"
            ></i>
            <span
              style="color: #1ec9eb"
              class="unselectable highlight tooltiptext"
              >Project Lead</span
            >
          </div>
          <div v-if="user.badges.admin" class="tooltip">
            <i
              style="font-size: 40px; color: #6d3eb8"
              class="badge fal fa-bolt"
            ></i>
            <span class="unselectable highlight tooltiptext"
              >Administrator</span
            >
          </div>
          <div v-if="user.badges.mod" class="tooltip">
            <i
              style="font-size: 40px; color: #f52f60"
              class="badge fal fa-shield"
            ></i>
            <span class="unselectable highlight tooltiptext">Moderator</span>
          </div>
          <div v-if="user.badges.approvalLvl2" class="tooltip-expand">
            <i
              style="font-size: 40px; color: #ff7519"
              class="badge fal fa-gavel"
            ></i>
            <span class="unselectable highlight tooltiptext-expand"
              >Bot Reviewer Team</span
            >
          </div>
          <div v-if="user.badges.approval" class="tooltip">
            <i
              style="font-size: 40px; color: #dcff82"
              class="badge fal fa-gavel"
            ></i>
            <span class="unselectable highlight tooltiptext">Bot Reviewer</span>
          </div>
          <div v-if="user.badges.verified" class="tooltip">
            <i
              style="font-size: 40px; color: #5cf27d"
              class="badge fal fa-badge-check"
            ></i>
            <span class="unselectable highlight tooltiptext">Verified</span>
          </div>
          <div v-if="user.badges.contributor" class="tooltip">
            <i
              style="font-size: 40px; color: #ffff00"
              class="badge fal fa-code"
            ></i>
            <span class="unselectable highlight tooltiptext">Contributor</span>
          </div>
          <div v-if="user.badges.hunterLvl2" class="tooltip-expand">
            <i
              style="font-size: 40px; color: #ed1f29"
              class="badge fal fa-bug-slash"
            ></i>
            <span class="unselectable highlight tooltiptext-expand"
              >Bug Hunter Expert</span
            >
          </div>
          <div v-if="user.badges.hunter" class="tooltip">
            <i
              style="font-size: 40px; color: #ffd56c"
              class="badge fal fa-bug"
            ></i>
            <span class="unselectable highlight tooltiptext">Bug Hunter</span>
          </div>
          <div v-if="user.badges.alumni" class="tooltip">
            <i
              style="font-size: 40px; color: #bfbfbf"
              class="badge fal fa-dice"
            ></i>
            <span class="unselectable highlight tooltiptext">Alumni</span>
          </div>
          <div v-if="user.badges.supporter" class="tooltip">
            <i
              style="font-size: 40px; color: #ff73dc"
              class="badge fal fa-heart"
            ></i>
            <span class="unselectable highlight tooltiptext">Supporter</span>
          </div>
          <h2 style="margin-top: 3%">
            <b v-if="user.badges.lead" class="highlight" style="color: #1ec9eb"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.admin"
              class="highlight"
              style="color: #6d3eb8"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.mod"
              class="highlight"
              style="color: #f52f60"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.approvalLvl2"
              class="highlight"
              style="color: #ff7519"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.approval"
              class="highlight"
              style="color: #dcff82"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.verified"
              class="highlight"
              style="color: #5cf27d"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.contributor"
              class="highlight"
              style="color: #ffff00"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.hunterLvl2"
              class="highlight"
              style="color: #ed1f29"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.hunter"
              class="highlight"
              style="color: #ffd56c"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.alumni"
              class="highlight"
              style="color: #bfbfbf"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.supporter"
              class="highlight"
              style="color: #ff73dc"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b v-else class="highlight"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
          </h2>
          <p
            v-if="user.badges.lead"
            class="highlight"
            style="color: #1ec9eb; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.admin"
            class="highlight"
            style="color: #6d3eb8; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.mod"
            class="highlight"
            style="color: #f52f60; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.approvalLvl2"
            class="highlight"
            style="color: #ff7519; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.approval"
            class="highlight"
            style="color: #dcff82; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.verified"
            class="highlight"
            style="color: #5cf27d; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.contributor"
            class="highlight"
            style="color: #ffff00; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.hunterLvl2"
            class="highlight"
            style="color: #ed1f29; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.hunter"
            class="highlight"
            style="color: #ffd56c; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.alumni"
            class="highlight"
            style="color: #bfbfbf; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.supporter"
            class="highlight"
            style="color: #ff73dc; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p v-else class="highlight" style="margin-top: -3%; font-size: 30px">
            {{ user.profile.description }}
          </p>
          <div
            v-if="joinedAt.date && joinedAt.short && joinedAt.time"
            class="tooltip-date highlight"
          >
            Joined
            <b>{{ joinedAt.year <= 2020 ? "Early in the Days" : joinedAt.short }}</b>
            <span style="font-size: 12px" class="unselectable tooltiptext-date"
              ><b>{{ joinedAt.date }}</b>
              <small style="font-size: 12px; color: blueviolet">{{
                joinedAt.time
              }}</small></span
            >
          </div>
        </div>
        <div
          v-else-if="!bannerURL"
          id="bgslide"
          class="hero-bg"
          style="background-color: var(--background-color)"
        >
          <img
            class="avatar unselectable"
            draggable="false"
            :src="avatarURL"
            alt="User Profile"
          />
          <div class="unselectable" style="margin-top: 2%"></div>
          <div v-if="user.badges.lead" class="tooltip">
            <i
              style="font-size: 40px; color: #1ec9eb"
              class="badge fa-3x fal fa-crown"
            ></i>
            <span
              style="color: #1ec9eb"
              class="unselectable highlight tooltiptext"
              >Project Lead</span
            >
          </div>
          <div v-if="user.badges.admin" class="tooltip">
            <i
              style="font-size: 40px; color: #6d3eb8"
              class="badge fal fa-bolt"
            ></i>
            <span class="unselectable highlight tooltiptext"
              >Administrator</span
            >
          </div>
          <div v-if="user.badges.mod" class="tooltip">
            <i
              style="font-size: 40px; color: #f52f60"
              class="badge fal fa-shield"
            ></i>
            <span class="unselectable highlight tooltiptext">Moderator</span>
          </div>
          <div v-if="user.badges.approvalLvl2" class="tooltip-expand">
            <i
              style="font-size: 40px; color: #ff7519"
              class="badge fal fa-gavel"
            ></i>
            <span class="unselectable highlight tooltiptext-expand"
              >Bot Reviewer Team</span
            >
          </div>
          <div v-if="user.badges.approval" class="tooltip">
            <i
              style="font-size: 40px; color: #dcff82"
              class="badge fal fa-gavel"
            ></i>
            <span class="unselectable highlight tooltiptext">Bot Reviewer</span>
          </div>
          <div v-if="user.badges.verified" class="tooltip">
            <i
              style="font-size: 40px; color: #5cf27d"
              class="badge fal fa-badge-check"
            ></i>
            <span class="unselectable highlight tooltiptext">Verified</span>
          </div>
          <div v-if="user.badges.contributor" class="tooltip">
            <i
              style="font-size: 40px; color: #ffff00"
              class="badge fal fa-code"
            ></i>
            <span class="unselectable highlight tooltiptext">Contributor</span>
          </div>
          <div v-if="user.badges.hunterLvl2" class="tooltip-expand">
            <i
              style="font-size: 40px; color: #ed1f29"
              class="badge fal fa-bug-slash"
            ></i>
            <span class="unselectable highlight tooltiptext-expand"
              >Bug Hunter Expert</span
            >
          </div>
          <div v-if="user.badges.hunter" class="tooltip">
            <i
              style="font-size: 40px; color: #ffd56c"
              class="badge fal fa-bug"
            ></i>
            <span class="unselectable highlight tooltiptext">Bug Hunter</span>
          </div>
          <div v-if="user.badges.alumni" class="tooltip">
            <i
              style="font-size: 40px; color: #bfbfbf"
              class="badge fal fa-dice"
            ></i>
            <span class="unselectable highlight tooltiptext">Alumni</span>
          </div>
          <div v-if="user.badges.supporter" class="tooltip">
            <i
              style="font-size: 40px; color: #ff73dc"
              class="badge fal fa-heart"
            ></i>
            <span class="unselectable highlight tooltiptext">Supporter</span>
          </div>
          <h2 style="margin-top: 3%">
            <b v-if="user.badges.lead" class="highlight" style="color: #1ec9eb"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.admin"
              class="highlight"
              style="color: #6d3eb8"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.mod"
              class="highlight"
              style="color: #f52f60"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.approvalLvl2"
              class="highlight"
              style="color: #ff7519"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.approval"
              class="highlight"
              style="color: #dcff82"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.verified"
              class="highlight"
              style="color: #5cf27d"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.contributor"
              class="highlight"
              style="color: #ffff00"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.hunterLvl2"
              class="highlight"
              style="color: #ed1f29"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.hunter"
              class="highlight"
              style="color: #ffd56c"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.alumni"
              class="highlight"
              style="color: #bfbfbf"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b
              v-else-if="user.badges.supporter"
              class="highlight"
              style="color: #ff73dc"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
            <b v-else class="highlight"
              >{{ user.username }}#{{ user.discriminator }}</b
            >
          </h2>
          <p
            v-if="user.badges.lead"
            class="highlight"
            style="color: #1ec9eb; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.admin"
            class="highlight"
            style="color: #6d3eb8; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.mod"
            class="highlight"
            style="color: #f52f60; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.approvalLvl2"
            class="highlight"
            style="color: #ff7519; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.approval"
            class="highlight"
            style="color: #dcff82; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.verified"
            class="highlight"
            style="color: #5cf27d; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.contributor"
            class="highlight"
            style="color: #ffff00; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.hunterLvl2"
            class="highlight"
            style="color: #ed1f29; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.hunter"
            class="highlight"
            style="color: #ffd56c; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.alumni"
            class="highlight"
            style="color: #bfbfbf; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p
            v-else-if="user.badges.supporter"
            class="highlight"
            style="color: #ff73dc; margin-top: -3%; font-size: 30px"
          >
            {{ user.profile.description }}
          </p>
          <p v-else class="highlight" style="margin-top: -3%; font-size: 30px">
            {{ user.profile.description }}
          </p>
          <div
            v-if="joinedAt.date && joinedAt.short && joinedAt.time"
            class="tooltip-date highlight"
          >
            Joined
            <b>{{ joinedAt.year <= 2020 ? "Early in the Days" : joinedAt.short }}</b>
            <span style="font-size: 12px" class="unselectable tooltiptext-date"
              ><b>{{ joinedAt.date }}</b>
              <small style="font-size: 12px; color: blueviolet">{{
                joinedAt.time
              }}</small></span
            >
          </div>
        </div>
        <h3>
          Public Bots [{{
            user.bots.filter((bot) => bot.status === "approved").length || "0"
          }}]
        </h3>
        <div class="unselectable" style="margin-top: 4%"></div>
        <button v-if="hasAccess" class="button" @click="redirectEdit">
          Edit Profile
        </button>
        <button
          v-if="hasAccess && isOwner"
          class="button"
          style="margin-top: 5%"
          @click="redirectLogout"
        >
          Logout
        </button>
      </div>
    </center>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment-timezone";

export default {
  name: "ProfileComponent",
  data() {
    return {
      avatarURL: "",
      bannerURL: "",
      hasAccess: false,
      isOwner: false,
      joinedAt: {
        date: "",
        short: "",
        time: "",
        year: null,
      },
      loading: true,
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
          this.isOwner = true;
        }

        if (req.data.profile.badges.lead || req.data.profile.badges.admin) {
          this.hasAccess = true;
        }
      });
    },
    async fetchUser() {
      await axios
        .get(`http://localhost:3000/api/v1/users/${this.$route.params.user}`)
        .then((req) => {
          this.avatarURL = `https://cdn.discordapp.com/avatars/${req.data.user.id}/${req.data.user.avatar}.png`;
          this.bannerURL = req.data.user.profile.banner;
          this.user = req.data.user;
          this.joinedAt.short = moment(this.user.joinedAt).format("MMMM YYYY");
          this.joinedAt.date = moment(this.user.joinedAt).format("D MMMM YYYY");
          this.joinedAt.time = moment(this.user.joinedAt)
            .tz("Asia/Jakarta")
            .format("HH:mm:ss [UTC]Z");
          this.joinedAt.year = moment(this.user.joinedAt).year();
          this.loading = false;
        });
    },
    redirectEdit() {
      this.$router.push(`/user/${this.user.id}/edit`);
    },
    redirectLogout() {
      location.href = "/logout";
    },
  },
};
</script>

<style scoped>
#bgslide {
  overflow: hidden;
  background-size: cover;
  background-position: center;
  outline: none !important;
}

@keyframes bgmove {
  from {
    background-position: bottom center;
  }
  to {
    background-position: top center;
  }
}

#bgslide {
  animation: bgmove 30s linear infinite;
  animation-direction: alternate;
}

@media screen and (min-width: 769px), print {
  #bgslide {
    padding-bottom: 5rem;
    padding-top: 8rem;
  }
}

@media screen and (max-width: 769px), print {
  #bgslide {
    padding-bottom: 1rem;
    padding-top: 6rem;
    background-size: auto !important;
  }
}

div.hero-bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    var(--banner) no-repeat;
  background-size: 100%;
}
</style>
