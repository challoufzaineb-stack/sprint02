import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { VoyageService } from '../services/voyage.service';

@Component({
  selector: 'app-update-voyage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-voyage.html',
})
export class UpdateVoyage implements OnInit {
  currentVoyage = new Voyage();
  types!: Type[];
  updatedTypeId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private voyageService: VoyageService
  ) {}

  ngOnInit(): void {
    // Récupérer la liste des types directement (men ghir .subscribe)
    this.types = this.voyageService.listeTypes();

    // Récupérer le voyage à modifier directement en utilisant l'ID de l'URL
    const id = this.activatedRoute.snapshot.params['id'];
    this.currentVoyage = this.voyageService.consulterVoyage(id);
    
    if (this.currentVoyage && this.currentVoyage.type) {
      this.updatedTypeId = this.currentVoyage.type.idType;
    }
  }

  updateVoyage() {
    this.currentVoyage.type = this.types.find(t => t.idType == this.updatedTypeId)!;
    
    // Mettre à jour directement le voyage (men ghir .subscribe)
    this.voyageService.updateVoyage(this.currentVoyage);
    
    // Rediriger vers la liste des voyages
    this.router.navigate(['voyages']);
  }
}