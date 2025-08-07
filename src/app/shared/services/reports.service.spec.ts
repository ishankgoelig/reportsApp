import { TestBed } from '@angular/core/testing';
import { ReportsService, Report } from './reports.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ReportsService', () => {
  let service: ReportsService;
  let httpMock: HttpTestingController;

  const mockReports: Report[] = [
    {
      id: 1,
      reportName: 'Test Report 1',
      createdDate: '2024-01-01',
      modifiedDate: '2024-01-02',
      owner: 'Alice',
      formName: 'Form1'
    },
    {
      id: 2,
      reportName: 'Test Report 2',
      createdDate: '2024-01-03',
      modifiedDate: '2024-01-04',
      owner: 'Bob',
      formName: 'Form2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportsService]
    });
    service = TestBed.inject(ReportsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of reports on success', () => {
    service.getReports().subscribe(reports => {
      expect(reports.length).toBe(2);
      expect(reports).toEqual(mockReports);
    });

    const req = httpMock.expectOne('assets/reports.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockReports);
  });

  it('should throw error if http fails', () => {
    service.getReports().subscribe({
      next: () => fail('should have errored'),
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err.message).toContain('Failed to load reports');
      }
    });

    const req = httpMock.expectOne('assets/reports.json');
    req.error(new ErrorEvent('Network error'));
  });
});
