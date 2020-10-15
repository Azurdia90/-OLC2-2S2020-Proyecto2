import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage 
{

  constructor(private menuController: MenuController,private formBuilder: FormBuilder) 
  {
    this.buildForm();
  }

  toggleMenu()
  {
    this.menuController.toggle();
  }

  public buildForm()
  {
    
  }

}
