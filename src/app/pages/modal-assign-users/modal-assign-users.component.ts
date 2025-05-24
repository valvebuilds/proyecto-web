import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectsService } from 'app/services/projects/projects.service';
import { User } from '../users/users/users.component';

@Component({
  selector: 'app-modal-assign-users',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './modal-assign-users.component.html',
  styleUrl: './modal-assign-users.component.scss'
})
export class ModalAssignUsersComponent {

  displayedColumns: string[] = ['projects', 'action'];
  dataSource = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  userData!: User; //para almacenar id y nombre de usuario
  userProjects: any[] = []; //almacenar projectos asociados alusuario
  allProjects:any[]=[]; //almacenar todos los  proyectos disponibles
  isLoading = false;
  formAssignProject!: FormGroup; //formulario para mostrar proyectos disponibles y asignar

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private readonly _snackBar: MatSnackBar,
    private readonly _projectService: ProjectsService,
    private readonly dialogRef: MatDialogRef<ModalAssignUsersComponent>,
    private readonly _formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    if (this.data) {
      this.loadUserData(this.data); //método para cargar datos del usuario seleccionado
    }
    this.getAllProjects(); //precargar todos los proyectos
    this.updateFormAssign(); //precargar form
  }

  updateFormAssign(){
      this.formAssignProject = this._formBuilder.group({ //construcion del formulario con validacion para los campos requeridos
        projectId: ['', Validators.required],
      });
    }
  loadUserData(user: User) {
    this.userData = user; //carga propiedad userData con data del usuario para usar mas tarde su id
    this.getAllUserProjects(user.id); //carga los proyectos asociados a este user unicamente
  }
  
  getAllProjects(){ //metodo para cargar todos los proyectos en allProjects
    this.isLoading = true;
    this._projectService.getAllProjects().subscribe({ 
      next: (response) => {
        this.allProjects = response.proyectos;
        this.filterProjects();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this._snackBar.open('Error al cargar proyectos', 'Cerrar', { duration: 3000 });
      }
    });
  }
  filterProjects() { //filtro para que form de asignacion no muestre los proyectos que ya tiene asignado el user
    const assignedProjectIds = this.userProjects.map(p => p.id); //compara lsita de todos los proyectos con lista de userProjects y filtra
    this.allProjects = this.allProjects.filter(project => 
    !assignedProjectIds.includes(project.id)
  );
}

  getAllUserProjects(userId: number) { //método que carga en una tabla los proyectos ya asignados del usuario
    this.isLoading = true;
    this._projectService.getAllProjectsByUser(userId).subscribe({
      next: (response) => {
        this.userProjects = response.proyectos;
        this.dataSource.data = response.proyectos;
        this.isLoading = false;
        this.filterProjects();
      },
      error: () => {
        this.isLoading = false;
        this._snackBar.open('Error al cargar proyectos', 'Cerrar', { duration: 3000 });
      }
    });
  }
  
  assignProject() { //método encargado de comunicar al endpoint la asignacion del proyecto
    const projectId = this.formAssignProject.value.projectId;
    const userId = [this.userData.id];
    if (!userId) return;
    this._projectService.assignUsersToProject(projectId, userId).subscribe({
      next: () => {
        this._snackBar.open('Usuario asociado del proyecto', 'Cerrar', { duration: 3000 });
        this.getAllUserProjects(this.userData.id);
      },
      error: () => {
        this._snackBar.open('Error al asociar usuario del proyecto', 'Cerrar', { duration: 3000 });
      }
    });
  }
  unassignProject(project: any) { //metodo encargado de comuicar al endpoint la desasignacion del proyecto
    const userId = this.userData.id;
    if (!userId) return;
    this._projectService.removeUserFromProject(project.id, userId).subscribe({
      next: () => {
        this._snackBar.open('Usuario desasociado del proyecto', 'Cerrar', { duration: 3000 });
        this.getAllUserProjects(userId);
      },
      error: () => {
        this._snackBar.open('Error al desasociar usuario del proyecto', 'Cerrar', { duration: 3000 });
      }
    });
  }

}
