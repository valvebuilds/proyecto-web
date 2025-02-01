import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as jwt from "jwt-decode";
import { User } from '@core/models/user';
import { URL_SERVICIOS } from '@core/models/config';
import { ROLES } from '@shared/models/enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  urlBaseServices: string = URL_SERVICIOS;

  // get currentUserValue(): string {
  //   return this.currentUserSubject.value;
  // }

  // set currentUserValue(user: string) {
  //   this.currentUserSubject.next(user.username);
  // }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private readonly currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  // constructor(
  //   private readonly router: Router,
  //   private readonly http: HttpClient,
  // ) {
  //   this.isLoadingSubject = new BehaviorSubject<boolean>(false);
  //   this.currentUserSubject = new BehaviorSubject<User>({ id: 0, username: '', password: '', firstName: '', lastName: '', token: '' });
  //   this.currentUser$ = this.currentUserSubject.asObservable();
  //   this.isLoading$ = this.isLoadingSubject.asObservable();
  // }

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem('accessToken');
    return accessToken !== null;
  }

  getAuthFromSessionStorage(): any {
    try {
      const lsValue = sessionStorage.getItem('accessToken');
      if (!lsValue) {
        return undefined;
      }
      const decodedToken: any = jwt.jwtDecode(lsValue);

      return decodedToken;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  getRoleInfoByToken(): { roleId: number, roleName: string } | undefined {
    try {
      const decodedToken: any = this.getAuthFromSessionStorage();
      const roleId = decodedToken.rol_id;
      let roleName = '';

      if (roleId === 1) {
        roleName = 'Administrador';
      } else if (roleId === 2) {
        roleName = 'Usuario';
      } else {
        return undefined;
      }

      return { roleId, roleName };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/authentication/signin'], {
      queryParams: {},
    });
  }

  getTokenFromSessionStorage(): string | null {
    const lsValue = sessionStorage.getItem('accessToken');
    return lsValue;
  }

  login(email: string, password: string): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/auth/login`;
    return this.http.post<any>(endpoint, { email, password });
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAdminLogged() {
    const userInfo = this.getAuthFromSessionStorage();
    return userInfo.rol_id === ROLES.ADMIN;
  }

  isUserLogged() {
    const userInfo = this.getAuthFromSessionStorage();
    return userInfo.rol_id === ROLES.USER;
  }

}
