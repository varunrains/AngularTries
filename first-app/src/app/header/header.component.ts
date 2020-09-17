import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthenticated: boolean = false;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSave() {
    this.dataStorageService.storeRecipes();
  }

  fetchReceipes() {
    //The data would have been already loaded through the resolver
    this.dataStorageService.fetchReceipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['./auth']);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
