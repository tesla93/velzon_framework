// import { IOrderTrackingHistory } from "./order-tracking-history"
// import { OrderTrackingTimelineStatusEnum } from "./order-tracking-timeline-status-enum"

// export const statusData = [
//     { value: '1', order: '1', icon: 'ri-truck-line', text: 'Dispatched for pickups' },
//     { value: '2', order: '2', icon: ' ri-luggage-cart-line', text: 'Cargo Collected' },
//     { value: '3', order: '3', icon: 'ri-community-line', text: 'Cargo in route to warehouse' },
//     { value: '4', order: '4', icon: 'ri-road-map-fill', text: 'Cargo in route to Airport' },
//     { value: '5', order: '5', icon: 'ri-route-fill', text: 'Cargo Arrived to Airport' },
//     { value: '6', order: '6', icon: 'ri-flight-takeoff-fill', text: 'Cargo Accepted at Airport' },
//     { value: '7', order: '7', icon: 'ri-truck-fill', text: 'Cargo Departed Origen Airport' },
//     { value: '8', order: '8', icon: 'ri-ship-fill', text: 'Cargo in Air Transit' },
//     { value: '9', order: '9', icon: 'ri-earth-fill', text: 'Cargo Arrived Connection Airport' },
//     // {value: '10', value: ''},
// ]

// export const orderTrackingHistory: IOrderTrackingHistory[] = [
//     { id: '1', orderId: '54', icon: 'ri-truck-line', createdDateTime: new Date(), orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum.Complete, timelineLabel: statusData[0].text, },
//     { id: '2', orderId: '54', icon: ' ri-luggage-cart-line', createdDateTime: new Date(), orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum.Complete, timelineLabel: statusData[1].text, },
//     { id: '3', orderId: '54', icon: 'ri-community-line', createdDateTime: new Date(), orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum.Complete, timelineLabel: 'In route to Warehouse', },
//     { id: '5', orderId: '54', icon: 'ri-road-map-fill ', createdDateTime: new Date(), orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum.Current, timelineLabel: 'In Route to Airport', },
//     { id: '6', orderId: '54', icon: 'ri-route-fill', createdDateTime: new Date(), orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum.Future, timelineLabel: 'Arrived to Airport', },
//     { id: '7', orderId: '54', icon: 'ri-flight-takeoff-fill', createdDateTime: new Date(), orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum.Future, timelineLabel: 'In Air Transit', },
//     // {id: '8', orderId: '54', createdDateTime: new Date(), orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum.Future, timelineLabel: statusData[7].text,},
//     // {id: '9', orderId: '54', createdDateTime: new Date(), orderTrackingTimelineStatus: OrderTrackingTimelineStatusEnum.Future, timelineLabel: statusData[8].text,},

// ]