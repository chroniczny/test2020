export interface HomeState {
  users: User[];
  params: PageParams;
}

export interface PageParams {
  userId: number;
  filter: string;
  sortOrder: string;
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
}

export interface User {
  userName: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  date: string;
  enabled: string;
}
