import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpGenericService } from './http-generic.service';

interface MockEntity {
  id: string;
  name: string;
}

describe('HttpGenericService', () => {
  let service: HttpGenericService<MockEntity>;
  let httpMock: HttpTestingController;
  const mockUrl = '/api/entities';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpGenericService]
    });

    service = TestBed.inject(HttpGenericService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no unmatched requests remain
  });

  it('should fetch all entities', () => {
    const mockEntities: MockEntity[] = [{ id: '1', name: 'Entity1' }, { id: '2', name: 'Entity2' }];

    service.getAll(mockUrl).subscribe((entities) => {
      expect(entities).toEqual(mockEntities);
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockEntities); // Respond with mock data
  });

  it('should fetch entity by ID', () => {
    const mockEntity: MockEntity = { id: '1', name: 'Entity1' };

    service.getById(mockUrl, '1').subscribe((entity) => {
      expect(entity).toEqual(mockEntity);
    });

    const req = httpMock.expectOne(`${mockUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEntity);
  });

  it('should create a new entity', () => {
    const newEntity: MockEntity = { id: '3', name: 'NewEntity' };

    service.create(mockUrl, newEntity).subscribe((entity) => {
      expect(entity).toEqual(newEntity);
    });

    const req = httpMock.expectOne(mockUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEntity);
    req.flush(newEntity);
  });

  it('should update an existing entity', () => {
    const updatedEntity: MockEntity = { id: '1', name: 'UpdatedEntity' };

    service.update(mockUrl, '1', updatedEntity).subscribe((entity) => {
      expect(entity).toEqual(updatedEntity);
    });

    const req = httpMock.expectOne(`${mockUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEntity);
    req.flush(updatedEntity);
  });
});