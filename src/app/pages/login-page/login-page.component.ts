import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router)

  // сигнал
  isPasswordVisible = signal<boolean>(false)


  form = new FormGroup({
    password: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
  })
  protected readonly onsubmit = onsubmit;

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      //@ts-ignore
      this.authService.login(this.form.value)
        .subscribe( el => {
          this.router.navigate([''])
          console.log(el)
        })
    }
  }

}
