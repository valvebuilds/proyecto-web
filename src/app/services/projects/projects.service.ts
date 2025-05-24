import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'app/core/models/config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  urlBaseServices: string = URL_SERVICIOS;

  constructor(private readonly http: HttpClient) { }

  createProject(projectData: any): Observable<any>{
    const endpoint = `${this.urlBaseServices}/api/projects/create`;
    return this.http.post<any>(endpoint, projectData);
  };
  updateProject(projectId: number, projectData: any): Observable<any>{
    const endpoint = `${this.urlBaseServices}/api/projects/update/${projectId}`;
    return this.http.put<any>(endpoint, projectData);
  };

  deleteProject(projectId: number): Observable<any>{
    const endpoint = `${this.urlBaseServices}/api/projects/delete/${projectId}`;
    return this.http.delete<any>(endpoint);
  };

  getAllProjects(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/projects`;
    return this.http.get<any>(endpoint);
  };

  getAllProjectsByUser(userId:number): Observable<any>{
    const endpoint = `${this.urlBaseServices}/api/projects/${userId}`;
    return this.http.get<any>(endpoint);
  };
  
  assignUsersToProject(projectId: number, userIds: any): Observable<any>{
    const projectData = {
      projectId: projectId,
      userIds: userIds
    };
    const endpoint = `${this.urlBaseServices}/api/projects/associate`;
    return this.http.post<any>(endpoint, projectData);
  };
  removeUserFromProject(projectId: number, userIds: any): Observable<any>{
    const projectData = {
      projectId: projectId,
      userIds: userIds
    };
    const endpoint = `${this.urlBaseServices}/api/projects/disassociate`;
    return this.http.post<any>(endpoint, projectData);
  };
}
