import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabla-errores',
  templateUrl: './tabla-errores.page.html',
  styleUrls: ['./tabla-errores.page.scss'],
})
export class TablaErroresPage implements OnInit {

  constructor(private menuController: MenuController,private formBuilder: FormBuilder) 
  {
    this.buildForm();
  }

  ngOnInit()
  {

  }

  toggleMenu()
  {
    this.menuController.toggle();
  }

  public buildForm()
  {
    
  }

}
