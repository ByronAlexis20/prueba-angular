import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HelpersUtil } from 'src/app/utils/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  constructor(private authService: AuthService, private router: Router, private helpersUtil: HelpersUtil) {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
  submit() {
    const username = this.form.value.username;
    const password = this.form.value.password;
    // Llama al método login del AuthService para autenticar al usuario
    this.authService.login(username, password).subscribe(
      (response) => {
        this.helpersUtil.saveAuthToken(response);
        this.router.navigate(['/menu']);
      },
      () => {
        this.error = 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    );
  }
  @Input() error?: string | null;

  @Output() submitEM = new EventEmitter();
}
