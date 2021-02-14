<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" :style="_style" @click="$emit('click')">
        <v-img
          v-if="platform === 'itchio' && !(dark || forceDark)"
          height="23"
          width="23"
          style="margin-left: 1px; margin-right: 1px; margin-top: 2px"
          :src="require('@/assets/itchio.png')"
        ></v-img>
        <v-img
          v-else-if="platform === 'itchio'"
          height="23"
          width="23"
          style="margin-left: 1px; margin-right: 1px; margin-top: 2px"
          :src="require('@/assets/itchio white.png')"
        ></v-img>
        <v-icon
          :dark="dark || forceDark"
          :color="dark || forceDark ? 'white' : 'black'"
          v-else
          >{{ platformIcons[platform] }}</v-icon
        >
      </div>
    </template>
    <span style="text-transform: capitalize;">
      {{ platform }}
    </span>
  </v-tooltip>
</template>

<script>
import platformIcons from "./platformToIcons";

export default {
  name: "PlatformIcon",
  props: {
    _style: {
      type: String,
      required: false,
      default: "",
    },
    platform: {
      type: String,
      required: true,
    },
    forceDark: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    dark() {
      return this.$vuetify.theme.dark;
    },
  },
  data: () => ({
    platformIcons,
  }),
  methods: {},
};
</script>

<style>
body,
.text {
  font-family: "Roboto", sans-serif !important;
  font-weight: normal;
}
.name {
  font-size: 27pt;
  margin-left: 23px;
}
.author {
  opacity: 0.5;
  font-size: 14pt;
  margin-left: 5px !important;
}
.platforms {
  margin-left: 23px !important;
  margin-top: -5px !important;
  opacity: 0.3;
}
</style>
