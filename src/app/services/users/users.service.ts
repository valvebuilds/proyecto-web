import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/core/models/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlBaseServices: string = URL_SERVICIOS; //url base de nuestra api de backend

  constructor(private readonly http: HttpClient) { }
//aquí van todos los llamados a los endpoints relacionados con el usuario
  createUser(userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/users/create`;
    return this.http.post<any>(endpoint, userData);
  }
  updateUser(userId: number, userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/users/update/${userId}`;
    return this.http.put<any>(endpoint, userData);
  }
  deleteUser(userId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/users/delete/${userId}`;
    return this.http.delete<any>(endpoint);
  }
  getAllUsersByAdministrator(filters?: any): Observable<any> { 
   const token = sessionStorage.getItem('accessToken');  //obtener token del admin que está logueado
    if (!token) {
      console.error('Token no disponible en sessionStorage');
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`, // incluir el token del admin en el encabezado para obtener su id y acceso
  });
  const endpoint = `${this.urlBaseServices}/api/users`; //endpoint para conseguir listado de users

  if (filters && (filters.name || filters.email)) { //aplica los filtros si es el caso
    const params = new HttpParams({
      fromObject: {
        name: filters.name || '',
        email: filters.email || ''
      }
    });
    return this.http.get<any>(endpoint, {headers, params }); //llamado al endpoint con el header con token y filtros
  }

  return this.http.get<any>(endpoint, { headers }); //lama al endpoint solo con encabezado en caso de no tener filtros
}

  getAllAdministrators(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/users/rol/1`;
    return this.http.get<any>(endpoint); //obtener a todos los admins filtrando por rol 1
  }
  getAllUsers(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/users/rol/2`; //obtener users filtrando por rol 2
    return this.http.get<any>(endpoint);
  }
}
