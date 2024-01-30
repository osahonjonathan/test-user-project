import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  signinForm!: FormGroup;
  user: any;
  isMember: boolean = false;
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],

      password: ['', Validators.required],
    });
  }

  toggleMember() {
    this.isMember = !this.isMember;
  }

  signUp() {
    console.log('signing in');
    const LoginSub = this.authService
      .register(this.signinForm.value)
      .subscribe({
        next: (response: any) => {
          const id = response.id;
          const token = response.token;
          sessionStorage.setItem('access-token', JSON.stringify(token));
          localStorage.setItem('userid', JSON.stringify(id));
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'register successfully',
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        },
        error: (error: any) => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'register failed invalid details',
          });
          this.signinForm.reset();
        },
      });

    this.unsubscribe.push(LoginSub);
  }

  login() {
    const LoginSub = this.authService.login(this.signinForm.value).subscribe({
      next: (response: any) => {
        const token = response.token;
        sessionStorage.setItem('access-token', JSON.stringify(token));
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'login successfully',
        });
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      error: (error: any) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'login failed invalid details',
        });
        this.signinForm.reset();
      },
    });

    this.unsubscribe.push(LoginSub);
  }
}
