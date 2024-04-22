import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-marcacion',
  templateUrl: './marcacion.page.html',
  styleUrls: ['./marcacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class MarcacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
