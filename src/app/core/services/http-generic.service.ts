import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpGenericService<T> {

  constructor(private http: HttpClient) { }

  // Generic method to get all entities (array of T)
  getAll<R = T[]>(url: string): Observable<R> {
    return this.http.get<R>(url);  // R to be inferred from the specific service
  }

  // Get entity by ID
  getById(url: string, id: string): Observable<T> {
    return this.http.get<T>(`${url}/${id}`);
  }

  // Add (create) an entity
  create(url: string, data: T): Observable<T> {
    return this.http.post<T>(url, data);
  }

  // Update entity by ID
  update(url: string, id: string, data: T): Observable<T> {
    return this.http.put<T>(`${url}/${id}`, data);
  }

  // Delete entity by ID
  delete(url: string, id: string): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`);
  }
}
