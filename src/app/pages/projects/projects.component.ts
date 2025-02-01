import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ProjectsService } from 'app/services/projects/projects.service';
import { ModalCreateProjectComponent } from '../modal-create-project/modal-create-project.component';import Swal from 'sweetalert2';
import { AuthService } from '@core';
;

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  breadscrums = [
    {
      title: 'Gestión de proyectos',
      items: [],
      active: 'Listado de proyectos',
    },
  ];

  displayedColumns: string[] = [
    'name',
    'description',
    'createdAt',
    'totalUsers',
    'admin',
    'action'
  ];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  projectsList: any[] = [];

  constructor(
    private readonly _projectsService: ProjectsService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly dialogModel: MatDialog,
    private readonly _snackBar: MatSnackBar,
    private readonly _authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this._projectsService.getAllProjects().subscribe({
      next: (response: any) => {
        this.projectsList = response.projects; // Asignar a projectsList
        this.dataSource.data = response.projects;
        this.dataSource.paginator = this.paginator;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  
  redirectToDetail(id: number): void {
    this._router.navigate(['detail', id], { relativeTo: this._activatedRoute });
  }

  openModalCreateUpdateProject(action: string, projectInformation?: any): void {
    const dialogRef = this.dialogModel.open(ModalCreateProjectComponent, {
      minWidth: '300px',
      maxWidth: '1000px',
      width: '840px',
      disableClose: true,
      data: { 
        action,
        project: projectInformation
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProjects();
      }
    })
  }

  deleteProject(projectId: number) {
    Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción desasociará a los usuarios del proyecto',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar',
          allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this._projectsService.deleteProject(projectId).subscribe({
          next: (response) => {
            this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
            this.getProjects();
          },
          error: (error) => {
            const errorMessage = error.error?.message || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
            this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
          }
        });
      }
    });
    
  }

  isAdminLogged() {
    return this._authService.isAdminLogged();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
