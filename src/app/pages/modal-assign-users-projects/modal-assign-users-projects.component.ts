import { CommonModule } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProjectsService } from 'app/services/projects/projects.service';
import { UsersService } from 'app/services/users/users.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-assign-users-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatSelectModule, MatIconModule, MatFormFieldModule,
      MatInputModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatTableModule, MatIconModule, MatTooltipModule, MatCheckboxModule, MatPaginatorModule],
  templateUrl: './modal-assign-users-projects.component.html',
  styleUrl: './modal-assign-users-projects.component.scss'
})
export class ModalAssignUsersProjectsComponent {

  formAssignUser!: FormGroup;
  usersList: any[] = [];
  dataSource = new MatTableDataSource<any>([]);
  globalSelectedUsers: any[] = [];

  displayedColumns: string[] = [
    'checked',
    'name',
    'email',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _formBuilder: FormBuilder,
    private readonly _projectService: ProjectsService,
    private readonly _userService: UsersService,
    private readonly dialogRef: MatDialogRef<ModalAssignUsersProjectsComponent>,
    private readonly _snackBar: MatSnackBar,  

  ) {
    this.getAllUsersToAssign()
  }

  getAllUsersToAssign() {
    this._userService.getAllUsers().subscribe({
      next: (res) => {
        this.usersList = res.users.filter((user: any) => 
          !this.data?.assignedUsers.some((assignedUser: any) => assignedUser.id === user.id)
        );
        this.dataSource.data = this.usersList;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toggleAllSelection(event: MatCheckboxChange): void {
    if (event.checked) {
      this.dataSource?.data.forEach((row: any) => {
        if (!this.isSelected(row)) {
          row.checked = true;
          this.globalSelectedUsers.push(row);
        }
      });
    } else {
      this.dataSource?.data.forEach(row => {
        row.checked = false;
        this.globalSelectedUsers = this.globalSelectedUsers.filter(item => item.id !== row.id);
      });
    }
  }

  toggleSelection(event: MatCheckboxChange, row: any): void {
    if (event.checked) {
      this.globalSelectedUsers.push(row);
    } else {
      this.globalSelectedUsers = this.globalSelectedUsers.filter(item => item.invoiceId !== row.invoiceId);
    }
  }

  isSelected(row: any): boolean {
    return this.globalSelectedUsers.some(item => item.id === row.id);
  }

  isAllSelected(): boolean {
    return this.dataSource?.data.every(row => this.isSelected(row));
  }

  associateUsers() {
    const projectId = this.data?.projectId;
    const userIds = this.globalSelectedUsers.map(user => {
      return user.id
    });
    const dataInformation = {
      projectId,
      userIds
    }

    this._projectService.associateUsersToProject(dataInformation).subscribe({
      next: (response) => {
        this._snackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.dialogRef.close(true);
      },
      error: (error) => {
        const errorMessage = error.error?.result || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
        this._snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      }
    });
  }
}
