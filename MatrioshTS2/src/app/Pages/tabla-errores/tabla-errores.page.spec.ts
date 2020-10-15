import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablaErroresPage } from './tabla-errores.page';

describe('TablaErroresPage', () => {
  let component: TablaErroresPage;
  let fixture: ComponentFixture<TablaErroresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaErroresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablaErroresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
