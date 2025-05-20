import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css' // Ensure MDI icons are available
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#003153',      // Prussian Blue
        secondary: '#f8f9fa',    // Light shade for backgrounds/cards
        accent: '#FFD700',       // Gold
        error: '#f44336',
        info: '#2196f3',
        success: '#4caf50',
        warning: '#ff9800'
      }
    },
    options: {
      customProperties: true // Enables use of CSS vars
    }
  },
  icons: {
    iconfont: 'mdi' // Material Design Icons
  }
})