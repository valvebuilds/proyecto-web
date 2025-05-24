import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from 'app/shared/components/breadcrumb/breadcrumb.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'app/services/users/users.service';
import {MatDialog} from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { ModalEditUsersComponent } from 'app/pages/modal-edit-users/modal-edit-users.component';
import { ModalCreateUsersComponent } from 'app/pages/modal-create-users/modal-create-users.component';
import { ModalAssignUsersComponent } from 'app/pages/modal-assign-users/modal-assign-users.component';

export interface User {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatOptionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    BreadcrumbComponent,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule 
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements AfterViewInit {

  //Columnas para asociar a la mat table
  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'action'
  ];

  breadscrums = [
    {
      title: 'Gestión de usuarios',
      items: [],
      active: 'Datos básicos',
    },
  ];

  breadscrumsDetails = [
    {
      title: '',
    },
  ];

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  
  userFormsSearchFilter!: FormGroup; //definir form para filtro de busqueda
  usersList: any[] = [];            //campo para almacenar listado de usuarios
  isLoading = false;

  userDefaultFilterSearch: any = { //inicializar filtro en vacío
    name: undefined,
    email: undefined,
  }

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly userService: UsersService,
    private readonly dialogModel: MatDialog,
    private readonly _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.createUserFormSearchFilter();  //inicializar form de filtros
    this.getAllUsersByAdministrator(); //precargar usuarios asociados al admin logueado
    this.handlerUserFilterChange('name', 'name'); //detectar input en el form de filtros 
    this.handleUserFilterChange('email', 'email');
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;//paginador de la tabla
  }
  
  private createUserFormSearchFilter(){ //método que crea el form de filtros
      this.userFormsSearchFilter = this._formBuilder.group({
      name: [''],
      email: ['']
    });
  }

  getAllUsersByAdministrator(filters?: any): void {//método para obtener todos los usuarios asociados al admin logueado aplicando los filtros si es el caso
    this.isLoading = true;
    this.userService.getAllUsersByAdministrator(filters).subscribe({
      next: (response) => {
        this.usersList = response.users;
        this.dataSource.data = response.users;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private handlerUserFilterChange(controlName: string , filterKey:string ){
    this.userFormsSearchFilter.get(controlName)?.valueChanges //observar si cambia el valor del campo en el form
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.userDefaultFilterSearch[filterKey] = value?.trim() || undefined; //asignar el valor ingresado al filterkey
        this.getAllUsersByAdministrator(this.userDefaultFilterSearch); //llamar al método que carga usuarios usando el filtro
      });
  }

  private handleUserFilterChange(controlName: string, filterKey: string) {
    this.handlerUserFilterChange(controlName, filterKey);
}

 openEditModal(user: any): void { //llama al modal de edicion de datos de usuario
    const dialogRef = this.dialogModel.open(ModalEditUsersComponent, {
      width: '1200px',
      data: user  // pasa los datos del usuario al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // refrescar lista de users al cerrar el modal de editar
        this.getAllUsersByAdministrator();
      }
    });
  }

  openCreateModal(): void { //abrir modal para crear un usuario nuevo
    const dialogRef = this.dialogModel.open(ModalCreateUsersComponent, {
      width: '1200px', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // refrescar lista de usuarios al cerrar
        this.getAllUsersByAdministrator();
      }
    });
  }

  openAssignModal(user: any): void { //abrir modal para asignar proyectos al suuario
    const dialogRef = this.dialogModel.open(ModalAssignUsersComponent, {
      width: '1200px', 
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // refrescar lista de usuarios al cerrar
        this.getAllUsersByAdministrator();
      }
    });
  }

  deleteUser(user: any): void { //handling de eliminacion de usuario
  const userId = user?.id; //extraer id de usuario
  if (userId) {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log('Usuario eliminado:', response);
        this.getAllUsersByAdministrator(); // recargar tabla 
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    });
  }}
}

