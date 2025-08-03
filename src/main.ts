import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // ✅ Ajout de l'import manquant
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    ...appConfig.providers // ✅ fusionne les providers si `appConfig` en a
  ]
}).catch((err) => console.error());
