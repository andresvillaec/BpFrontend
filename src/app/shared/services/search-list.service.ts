import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchListService {

  constructor() { }

  filterList<T>(list: T[], searchTerm: string): T[] {
    if (!searchTerm) {
      return list
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return list.filter(entity => {
      // Loop over each key of the entity
      return Object.keys(entity as Object).some((key: string) => {
        const value = (entity as any)[key];

        // Check if the field value is a Date and format it
        if (value instanceof Date) {
          return value.toLocaleDateString('en-GB').includes(lowerCaseSearchTerm);
        }

        // Convert other field types to string and search
        return String(value).toLowerCase().includes(lowerCaseSearchTerm);
      });
    });
  }
}
