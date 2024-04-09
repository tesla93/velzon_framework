import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import * as moment from "moment";
import { SelectListItem } from "src/app/shared/classes/select-list-item";

@Component({
    selector: "order-tracking-timeline",
    templateUrl: "./order-tracking-timeline.component.html",
    styleUrls: ["./order-tracking-timeline.component.scss"]
})
export class OrderTrackingTimelineComponent implements OnInit {
    @Input() remainingDaysToEta: number = 5;
    eta!: Date;
    
    @Input() actualStatusId!: number;
    @Output() changeStatus= new EventEmitter<string>();
    @Input() orderStatuses!: SelectListItem[];
    actualStatus!: SelectListItem
    defaultSequence!: number;


    constructor() { }

    public get moment() {
        return moment;
    }

    ngOnInit() {
       
        this.eta = new Date();
        this.eta.setDate(this.eta.getDate() + this.remainingDaysToEta);
    }

    ngOnChanges(changes: SimpleChanges){
        if(changes['actualStatusId']){
            this.defaultSequence=+(this.orderStatuses[0]?.sequence ?? 0)
            this.actualStatus = this.orderStatuses.find(s => s.value == this.actualStatusId.toString()) ?? {} as SelectListItem;
        }
    }

    checkIfStatusIsDone(sequence: number): boolean{
        return (this.actualStatus?.sequence ?? 0) > sequence
    }

    onClickStatus(id?: string){
        this.changeStatus.emit(id ?? '0');
    }
       
}
