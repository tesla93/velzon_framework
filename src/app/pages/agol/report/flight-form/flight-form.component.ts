import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ReportService } from '../report.service';
import { FlightModel } from '../obc.model';
import * as moment from "moment";

@Component({
  selector: 'flight-form',
  templateUrl: './flight-form.component.html',
  styleUrl: './flight-form.component.scss'
})
export class FlightFormComponent implements OnInit {

  @Input() maxTime!: Date;
  @Input() minDepartureTime!: Date;
  @Output() processFlights = new EventEmitter<FlightModel[]>();
  formatDates = 'MMM DD, YYYY HH:mm'

  defaultOriginAirport: string = 'LAX';
  flightArr!: FlightModel[];


  flightScaleForm!: FormGroup;
  airportItems: any = {};
  showForm = false;
  airportSelectItems: any = {};
  defaultDepartureTime!: Date


  constructor(
    private fb: FormBuilder,
    private reportService: ReportService) {

  }

  ngOnInit(): void {
    this.initScaleForm();
    this.getAirportList();
    this.defaultDepartureTime = this.minDepartureTime;
  }


  initScaleForm() {
    this.flightScaleForm = this.fb.group({
      flightList: new FormArray([this.getFlightField()]),
    });
  }


  getFlightField(): FormGroup {
    return new FormGroup({
      flightNumber: new FormControl('AA1314', [Validators.required]),
      departureTime: new FormControl(this.defaultDepartureTime, [Validators.required]),
      originAirport: new FormControl(this.defaultOriginAirport, [Validators.required]),
      arrivalTime: new FormControl(null, [Validators.required]),
      destinationAirport: new FormControl('JFK', [Validators.required]),
    });
  }

  flightListArray() {
    return this.flightScaleForm.get("flightList") as FormArray;
  }

  addFlight() {
    const tempForm = JSON.parse(JSON.stringify(this.flightScaleForm.value));
    this.defaultOriginAirport = tempForm.flightList.at(-1).destinationAirport
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

  processData() {
    this.flightArr = [];
    const tempForm = JSON.parse(JSON.stringify(this.flightScaleForm.value));
    tempForm.flightList.forEach((element: FlightModel) => {
      let value: FlightModel = {
        flightNumber: element.flightNumber,
        departureTime: moment(element.departureTime).format(this.formatDates),
        originAirport: element.originAirport,
        arrivalTime: moment(element.arrivalTime).format(this.formatDates),
        destinationAirport: element.destinationAirport,
        travelTime: this.convertToHoursNMinutes(element.arrivalTime, element.departureTime)
      }
      this.flightArr.push(value);
    });
    this.processFlights.emit(this.flightArr)
  }


  onChangeDepartureTime(event: any) {
    // this.minDepartureTime = new Date(event.target.defaultValue);
  }

  onChangeArrivalTime(event: any) {
    this.defaultDepartureTime = new Date(event.target.defaultValue)
  }


  convertToHoursNMinutes(arrivalTime: Date, departureTime: Date) {
    console.log(arrivalTime);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds: number = new Date(arrivalTime).getTime() - new Date(departureTime).getTime();

    // Convert milliseconds to hours and minutes
    const hours: number = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const remainingMilliseconds: number = differenceInMilliseconds % (1000 * 60 * 60);
    const minutes: number = Math.round(remainingMilliseconds / (1000 * 60));

    return `${hours} hrs, ${minutes} min`; // Output will be the number of hours and minutes between the two dates

  }




}
