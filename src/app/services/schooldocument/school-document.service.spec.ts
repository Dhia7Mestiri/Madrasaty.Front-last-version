import { TestBed } from '@angular/core/testing';

import { SchoolDocumentService } from './school-document.service';

describe('SchoolDocumentService', () => {
  let service: SchoolDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
