import { TestBed } from '@angular/core/testing';

import { PostSelectorService } from './post-selector.service';

describe('PostSelectorService', () => {
  let service: PostSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
