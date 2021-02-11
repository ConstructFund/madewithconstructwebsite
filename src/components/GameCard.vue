<template>
  <v-card color="secondary" :width="400" :height="300" :style="shadowStyle">
    <v-img
      height="173"
      width="370"
      style="border-radius: 10px; left: 3.75%; right: 3.75%; top:5%; margin-bottom: 20px"
      :src="gameData.image"
    >
    </v-img>

    <v-badge
      inline
      color="error"
      content="Work in progress"
      :value="gameData.isWIP"
    >
      <span class="text name">{{ gameData.name }}</span>
    </v-badge>
    <EngineIcon
      _style="cursor:pointer; position: absolute; right: 10px; bottom: 10px; opacity: 0.3"
      :engine="gameData.engine"
      @click="openEngine()"
    />
    <br />
    <v-layout row class="platforms">
      <PlatformIcon
        v-for="(platform, i) in platforms"
        :key="i"
        _style="cursor:pointer"
        @click="openPlatform(platform)"
        :platform="platform"
      />
    </v-layout>
    <div
      style="display:inline-flex; flex-direction: row; margin-top: 10px; cursor:pointer"
      @click="openWebsite()"
    >
      <v-img
        height="25"
        width="25"
        style="margin-left: 12px;border-radius: 15px; max-height: 25px; max-width: 25px"
        :src="gameData.authorImage"
      ></v-img>
      <span class="text author"> by {{ gameData.authorName }} </span>
    </div>
  </v-card>
</template>

<script>
import PlatformIcon from "./PlatformIcon";
import EngineIcon from "./EngineIcon";

export default {
  name: "GameCard",
  props: {
    gameData: {
      type: Object,
      required: true,
    },
  },
  components: { PlatformIcon, EngineIcon },
  computed: {
    dark() {
      return this.$vuetify.theme.dark;
    },
    shadowStyle() {
      return `box-shadow: 8px 8px 17px ${
        this.dark ? "rgba(47,37,111,0.4)" : "rgba(0,0,0,0.4)"
      }; border-radius: 15px; margin-top: 10px; margin-left: 25px; margin-right: 25px; margin-bottom: 30px`;
    },
    platforms() {
      let platforms = [];
      Object.keys(this.gameData.platforms).forEach((key) => {
        if (this.gameData.platforms[key]) platforms.push(key);
      });
      return platforms;
    },
  },
  data: () => ({}),
  methods: {
    openWebsite() {
      window.open(this.gameData.authorURL);
    },
    openPlatform(platform) {
      window.open(this.gameData.platforms[platform]);
    },
    openEngine() {
      let urls = {
        CC: "https://www.scirra.com/construct-classic",
        C2: "https://www.scirra.com/construct2/releases",
        C3: "https://www.construct.net/",
      };
      window.open(urls[this.gameData.engine]);
    },
  },
};
</script>

<style>
body,
.text {
  font-family: "Roboto", sans-serif !important;
  font-weight: normal;
  -webkit-user-select: none; /* Chrome 49+ */
  -moz-user-select: none; /* Firefox 43+ */
  -ms-user-select: none; /* No support yet */
  user-select: none; /* Likely future */
}
.name {
  font-size: 24pt;
  margin-left: 14px;
}
.author {
  opacity: 0.5;
  font-size: 14pt;
  margin-left: 5px !important;
}
.platforms {
  margin-left: 13px !important;
  margin-top: 5px !important;
  opacity: 0.3;
}
</style>
