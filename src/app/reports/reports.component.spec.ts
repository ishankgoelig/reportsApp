import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportsComponent } from './reports.component';
import { ReportsService, Report } from '../shared/services/reports.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { of, Subject, Subscription } from 'rxjs';
import { SharedModule } from '../shared/shared.module';

const mockReports: Report[] = [
  { id: 1, reportName: 'Alpha', owner: 'Alice', formName: 'Form1', createdDate: '2024-08-01', modifiedDate: '2024-08-02' },
  { id: 2, reportName: 'Beta', owner: 'Bob', formName: 'Form2', createdDate: '2024-09-01', modifiedDate: '2024-09-02' },
  { id: 3, reportName: 'Gamma', owner: 'Charlie', formName: 'Form3', createdDate: '2024-10-01', modifiedDate: '2024-10-02' }
];


describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let reportService: jasmine.SpyObj<ReportsService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      imports: [SharedModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    reportService = jasmine.createSpyObj('ReportsService', ['getReports']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    toastr = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [ReportsComponent],
      providers: [
        { provide: ReportsService, useValue: reportService },
        { provide: MatDialog, useValue: dialog },
        { provide: ToastrService, useValue: toastr }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch reports on init and sort them', () => {
    reportService.getReports.and.returnValue(of(mockReports));
    component.ngOnInit();
    expect(component.reports.length).toBe(3);
    expect(component.visibleReports.length).toBe(3);
    expect(component.totalPages).toBe(1);
  });

  it('should filter reports based on searchTerm', () => {
    component.reports = mockReports;
    component.searchTerm = 'beta';
    const filtered = component.filterReports(component.reports);
    expect(filtered.length).toBe(1);
    expect(filtered[0].reportName).toBe('Beta');
  });

  it('should sort reports by Newest', () => {
    const sorted = component.sortReports(mockReports);
    expect(sorted[0].id).toBe(3);
  });

  it('should paginate correctly', () => {
    component.pageSize = 2;
    component.visibleReports = mockReports;
    component.currentPage = 2;
    component.totalPages = 2;
    component.setPagedData();
    expect(component.pagedData.length).toBe(1);
    expect(component.pagedData[0].id).toBe(3);
  });

  it('should return correct pages array', () => {
    component.totalPages = 3;
    expect(component.pages).toEqual([1, 2, 3]);
  });

  it('should generate correct page range text', () => {
    component.visibleReports = mockReports;
    component.currentPage = 1;
    component.pageSize = 2;
    component.pagedData = mockReports.slice(0, 2);
    expect(component.pageRangeText).toContain('1-2 of 3 History Records');
  });

  it('should go to a specific page only if valid', () => {
    component.totalPages = 3;
    component.currentPage = 1;
    spyOn(component, 'setPagedData');
    component.goToPage(2);
    expect(component.currentPage).toBe(2);
    expect(component.setPagedData).toHaveBeenCalled();
    component.goToPage(0);
    expect(component.currentPage).toBe(2);
  });

  it('should delete report and show success message', () => {
    component.reports = [...mockReports];
    spyOn(component, 'applySort');
    component.deleteReport(1);
    expect(component.reports.length).toBe(2);
    expect(toastr.success).toHaveBeenCalled();
    expect(component.applySort).toHaveBeenCalledWith(true);
  });

  it('should show error if report not found when deleting', () => {
    component.reports = [...mockReports];
    spyOn(component, 'applySort');
    component.deleteReport(999);
    expect(toastr.error).toHaveBeenCalledWith('Report not found or could not be deleted.', 'Error');
  });

  it('should show error message on exception in delete', () => {
    spyOn(component, 'filterReports').and.throwError('Test');
    component.reports = [...mockReports];
    component.deleteReport(1);
    expect(toastr.error).toHaveBeenCalledWith('An error occurred while deleting the report.', 'Error');
  });

  it('should open and handle the delete dialog', () => {
    const dialogRefMock = { afterClosed: () => of(true) } as unknown as MatDialogRef<ReportsComponent>;
    dialog.open.and.returnValue(dialogRefMock);
    spyOn(component, 'deleteReport');
    component.openDeleteDialog(mockReports[0]);
    expect(dialog.open).toHaveBeenCalled();
    expect(component.deleteReport).toHaveBeenCalledWith(1);
  });

  it('should unsubscribe from reportsSub on destroy', () => {
    const sub = new Subject();
    component['reportsSub'] = sub as unknown as Subscription;
    spyOn(sub, 'unsubscribe');
    component.ngOnDestroy();
    expect(sub.unsubscribe).toHaveBeenCalled();
  });

});
