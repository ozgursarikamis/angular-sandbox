import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalcService } from "./calc.service";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { ApiUrls } from "./strings";
import { User } from './models/User';
import { Post } from './models/Post';
import { of } from 'rxjs';

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
            const serviceSpy = spyOn(service, 'getUsers').and.returnValue(of(mockUsers));

            const request = httpTestingController.expectOne(ApiUrls.Users);
            expect(request.request.method).toBe('GET');
    
            request.flush(mockUsers);
    
            expect(serviceSpy).toHaveBeenCalledOnceWith();
        });
    });

    it('[SHOULD SAVE POST]', () => {
        waitForAsync(() => {
            const mockPost: Post = {
                userId: 1,
                id: 1,
                title: 'title',
                body: 'body',
            };
            
            // savePost method returns an Observable<Post>:

            const serviceSpy = spyOn(service, 'savePost').and.returnValue(of(mockPost));
            const request = httpTestingController.expectOne(ApiUrls.Posts);
            expect(request.request.method).toBe('POST');
            expect(request.request.body).toEqual(mockPost);
            expect(serviceSpy).toHaveBeenCalledOnceWith(mockPost);
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