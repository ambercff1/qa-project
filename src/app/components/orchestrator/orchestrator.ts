import { Component, ChangeDetectorRef } from '@angular/core'; // Adicione ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Qa } from '../../services/qa'; // Usando SEU nome de serviço: Qa
import { AnalysisResponse } from '../../models/qa.model';

@Component({
  selector: 'app-orchestrator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orchestrator.html', // Usando SEU nome de template
  styleUrls: ['./orchestrator.css']    // Usando SEU nome de estilo
})
export class Orchestrator { // Usando SEU nome de classe: Orchestrator

  githubUrl: string  = "";
  logs: string[] = [];
  result: AnalysisResponse | null = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injetando o ChangeDetectorRef, que nos dá controle manual sobre a renderização
  constructor(
    private qaService: Qa, 
    private cdr: ChangeDetectorRef
  ) {}

  handleRunTest(): void {
    this.isLoading = true;
    this.result = null;
    this.errorMessage = null;
    this.logs =  ['Iniciando pipeline de QA...'];
    this.cdr.detectChanges(); // Força a tela a mostrar "isLoading" imediatamente

    this.qaService.runPipeline(this.githubUrl).subscribe({
      next: (response) => {
        // Atualiza as variáveis
        this.result = response;
        const outputLogs = response.test_summary?.output ? response.test_summary.output.split(/\\n/g) : [];
        this.logs = [
          ...this.logs,
          'Pipeline Concluída!',
          '--- Resumo dos Testes ---',
          ...outputLogs
        ];
        this.isLoading = false;

        // --- ORDEM DIRETA PARA ATUALIZAR A TELA ---
        // Diz ao Angular: "Redesenhe este componente AGORA com os novos dados."
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Erro na execução da pipeline:', err);
        this.errorMessage = err.error?.detail || 'Ocorreu um erro ao se conectar com o servidor.';
        this.logs.push(`Erro: ${this.errorMessage}`);
        this.isLoading = false;

        // --- ORDEM DIRETA (PARA O CASO DE ERRO) ---
        this.cdr.detectChanges();
      }
    });
  }
}
