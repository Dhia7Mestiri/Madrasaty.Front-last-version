import { TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('Pipe: SafeResourceUrl', () => {
  let domSanitizer : DomSanitizer
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
  });

  it('should create an instance', () => {
    domSanitizer = TestBed.inject(DomSanitizer);
    const pipe = new SafePipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});