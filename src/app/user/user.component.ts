import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserResponse } from '../model/user.model';
import { MessageService } from 'primeng/api';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService],
})
export class UserComponent implements OnInit {
  editForm!: FormGroup;
  private unsubscribe: Subscription[] = [];
  userId!: any;
  user!: IUserResponse;
  visible: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');

    this.editForm = this.fb.group({
      name: ['', Validators.required],

      job: ['', Validators.required],
    });

    this.getUser();
  }

  getUser() {
    console.log('signing in');
    const UserSub = this.userService.getUser(this.userId).subscribe({
      next: (response: any) => {
        this.user = response.data;
        console.log(this.user);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
    this.unsubscribe.push(UserSub);
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  editUser() {
    const EditUserSub = this.userService
      .editUser(this.userId, this.editForm.value)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    this.unsubscribe.push(EditUserSub);
    this.editForm.reset();
  }
  deleteUser() {
    const DeleteUserSub = this.userService.deleteUser(this.userId).subscribe({
      next: (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User deleted successfully',
        });
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'Error',
          summary: 'Error',
          detail: 'failed to delete User',
        });
      },
    });
    this.unsubscribe.push(DeleteUserSub);
  }

  showDialog() {
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }
}
