import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalcService } from "./calc.service";
import { TestBed, inject, waitForAsync } from "@angular/core/testing";
import { ApiUrls } from "../strings";
import { User } from '../models/User';
import { Post } from '../models/Post';
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

    it('should fetch users', () => {
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
            expect(serviceSpy).toHaveBeenCalledOnceWith();

            request.flush(mockUsers);

        });
    });

    it('should get users from the server 2', inject(
        [CalcService, HttpTestingController],
        (service: CalcService, httpMock: HttpTestingController) => {
            const testData: User[] = [{
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

            // Trigger the HTTP request
            service.getUsers().subscribe(data => {
                expect(data).toEqual(testData); // Assert that the data returned is as expected
            });

            // Mock the HTTP request
            const req = httpMock.expectOne(ApiUrls.Users); // Replace with your actual API endpoint
            expect(req.request.method).toBe('GET');

            // Provide dummy data for the HTTP response
            req.flush(testData);

            // Verify that there are no outstanding HTTP requests
            httpMock.verify();
        }
    ));

    it('should save posts', () => {
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
        console.log("========================================================================");
    });
});
