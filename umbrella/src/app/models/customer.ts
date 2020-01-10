export class Customer {
    public name: string;
    public contact: string;
    public telephone: string;
    public numberOfEmployees: number;
    public country: string;
    public city: string;
    // tslint:disable-next-line: variable-name
    public _id: string;
}

export class Record extends Customer {
    public rain: boolean;
    public when: Date;
    public type: string;
}

export class ResMessage {
    success: boolean;
    msg: string;
    // tslint:disable-next-line: variable-name
    _id: string;
}

export class DeleteCustomerMessage  extends ResMessage {
    customerId: string;
}

export class ReportData {
    success: boolean;
    report: {
        success: boolean;
        customers: Array<Record>
    };
}