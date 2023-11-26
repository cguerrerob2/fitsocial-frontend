import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatApiService } from 'src/@api/chat-api.service';
import { Community, CommunityApiService } from 'src/@api/community-api.service';
import { AuthService } from 'src/@api/auth.service';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {
  constructor(
    private router: Router,
    private chatApiService: ChatApiService,
    private formBuilder: FormBuilder,
    private communityApiService: CommunityApiService,
    private auth: AuthService
  ) {
    // Genera un número aleatorio para la imagen
  }

  indexReturn() {
    this.router.navigate(['/home']);
  }

  communityForm!: FormGroup; // FormGroup para el formulario

  communityList: any[] = [];
  chatMessages: any[] = [];
  newMessage: string = '';
  userEmail: string | null = null;

  ngOnInit(): void {
    this.auth.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });

    this.loadChatMessages();
    this.loadCommunityList();

    // Create Community
    // Inicializa el FormGroup y define las validaciones
    this.communityForm = this.formBuilder.group({
      name: ['', Validators.required],
      theme: ['', Validators.required],
      description: [''],
    });

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

  // Modal Add Community
  isOpen = false;
  toggleModal() {
    this.isOpen = !this.isOpen;
  }

  loadCommunityList(): void {
    this.communityApiService.getListCommunities().subscribe((communities) => {
      this.communityList = communities;
    });
  }

  createCommunity(): void {
    if (this.communityForm.valid) {
      const newCommunity: Community = this.communityForm.value;

      // Llamada al servicio para crear la comunidad
      this.communityApiService.saveCommunity(newCommunity).subscribe((createdCommunity: any) => {
        // Manejo de la respuesta después de crear la comunidad
        console.log('Comunidad creada:', createdCommunity);

        // Reiniciar el formulario después de enviar los datos
        this.communityForm.reset();
      });
    }
  }

}
