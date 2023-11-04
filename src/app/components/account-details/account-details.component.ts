import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void => *', animate('300ms')),
      transition('* => void', animate('300ms'))
    ])
  ]
})

export class AccountDetailsComponent {
  constructor(private router: Router) {}

  indexReturn() {
    this.router.navigate(['/home']);
  }

  isOpen = false;

  toggleModal() {
    this.isOpen = !this.isOpen;
  }
}
