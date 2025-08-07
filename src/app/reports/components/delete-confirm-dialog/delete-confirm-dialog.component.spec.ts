import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

describe('DeleteConfirmDialogComponent', () => {
  let component: DeleteConfirmDialogComponent;
  let fixture: ComponentFixture<DeleteConfirmDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DeleteConfirmDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { name: 'TestReport' } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialogRef.close(false) on onCancel()', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should call dialogRef.close(true) on onConfirm()', () => {
    component.onConfirm();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should have the right name injected as data', () => {
    expect(component.data.name).toBe('TestReport');
  });
});
