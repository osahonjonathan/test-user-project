import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  userId: any;
  userName!: string;
  imageUrl!: string;
  private unsubscribe: Subscription[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userid');
    this.getUser();
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  navigateUser() {
    this.router.navigate(['/user']);
  }

  getUser() {
    console.log('signing in');
    const UserSub = this.userService.getUser(this.userId).subscribe({
      next: (response: any) => {
        this.userName = response?.data?.first_name;

        this.imageUrl = response?.data?.avatar;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
    this.unsubscribe.push(UserSub);
  }
}
