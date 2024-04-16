import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import 'zone.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  template: `
<form [formGroup]="form" (ngSubmit)="submit()">
      <div formArrayName="people">
        <div *ngFor="let person of people.controls; let i = index" [formGroupName]="i">
          <input formControlName="name" placeholder="Name">
          <input formControlName="surname" placeholder="Surname">
          <button (click)="removePerson(i)">Remove</button>
        </div>
      </div>
      <button type="button" (click)="addPerson()">Add Person</button>
      <button type="submit">Submit</button>
    </form>

  `,
})
export class App implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      people: this.fb.array([]),
    });
  }

  get people(): FormArray {
    return this.form.get('people') as FormArray;
  }

  addPerson() {
    const person = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });

    this.people.push(person);
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  submit() {
    console.log(this.form.value);
  }
}

bootstrapApplication(App);
