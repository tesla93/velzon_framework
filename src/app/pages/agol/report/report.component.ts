import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneratePdf } from 'src/app/shared/pdf-reports/generate-pdf';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {

  quoteForm!: FormGroup;
  items= [{text: "text1", value: 'value1'}, {text: "text2", value: 'value2'}, {text: "text3", value: 'value3'}, {text: "text4", value: 'value4'}]
  breadCrumbItems = [
    { label: 'Agol' },
    { label: 'Reports', active: true }
];

  constructor( private fb: FormBuilder) {
    
  }


  ngOnInit(): void {
    this.initForm();
  }

  

  initForm(){
    this.quoteForm = this.fb.group({
      value1: new FormControl(null, [Validators.required]),
      value2: new FormControl(null),
      value3: new FormControl(null),
      value4: new FormControl(null),
      value5: new FormControl(null),
      value6: new FormControl(null),
    });
  }


  generateReport(){
    const currentReport = new GeneratePdf('CustomReport');
    currentReport.buildReport();
  }

}
