import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ReportService } from '../report.service';

@Component({
  selector: 'flight-form',
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss'
})
export class FlightFormComponent implements OnInit {

  @Input() maxTime!: Date;
  @Input() minDepartureTime!: Date;


  flightScaleForm!: FormGroup;
  airportItems: any = {};
  showForm = false;
  airportSelectItems: any = {};


  constructor(
    private fb: FormBuilder,
    private reportService: ReportService) {

  }

  ngOnInit(): void {
    this.initScaleForm();
    this.getAirportList();
  }


  initScaleForm() {
    this.flightScaleForm = this.fb.group({
      flightList: new FormArray([this.getFlightField()]),
    });
    console.log(this.flightScaleForm)
  }


  getFlightField(): FormGroup {
    return new FormGroup({
      flightNumber: new FormControl('AA1314', [Validators.required]),
      departureTime: new FormControl(new Date(2014, 1, 3, 7, 39), [Validators.required]),
      originAirport: new FormControl('LAX', [Validators.required]),
      arrivalTime: new FormControl(new Date(2014, 1, 4, 1, 17), [Validators.required]),
      destinationAirport: new FormControl('JFK', [Validators.required]),
    });
  }

  flightListArray() {
    return this.flightScaleForm.get("flightList") as FormArray;
  }

  addFlight() {
    this.flightListArray().push(this.getFlightField());
  }

  removeFlight(i: number) {
    this.flightListArray().removeAt(i);
  }

  getAirportList() {
    this.reportService.readJsonFromAsset()
      .pipe(
        finalize(() => {

          this.showForm = true;
        })
      )
      .subscribe(obj => {
        this.airportItems = Object.values(obj);
        this.airportSelectItems = this.airportItems[0].map((airportItem: any) => ({ text: `${airportItem._IATACode} - ${airportItem._Name}`, value: airportItem._IATACode }))
      });
  }


  onChangeDepartureTime() {
  }




}
