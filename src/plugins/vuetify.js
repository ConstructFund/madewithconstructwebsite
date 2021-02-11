import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#28f0d2", // main color
        secondary: "#ffffff", // background
        accent: "#3b4045", // top bar
        error: "#f85753", // red
        icon: "#000000", //icons
      },
      dark: {
        primary: "#28f0d2", // main color
        secondary: "#080618", // background
        accent: "#0c0b18", // top bar
        error: "#f85753", // red
        icon: "#ffffff", //icons
      },
    },
  },
});
