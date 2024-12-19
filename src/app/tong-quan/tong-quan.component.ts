import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-tong-quan',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './tong-quan.component.html',
  styleUrl: './tong-quan.component.scss'
})
export class TongQuanComponent {

}
