import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private apiservice: ApiService) {
  }

  loginDetails(userDetails) {
    console.log('userdetails', userDetails);
    this.apiservice.login(userDetails).subscribe((resp: any) => {
      console.log('resp', resp);
      if (resp.token) {
        sessionStorage.setItem('userId', resp._id);
        sessionStorage.setItem('token', resp.token);
        this.router.navigate(['/dashboard']);
      } else {
        console.log('unauthorized user');
      }
    });
  }

  ngOnInit() {
  }

}
