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
import { UsersService } from 'app/services/users/users.service';

@Component({
  selector: 'app-modal-create-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatSelectModule, 
      MatIconModule, MatFormFieldModule, MatDialogActions, MatDialogClose, MatDialogTitle, 
      MatInputModule, MatDialogContent, ReactiveFormsModule],
  templateUrl: './modal-create-users.component.html',
  styleUrl: './modal-create-users.component.scss'
})
export class ModalCreateUsersComponent {

  formCreateUser!: FormGroup;
  administratorsValues: any[]=[];
  isLoading = false;

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly _userService: UsersService,
    private readonly dialogRef: MatDialogRef<ModalCreateUsersComponent>
  ){
    this.updateFormUsers();  //detectar cambios al form
    this.getAllAdministrator(); //precargar administratorsValues
  }

   ngOnInit(){
   
  }

  updateFormUsers(){ //construir formulario de actualizacion de usuario
    this.formCreateUser = this._formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol_id: ['', Validators.required],
      administrador_id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

   getAllAdministrator(){ //método para cargar valores en adminValues
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

  createUser(){
    if (this.formCreateUser.valid){ //verifica validz del form

    const userData = this.formCreateUser.value;
      this._userService.createUser(userData).subscribe({ //llamado al endpoint POST que crea al usuario 
        next: (response) => {
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

