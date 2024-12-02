import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-gioi-thieu',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './gioi-thieu.component.html',
  styleUrl: './gioi-thieu.component.scss'
})
export class GioiThieuComponent {

}
