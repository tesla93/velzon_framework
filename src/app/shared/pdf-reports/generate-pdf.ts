import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { textData } from "./data";

export class GeneratePdf {

    public columnWidths = {
        0: { cellWidth: 30, halign: "center" },
        1: { cellWidth: 75, halign: "center" },
        2: { cellWidth: "auto", halign: "left" },
        3: { cellWidth: "auto", halign: "left" },
        4: { cellWidth: 50, halign: "center" }
    };


    private cols = [
        { header: "Flight", dataKey: "flight" },
        { header: "Departure Time", dataKey: "departureTime" },
        { header: "Origin Airport", dataKey: "originAirport" },
        { header: "Destination Airport", dataKey: "destinationAirport" },
        { header: "Travel Time", dataKey: "travelTime" },
    ];

    data = [
        {
            flight: "AA 1731", departureTime: 'Sat 27 Jan 06:45', originAirport: 'Charleston International Airport (CHS)',
            destinationAirport: 'Charlotte Douglas International Airport (CLT)', travelTime: '1 hr 8 min'
        },
        {
            flight: "AA 1995", departureTime: 'Sat 27 Jan 09:05', originAirport: 'Charlotte Douglas International Airport (CLT)',
            destinationAirport: 'Los Angeles International Airport (LAX)', travelTime: '5 hr 28 min'
        },
    ];

    pdfName!: string;
    doc!: any
    pickupDate: string = '2350 Jan 26 2023';
    deliveryDate: string = '1500 Jan 27 2023';
    actualYPos: number = 110
    constructor(pdfName: string) {
        this.pdfName = pdfName;
    }




    buildReport() {
        this.doc = new jsPDF('p', 'px', 'a4');
        this.setHeader();
        this.setGrayRectangle();
        this.setTravelData();
        this.insertParagraph();

        this.doc.save(this.pdfName + ".pdf");
    }

    setHeader() {
        let img = new Image();
        img.src = 'assets/images/agol/header_report.png';
        this.doc.addImage(img, 'png', 20, 10, 400, 70);

        this.doc.setFontSize(12);
        this.doc.setTextColor(255, 0, 0);
        this.doc.text('OBC Quotation', this.doc.internal.pageSize.width / 2, 110, {
            align: "center"
        });


        this.doc.setFontSize(10);
        this.doc.setTextColor(0, 0, 0);
        this.doc.text('Dear Team,', 25, 130)
        this.doc.text('Thank you for your quote request. We are pleased to offer the following solution for your Time-Critical shipment:', 25, 142)

    }

    setGrayRectangle() {
        // Set the fill color
        this.doc.setFillColor(70, 70, 70);

        // Parameters: x-coordinate, y-coordinate, width, height
        this.doc.rect(65, 160, 305, 65, 'F');


        this.doc.setFont(undefined, 'bold')
        this.doc.setFontSize(12)
        this.doc.setTextColor(255, 255, 255);
        this.doc.text('DOOR TO DOOR', this.doc.internal.pageSize.width / 2, 180, {
            align: "center"
        });

        this.doc.text('1 stop', this.doc.internal.pageSize.width / 2, 195, {
            align: "center"
        });

        this.doc.text('CHS-CLT-LAX', this.doc.internal.pageSize.width / 2, 210, {
            align: "center"
        });

    }

    setTravelData() {
        this.doc.setFontSize(11);
        this.doc.setTextColor(0, 0, 0);

        this.doc.setFont(undefined, 'normal');
        this.doc.text('Pickup:', 26, 250);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(this.pickupDate, 60, 250);

        this.doc.setFont(undefined, 'normal');
        this.doc.text('Delivery:', 200, 250);
        this.doc.setFont(undefined, 'bold');
        this.doc.text(this.deliveryDate, 237, 250);

        this.directInsertExt(this.data);

        this.doc.setFont(undefined, 'normal');
        this.doc.setFontSize(10);
        this.doc.text('Price: 4388 USD, included baggage fees', 423, this.actualYPos, {
            align: "right"
        });
        this.actualYPos += 30;
    }

    directInsertExt(bodyData: any): void {
        if (bodyData.length > 0) {
            autoTable(this.doc, {
                startY: 270,
                margin: {
                    top: 30,
                    right: 20,
                    left: 20,
                    bottom: 30,
                },
                theme: "striped",
                styles: { fontSize: 10, halign: "center", lineWidth: 0.4 },
                body: bodyData,
                columns: this.cols,
                columnStyles:
                {
                    0: { cellWidth: 38, halign: "center" },
                    1: { cellWidth: 70, halign: "center" },
                    2: { cellWidth: "auto", halign: "left" },
                    3: { cellWidth: "auto", halign: "left" },
                    4: { cellWidth: 50, halign: "center" }
                },

            });
        } else {
            this.doc.setFontSize(10);
            this.doc.text("No data available for this project", 5, 270);
        }

        this.actualYPos = this.doc.lastAutoTable.finalY + 10;
    }

    insertParagraph() {
        this.doc.text(textData[0], 25, this.actualYPos, {
            align: "justify", maxWidth: 395
        });
        this.actualYPos += 50;

        this.doc.text(textData[1], 25, this.actualYPos, {
            align: "justify", maxWidth: 395
        });
        this.actualYPos += 25;

        this.doc.setFont(undefined, 'bold');
        this.doc.setFontSize(11);
        this.doc.text('Customs Clearance:', 25, this.actualYPos)
        this.actualYPos += 12;
        
        this.doc.setFont(undefined, 'normal');
        this.doc.setFontSize(10);
        this.doc.text(textData[2], 25, this.actualYPos, {
            align: "justify", maxWidth: 395
        });
        this.actualYPos += 32;

        this.doc.text(textData[3], 25, this.actualYPos, {
            align: "justify", maxWidth: 395
        });
        this.actualYPos += 40;
    }
}