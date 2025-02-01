import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  urlBaseServices: string = URL_SERVICIOS;

  constructor(private readonly http: HttpClient) { }

  getAllProjects(filters?: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects`;
    return this.http.get<any>(endpoint);
  }

  getProjectById(id: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/${id}`;
    return this.http.get<any>(endpoint);
  }

  createProject(projectData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/create`;
    return this.http.post<any>(endpoint, projectData);
  }

  getUsersProject(): Observable<any[]> {
    const endpoint = `${this.urlBaseServices}/api/v1/users`;
    return this.http.get<any[]>(endpoint);
  }

  associateUsersToProject(dataAssociation: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/associate`;
    return this.http.post<any>(endpoint, dataAssociation);
  }

  disassociateUserFromProject(projectId: number, userId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/disassociate`;
    return this.http.request('DELETE', endpoint, { body: { projectId, userId } });
  }

  updateProject(projectData: { id: number; nombre: string; descripcion: string; administrador_id: number }): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/update`;
    return this.http.put<any>(endpoint, projectData);
  }

  deleteProject(projectId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/delete/${projectId}`;
    return this.http.delete<any>(endpoint);
  }

}
