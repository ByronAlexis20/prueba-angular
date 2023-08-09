import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  isLoading: boolean = false;
  @Input() error?: string | null;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.formLogin.valueChanges.subscribe(() => {
      this.isLoading = false;
      this.error = null;
    });
  }
  login() {
    this.isLoading = true;
    this.userService.login(this.formLogin.value).subscribe(
      (r:any)=>{
        this.isLoading = false;
        sessionStorage.setItem("token",r.result[0].access_token);
        this.router.navigate(['/home']);
      },
      (err:any)=> {
        this.isLoading = false;
        this.error = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    );
  }
  goToNoticias() {
    this.router.navigate(['/news']);
  }
}