export class OBCModel {
    pickupDate!: string;
    deliveryDate!: string;
    flightsInfo!: string;
    totalPrice!: string;
    packageData!: any[];
    flights!: FlightModel[];

    constructor(data?: OBCModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}


export class FlightModel {
    flightNumber!: string;
    departureTime!: any;
    originAirport!: string;
    arrivalTime!: any;
    destinationAirport!: string;
    travelTime!: string;

    constructor(data?: OBCModel) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
}