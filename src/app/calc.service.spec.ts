import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalcService } from "./calc.service";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { ApiUrls } from "./strings";
import { User } from './models/User';

describe("CalcService", () => {
    let service: CalcService;
    let httpTestingController: HttpTestingController;

    beforeAll(() => {
        console.log("beforeAll");
    });

    beforeEach(() => {
        // HttpClient is injected using `inject` and `async` when running tests
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                CalcService,
                { provide: HttpClientTestingModule, useValue: {} }
            ]
        });

        service = TestBed.inject(CalcService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it("should multiply 2 numbers", () => {
        const calcService = TestBed.inject(CalcService);
        const random1 = Math.floor(Math.random() * 100);
        const random2 = Math.floor(Math.random() * 100);

        const result = calcService.multiply(random1, random2);
        expect(result).toEqual(random1 * random2);
    });

    it('[should fetch users from the API]', () => {

        waitForAsync(() => {
            const mockUsers: User[] = [{
                id: 1,
                name: 'Bob',
                username: 'bob',
                email: '',
            },
            {
                id: 2,
                name: 'John',
                username: 'john',
                email: '',
            }];
            const serviceSpy = spyOn(service, 'getUsers').and.returnValue(mockUsers);

            const request = httpTestingController.expectOne(ApiUrls.Users);
            expect(request.request.method).toBe('GET');
    
            request.flush(mockUsers);
    
            expect(serviceSpy).toHaveBeenCalledOnceWith();
        });
    });

    beforeEach(() => {
        console.log("beforeEach");
    });

    afterEach(() => {
        httpTestingController.verify();
        console.log("afterEach");
    });

    afterAll(() => {
        console.log("afterAll");
    });
});