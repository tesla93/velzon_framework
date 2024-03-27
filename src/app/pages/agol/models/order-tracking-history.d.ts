import { OrderTrackingTimelineStatusEnum } from "./order-tracking-timeline-status-enum";


export interface IOrderTrackingHistory {
    id: string;
    orderId: string;
    icon: string;
    createdDateTime: Date;
    orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum;
    timelineLabel: string;
}