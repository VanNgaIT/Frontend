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
import { ForgotPassComponent } from './forgot-pass/forgotpass.component';
import { ChangePassComponent } from './change-pass/changepass.component';
import { ResetPassComponent } from './reset-pass/resetpass.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserBookingComponent } from './user-booking/user-booking.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { GioiThieuComponent } from './gioi-thieu/gioi-thieu.component';
import { LienHeComponent } from './lien-he/lien-he.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            { path: '', component: HomeComponent }, // Trang chủ
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forgot-password', component: ForgotPassComponent },
            { path: 'change-password', component: ChangePassComponent },
            { path: 'reset-password', component: ResetPassComponent },
            { path: 'user-profile', component: UserProfileComponent},
            { path: 'user-booking', component: UserBookingComponent},
            { path: 'user-history', component: UserHistoryComponent},
            { path: 'about', component: GioiThieuComponent},
            { path: 'services', component: LienHeComponent}
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
