import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatApiService } from 'src/@api/chat-api.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {
  constructor(
    private router: Router,
    private chatApiService: ChatApiService
  ) {}

  indexReturn() {
    this.router.navigate(['/home']);
  }

  chatMessages: any[] = [];
  newMessage: string = '';

  ngOnInit(): void {
    this.loadChatMessages();
  }

  loadChatMessages(): void {
    this.chatApiService.getChatMessages().subscribe((messages) => {
      this.chatMessages = messages;
    });
  }

  sendMessage(): void {
    if (this.newMessage) {
      this.chatApiService.sendMessage(this.newMessage).subscribe(() => {
        this.loadChatMessages(); // Recarga los mensajes después de enviar uno nuevo
        this.newMessage = ''; // Limpia el campo de entrada
      });
    }
  }
}
