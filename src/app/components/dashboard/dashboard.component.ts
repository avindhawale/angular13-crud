import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'user_id',
    'user_name',
    'user_email',
    'user_phone_no',
    'user_gender',
    'user_reg_date',
    'user_status',
    'action',
  ];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        if (response.status) {
          this.dataSource = new MatTableDataSource(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (error) => {
        alert('Error : ' + error.message);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(row: any) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUserData();
      }
    });
  }

  deleteUserConfirmation(row: any) {
    const dialogRef = this.dialog.open(AlertComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(row);
      }
    });
  }

  deleteUser(row: any) {
    this.userService.deleteUser(row.user_id).subscribe({
      next: (response) => {
        if (response.status) {
          alert('User deleted successfully');
          this.getUserData();
        } else {
          alert('Something went wrong, try again.');
        }
      },
      error: (error) => alert(error),
    });
  }
}
