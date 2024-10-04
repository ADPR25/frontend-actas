import { registerPlugins } from './plugins/index'
import { VDateInput } from 'vuetify/labs/VDateInput';
import { VTimePicker } from 'vuetify/labs/components';

import App from './App.vue'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify';

// Crear una instancia de Vuetify e incluir los componentes de Vuetify Labs
const vuetifyInstance = createVuetify({
    components: {
      VTimePicker,
      VDateInput
    }
});

const app = createApp(App);
registerPlugins(app);
app.use(vuetifyInstance).mount('#app');
