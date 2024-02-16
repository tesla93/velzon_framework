import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from "moment";
import { finalize } from 'rxjs';
import { GeneratePdf } from 'src/app/shared/pdf-reports/generate-pdf';
import { OBCModel } from './obc.model';
import { ReportService } from './report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {

  formatDates = 'MMM DD, YYYY HH:mm'
  minPickupDate = new Date();
  minDeliveryDate = new Date();
  @ViewChild("editFlightsScale", { static: false }) editFlightsScale!: NgbModal;

  minDepartureTime = new Date();

  minArrivalTime = new Date();
  maxTime!: Date;

  breadCrumbItems = [
    { label: 'Agol' },
    { label: 'Reports', active: true }
  ];

  obcModel: OBCModel = {} as OBCModel;
 

  quoteForm!: FormGroup;
  flightScaleForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private modalService: NgbModal) {
  }


  ngOnInit(): void {
    
    this.initForm();
  }

  initForm() {
    this.quoteForm = this.fb.group({
      pickupDate: new FormControl(new Date(2014, 1, 3, 4, 32), [Validators.required]),
      deliveryDate: new FormControl(new Date(2014, 1, 4, 5, 51), [Validators.required]),
      flightsInfo: new FormControl(null),
      // flightNumber: new FormControl('AA1314', [Validators.required]),
      // departureTime: new FormControl(new Date(2014, 1, 3, 7, 39), [Validators.required]),
      // originAirport: new FormControl('LAX', [Validators.required]),
      // arrivalTime: new FormControl(new Date(2014, 1, 4, 1, 17), [Validators.required]),
      // destinationAirport: new FormControl('JFK', [Validators.required]),
      totalPrice: new FormControl(234.32, [Validators.required]),
      numberOfPackages: new FormControl(1, [Validators.required]),
      large: new FormControl(20),
      width: new FormControl(15),
      height: new FormControl(35),
      weight: new FormControl(18, [Validators.required]),
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
      totalPrice: formValue.totalPrice?.toFixed(2),
      packageData: [{ quantity: formValue.numberOfPackages, dimensions: `${formValue.large} x ${formValue.large} x ${formValue.height} `, pieceWeight: `${formValue.weight} kg` }],
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

  onChangePickupDate() {
    this.minDeliveryDate = this.quoteForm.value.pickupDate;
    this.minDepartureTime = this.quoteForm.value.pickupDate;
  }

  onChangeDeliveryDate(){
    this.maxTime=this.quoteForm.value.deliveryDate;
  }

 

  openModal() {
    this.modalService.open(this.editFlightsScale, { windowClass : "myCustomModalClass"});
  }

  closeModal(){
    this.modalService.dismissAll();
  }
  
}
