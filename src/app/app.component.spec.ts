import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./shared/components/header/header.component";
import { ContentComponent } from "./shared/components/content/content.component";
import { By } from '@angular/platform-browser';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HeaderComponent, ContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger initial data binding
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Andres Villavicencio BpFrontend' title`, () => {
    expect(component.title).toEqual('Andres Villavicencio BpFrontend');
  });

  it('should contain app-header component', () => {
    const headerComponent = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerComponent).toBeTruthy();
  });

  it('should contain app-content component', () => {
    const contentComponent = fixture.debugElement.query(By.directive(ContentComponent));
    expect(contentComponent).toBeTruthy();
  });
});
