import { CommonModule, Location} from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { ProjectsService } from 'app/services/projects/projects.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ModalAssignUsersProjectsComponent } from '../modal-assign-users-projects/modal-assign-users-projects.component';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AuthService } from '@core';

@Component({
  selector: 'app-projects-detail',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule
  ],
  templateUrl: './projects-detail.component.html',
  styleUrl: './projects-detail.component.scss'
})
export class ProjectsDetailComponent implements OnInit {

  displayedColumns: string[] = [];

  breadscrums = [
    {
      title: 'Gestión de proyectos',
      items: ['Listado de proyectos'],
      active: 'Detalle del proyecto',
    },
  ];

  projectId!: number;
  projectInformation: any;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private readonly _projectsService: ProjectsService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly dialogModel: MatDialog,
    private readonly _snackBar: MatSnackBar,
    private readonly _authService: AuthService,
  ) {
    this._activatedRoute.paramMap.subscribe(params => {
      this.projectId = +params.get('id')!;
    });
    this.displayedColumns = this.isAdminLogged() ? [
      'name',
      'email',
      'action'
    ] : ['name', 'email']
  }

  ngOnInit(): void {
    this.getProjectDetail();
  }

  goBack(): void {
    this.location.back();
  }

  getProjectDetail(): void {
    this._projectsService.getProjectById(this.projectId).subscribe({
      next: (response) => {
        this.projectInformation = response.project;
        this.dataSource.data = response.project.usuarios;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  openModalAssignUser(): void {
    const dialogRef = this.dialogModel.open(ModalAssignUsersProjectsComponent, {
      minWidth: '300px',
      maxWidth: '1000px',
      width: '840px',
      disableClose: true,
      data: {
        projectId: this.projectInformation.id,
        assignedUsers: this.projectInformation.usuarios
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProjectDetail();
      }
    })
  }

  deleteUserFromProject(userId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario del proyecto.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this._projectsService.disassociateUserFromProject(this.projectId, userId).subscribe({
          next: (response) => {
            this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
            this.getProjectDetail();
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

}
