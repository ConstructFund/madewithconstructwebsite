<template>
  <v-app :dark="dark" style="background: #00000000;">
    <v-app-bar app color="accent" dark height="90px" class="topBar">
      <h2
        v-if="$vuetify.breakpoint.mdAndUp"
        class="mr-2 text"
        style="padding-left: 40px"
      >
        Made with
      </h2>
      <div class="d-flex align-center">
        <v-img
          alt="Construct Logo"
          class="shrink mr-2"
          contain
          src="https://construct-static.com/images/v860/r/global/construct-3-logo_v43.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          v-if="$vuetify.breakpoint.lgAndUp"
          alt="Construct Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://construct-static.com/images/v860/r/global/construct-3-logo-lettering_v130.png"
          width="100"
        />

        <div v-if="$vuetify.breakpoint.md" style="padding-right: 40px" />
      </div>

      <v-spacer v-if="$vuetify.breakpoint.lgAndUp"></v-spacer>
      <v-text-field
        style="margin-top: 28px; margin-right: 15px"
        v-model="search"
        label="Search"
        color="primary"
        outlined
        append-icon="mdi-magnify"
        rounded
      ></v-text-field>
      <v-select
        v-model="sortMethod"
        :items="sortMethods"
        item-text="state"
        item-value="abbr"
        label="Select"
        color="error"
        item-color="error"
        return-object
        single-line
        outlined
        rounded
        style="margin-top: 28px; margin-right: 15px; width: 80px"
      ></v-select>

      <v-layout column style="flex: unset;">
        <v-dialog v-model="filterDialog" max-width="500px">
          <template v-slot:activator="{ on }"
            ><v-btn
              color="error"
              v-on="on"
              style="width:160px; margin-top: 10px"
              @click="filterDialog = true"
            >
              <span class="mr-2 text">Filter</span>
              <v-icon>mdi-filter-variant</v-icon>
            </v-btn>
          </template>

          <v-card color="accent" dark>
            <v-card-title>
              <span class="text" style="text-align: center; width: 100%">
                Filter <v-icon>mdi-filter-variant</v-icon>
              </span>
            </v-card-title>
            <v-card-title>
              <span class="text">
                Engine
              </span>
            </v-card-title>
            <v-card-text
              style="display:flex; justify-content: center; width: 100%; padding-left: 50px;"
            >
              <v-btn-toggle
                v-model="selectedEngines"
                multiple
                color="primary"
                rounded
                dark
              >
                <v-btn dark>
                  <EngineIcon
                    _style="cursor:pointer"
                    engine="CC"
                    :forceDark="true"
                  />
                </v-btn>
                <v-btn dark>
                  <EngineIcon
                    _style="cursor:pointer"
                    engine="C2"
                    :forceDark="true"
                  />
                </v-btn>
                <v-btn dark>
                  <EngineIcon
                    _style="cursor:pointer"
                    engine="C3"
                    :forceDark="true"
                  />
                </v-btn>
              </v-btn-toggle>
              <v-btn text icon color="black" disabled> </v-btn>
            </v-card-text>
            <!-- <v-card-title>
              <span class="text">
                Tags
              </span>
            </v-card-title> -->
            <v-card-title>
              <span class="text">
                Platforms
              </span>
            </v-card-title>
            <v-card-text
              style="display:flex; justify-content: center; width: 100%; padding-left: 50px;"
            >
              <v-btn-toggle
                v-model="selectedPlatforms"
                multiple
                color="primary"
                rounded
                dark
              >
                <v-btn v-for="(platform, i) in platformIconsList" dark :key="i">
                  <PlatformIcon
                    _style="cursor:pointer"
                    :platform="platform"
                    :forceDark="true"
                  />
                </v-btn>
              </v-btn-toggle>
              <v-btn text icon color="black" disabled> </v-btn>
            </v-card-text>

            <v-card-text
              style="display:flex; justify-content: center; width: 100%; padding-left: 25px;; padding-right: 40px"
            >
              <v-layout row wrap justify-space-around align-center>
                <v-checkbox
                  label="Show Work in progress"
                  v-model="showWIP"
                ></v-checkbox>
                <v-checkbox
                  label="Show Early access"
                  v-model="showEA"
                ></v-checkbox>
                <v-checkbox label="Show NSFW" v-model="showNSFW"></v-checkbox>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-btn text small style="width:160px; ">
          <span class="mr-2 text">Submit new game</span>
        </v-btn>
      </v-layout>

      <v-btn @click="toggleDarkMode" icon>
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="slantedBackground">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <v-layout row wrap justify-center class="mainView" ref="scrollZone">
        <v-slide-x-transition leave-absolute>
          <div
            key="0"
            v-if="loading"
            style="position:absolute; width: 100%; height: 100%; display: flex; align-items: center; justify-content:center; flex-direction: column; padding-bottom: 100px"
          >
            <v-progress-circular
              indeterminate
              color="error"
              :size="100"
            ></v-progress-circular>
            <h2
              dark
              class="mr-2 text"
              style="margin-top: 50px; margin-bottom: 80px; color: var(--v-secondary-base)"
            >
              {{ loadingLine }}
            </h2>
          </div>
        </v-slide-x-transition>
        <v-lazy
          :options="{
            threshold: 0.5,
          }"
          min-height="200"
          transition="fade-transition"
          v-for="i in computedMaxCount"
          :key="
            `${i + currentStart - 1}-${filteredData[i + currentStart - 1].name}`
          "
        >
          <GameCard :gameData="filteredData[i + currentStart - 1]" />
        </v-lazy>
      </v-layout>
      <v-fab-transition>
        <v-btn
          v-if="showScrollToTop"
          style="position:absolute; bottom: 45px; right: 25px; padding: 0; min-width: 44px;"
          rounded
          large
          color="error"
          @click="scrollToTop"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-main>
    <v-footer app dark color="accent" class="footer" height="30">
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="secondary"
            icon
            small
            dark
            v-bind="attrs"
            v-on="on"
            style="margin: 0; height: 18px; width: 18px"
          >
            <v-icon v-on="on" v-bind="attrs">mdi-information</v-icon>
          </v-btn>
        </template>
        <small>
          This website is only meant to showcase games made with Construct.
          <br />
          Any views shared by any developers belong solely to the their own and
          not the creators of this website.
        </small>
      </v-tooltip>
      <!-- TODO Replace the text with something better -->

      <v-spacer></v-spacer>
      <span class="text footerText">
        Contribute on
        <a
          href="https://github.com/skymen/madewithconstructwebsite"
          target="__blank"
        >
          Github
        </a>
      </span>
      <span style="margin-left: 5px; margin-right: 5px">--</span>
      <span class="text footerText">
        Made with ❤ by the
        <a href="https://discord.com/invite/HyvYes8" target="__blank">
          Construct Community
        </a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import GameCard from "./components/GameCard";
import PlatformIcon from "./components/PlatformIcon";
import EngineIcon from "./components/EngineIcon";
import platformIcons from "./components/platformToIcons";

export default {
  name: "App",

  components: {
    GameCard,
    PlatformIcon,
    EngineIcon,
  },

  data: () => ({
    filterDialog: false,
    currentStart: 0,
    maxCount: 30,
    maxOffset: 6,
    search: "",
    cachedData: "",
    data: [],
    filteredData: [],
    computedMaxCount: 0,
    platformIconsList: [],
    selectedPlatforms: [],
    selectedEngines: [],
    showWIP: true,
    showEA: true,
    showNSFW: false,
    showScrollToTop: false,
    loading: true,
    loadingLine: "",
    loadingLines: [
      "Loading incredible games",
      "Constructing a list",
      "Brace yourself for creative genius",
      "Loading more than you'd think",
      "Awesome construct stuff",
    ],
    sortMethod: "A - Z",
    sortMethods: ["A - Z", "Z - A"],
  }),
  watch: {
    search() {
      this.updateFilteredData();
    },
    selectedPlatforms() {
      this.updateFilteredData();
    },
    selectedEngines() {
      this.updateFilteredData();
    },
    showWIP() {
      this.updateFilteredData();
    },
    showEA() {
      this.updateFilteredData();
    },
    showNSFW() {
      this.updateFilteredData();
    },
    sortMethod() {
      this.sortFilteredData();
    },
  },
  computed: {
    dark() {
      return this.$vuetify.theme.dark;
    },
    elementCount() {
      return this.filteredData.length;
    },
    isNotAtTop() {
      return this.currentStart > 0;
    },
    isNotAtBottom() {
      return this.currentStart + this.maxCount < this.elementCount;
    },
    scrollUpOffset() {
      return Math.min(this.maxOffset, this.currentStart);
    },
    scrollDownOffset() {
      return Math.min(
        this.maxOffset,
        this.elementCount - (this.currentStart + this.maxCount)
      );
    },
  },
  mounted() {
    this.loadingLine = this.loadingLines[
      Math.floor(Math.random() * this.loadingLines.length)
    ];
    this.scroll();
    this.loadData();
    this.platformIconsList = Object.keys(platformIcons);
    this.loadDarkMode();
  },
  methods: {
    loadDarkMode() {
      this.$vuetify.theme.dark = localStorage.getItem("darkmode") === "1";
    },
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("darkmode", this.$vuetify.theme.dark ? "1" : "0");
    },
    scroll() {
      let element = this.$refs.scrollZone;
      element.onscroll = () => {
        let scrollPercentage =
          (100 * element.scrollTop) /
          (element.scrollHeight - element.clientHeight);
        let tempStart = this.currentStart;
        if (scrollPercentage === 100 && this.isNotAtBottom) {
          let scrollOffset = this.scrollDownOffset;
          this.currentStart += scrollOffset;
          scrollPercentage = 100 - (100 * scrollOffset) / this.maxCount;
          element.scrollTop =
            ((element.scrollHeight - element.clientHeight) * scrollPercentage) /
            100;
        }
        if (scrollPercentage === 0 && this.isNotAtTop) {
          //eslint-disable-next-line
          //debugger;
          let scrollOffset = this.scrollUpOffset;
          this.currentStart -= scrollOffset;
          scrollPercentage = (0.01 * (100 * scrollOffset)) / this.maxCount;
          element.scrollTop =
            ((element.scrollHeight - element.clientHeight) * scrollPercentage) /
            100;

          setTimeout(() => {
            scrollPercentage =
              (100 * element.scrollTop) /
              (element.scrollHeight - element.clientHeight);
            this.showScrollToTop =
              scrollPercentage > 2 || this.currentStart > 0;
          }, 10);
        }
        this.showScrollToTop = scrollPercentage > 2 || tempStart > 0;
      };
    },
    updateFilteredData() {
      this.filteredData = this.data.filter((x) => {
        //Special search cases
        let search = this.search.toLowerCase();
        if (
          ["nsfw", "not safe for work", "not suitable for work"].includes(
            search
          )
        )
          return x.isNSFW;
        if ("early access" == search) return x.isEA;
        if (["wip", "work in progress"].includes(search)) return x.isWIP;
        // Work In Progress Filter
        if (!this.showWIP && x.isWIP) return false;
        // Early access Filter
        if (!this.showEA && x.isEA) return false;
        // NSFW Filter
        if (!this.showNSFW && x.isNSFW) return false;

        // Engines filter
        let engines = ["CC", "C2", "C3"];
        if (
          this.selectedEngines.length > 0 &&
          !this.selectedEngines.includes(
            engines.findIndex((engine) => {
              return engine === x.engine;
            })
          )
        )
          return false;

        // Platform Filter
        let platforms = this.platformIconsList;
        if (this.selectedPlatforms.length > 0) {
          for (let i = 0; i < this.selectedPlatforms.length; i++) {
            const platform = platforms[this.selectedPlatforms[i]];
            if (!x.platforms[platform]) return false;
          }
        }

        // Search bar filter
        if (
          !x.name.toLowerCase().includes(search) &&
          !x.authorName.toLowerCase().includes(search)
        ) {
          return false;
        }
        return true;
      });

      this.computedMaxCount = Math.min(this.elementCount, this.maxCount);
      this.sortFilteredData();
    },
    sortFilteredData() {
      // A-Z
      if (this.sortMethod === this.sortMethods[0]) {
        this.filteredData.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      // Z-A
      if (this.sortMethod === this.sortMethods[1]) {
        this.filteredData.sort((b, a) => {
          return a.name.localeCompare(b.name);
        });
      }
    },
    loadData() {
      let url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQNLnCS4XBcXIVJ6M-rUtWV_zdpzK0VVR5ToGwuGkptschaT9Oa1SAAtZPhw8JlL2XObNSZKQBJNSC0/pub?output=tsv";
      fetch(url).then(async (response) => {
        this.cachedData = await response.text();
        let array = this.tsvToArray(this.cachedData);
        let keys = array[0];
        array = array.slice(1);

        this.data = [];
        array.forEach((element) => {
          let obj = {};
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            obj[key] = element[i];
          }
          if (obj["Data ready"] === "TRUE") this.data.push(obj);
        });
        this.formatData();
        this.updateFilteredData();
        this.loading = false;
      });
    },
    formatData() {
      this.data = this.data.map((element) => {
        return {
          name: element.name,
          image: element["image link"],
          platforms: {
            steam: element.steam,
            itchio: element.itchio,
            switch: element.switch,
            playstation: element.playstation,
            xbox: element.xbox,
            android: element.android,
            ios: element.ios,
            web: element.web,
          },
          authorImage: element["author image"],
          authorName: element["author"],
          authorURL: element["author website"],
          engine: element["engine"],
          isWIP: element["Work In Progress"] === "TRUE",
          isEA: element["Early access"] === "TRUE",
          isNSFW: element["NSFW"] === "TRUE",
          tags: [""],
        };
      });
    },
    tsvToArray(tsv) {
      let tempArr = tsv.split("\n");
      return tempArr.map((x) => x.split("\t").map((x) => x.trim()));
    },
    scrollToTop() {
      let element = this.$refs.scrollZone;
      this.currentStart = 0;
      element.scrollTop = 0;
    },
  },
};
</script>

<style>
html {
  background-color: var(--v-secondary-base);
}
body,
html {
  font-family: "Roboto", sans-serif !important;
  font-weight: normal !important;
  overflow: hidden;
}
a {
  text-decoration: none;
}
a:visited {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.v-application {
  z-index: -10;
}
.footerText {
  font-size: 10.5pt;
}
.text {
  font-family: "Roboto", sans-serif !important;
  font-weight: normal !important;
}
.topBar {
  filter: drop-shadow(0px 10px 17px rgba(0, 0, 0, 0.3));
}
.footer {
  filter: drop-shadow(0px -10px 17px rgba(0, 0, 0, 0.3));
}

@media (min-width: 1080px) {
  .mainView {
    padding-top: 30px;
    margin-top: 0px;
    margin-left: 80px;
    margin-right: 80px;
    z-index: 1;
    padding-bottom: 80px;
    height: calc(100vh - 90px);
    overflow: auto;
  }
}
@media (max-width: 1080px) {
  .mainView {
    padding-top: 30px;
    margin-top: 0px;
    margin-left: 10px;
    margin-right: 10px;
    z-index: 1;
    padding-bottom: 80px;
    height: calc(100vh - 90px);
    overflow: auto;
  }
}

/**************************
    SLANTED BACKGROUND
***************************/
.slantedBackground {
  box-shadow: inset 0px -10px 34px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  width: 100%;
  height: 900px;
  position: absolute;
  -webkit-transform-origin: 0;
  transform-origin: 0;
  z-index: -1;
  background-size: 150% 150%;
  background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
  top: 0;
  left: 0;
  -ms-transform: skewY(-16deg);
  -webkit-transform: skewY(-16deg);
  transform: skewY(-16deg);
  animation-name: slantedBackground;
  animation-iteration-count: infinite;
  animation-duration: 5s;
}
@keyframes slantedBackground {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 50% 50%;
  }
  100% {
    background-position: 0 0;
  }
}
.slantedBackground span {
  position: absolute;
  width: 33.33333%;
  height: 120px;
}
.slantedBackground span:first-child {
  left: -16.66666%;
  background: #38b8fd;
}
.slantedBackground span:nth-child(2) {
  top: 0;
  left: 16.66666%;
  right: auto;
  background: #3899fd;
}
.slantedBackground span:nth-child(3) {
  width: 100%;
  left: 49.99999%;
  bottom: auto;
  background: #67befb;
}
.slantedBackground span:nth-child(4) {
  right: -16.66666%;
  background: #b37fff;
  bottom: 0;
}
.slantedBackground span:nth-child(5) {
  bottom: 0;
  background: rgba(146, 78, 255, 0.15);
}
.slantedBackground span:nth-child(6) {
  bottom: 120px;
  left: 11%;
  height: 30%;
  width: 40%;
  min-width: 400px;
}
@media screen and (max-width: 800px) {
  .slantedBackground span:first-child {
    left: 0;
    width: 66.666666%;
  }
  .slantedBackground span:nth-child(2) {
    left: 66.666666%;
    width: 33.33333%;
  }
  .slantedBackground span:nth-child(3) {
    display: none;
  }
}

@media screen and (min-width: 1600px) {
  .slantedBackground {
    height: 1000px;
  }
}
@media screen and (min-width: 2500px) {
  .slantedBackground {
    height: 1100px;
  }
}
::-webkit-scrollbar-button:start {
  background: #00000000;
  height: 20px;
}
::-webkit-scrollbar-button:end {
  background: #00000000;
  height: 53px;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background: #e0e0e086;
  border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cccccc86;
}
::-webkit-scrollbar-track {
  background: #ffffff00;
  border-radius: 8px;
}
</style>
