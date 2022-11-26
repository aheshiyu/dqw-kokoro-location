<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>こころ出現場所一覧</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="open_setting"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-row
        style="width:100%; height:100%"
        class="pa-0 ma-0"
      >
        <vue-google-heatmap
          :points="filter_data"
          :initial-zoom="12"
          :lat="32.79022033885513"
          :lng="130.6899234447686"
          :options={radius:setting.radius,gestureHandling:gesture_type}
          class="ma-0"
        ></vue-google-heatmap>
        <v-snackbar
          v-model="loading"
          color="warning"
          :timeout="-1"
          class="mb-8"
        >
          ロード中です...
        </v-snackbar>
        <v-snackbar
          v-model="success"
          color="success"
          class="mb-8"
        >
          <v-row align="center">
            <v-col cols="auto" class="pr-0">
              <v-icon small>mdi-check-circle</v-icon>
            </v-col>
            <v-col cols="auto">
              <p class="mb-0">ロードが完了しました。</p>
            </v-col>
          </v-row>
          <template v-slot:action="{ attrs }">
            <v-btn
              icon 
              color="white"
              v-bind="attrs"
              @click="success = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-row>
    </v-main>
    <Setting ref="setting" @update="update"></Setting>
  </v-app>
</template>

<script>
import Setting from '@/components/Setting.vue'

export default {
  name: 'App',

  components: {    
    Setting
  },

  data() {
    return {
      loading: false,
      success: false,
      datas: [],
      gesture_type: 'greedy',
      setting: {
        radius: 0  // 設定を読み込む前に参照されるため
      }
    }
  },

  computed: {
    filter_data() {
      return this.datas
        .filter(e => this.setting.kokoro_level.includes(e.kokoro_level))
        .filter(e => this.setting.monster_level.includes(e.monster_level))
        .map(e => e.position)
    }
  },

  methods: {
    open_setting() {
      this.$refs.setting.open()
    },

    async update(load_data) {
      this.loading = true

      // 設定のロード      
      this.setting = { ...this.$store.state.setting }
      // console.log('setting:')
      // console.log(this.setting)
      // console.log('filter_data:')
      // console.log(this.filter_data)

      // データ読込み
      if (load_data) {
        this.datas = await this.$gas.fetch_data(this.setting.start_date, this.setting.end_date)
        // console.log(this.datas)
        this.success = true
      }
      
      this.loading = false
    },
  },

  mounted() {
    this.update(true)
    console.log('mounted!')
  },

  beforeCreate() {
    this.$store.dispatch('load_setting')
  }
};
</script>
