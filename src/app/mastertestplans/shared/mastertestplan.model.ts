import { Leveltestplan } from "../../leveltestplans/shared/leveltestplan.model";

export class Mastertestplan {
    id : number
    name : string;
    description : string;
    goal : string;
    time : number;
    leveltestplans : Leveltestplan[]
}