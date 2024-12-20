import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, NgIf], // Nhập FormsModule để dùng ngModel
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'] 
})
export class TelegramChatComponent {
  userMessage: string = '';
  botResponse: string = '';
  
  private botToken = '7086998947:AAFGPQStmjknarT6zGia8kFEW9O2C1SgIus'; // Thay token thật vào đây
  private chatId = '-4796065454'; // Thay chatId thật vào đây
  private telegramApiUrl = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

  isChatOpen: boolean = false;

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  constructor(private http: HttpClient) {}

  // Gửi tin nhắn đến Telegram Bot
  sendMessage() {
    if (this.userMessage.trim()) {
      this.http.post(this.telegramApiUrl, {
        chat_id: this.chatId,
        text: this.userMessage,
      }).subscribe({
        next: (res) => {
          console.log('Message sent:', res);
          this.botResponse = `Phòng khám xin chào bạn`;
          this.userMessage = '';
        },
        error: (err) => {
          console.error('Error sending message:', err);
          this.botResponse = 'Gửi tin nhắn thất bại!';
        }
      });
    }
  }
}
