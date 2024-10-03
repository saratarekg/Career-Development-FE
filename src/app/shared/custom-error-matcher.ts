import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: AbstractControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!control?.dirty && control.invalid;
  }
}
