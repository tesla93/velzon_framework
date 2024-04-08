import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Register Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { UserProfileService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {

  // Login Form
  signupForm!: FormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  fieldTextType!: boolean;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserProfileService) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
     this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * Register submit form
   */
   onSubmit() {
    this.submitted = true;
    console.log('submitted');

     //Register Api
     this.authenticationService.register(this.f['email'].value, this.f['name'].value, this.f['password'].value).pipe(first()).subscribe(
      (data: any) => {
      this.successmsg = true;
      console.log(data);
      if (this.successmsg) {
        this.router.navigate(['/auth/login']);
      }
    },
    (error: any) => {
      this.error = error ? error : '';
    });  
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
