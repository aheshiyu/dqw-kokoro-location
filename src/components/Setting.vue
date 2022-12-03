<template>
  <v-dialog
    v-model="show_setting"
    persistent
    max-width="500"
  >
    <v-card>
      <v-form ref="form" v-model="valid">
        <v-card-title>表示設定</v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pb-0">期間</v-card-text>
        <v-card-text class="py-0">
          <v-row 
            justify="space-between"
            align="center"
          >
            <v-col cols=5 class="pr-0">
              <v-dialog
                ref="dialog_start"
                v-model="dialog_start"
                :return-value.sync="setting.start_date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="setting.start_date"
                    label="開始日"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="setting.start_date"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="dialog_start = false"
                  >
                    キャンセル
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog_start.save(setting.start_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col cols=auto class="px-0">
              <p class="mb-0 text-center">～</p>
            </v-col>
            <v-col cols=5 class="pl-0">
              <v-dialog
                ref="dialog_end"
                v-model="dialog_end"
                :return-value.sync="setting.end_date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="setting.end_date"
                    label="終了日"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="setting.end_date"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="dialog_end = false"
                  >
                    キャンセル
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog_end.save(setting.end_date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text class="pt-0">こころの種類</v-card-text>
        <v-card-text class="py-0">
          <v-row>
            <v-col>
              <v-checkbox
                v-model="setting.kokoro_level"
                :value="KAKUTEI"
                class="mt-0"
              >
                <template v-slot:label>
                  <p class="mb-0 black--text">確定</p>
                </template>
              </v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox
                v-model="setting.kokoro_level"
                :value="KOKAKURITSU"
                class="mt-0"
              >
                <template v-slot:label>
                  <p class="mb-0 black--text">高確率</p>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text class="pt-0">見かけやすさ</v-card-text>
        <v-card-text class="py-0">
          <v-row>
            <v-col>
              <v-checkbox
                v-for="(item, key) in monster_level_list1" :key="key"
                v-model="setting.monster_level"
                :value="item.level"
                class="mt-0 py-0"
              >
                <template v-slot:label>
                  <p class="mb-0 black--text">{{ item.title }}</p>
                </template>
              </v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox
                v-for="(item, key) in monster_level_list2" :key="key"
                v-model="setting.monster_level"
                :value="item.level"
                class="mt-0 py-0"
              >
                <template v-slot:label>
                  <p class="mb-0 black--text">{{ item.title }}</p>
                </template>
              </v-checkbox>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-text class="pt-0">ヒートマップサイズ</v-card-text>
        <v-card-text class="">
          <v-row justify="center">
            <v-col class="px-5">
              <v-slider
                v-model="setting.radius"
                color="primary"
                track-color="grey"
                ticks="always"
                tick-size="7"
                :thumb-size="24"
                thumb-label="always"
                :max="MAX_RADIUS"
                :min="MIN_RADIUS"
                step="10"
              ></v-slider>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="justify-end pt-4">
          <v-btn
            color="primary lighten-2"
            text
            @click="close(true)"
          >
            キャンセル
          </v-btn>
          <v-btn
            color="primary lighten-1"
            text
            @click="save"
          >
            完了
          </v-btn>
        </v-card-actions>        
      </v-form>
    </v-card>
    <Confirm ref="confirm"></Confirm>
    <Warning ref="warning"></Warning>
  </v-dialog>
</template>

<script>
import Confirm from '@/components/Confirm.vue'
import Warning from '@/components/Warning.vue'

export default {
  name: 'Setting',

  components: {
    Confirm,
    Warning
  },

  data() {
    return {
      show_setting: false,
      valid: true,
      dialog_start: false,
      dialog_end: false,

      setting: { ...this.$store.state.setting },
      initial_setting: { ...this.$store.state.setting },

      monster_level_list1: [
        { title:"めったに", level:5 },
        { title:"あまり", level:4 },
        { title:"メタル系", level:6 },
      ],
      monster_level_list2: [
        { title:"ときどき", level:3 },
        { title:"よく", level:2 },
        { title:"とてもよく", level:1 },
      ],
    }
  },

  computed: {
    MAX_RADIUS: () => 120,
    MIN_RADIUS: () => 40,
    KAKUTEI: () => 2,
    KOKAKURITSU: () => 1,
  },

  methods: {
    open() {
      this.show_setting = true
      this.setting = { ...this.$store.state.setting }
      this.initial_setting = { ...this.$store.state.setting }
    },

    validate() {
      // 日付の順序確認
      if (this.$dayjs(this.setting.start_date) > this.$dayjs(this.setting.end_date)) {
        this.$refs.warning.warning('適切な期間にしてください。')
        return false
      }
      if (this.setting.kokoro_level.length == 0) {
        this.$refs.warning.warning('こころの種類を選択してください。')
        return false
      }
      if (this.setting.monster_level.length == 0) {
        this.$refs.warning.warning('見かけやすさを選択してください。')
        return false
      }
      return true
    },
    save() {
      if (this.validate()) {
        console.log("save!")

        this.setting.kokoro_level.sort((a, b) => {
          return a < b ? -1 : 1;
        })
        this.setting.monster_level.sort((a, b) => {
          return a < b ? -1 : 1;
        })

        this.$store.dispatch({
          type: 'save_setting',
          setting: JSON.parse(JSON.stringify(this.setting)) // shallowコピーによって，キー削除時に日付変更のご認識があるため
        })
        
        if (this.is_change_period()) {
          this.$emit('update', true)
        } else {
          this.$emit('update', false)
        }
        this.show_setting = false
      }
    },
    is_change_period() {
      return ((this.setting.start_date != this.initial_setting.start_date) || (this.setting.end_date != this.initial_setting.end_date))
    },

    async close() {
      if (this.is_change()) {
        if (await this.$refs.confirm.confirm('変更を破棄しますか？')) {
          this.show_setting = false
        }
      } else {
        this.show_setting = false
      }
    },
    is_change() {
      let result = false
      if (JSON.stringify(this.setting) !== JSON.stringify(this.initial_setting)) {
        result = true
      }
      return result
    },
  }
}
</script>