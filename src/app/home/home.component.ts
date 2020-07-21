import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from './home.service';
import {MatTableDataSource} from "@angular/material/table";
import {User, HomeState, PageParams} from "./home.model";
import {getUsersSelector, getParamsSelector} from "./home.reducer";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FilterByParamsAction, GetUsersAction} from "./home.actions";


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

  constructor (public route: ActivatedRoute, public store: Store<HomeState>, public homeService: HomeService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.data = this.route.snapshot.data['items'];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.store.select(getUsersSelector).subscribe((users: User[]) =>  {
      this.dataSource.data = users;
    });

    this.store.select(getParamsSelector).subscribe((params: PageParams) =>  {
      this.pageParams = params;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sortChange($event: {active; direction}) {
    this.pageParams = {...this.pageParams, sortOrder: $event.direction, sortBy: $event.active};
    console.log('SORT event PARAMS: ', this.pageParams);

    this.store.dispatch(new FilterByParamsAction(this.pageParams));
  }

  onEdit(row) {
    console.log('EDIT row: ', row);
    // this.homeService.openDialog(true);

  }

  onDelete(row) {
    console.log('DELETE row: ', row);
  }

  // loadUsers() {
  //   this.store.dispatch(new GetUsersAction(this.pageParams));
  // }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
