import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from "moment";
import { GeneratePdf } from 'src/app/shared/pdf-reports/generate-pdf';
import { FlightModel, OBCModel } from './obc.model';

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
  flightArr!: FlightModel[];
  flightsInfo!: string;

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
      pickupDate: new FormControl(null, [Validators.required]),
      deliveryDate: new FormControl(null, [Validators.required]),
      flightsInfo: new FormControl(null),
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
      totalPrice: formValue.totalPrice?.toFixed(2),
      flightsInfo: this.flightsInfo,
      packageData: [{ quantity: formValue.numberOfPackages, dimensions: `${formValue.large} x ${formValue.large} x ${formValue.height} `, pieceWeight: `${formValue.weight} kg` }],
      flights: this.flightArr

    });
    const currentReport = new GeneratePdf(data);
    currentReport.buildReport();
  }



  onChangePickupDate() {
    this.minDeliveryDate = this.quoteForm.value.pickupDate;
    this.minDepartureTime = this.quoteForm.value.pickupDate;
  }

  onChangeDeliveryDate() {
    this.maxTime = this.quoteForm.value.deliveryDate;
  }

  processFlights(data: FlightModel[]) {
    this.flightArr = data
    this.closeModal();
    this.flightsInfo='';
    for (let i = 0; i < this.flightArr.length; i++) {
      if(i!=0){
        this.flightsInfo += ' - '
      }
      if(this.flightArr[i].originAirport != this.flightArr[i-1]?.destinationAirport){
        this.flightsInfo +=  this.flightArr[i].originAirport + " - " + this.flightArr[i].destinationAirport;;
      }
      else{
        this.flightsInfo +=  this.flightArr[i].destinationAirport;
      }
    }
    this.quoteForm.controls['flightsInfo'].setValue(this.flightsInfo);
    
  }



  openModal() {
    this.modalService.open(this.editFlightsScale, { windowClass: "myCustomModalClass" });
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
