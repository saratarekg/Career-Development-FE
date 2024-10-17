import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import {User, PaginatedUsers, UsersDTO} from '../../models/userDto';
import { environment } from '../../../environment';
import {of} from "rxjs";

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUser: User = {
    password: "",
    phone: "",
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };
  const mockUserDTO: UsersDTO = {
    id: "id",
    password: "",
    phone: "",
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };

  const mockPaginatedUsers: PaginatedUsers = {
    content: [mockUserDTO],
    totalElements: 1,
    size: 1,
    totalPages: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve user by ID', () => {
    service.getUserById('123').subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.usersAPI}/123`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should add user', () => {
    service.addUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.usersAPI}/add`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should freeze user', () => {
    service.freezeUserByEmail(mockUser.email).subscribe((response) => {
      expect(response).toEqual("User account successfully frozen.");
    });

    const expectedUrl = `${environment.usersAPI}/freeze?email=${mockUser.email}`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT');
    req.flush("User account successfully frozen.");
  });

  it('should unfreeze user', () => {
    service.unfreezeUserByEmail(mockUser.email).subscribe((response) => {
      expect(response).toEqual("User account successfully unfrozen.");
    });

    const expectedUrl = `${environment.usersAPI}/unfreeze?email=${mockUser.email}`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT');
    req.flush("User account successfully unfrozen.");
  });

  it('should delete user', () => {
    service.deleteUserByEmail(mockUser.email).subscribe((response) => {
      expect(response).toEqual("User account successfully deleted.");
    });

    const expectedUrl = `${environment.usersAPI}/deleteByEmail?email=${mockUser.email}`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('DELETE');
    req.flush("User account successfully deleted.");
  });

  it('should reset password', () => {
    const data = {
      email: "sgenina@sumerge.com",
      newPassword: "12345"
    };

    service.resetPassword(data.email, data.newPassword).subscribe((response) => {
      expect(response).toEqual("Password reset");
    });

    const expectedUrl = `${environment.usersAPI}/resetPassword?email=${data.email}&newPassword=${data.newPassword}`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT');
    req.flush("Password reset");
  });

  it('should assign manager to user', () => {
    const managerEmail = 'manager@example.com';

    service.assignManagerByEmail(mockUser.email, managerEmail).subscribe((response) => {
      expect(response).toEqual("Manager assigned successfully.");
    });

    const expectedUrl = `${environment.usersAPI}/assignManager?userEmail=${mockUser.email}&managerEmail=${managerEmail}`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT');
    req.flush("Manager assigned successfully.");
  });

  it('should get all departments', () => {
    const mockDepartments = ['HR', 'Engineering', 'Marketing'];

    service.getAllDepartments().subscribe((departments) => {
      expect(departments).toEqual(mockDepartments);
    });

    const req = httpMock.expectOne(environment.departmentsAPI);
    expect(req.request.method).toBe('GET');
    req.flush(mockDepartments);
  });

  it('should get titles by department', () => {
    const departmentId = '1';
    const mockTitles = ['Manager', 'Developer', 'Designer'];

    service.getTitlesByDepartment(departmentId).subscribe((titles) => {
      expect(titles).toEqual(mockTitles);
    });

    const req = httpMock.expectOne(`${environment.titlesAPI}/getByDepartment/${departmentId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTitles);
  });

  it('should assign title to user', () => {
    const titleId = '2';

    service.assignTitleToUser(mockUser.email, titleId).subscribe((response) => {
      expect(response).toEqual("Title assigned successfully.");
    });

    const expectedUrl = `${environment.usersAPI}/assignTitle?email=${mockUser.email}&titleId=${titleId}`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT');
    req.flush("Title assigned successfully.");
  });

  it('should assign role to user', () => {
    const roleId = '3';

    service.assignRoleToUser(mockUser.email, roleId).subscribe((response) => {
      expect(response).toEqual("Role assigned successfully.");
    });

    const expectedUrl = `${environment.usersAPI}/assignRole?email=${mockUser.email}&roleId=${roleId}`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('PUT');
    req.flush("Role assigned successfully.");
  });

  it('should get managed users', () => {
    const managerId = 'id';
    const mockManagedUsers = [mockUserDTO];

    service.getManagedUsers(managerId).subscribe((users) => {
      expect(users).toEqual(mockManagedUsers);
    });

    const req = httpMock.expectOne(`${environment.usersAPI}/managed/${managerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockManagedUsers);
  });

  it('should get all users paginated', () => {
    const page = 0;
    const size = 10;

    service.getAllUsersPaginated(page, size).subscribe((response) => {
      expect(response).toEqual(mockPaginatedUsers);
    });

    const expectedUrl = `${environment.usersAPI}/allUsersPaginated?page=${page}&size=${size}`;
    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPaginatedUsers);
  });
});
