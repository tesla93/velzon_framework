import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import * as moment from "moment";
import { IOrderTrackingHistory } from "../../models/order-tracking-history";
import { OrderTrackingTimelineStatusEnum } from "../../models/order-tracking-timeline-status-enum";
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
    @Input() orderStatuses!: SelectListItem[];
    actualStatus!: SelectListItem


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
            this.actualStatus = this.orderStatuses.find(s => s.value == this.actualStatusId.toString()) ?? {} as SelectListItem;
        }
    }

    checkIfStatusIsDone(sequence: number): boolean{
        return (this.actualStatus?.sequence ?? 0) > sequence
    }
       
}
