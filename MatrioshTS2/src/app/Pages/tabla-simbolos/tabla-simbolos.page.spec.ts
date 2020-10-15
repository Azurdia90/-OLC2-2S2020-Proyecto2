import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablaSimbolosPage } from './tabla-simbolos.page';

describe('TablaSimbolosPage', () => {
  let component: TablaSimbolosPage;
  let fixture: ComponentFixture<TablaSimbolosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSimbolosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablaSimbolosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
