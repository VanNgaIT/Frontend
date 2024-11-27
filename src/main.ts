import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HeaderComponent } from './app/header/header.component';
import { HomeComponent } from './app/home/home.component';
import 'bootstrap';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './app/admin-dashboard/admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { UserBookingComponent } from './app/user-booking/user-booking.component';
import { UserHistoryComponent } from './app/user-history/user-history.component';
import { UserProfileComponent } from './app/user-profile/user-profile.component';
import { MainComponent } from './app/main/main.component';

// bootstrapApplication(HeaderComponent, appConfig)
//   .catch((err) => console.error(err));

// bootstrapApplication(HomeComponent, {
//     providers: [
//      provideHttpClient(),
//      provideRouter([routes]),
//      ...appConfig.providers,
//    ],
//  })
bootstrapApplication(MainComponent, {
  providers: [
   provideHttpClient(),
   provideRouter([]),
   ...appConfig.providers,
 ],
})
//   .catch((err) => console.error(err));
// bootstrapApplication(LoginComponent, appConfig)
//   .catch((err) => console.error(err));
// bootstrapApplication(RegisterComponent, {
//   providers: [
//     provideHttpClient(),
//     provideRouter([]),
//     ...appConfig.providers,
//   ],
// })
// .catch((err) => console.error(err));
// bootstrapApplication(AdminDashboardComponent, {
//   providers: [
//    provideHttpClient(),
//    provideRouter(routes),
//    ...appConfig.providers,
//  ],
// })
// .catch((err) => console.error(err));
// bootstrapApplication(UserProfileComponent, {
//   providers: [
//    provideHttpClient(),
//    provideRouter([]),
//    ...appConfig.providers,
//  ],
// })
// .catch((err) => console.error(err));

