import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneratePdf } from 'src/app/shared/pdf-reports/generate-pdf';
import { OBCModel } from './obc.model';
import * as moment from "moment";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {

  formatDates = 'MMM DD, YYYY HH:mm'
  breadCrumbItems = [
    { label: 'Agol' },
    { label: 'Reports', active: true }
  ];

  obcModel: OBCModel = {} as OBCModel;

  quoteForm!: FormGroup;
  items = [{ text: "text1", value: 'value1' }, { text: "text2", value: 'value2' }, { text: "text3", value: 'value3' }, { text: "text4", value: 'value4' }];

  constructor(private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.initForm();
  }



  initForm() {
    this.quoteForm = this.fb.group({
      pickupDate: new FormControl(null, [Validators.required]),
      deliveryDate: new FormControl(null, [Validators.required]),
      flightNumber: new FormControl(null, [Validators.required]),
      departureTime: new FormControl(null, [Validators.required]),
      originAirport: new FormControl(null, [Validators.required]),
      arrivalTime: new FormControl(null, [Validators.required]),
      destinationAirport: new FormControl(null, [Validators.required]),
      totalPrice: new FormControl(null, [Validators.required]),
      numberOfPackages: new FormControl(null, [Validators.required]),
      dimensions: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
    });
  }


  generateReport() {
    const formValue = this.quoteForm.value;
    const data = new OBCModel({
      pickupDate: moment(formValue.pickupDate).format(this.formatDates),
      deliveryDate: moment(formValue.deliveryDate).format(this.formatDates),
      flightNumber: formValue.flightNumber,
      departureTime: moment(formValue.departureTime).format(this.formatDates),
      originAirport: formValue.originAirport,
      arrivalTime: moment(formValue.arrivalTime).format(this.formatDates),
      destinationAirport: formValue.destinationAirport,
      totalPrice: formValue.totalPrice.toFixed(2),
      numberOfPackages: formValue.numberOfPackages,
      dimensions: formValue.dimensions,
      weight: formValue.weight,
      travelTime: this.convertToHoursNMinutes(formValue.arrivalTime, formValue.departureTime)

    });
    const currentReport = new GeneratePdf(data);
    currentReport.buildReport();
  }

  convertToHoursNMinutes(arrivalTime: Date, departureTime: Date) {

    // Calculate the difference in milliseconds
    const differenceInMilliseconds: number = arrivalTime.getTime() - departureTime.getTime();

    // Convert milliseconds to hours and minutes
    const hours: number = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const remainingMilliseconds: number = differenceInMilliseconds % (1000 * 60 * 60);
    const minutes: number = Math.round(remainingMilliseconds / (1000 * 60));

    return `${hours} hrs, ${minutes} min`; // Output will be the number of hours and minutes between the two dates

  }

}
