import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignResultComponent } from './assign-result.component';

describe('AssignResultComponent', () => {
  let component: AssignResultComponent;
  let fixture: ComponentFixture<AssignResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignResultComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
