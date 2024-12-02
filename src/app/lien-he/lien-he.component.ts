import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-lien-he',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './lien-he.component.html',
  styleUrl: './lien-he.component.scss'
})
export class LienHeComponent {

}
