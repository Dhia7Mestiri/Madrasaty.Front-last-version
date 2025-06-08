/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ColumnsService  } from './columns.service';

describe('Service: ColumnsService', () =>
{
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ColumnsService]
        });
    });

    it('should ...', inject([ColumnsService], (service: ColumnsService) => {
        expect(service).toBeTruthy();
    }));
});