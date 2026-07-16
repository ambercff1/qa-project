import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalysisResponse } from '../../models/qa.model';
import { Qa } from '../../services/qa';

@Component({
  selector: 'app-orchestrator',
  imports: [CommonModule, FormsModule],
  templateUrl: './orchestrator.html',
  styleUrl: './orchestrator.css',
})
export class Orchestrator {
  githubUrl: string  = "";
  logs: string[] = [];
  result: AnalysisResponse | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private qaService: Qa){}

  handleRunTest(): void {
    this.isLoading = true;
    this.result = null;
    this.errorMessage = null;
    this.logs =  ['Iniciando pipeline de QA...'];

    this.qaService.runPipeline(this.githubUrl).subscribe({
      next: (response) => {
        this.result = response;
        this.logs = [
          ...this.logs,
          'Pipeline Concluída!',
          '--- Resumo dos Testes ---',
          ...response.test_summary.log_preview
        ];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro na execução da pipeline:', err);
        this.errorMessage = err.error?.detail || 'Ocorreu um erro ao se conectar com o servidor.';
        this.logs.push(`Erro: ${this.errorMessage}`);
        this.isLoading = false;
      }
    });
  }
}
