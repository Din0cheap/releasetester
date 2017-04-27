import { TestProcedure } from "../../test-procedures/shared/test-procedure.model";

export class Leveltestplan{
    id :number;
    name : string;
    description : string;
    purpose : string;
    loop : number;
    testProcedures : TestProcedure[];
}