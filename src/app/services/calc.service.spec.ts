import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { CalcService }                                    from "./calc.service";
import { TestBed, waitForAsync }                          from "@angular/core/testing";
import { ApiUrls }                                        from "../strings";
import { User }                                           from '../models/User';
import { Post }                                           from '../models/Post';
import { of }                                             from 'rxjs';

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

    it('[SHOULD FETCH USERS FROM THE API]', () => {
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
        // let serviceSpy: jasmine.Spy;
        // let request: TestRequest;

        const mockPost: Post = {
            userId: 1,
            id: 1,
            title: 'title',
            body: 'body',
        };
        // another way to test a method that returns an Observable
        service.savePost(mockPost).subscribe((post: Post) => {
            expect(post).toEqual(mockPost);
        });

        const request = httpTestingController.expectOne(ApiUrls.Posts);
        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(mockPost);

        request.flush(mockPost);
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
