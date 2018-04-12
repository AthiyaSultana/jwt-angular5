import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiservice: ApiService) {
  }

  userDetails(userDetails) {
    userDetails.token = sessionStorage.getItem('token');
    console.log('userdetails', userDetails);
    this.apiservice.createUserDetails(userDetails).subscribe((resp: any) => {
      if (resp.auth) {
        console.log('resp message', resp.message);
      } else {
        console.log('resp message', resp.message);
      }
    });

  }

  ngOnInit() {
  }

}
