import { TestBed           } from '@angular/core/testing';

import { FormChangeService } from './form-change.service';

describe('FormChangeService', () => {
    let service: FormChangeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FormChangeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});