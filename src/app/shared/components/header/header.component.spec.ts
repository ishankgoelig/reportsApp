import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 6 navigation items', () => {
    expect(component.navItems.length).toBe(6);
  });

  it('should have "Reports" as an active nav item', () => {
    const reports = component.navItems.find(item => item.label === 'Reports');
    expect(reports).toBeTruthy();
    expect(reports?.isActive).toBeTrue();
  });

  it('should render all navItems as navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('ul.navbar-nav li.nav-item a.nav-link');
    expect(navLinks.length).toBe(component.navItems.length);
  });

  it('should have each nav link render the correct label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('ul.navbar-nav li.nav-item a.nav-link');
    component.navItems.forEach((item, idx) => {
      expect(navLinks[idx]?.textContent).toContain(item.label);
    });
  });

});
