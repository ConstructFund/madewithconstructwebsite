<template>
  <div :style="_style" class="noBackground" @click="$emit('click')">
    <div v-if="engine === 'CC'">
      <v-img
        v-if="!(dark || forceDark)"
        class="engineIcon"
        :src="require('@/assets/cc.png')"
      ></v-img>
      <v-img
        v-else
        class="engineIcon"
        :src="require('@/assets/cc white.png')"
      ></v-img>
    </div>
    <div v-else-if="engine === 'C2'">
      <v-img
        v-if="!(dark || forceDark)"
        class="engineIcon"
        :src="require('@/assets/c2.png')"
      ></v-img>
      <v-img
        v-else
        class="engineIcon"
        :src="require('@/assets/c2 white.png')"
      ></v-img>
    </div>
    <div v-else-if="engine === 'C3'">
      <v-img
        v-if="!(dark || forceDark)"
        class="engineIcon"
        :src="require('@/assets/c3.png')"
      ></v-img>
      <v-img
        v-else
        class="engineIcon"
        :src="require('@/assets/c3 white.png')"
      ></v-img>
    </div>
  </div>
</template>

<script>
export default {
  name: "EngineIcon",
  props: {
    _style: {
      type: String,
      required: false,
      default: "",
    },
    engine: {
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
  data: () => ({}),
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
.engineIcon {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0);
}
.noBackground {
  background-color: rgba(0, 0, 0, 0);
}
</style>
