/*import { Mastertestplan } from "../mastertestplan/mastertestplan";
import { Leveltestplan } from "../leveltestplan/leveltestplan";
import { TestProcedure, Condition, Operation } from "../test-procedure/test-procedure";
*/

import { InMemoryDbService } from "angular-in-memory-web-api";
export class MockDB implements InMemoryDbService {
    createDb() {

        let i = 1;


        let testprocedures = [
            { id: i++, name: "TestProcedure1", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure6", setup: null, test: null, cleanup: null, },           
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure2", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure3", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure4", setup: null, test: null, cleanup: null, },
            { id: i++, name: "TestProcedure5", setup: null, test: null, cleanup: null, },
        ];


        testprocedures[1].setup = testprocedures[4];
        testprocedures[1].cleanup = testprocedures[5];

        let subtest = [testprocedures[0], testprocedures[2]];
        let subtest2 = [testprocedures[1]];

i = 1;

        let leveltestplans = [
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanB", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
            { id: i++, name: "LeveltestplanA", description: "example desc", purpose: "example purp", loop: 1, testProcedures: subtest2 },
        ];

        let sublevel = [leveltestplans[0]]


i = 1;

        let mastertestplans = [
            { id: i++, name: "MasterTestPlanA", leveltestplans: sublevel, description: "", goal: "n/a", time: 0 },
            { id: i++, name: "MasterTestPlanB", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanC", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanD", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanE", leveltestplans: null, description: "", goal: "", time: 0 } ,
            { id: i++, name: "MasterTestPlanA", leveltestplans: sublevel, description: "", goal: "n/a", time: 0 },
            { id: i++, name: "MasterTestPlanB", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanC", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanD", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanE", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanA", leveltestplans: sublevel, description: "", goal: "n/a", time: 0 },
            { id: i++, name: "MasterTestPlanB", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanC", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanD", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanE", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanA", leveltestplans: sublevel, description: "", goal: "n/a", time: 0 },
            { id: i++, name: "MasterTestPlanB", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanC", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanD", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanE", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanA", leveltestplans: sublevel, description: "", goal: "n/a", time: 0 },
            { id: i++, name: "MasterTestPlanB", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanC", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanD", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanE", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanA", leveltestplans: sublevel, description: "", goal: "n/a", time: 0 },
            { id: i++, name: "MasterTestPlanB", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanC", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanD", leveltestplans: null, description: "", goal: "", time: 0 },
            { id: i++, name: "MasterTestPlanE", leveltestplans: null, description: "", goal: "", time: 0 }
        ];
        return { mastertestplans, leveltestplans, testprocedures };
    }
}