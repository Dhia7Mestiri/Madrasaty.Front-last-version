import { TestBed              } from '@angular/core/testing';
import { CourseSessionService } from './course-session.service';

describe('CourseSessionService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: CourseSessionService = TestBed.inject(CourseSessionService);
        expect(service).toBeTruthy();
    });
});