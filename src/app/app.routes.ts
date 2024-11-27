import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { UserComponent } from './user/user.component';
import { BookingComponent } from './booking/booking.component';
import { HistoryComponent } from './history/history.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { TimeSlotComponent } from './time-slot/time-slot.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserHistoryComponent } from './user-history/user-history.component';


export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', component: HomeComponent }, // Trang chủ
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'user-profile', component: UserProfileComponent},
            { path: 'user-booking', component: UserBookingComponent},
            { path: 'user-history', component: UserHistoryComponent}
        ]
    },
    { path: 'doctor', component: DoctorComponent },
    { path: 'user', component: UserComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'specialty', component: SpecialtyComponent },
    { path: 'time-slot', component: TimeSlotComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
