import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TelegramChatComponent } from '../chatbot/chatbot.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, TelegramChatComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

}
