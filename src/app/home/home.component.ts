import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from './home.service';
import {MatTableDataSource} from "@angular/material/table";
import {User, HomeState, PageParams} from "./home.model";
import {getUsersSelector, getParamsSelector} from "./home.reducer";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {
  AddUserAction,
  DeleteUserAction,
  FilterByParamsAction,
  UpdateCollectionAction,
  UpdateUserAction
} from "./home.actions";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EditorDialogComponent} from "../editor-dialog/editor-dialog.component";
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['userName', 'name', 'surname', 'email', 'role', 'date', 'enabled', 'actions'];
  public dataSource: MatTableDataSource<User>;
  public pageSizeOptions = [3, 5, 10, 20];
  public userId: number = 0;
  public filter: string = '';
  public sortOrder: string = 'asc';
  public pageNumber: number = 0;
  public pageSize: number = 3;
  public pageParams: PageParams = {
    userId: 0,
    filter: '',
    sortOrder: 'asc',
    pageNumber: 0,
    pageSize: 3,
    sortBy: ''
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public route: ActivatedRoute,
              public store: Store<HomeState>,
              public homeService: HomeService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.data = this.route.snapshot.data['items'];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.store.select(getUsersSelector).subscribe((users: User[]) => {
      this.dataSource.data = users;
    });

    this.store.select(getParamsSelector).subscribe((params: PageParams) => {
      this.pageParams = params;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sortChange($event: { active; direction }) {
    this.pageParams = {...this.pageParams, sortOrder: $event.direction, sortBy: $event.active};
    this.store.dispatch(new FilterByParamsAction(this.pageParams));
  }

  onEdit(row) {
    this.openDialog(row);
  }

  openDialog(row, blocked: boolean = true) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      date: row.date,
      email: row.email,
      enabled: row.enabled,
      name: row.name,
      role: row.role,
      surname: row.surname,
      userName: row.userName,
      blocked: blocked
    };

    this.dialog.open(EditorDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(EditorDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        data.date = moment(data.date).format('L');
        data = {...data, blocked: true};
        if (blocked) {
          this.store.dispatch(new UpdateUserAction(data));
        } else {
          this.store.dispatch(new AddUserAction(data));
        }
      }
    );
  }

  addUser() {
    this.openDialog({}, false);
  }

  onDelete(row) {
    this.store.dispatch(new DeleteUserAction(row));
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  updateList() {
    // this.homeService.setUsers(this.dataSource.data);
    this.store.dispatch(new UpdateCollectionAction(this.dataSource.data));
  }
}
