import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TraducirPage } from './traducir.page';

describe('TraducirPage', () => {
  let component: TraducirPage;
  let fixture: ComponentFixture<TraducirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraducirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TraducirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
