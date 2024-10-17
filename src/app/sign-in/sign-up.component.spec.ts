import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { SignUpService } from '../services/sign-up.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from '../shared/fields/email/email.component';
import { PasswordGroupComponent } from './fields/passwordGroup/passwordGroup.component';
import { PhoneComponent } from './fields/phone/phone.component';
import { NameComponent } from './fields/name/name.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpService: jasmine.SpyObj<SignUpService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const signUpServiceSpy = jasmine.createSpyObj('SignUpService', ['signUp']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        EmailComponent,
        PasswordGroupComponent,
        PhoneComponent,
        NameComponent,
        SignUpComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: SignUpService, useValue: signUpServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    signUpService = TestBed.inject(SignUpService) as jasmine.SpyObj<SignUpService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required fields', () => {
    expect(component.firstNameFormControl).toBeTruthy();
    expect(component.lastNameFormControl).toBeTruthy();
    expect(component.emailFormControl).toBeTruthy();
    expect(component.phoneFormControl).toBeTruthy();
    expect(component.passwordsFormGroup).toBeTruthy();
  });

  it('should invalidate form if required fields are missing', () => {
    component.signUpForm.controls['firstNameFormControl'].setValue('');
    component.signUpForm.controls['lastNameFormControl'].setValue('');
    component.signUpForm.controls['emailFormControl'].setValue('');
    component.passwordsFormGroup.controls['passwordFormControl'].setValue('');
    component.passwordsFormGroup.controls['confirmPasswordFormControl'].setValue('');
    component.signUpForm.controls['phoneFormControl'].setValue('');

    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should validate form if all fields are filled correctly', () => {component.signUpForm.controls['firstNameFormControl'].setValue('John');
    component.signUpForm.controls['lastNameFormControl'].setValue('Doe');
    component.signUpForm.controls['emailFormControl'].setValue('john.doe@example.com');
    component.passwordsFormGroup.controls['passwordFormControl'].setValue('password123');
    component.passwordsFormGroup.controls['confirmPasswordFormControl'].setValue('password123');
    component.signUpForm.controls['phoneFormControl'].setValue('1234567890');

    expect(component.signUpForm.valid).toBeTruthy();
  });

  it('should show validation error if passwords do not match', () => {
    component.passwordsFormGroup.controls['passwordFormControl'].setValue('password123');
    component.passwordsFormGroup.controls['confirmPasswordFormControl'].setValue('differentPassword');
    fixture.detectChanges();

    const passwordsGroup = component.passwordsFormGroup;
    expect(passwordsGroup.errors).toEqual({ passwordMatch: true });
  });

  it('should call signUp service and navigate to success page on form submit', () => {
    signUpService.signUp;

    component.signUpForm.controls['firstNameFormControl'].setValue('John');
    component.signUpForm.controls['lastNameFormControl'].setValue('Doe');
    component.signUpForm.controls['emailFormControl'].setValue('john.doe@example.com');
    component.passwordsFormGroup.controls['passwordFormControl'].setValue('password123');
    component.passwordsFormGroup.controls['confirmPasswordFormControl'].setValue('password123');
    component.signUpForm.controls['phoneFormControl'].setValue('1234567890');

    component.onSubmit();

    expect(signUpService.signUp).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['signup', 'success']);
  });

  it('should not submit the form if the form is invalid', () => {
    component.signUpForm.controls['firstNameFormControl'].setValue('');
    component.onSubmit();

    expect(signUpService.signUp).not.toHaveBeenCalled();
  });
});
