import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  login(userDetails) {
    console.log('userDetails', userDetails);
    return this.http.post('/login', userDetails);
  }

  signUp(signUpDetails) {
    console.log('signUpDetails', signUpDetails);
    return this.http.post('/createUser', signUpDetails);
  }

  createUserDetails(details) {
    console.log('personal details', details);
    return this.http.post('CreatePersonalInfo', details);
  }

}
