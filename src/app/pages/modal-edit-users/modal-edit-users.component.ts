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
  selector: 'app-modal-edit-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatSelectModule, 
    MatIconModule, MatFormFieldModule, MatDialogActions, MatDialogClose, MatDialogTitle, 
    MatInputModule, MatDialogContent, ReactiveFormsModule],
  templateUrl: './modal-edit-users.component.html',
  styleUrl: './modal-edit-users.component.scss'
})
export class ModalEditUsersComponent {
  formUpdateUsers!: FormGroup;
  administratorsValues: any[]=[]; //aquí van a ir los nombres de los admins para precargar en el formulario
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly _userService: UsersService,
    private readonly dialogRef: MatDialogRef<ModalEditUsersComponent>
  ){
    this.updateFormUsers(); //oara detectar los cambios en el form
    this.getAllAdministrator(); //para inicializar administrators values
  }

  ngOnInit(){
    if (this.data) {
      this.loadUserData(this.data); //obtener la data pasada al modal como parámtero
    }
  }

  updateFormUsers(){
    this.formUpdateUsers = this._formBuilder.group({ //construcion del formulario con validacion para los campos requeridos
      id:['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol_id: ['', Validators.required],
      admin_id: ['', Validators.required],
    });
  }
  loadUserData(user: any){ //precargar los datos del usuario al formulario
    this.formUpdateUsers.patchValue({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol_id: user.rol_id,
      admin_id: user.admin_id,
    })
  }

  getAllAdministrator(){ //metodo para obtener administrators values
    this.isLoading = true;
    this._userService.getAllAdministrators().subscribe({ //llama al endpoint correspondiente
      next: (response) => {
        this.administratorsValues = response.users; //aqui se asigna
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  updateUsers(){ //metodo que envia los datos actualizados al backend
    if (this.formUpdateUsers.valid){ //verificar validez del fromulario
      const userData = this.formUpdateUsers.value;
      const userId = this.data?.id;
      this._userService.updateUser(userId, userData).subscribe({ //llamado al endpoint con los datos actualizados
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
