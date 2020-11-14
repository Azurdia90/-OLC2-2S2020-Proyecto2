import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabla-simbolos',
  templateUrl: './tabla-simbolos.page.html',
  styleUrls: ['./tabla-simbolos.page.scss'],
})
export class TablaSimbolosPage implements OnInit {

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
