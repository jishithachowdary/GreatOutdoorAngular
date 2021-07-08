import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user = new User('', '', '',);
  isRegistered = true;
  submitted = false;
  errorMessage = '';
  constructor(private authService: AuthService){ }
  ngOnInit() {
      this.registrationForm = new FormGroup({
          userName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
          password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
          confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(3)]),
          role: new FormControl("sales")
      });
    }
  onSubmit(){
      this.submitted = true;
      this.user.userId = this.registrationForm.value.userName;
      this.user.userPassword = this.registrationForm.value.password;
      //console.log(this.getSelectedRoles());
      this.user.userType = this.registrationForm.value.role;
      // this.registerUser()
      this.save();
  }
  // registerUser(){
      
  //     this.authService.signup(this.user)
  //     .subscribe(user=> {
  //         console.log(user);
  //         this.isRegistered = true;
  //         console.log(this.isRegistered);
  //     }, error=> {
  //         console.log(error);
  //         this.errorMessage = error;
  //         this.isRegistered = false;
  //     });
  //     console.log(this.isRegistered);
  // }

  save() {
    this.authService.signup(this.user).subscribe(user => {
        console.log(user);
        this.isRegistered = true;
    }, error => {
        console.log(error);
        this.errorMessage = error;
        this.isRegistered = false;
    });
}

}