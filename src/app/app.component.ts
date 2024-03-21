import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hoursApp';

  timeCalcForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.timeCalcForm = this.fb.group({
      totalHours: new FormControl(''),
      totalMinutes: new FormControl('')
    });
  }

}
