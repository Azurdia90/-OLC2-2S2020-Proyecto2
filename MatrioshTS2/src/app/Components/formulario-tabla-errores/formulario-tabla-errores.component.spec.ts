import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioTablaErroresComponent } from './formulario-tabla-errores.component';

describe('FormularioTablaErroresComponent', () => {
  let component: FormularioTablaErroresComponent;
  let fixture: ComponentFixture<FormularioTablaErroresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioTablaErroresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioTablaErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
