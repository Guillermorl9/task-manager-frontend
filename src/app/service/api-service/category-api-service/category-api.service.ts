import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../../model/Category";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class CategoryApiService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL: string = 'http://localhost:8080/api/categories';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URL}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.BASE_URL}`, category);
  }

  updateCategory(categoryId: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.BASE_URL}/${categoryId}`, category);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${categoryId}`);
  }
}

