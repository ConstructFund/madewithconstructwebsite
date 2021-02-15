<template>
  <v-card
    v-if="$vuetify.breakpoint.mdAndUp"
    color="secondary"
    :width="400"
    :height="300"
    :style="shadowStyle"
  >
    <v-img
      height="173"
      width="370"
      style="border-radius: 10px; left: 3.75%; right: 3.75%; top:5%; margin-bottom: 20px"
      :src="gameData.image"
    >
    </v-img>
    <div v-if="gameData.isWIP" class="ribbon ribbon-top-right wip-ribbon">
      <span>Work in progress</span>
    </div>
    <div v-if="gameData.isEA" class="ribbon ribbon-top-right ea-ribbon">
      <span>Early access</span>
    </div>
    <div v-if="gameData.isNSFW" class="ribbon ribbon-top-right nsfw-ribbon">
      <span>NSFW</span>
    </div>
    <v-badge
      inline
      color="error"
      content="Work in progress"
      :value="false"
      style="margin-right: 0px;"
    >
      <span class="text name">
        <FitText>{{ gameData.name }}</FitText>
      </span>
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
        class="authorImage"
        :src="gameData.authorImage"
      />
      <span class="text author"> by {{ gameData.authorName }} </span>
    </div>
  </v-card>
  <v-card
    v-else
    color="secondary"
    :width="270"
    :height="270"
    :style="shadowStyle"
  >
    <v-img
      height="117"
      width="250"
      style="border-radius: 10px; left: 3.75%; right: 3.75%; top:3.75%; margin-bottom: 20px"
      :src="gameData.image"
    >
    </v-img>
    <div v-if="gameData.isWIP" class="ribbon ribbon-top-right wip-ribbon">
      <span>Work in progress</span>
    </div>
    <div v-if="gameData.isEA" class="ribbon ribbon-top-right ea-ribbon">
      <span>Early access</span>
    </div>
    <div v-if="gameData.isNSFW" class="ribbon ribbon-top-right nsfw-ribbon">
      <span>NSFW</span>
    </div>
    <v-badge
      inline
      color="error"
      content="Work in progress"
      :value="false"
      style="margin-right: 10px;"
    >
      <span class="text name">
        <FitText>{{ gameData.name }}</FitText>
      </span>
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
        class="authorImage"
        :src="gameData.authorImage"
      />
      <span class="text author"> by {{ gameData.authorName }} </span>
    </div>
  </v-card>
</template>

<script>
import PlatformIcon from "./PlatformIcon";
import EngineIcon from "./EngineIcon";
import FitText from "./FitText";

export default {
  name: "GameCard",
  props: {
    gameData: {
      type: Object,
      required: true,
    },
  },
  components: { PlatformIcon, EngineIcon, FitText },
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
  height: 34px;
  margin-left: 14px;
}
.authorImage {
  position: absolute;
  left: 1px;
  bottom: 11px;
}
.author {
  position: absolute;
  left: 38px;
  bottom: 8px;
  opacity: 0.5;
  font-size: 14pt;
  /* margin-left: 5px !important; */
}
.platforms {
  margin-left: 13px !important;
  margin-top: 5px !important;
  opacity: 0.3;
}
.ribbon {
  width: 140px;
  height: 140px;
  overflow: hidden;
  position: absolute;
}

.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: "";
  display: block;
  border: 5px solid #f9a825;
}
.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 7px 0;
  background-color: #f9a825;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  color: #fff;
  font: 500 16px/1 "Roboto", sans-serif;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  text-align: center;
}

.nsfw-ribbon span {
  background-color: #f925f9;
  font-size: 10pt;
}
.nsfw-ribbon::before,
.nsfw-ribbon::after {
  border: 5px solid #b91bb9;
}
.wip-ribbon span {
  background-color: var(--v-error-base);
  font-size: 10pt;
}
.wip-ribbon::before,
.wip-ribbon::after {
  border: 5px solid var(--v-error-darken1);
}
.ea-ribbon span {
  background-color: #2588f9;
  font-size: 10pt;
}
.ea-ribbon::before,
.ea-ribbon::after {
  border: 5px solid #1e6fcc;
}

/* top right*/
.ribbon-top-right {
  top: -10px;
  right: -10px;
}
.ribbon-top-right::before,
.ribbon-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
.ribbon-top-right::before {
  top: 0;
  left: 11px;
}
.ribbon-top-right::after {
  bottom: 11px;
  right: 0;
}
.ribbon-top-right span {
  left: -27px;
  top: 42px;
  transform: rotate(45deg);
}
</style>
