import { HttpClient } from "@angular/common/http";
import { CalcService } from "./calc.service";
import { TestBed } from "@angular/core/testing";

describe("CalcService", () => {
    beforeAll(() => {
        console.log("beforeAll");
    });

    beforeEach(() => {
        // HttpClient is injected using `inject` and `async` when running tests
        TestBed.configureTestingModule({
            providers: [
                CalcService,
                { provide: HttpClient, useValue: {} }
            ]
        });
    });

    it("should multiply 2 numbers", () => {
        const calcService = TestBed.inject(CalcService);
        expect(calcService.multiply(2, 3)).toEqual(6);
    });

    beforeEach(() => {
        console.log("beforeEach");
    });

    afterAll(() => {
        console.log("afterAll");
    });
});