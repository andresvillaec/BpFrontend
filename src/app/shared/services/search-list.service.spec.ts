import { TestBed } from '@angular/core/testing';

import { SearchListService } from './search-list.service';

describe('SearchListService', () => {
  let service: SearchListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #filterList()', async () => {
    service.filterList([{}], 'searchTerm');
  });

  it('should find 1 element', async () => {
    const data = [
      {
        "id": "8",
        "name": "Tarjeta de credito",
        "description": "Adicional del Titular",
        "logo": "logo.png",
        "date_release": "2025-01-01",
        "date_revision": "2025-01-01"
      }
    ];

    const result = service.filterList(data, 'Tarjeta de credito');
    expect(result.length).toBe(1)
  });
});
