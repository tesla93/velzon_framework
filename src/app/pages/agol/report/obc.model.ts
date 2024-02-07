export class OBCModel {
    pickupDate!: string;
    deliveryDate!: string;
    flightNumber!: string;
    departureTime!: string;
    originAirport!: string;
    arrivalTime!: string;
    destinationAirport!: string;
    totalPrice!: string;
    numberOfPackages!: number;
    dimensions!: string;
    weight!: number;
    travelTime!: string

    constructor(data?: OBCModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }


}