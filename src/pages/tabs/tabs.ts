import { Component } from '@angular/core';
<<<<<<< HEAD

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

=======
 
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
 
>>>>>>> 62c50e0ae5aa6f2d183c243752e4cf2e74ee9f98
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
<<<<<<< HEAD

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

=======
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
 
  constructor() {
 
>>>>>>> 62c50e0ae5aa6f2d183c243752e4cf2e74ee9f98
  }
}
