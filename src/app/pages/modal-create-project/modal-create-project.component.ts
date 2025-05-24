import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectsService } from 'app/services/projects/projects.service';
import { UsersService } from 'app/services/users/users.service';

@Component({
  selector: 'app-modal-create-project',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatSelectModule, 
      MatIconModule, MatFormFieldModule, MatDialogActions, MatDialogClose, MatDialogTitle, 
      MatInputModule, MatDialogContent, ReactiveFormsModule],
  templateUrl: './modal-create-project.component.html',
  styleUrl: './modal-create-project.component.scss'
})
export class ModalCreateProjectComponent {
  formCreateProject!: FormGroup;
  administratorsValues: any[]=[];
  usersValues: any[]=[];
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly _userService: UsersService,
    private readonly _projectService: ProjectsService,
    private readonly dialogRef: MatDialogRef<ModalCreateProjectComponent>
  ){
    this.updateFormProjects();
    this.getAllAdministrators();
    this.getAllUsers();
  }

  ngOnInit(){
   
  }
updateFormProjects(){
    this.formCreateProject = this._formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      admin_id: ['', Validators.required],
      usuarios: ['', Validators.required],
    });
  }

  getAllAdministrators(){
    this.isLoading = true;
    this._userService.getAllAdministrators().subscribe({
      next: (response) => {
        this.administratorsValues = response.users;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
  getAllUsers(){
    this.isLoading = true;
    this._userService.getAllUsersByAdministrator().subscribe({
      next: (response) => {
        this.usersValues = response.users;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  assignUsers(project: number, userIds: number[]) {
    this._projectService.assignUsersToProject(project, userIds).subscribe({
      next: (response) => {
        console.log('Usuarios asignados correctamente:', response);
      },
      error: (error) => {
        console.error('Error al asignar usuarios:', error);
      },
      complete: () => {
        console.log('Asignación de usuarios finalizada.');
      }
    });
  }

  createProject(){
    if (this.formCreateProject.valid){

    const projectData = this.formCreateProject.value;
    const userIds = this.formCreateProject.value.usuarios;
      this._projectService.createProject(projectData).subscribe({
        next: (response) => {
          const projectId = response.proyecto.id;
          this.assignUsers(projectId, userIds);
          this._snackBar.open(response.message, 'Cerrar', {duration: 5000});
          this.dialogRef.close(true);
        },
        error: (error) => {
          const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
          this._snackBar.open(errorMessage, 'Cerrar', {duration: 5000});
        }
      });
    }
  }

}
