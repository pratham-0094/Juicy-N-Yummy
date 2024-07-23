import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditprofileComponent } from './dialog/editprofile/editprofile.component';
import { debounceTime, filter, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  userAuth!: Boolean;
  adminAuth!: Boolean;
  isScrolled = false;

  title = 'Juicy-N-Yummy';
  constructor(public router: Router, public dialog: MatDialog) { }

  private scrollSubject = new Subject<void>();
  ngOnInit(): void {
    // Initial check
    this.checkAuthStatus();

    // Subscribe to router events to check auth status on each route change
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthStatus();
      });

    this.scrollSubject.pipe(debounceTime(10)).subscribe(() => {
      this.checkScroll();
    });

    window.addEventListener('scroll', () => this.scrollSubject.next());
  }

  checkScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  // Function to check the authentication status
  private checkAuthStatus(): void {
    this.userAuth = !!localStorage.getItem('userAuth');
    this.adminAuth = !!localStorage.getItem('adminAuth');
  }

  edit() {
    this.dialog.open(EditprofileComponent);
  }

  logout() {
    if (localStorage.getItem('userAuth')) {
      localStorage.removeItem('userAuth');
      this.userAuth = false;
    }
    if (localStorage.getItem('adminAuth')) {
      localStorage.removeItem('adminAuth');
      this.adminAuth = false;
    }
    this.router.navigateByUrl('/');
  }
}
