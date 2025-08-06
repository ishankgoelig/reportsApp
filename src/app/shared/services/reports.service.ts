import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Report {
  id: number;
  reportName: string;
  createdDate: string;
  modifiedDate: string;
  owner: string;
  formName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private http = inject(HttpClient);

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>('assets/reports.json').pipe(
      catchError(() => {
        return throwError(() => new Error('Failed to load reports. Please try again later.'));
      })
    );
  }
}
