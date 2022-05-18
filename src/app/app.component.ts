import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'upload-file';
  form!: FormGroup;
  newForm!: FormGroup;
  test: any = false;
  newTest: any = false;
  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      file: new FormControl(''),
    });
    this.newForm = new FormGroup({
      newFile: new FormControl(''),
    });
    this.form.get('file')?.valueChanges.subscribe(e => {
      console.log(this.form.get('file')?.value)
    })
  }

  get f(): any {
    return this.form.controls;
  }
  get nf(): any {
    return this.newForm.controls;
  }

  onInputChange(e: any) {
    console.log(e);
  }
}
