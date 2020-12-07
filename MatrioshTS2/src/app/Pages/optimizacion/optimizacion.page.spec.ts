import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OptimizacionPage } from './optimizacion.page';

describe('OptimizacionPage', () => {
  let component: OptimizacionPage;
  let fixture: ComponentFixture<OptimizacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimizacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OptimizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
