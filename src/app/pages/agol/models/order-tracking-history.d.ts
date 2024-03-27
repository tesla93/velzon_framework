import { OrderTrackingTimelineStatusEnum } from "./order-tracking-timeline-status-enum";


export interface IOrderTrackingHistory {
    id: string;
    orderId: string;
    createdDateTime: Date;
    orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum;
    timelineLabel: string;
}