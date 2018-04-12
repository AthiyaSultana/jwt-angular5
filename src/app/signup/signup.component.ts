import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {
  }

  signUpDetails(signUpData) {
    this.apiService.signUp(signUpData).subscribe((resp: any) => {
      console.log('resp', resp);
      if (resp.auth) {
        /*sessionStorage.setItem('userId', resp._id);
        sessionStorage.setItem('token', resp.token);*/
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
  }

}
