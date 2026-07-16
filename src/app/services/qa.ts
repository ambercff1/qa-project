import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalysisRequest, AnalysisResponse } from '../models/qa.model';

@Injectable({
  providedIn: 'root',
})
export class Qa {
  private apiUrl = 'http://10.1.0.86:8000/api/run-full-test-flow';

  constructor(private http: HttpClient){

  }

  runPipeline(githubUrl: string): Observable<AnalysisResponse> {
    const body: AnalysisRequest = { githubUrl };
    return this.http.post<AnalysisResponse>(this.apiUrl, body);
  }
}
