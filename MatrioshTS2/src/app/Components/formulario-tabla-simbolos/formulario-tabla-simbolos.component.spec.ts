import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormularioTablaSimbolosComponent } from './formulario-tabla-simbolos.component';

describe('FormularioTablaSimbolosComponent', () => {
  let component: FormularioTablaSimbolosComponent;
  let fixture: ComponentFixture<FormularioTablaSimbolosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioTablaSimbolosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioTablaSimbolosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
