export class TestProcedure {
    id: number;
    name: string;
    setup: TestProcedure;
    test: Test[];
    cleanup: TestProcedure;
}

export class Test {
    preconditions: Condition[];
    operations: Operation[];
    postconditions: Condition[];
}


export class Operation {
    time: number;
    name: string
    args: {
        adsvar: string;
        value: string;
        type: string;
    }
    repertMessage: string;
    target: string;
    inReport: boolean;
}


export class Condition {
    time: number;
    name: string;
    args: {
        adsVar: string;
    };
    expect: {
        value: string;
        type: string;
    };
    logic: string;
    reportMessage: string;
    target: string;
    inReport: boolean;
}



