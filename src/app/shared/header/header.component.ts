import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  navItems = [
    { label: 'Forms', icon: 'bi-list-ul', route: '/forms' },
    { label: 'Customers', icon: 'bi-people-fill', route: '/customers' },
    { label: 'Submissions', icon: 'bi-graph-up-arrow', route: '/submissions' },
    { label: 'History', icon: 'bi-clock-history', route: '/history' },
    { label: 'Reports', icon: 'bi-table', route: '/reports', isActive: true },
    { label: 'Workflow', icon: 'bi-diagram-3-fill', route: '/workflow' }
  ];
}
