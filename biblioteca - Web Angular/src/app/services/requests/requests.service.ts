import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:8080/';
  }

  _get(url: string, token?: string): Observable<any>{
    const header = this.setHeader(token);
    return this.http.get<any>(`${this.apiUrl}${url}`, { headers: header })
      .pipe(catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(errorMsg);
      }));
  }

  _post(url: string, body: any, token?: string): Observable<any>{
    const header = this.setHeader(token);
    return this.http.post<any>(`${this.apiUrl}${url}`, body, { headers: header })
      .pipe(catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(errorMsg);
      }));
  }

  _put(url: string, body?: any, token?: string): Observable<any>{
    const header = this.setHeader(token);
    return this.http.put<any>(`${this.apiUrl}${url}`, body, { headers: header })
      .pipe(catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(errorMsg);
      }));
  }

  _patch(url: string, body: any, token?: string): Observable<any>{
    const header = this.setHeader(token);
    
    return this.http.patch<any>(`${this.apiUrl}${url}`, body, { headers: header })
      .pipe(catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(errorMsg);
      }));
  }

  _delete(url: string, token?: string): Observable<any> {
    const header = this.setHeader(token);

    return this.http.delete<any>(`${this.apiUrl}${url}`, { headers: header })
      .pipe(catchError(error => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }

        return throwError(errorMsg);
      }));
  }


  private setHeader(token: any): HttpHeaders{
    var header: HttpHeaders;
    if (token) header = new HttpHeaders({
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Method': "*",
      'Accept': '*/*',
      'Authorization': "Bearer "+ token
    })
    else header = new HttpHeaders({
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Method': "*",
      'Accept': '*/*',
    })

    return header;
  }

  private handleError(error: any){
    return throwError(() => error.error || "SERVER ERROR");
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }

    }
  }
}
