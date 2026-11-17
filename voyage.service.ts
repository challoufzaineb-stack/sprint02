import { Injectable } from '@angular/core';
import { Voyage } from '../model/voyage.model';
import { Type } from '../model/type.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoyageService {

  voyages: Voyage[];
  voyage!: Voyage;
  types: Type[];

  apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    console.log("Création du service voyage !");

    this.types = [
      { idType: 1, nomType: "Voyage Organisé" },
      { idType: 2, nomType: "Circuit Culturel" },
      { idType: 3, nomType: "Séjour Balnéaire" }
    ];

    this.voyages = [
      {
        idVoyage: 1,
       destination : "Voyage en Italie",
        prix: 1200,
        dateDepart: new Date("2024-05-10"),
        type: { idType: 1, nomType: "Voyage Organisé" }
      },
      {
        idVoyage: 2,
        destination: "Circuit Japon",
        prix: 2500,
        dateDepart: new Date("2024-09-15"),
        type: { idType: 2, nomType: "Circuit Culturel" }
      },
      {
        idVoyage: 3,
        destination: "Séjour aux Maldives",
        prix: 1800,
        dateDepart: new Date("2024-07-01"),
        type: { idType: 3, nomType: "Séjour Balnéaire" }
      }
    ];
  }

  listeVoyages(): Observable<Voyage[]> {
    return of(this.voyages);
  }

  ajouterVoyage(v: Voyage): void {
    this.voyages.push(v);
  }

  supprimerVoyage(v: Voyage): void {
    const index = this.voyages.indexOf(v);

    if (index > -1) {
      this.voyages.splice(index, 1);
    }
  }

  consulterVoyage(id: number): Voyage {
    this.voyage = this.voyages.find(v => v.idVoyage == id)!;
    return this.voyage;
  }

  updateVoyage(v: Voyage): void {
    const index = this.voyages.findIndex(
      cur => cur.idVoyage === v.idVoyage
    );

    if (index > -1) {
      this.voyages.splice(index, 1, v);
    }
  }

  listeTypes(): Type[] {
    return this.types;
  }

  consulterType(id: number): Type {
    return this.types.find(t => t.idType == id)!;
  }

  rechercherParType(idType: number): Observable<Voyage[]> {
    const results = this.voyages.filter(v => v.type.idType == idType);
    return of(results);
  }

  rechercherParNom(nom: string): Observable<Voyage[]> {
    const nomLower = nom.toLowerCase();
    const results = this.voyages.filter(v => 
      v.destination.toLowerCase().includes(nomLower)
    );
    return of(results);
  }
  ajouterType(t: Type): void {
  // Vérifie si le type existe déjà dans le tableau (pour la modification)
  const index = this.types.findIndex(item => item.idType == t.idType);
  if (index !== -1) {
    this.types[index] = { ...t };
  } else {
    // Sinon c'est un ajout : on génère un nouvel idType si idType est 0
    if (t.idType === 0) {
      const maxId = this.types.length > 0 ? Math.max(...this.types.map(item => item.idType)) : 0;
      t.idType = maxId + 1;
    }
    this.types.push({ ...t });
  }
}
}