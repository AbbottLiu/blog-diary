import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable()
export class OauthService {
  login(username: String, password: String): Observable<any> {
    return this.http.get('login', { username: username, password: password });
  }
  logout(username: String) {
    return this.http.get('login', { username: username });
  }
    constructor(private http: _HttpClient) { }

}
