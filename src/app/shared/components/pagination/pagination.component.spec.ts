import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default values for inputs', () => {
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(1);
  });

  it('should return true for isNumber given a number and false for a string', () => {
    expect(component.isNumber(5)).toBeTrue();
    expect(component.isNumber('...')).toBeFalse();
  });

  it('should emit pageChange when goToPage is called with a new valid page', () => {
    spyOn(component.pageChange, 'emit');
    component.totalPages = 5;
    component.currentPage = 2;
    component.goToPage(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('should NOT emit pageChange when goToPage is called with current page', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 2;
    component.totalPages = 5;
    component.goToPage(2);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should NOT emit pageChange when goToPage is called with invalid page', () => {
    spyOn(component.pageChange, 'emit');
    component.totalPages = 3;
    component.currentPage = 2;
    component.goToPage(0);   // below range
    component.goToPage(4);   // above range
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should generate correct smartPages for consecutive range', () => {
    // E.g. current page 3 of 5: expect [1, 1, 2, 3, 4, 5] -> [1,2,3,4,5]
    component.currentPage = 3;
    component.totalPages = 5;
    fixture.detectChanges();
    expect(component.smartPages).toEqual([1, 2, 3, 4, 5]);
  });

  it('should generate correct smartPages with ellipsis for larger range', () => {
    component.currentPage = 6;
    component.totalPages = 10;
    fixture.detectChanges();
    expect(component.smartPages).toEqual([1, '...', 4, 5, 6, 7, 8, 9, 10]);
  });

  it('should handle totalPages = 1 (only one page)', () => {
    component.currentPage = 1;
    component.totalPages = 1;
    expect(component.smartPages).toEqual([1]);
  });

  it('should handle goToPage method not emitting for invalid totalPages', () => {
    spyOn(component.pageChange, 'emit');
    component.currentPage = 1;
    component.totalPages = 0;
    component.goToPage(1);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  // Add template-based tests if you want to check rendering and click events
  // Assuming your template calls goToPage(page) in (click)
  // For that, you would need to provide a mock template or copy its code
});
