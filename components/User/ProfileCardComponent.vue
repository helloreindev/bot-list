<template>
  <div style="display: inline" class="link-card">
    <nuxt-link :to="profileLink">{{ name }}</nuxt-link>.
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
      @click="redirect(profileLink)"
    >
      <p
        class="unselectable"
        style="
          font-size: 22px;
          display: flex;
          position: relative;
          bottom: 10px;
          left: 95px;
        "
      >
        <b>{{ username }}#{{ discriminator }}</b>
        <span
          v-if="badges.lead"
          style="position: relative; left: 4px; bottom: 17px"
          class="tooltip-badge"
        >
          <i
            style="font-size: 20px; color: #1ec9eb"
            class="badge fa-3x fal fa-crown"
          ></i
          ><span
            style="color: #1ec9eb; font-size: small"
            class="unselectable highlight tooltip-badgetext"
            >Project Lead</span
          >
        </span>
        <span
          v-if="badges.verified"
          style="position: relative; left: -2px; bottom: 17px"
          class="tooltip-badge"
        >
          <i
            style="font-size: 20px; color: #5cf27d"
            class="badge fa-3x fal fa-badge-check"
          ></i
          ><span
            style="color: #5cf27d; font-size: small"
            class="unselectable highlight tooltip-badgetext"
            >Verified</span
          >
        </span>
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
      @click="redirect(profileLink)"
    >
      <p
        class="unselectable"
        style="
          font-size: 22px;
          display: flex;
          position: relative;
          bottom: 10px;
          left: 95px;
        "
      >
        <b>{{ username }}#{{ discriminator }}</b>
        <span
          v-if="badges.lead"
          style="position: relative; left: 4px; bottom: 17px"
          class="tooltip-badge"
        >
          <i
            style="font-size: 20px; color: #1ec9eb"
            class="badge fa-3x fal fa-crown"
          ></i
          ><span
            style="color: #1ec9eb; font-size: small"
            class="unselectable highlight tooltip-badgetext"
            >Project Lead</span
          >
        </span>
        <span
          v-if="badges.verified"
          style="position: relative; left: -2px; bottom: 17px"
          class="tooltip-badge"
        >
          <i
            style="font-size: 20px; color: #5cf27d"
            class="badge fa-3x fal fa-badge-check"
          ></i
          ><span
            style="color: #5cf27d; font-size: small"
            class="unselectable highlight tooltip-badgetext"
            >Verified</span
          >
        </span>
      </p>
      <img
        class="unselectable link-avatar"
        draggable="false"
        :src="avatarURL"
        alt="User Profile"
      />
    </span>
  </div>
</template>

<script>
export default {
  props: ["avatarURL", "bannerURL", "badges", "username", "description", "loading", "discriminator", "name", "profileLink"],
  methods: {
    redirect(param) {
      this.$router.push(param);
    }
  }
}
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
