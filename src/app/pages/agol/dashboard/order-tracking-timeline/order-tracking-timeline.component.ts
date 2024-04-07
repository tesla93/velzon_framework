import { Component, Input, OnInit } from "@angular/core";
import * as moment from "moment";
import { IOrderTrackingHistory } from "../../models/order-tracking-history";
import { OrderTrackingTimelineStatusEnum } from "../../models/order-tracking-timeline-status-enum";

@Component({
    selector: "order-tracking-timeline",
    templateUrl: "./order-tracking-timeline.component.html",
    styleUrls: ["./order-tracking-timeline.component.scss"]
})
export class OrderTrackingTimelineComponent implements OnInit {
    @Input() orderTrackingTimelineHistories: IOrderTrackingHistory[] = [];
    @Input() isPreBooked = false;
    @Input() remainingDaysToEta: number = 5;
    eta!: Date;

    timelineStatus = OrderTrackingTimelineStatusEnum;

    constructor() { }

    public get moment() {
        return moment;
    }

    ngOnInit() {
        this.eta = new Date();
        this.eta.setDate(this.eta.getDate() + this.remainingDaysToEta);
    }
}
