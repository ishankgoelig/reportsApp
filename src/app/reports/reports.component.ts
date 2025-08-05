import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportsService, Report } from '../services/reports.service';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit, OnDestroy {
  reports: Report[] = [];
  pagedData: Report[] = [];
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;
  sortBy = 'Newest';
  searchTerm = '';
  hoveredReportId: number | null = null;
  visibleReports: Report[] = [];

  reportService = inject(ReportsService);
  dialog = inject(MatDialog);
  toastr = inject(ToastrService);

  private reportsSub?: Subscription;

  ngOnInit(): void {
    this.reportsSub = this.reportService.getReports().subscribe(data => {
      this.reports = data;
      this.applySort();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchTerm = filterValue;
    this.applySort();
  }

  filterReports(reports: Report[]): Report[] {
    return reports.filter(report =>
      report.reportName.toLowerCase().includes(this.searchTerm) ||
      report.owner.toLowerCase().includes(this.searchTerm) ||
      report.formName.toLowerCase().includes(this.searchTerm)
    );
  }

  sortReports(reports: Report[]): Report[] {
    return reports.slice().sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return this.sortBy === 'Newest' ? dateB - dateA : dateA - dateB;
    });
  }

  applySort(): void {
    const filtered = this.filterReports(this.reports);
    const sorted = this.sortReports(filtered);
    this.visibleReports = sorted;
    this.totalPages = Math.ceil(sorted.length / this.pageSize) || 1;
    this.currentPage = 1;
    this.setPagedData();
  }

  setPagedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedData = this.visibleReports.slice(start, end);
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.setPagedData();
    }
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pageRangeText(): string {
    if (!this.visibleReports || this.visibleReports.length === 0) return '0 History Records';
    const start = (this.pageSize * (this.currentPage - 1)) + 1;
    const end = Math.min(start + this.pagedData.length - 1, this.visibleReports.length);
    return `${start}-${end} of ${this.visibleReports.length} History Records`;
  }

  deleteReport(id: number): void {
    try {
      const initialLength = this.reports.length;
      this.reports = this.reports.filter(r => r.id !== id);
      this.applySort();
      if (this.reports.length < initialLength) {
        this.toastr.success('Report deleted successfully!', 'Success');
      } else {
        this.toastr.error('Report not found or could not be deleted.', 'Error');
      }
    } catch {
      this.toastr.error('An error occurred while deleting the report.', 'Error');
    }
  }

  openDeleteDialog(report: Report): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '340px',
      data: { name: report.reportName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteReport(report.id);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.reportsSub) {
      this.reportsSub.unsubscribe();
    }
  }
}
