import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpService } from './http.service';
import { AuthService } from './auth.service';
import { UsersSignUpDTO } from '../models/userDto';
import { LoginDto } from '../models/loginDto';
import { AuthResponse } from '../models/authResponse';


describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockAuthResponse: AuthResponse = {
    accessToken: 'mockAccessToken',
    userId: 'mockUserId',
    admin: false,
    manager: false,
  };

  const mockUsersSignUpDTO: UsersSignUpDTO = {
    firstName: "", lastName: "", phone: "",
    email: 'test@example.com',
    password: 'password123'
  };

  const mockLoginDto: LoginDto = {
    email: 'test@example.com',
    password: 'password123',
  };


  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['setToken', 'setIsAdmin', 'setIsManager', 'setUserId']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        { provide: AuthService, useValue: spy },
      ],
    });

    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should sign up a user', () => {
    service.signUpUser(mockUsersSignUpDTO);

    const req = httpMock.expectOne('http://localhost:8080/api/users/signUp');
    expect(req.request.method).toBe('POST');
    req.flush(mockUsersSignUpDTO); // Mock response as necessary
  });

  it('should log in a user', () => {
    service.logInUser(mockLoginDto).subscribe(response => {
      expect(response).toEqual(mockAuthResponse);
      expect(authServiceSpy.setToken).toHaveBeenCalledWith(mockAuthResponse.accessToken);
      expect(authServiceSpy.setIsAdmin).toHaveBeenCalledWith(mockAuthResponse.admin);
      expect(authServiceSpy.setIsManager).toHaveBeenCalledWith(mockAuthResponse.manager);
      expect(authServiceSpy.setUserId).toHaveBeenCalledWith(mockAuthResponse.userId);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthResponse);
  });

  it('should validate the token', () => {
    const token = 'someToken';
    service.isTokenValid(token).subscribe(isValid => {
      expect(isValid).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/isTokenValid');
    expect(req.request.method).toBe('POST');
    req.flush(true); // Mock response for token validation
  });


});
