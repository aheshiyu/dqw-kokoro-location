<template>
  <v-dialog
    v-model="show_warning"
    persistent
    max-width="380"
  >
    <v-card>
      <v-card-title class="text-h6 text-weight-black">
        <v-icon small class="mr-3" color="red">mdi-alert</v-icon>
        <p class="mb-0 text-subtitle-1">{{ message }}</p> 
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="show_warning = false"
        >
          はい
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Warning',

  data() {
    return {
      show_warning: false,
      message: '',
    }
  },

  methods: {
    warning(message) {
      this.message = message
      this.show_warning = true
    },
  }
}
</script>