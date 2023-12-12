import { router } from './providers/router';
import { store } from './providers/store';
import { PrimeVue, ToastService } from './providers/primevue';

import App from './App.vue';

export const application = createApp(App).use(router).use(store).use(PrimeVue).use(ToastService);
