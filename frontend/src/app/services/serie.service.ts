import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponseCategorias, ApiResponseSerie, ApiResponseSeries, ApiResponseMessage, Serie} from '../common/serie';
import {environment} from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private readonly http: HttpClient = inject(HttpClient);

  constructor() { }

  getSeries():Observable<ApiResponseSeries>{
    return this.http.get<ApiResponseSeries>(
      environment.apiUrl
    )}

  getSerie(id:string):Observable<ApiResponseSerie>{
    return this.http.get<ApiResponseSerie>(
      environment.apiUrl+'/serie/' + id
    )}

  getCategorias(): Observable<ApiResponseCategorias>{
    return this.http.get<ApiResponseCategorias>(environment.apiUrl+'/categorias');
  }

  addSerie(serie: Serie): Observable<ApiResponseMessage> {
    return this.http.post<ApiResponseMessage>(environment.apiUrl, serie)
  }

  updateSerie(serie: Serie): Observable<ApiResponseMessage> {
    return this.http.put<ApiResponseMessage>(environment.apiUrl + '/' + serie._id, serie)
  }

  deleteSerie(id: string): Observable<ApiResponseMessage> {
    return this.http.delete<ApiResponseMessage>(environment.apiUrl + '/' + id)
  }
}
