import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment.development';
import { Constants } from '@model/constants';
import { User } from '@model/user';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(<string>localStorage.getItem(Constants.auth_token_code))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    if (this.currentUserSubject.value) {
      return this.currentUserSubject.value;
    } else {
      this.logout().subscribe((res) => {
        if (!res.success) {
          this.router.navigate(['/authentication/signin']);
        }
      });
      return { token: '' };
    }
  }

  register(
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    password: string
  ) {
    return this.http
      .post<any>(`${environment.apiUrl}${'register'}`, {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        email_id: email,
        password: password,
      })
      .pipe(
        map((user) => {
          if (user.status === 200) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              Constants.auth_token_code,
              JSON.stringify(user.data.data)
            );
            this.currentUserSubject.next(user.data.data);
            return user.data.data;
          } else {
            return null;
          }
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}${'logIn'}`, {
        username: username,
        password: password,
      })
      .pipe(
        map((user) => {
          if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            user.tokenType = user.type;

            localStorage.setItem(
              Constants.auth_token_code,
              JSON.stringify(user)
            );
            this.currentUserSubject.next(user);
            return user;
          } else {
            return null;
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear(/*Constants.auth_token_code*/);
    // @ts-ignore
    this.currentUserSubject.next({});
    return of({ success: false });
  }

  goToUserDefaultPage(): string {
    return '/home';
  }

  goToLoginPage(): string {
    return '/authentication';
  }
}
