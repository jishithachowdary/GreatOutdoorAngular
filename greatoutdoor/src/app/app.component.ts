import { stringify } from '@angular/compiler/src/util';
import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './model/role.model';
import { User } from './model/user.model';
import { AuthService } from './service/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: any;

    constructor(
        private router: Router,
        private authenticationService: AuthService
    ) {
        this.authenticationService.currentUser.subscribe(x => {this.currentUser = x;console.log("roles");console.log(this.currentUser);});
    }

    get isAdmin() {
        return this.currentUser.roles[0].authority=== Role.Admin;
    }
    get isUser(){
        return this.currentUser.roles[0].authority===Role.User;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    

   
}