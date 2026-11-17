import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Type } from '../model/type.model';
import { VoyageService } from '../services/voyage.service';
import { UpdateType } from '../update-type/update-type';

@Component({
  selector: 'app-liste-types',
  imports: [CommonModule, UpdateType],
  styleUrl: './liste-types.css',
  templateUrl: './liste-types.html',
})
export class ListeTypes implements OnInit {
  types!: Type[];
  updatedType: Type = { "idType": 0, "nomType": "" };
  ajout: boolean = true;

  constructor(private voyageService: VoyageService) {}

  ngOnInit(): void {
    this.chargerTypes();
  }

  chargerTypes() {
    this.types = this.voyageService.listeTypes();
    console.log(this.types);
  }

  typeUpdated(t: Type) {
    console.log("Type updated event", t);
    this.voyageService.ajouterType(t);
    this.chargerTypes();
    this.updatedType = { "idType": 0, "nomType": "" };
    this.ajout = true;
  }
  updateTyp(t: Type) {
    this.updatedType = { ...t };
    this.ajout = false;
  }
  
}