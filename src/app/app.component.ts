import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Time } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hoursApp';
  remainingTime:any;

  timeCalcForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.timeCalcForm = this.fb.group({
      totalHours: new FormControl(''),
      totalMinutes: new FormControl(''),
      subtrahends: this.fb.array([])
    });
  }

  get subtrahends() {
    return this.timeCalcForm.get('subtrahends') as FormArray;
  }

  deleteTimeRow(index:number) {
    this.subtrahends.removeAt(index);
  }

  addTimeRow() {
    this.subtrahends.push(this.fb.group({
      subHour: [],
      subMinutes: []
    }));
  }

  calcRemaining() {
    let totalSub = this.summarizeSubtrahends();
    let givenHours = +this.timeCalcForm.get('totalHours')?.value;
    let givenMinutes = this.decimalMinutes(this.timeCalcForm.get('totalMinutes')?.value);
    let totalGiven = givenHours + givenMinutes; // decimal given
    let remainingDec = totalGiven - totalSub;
    let remainingHrsDec = this.getHrs(remainingDec);
    let remainingMinutesDec = remainingDec - remainingHrsDec;
    let remainingMinutesAnalog = Math.round( remainingMinutesDec*60);

    let vorzeichen: string = remainingMinutesAnalog < 0 || remainingHrsDec < 0 ? "-" : "";
    let filler: string = remainingMinutesAnalog < 10 ? ":0" :":";

    this.remainingTime = vorzeichen + Math.abs(remainingHrsDec) + filler + Math.abs(remainingMinutesAnalog);
  }

  getHrs(duration: number):number {
    let strDuration = "" + duration;
    let strHrs = strDuration.substring(0,strDuration.indexOf('.'));

    return +strHrs;
  }

  summarizeSubtrahends():number {
    let subs = this.subtrahends.controls;
    let total: number = 0;
    subs.forEach(subControl => {
      let subHour = +subControl.get('subHour')?.value;
      let subMinutes = this.decimalMinutes(+subControl.get('subMinutes')?.value);
      total+= subHour + subMinutes;
    });

    return total;
  }

  decimalMinutes(analogMinutes: number = 0): number {
    return analogMinutes / 60;
  }

}
