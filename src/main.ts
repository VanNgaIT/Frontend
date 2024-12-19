import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HeaderComponent } from './app/header/header.component';
import { HomeComponent } from './app/home/home.component';
import 'bootstrap';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { MainComponent } from './app/main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


bootstrapApplication(MainComponent,  {
  providers: [
    provideHttpClient(),
    provideRouter(routes),  
    FormsModule,
    BrowserAnimationsModule, 
    [provideToastr()],  
    ...appConfig.providers,
  ]
})
  .catch(err => console.error(err));


