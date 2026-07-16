export interface AnalysisRequest {
    githubUrl: string;
}

export interface TestSummary {
    status: string;
    log_preview: string[];
}

export interface AnalysisResponse {
    status: string;
    message: string;
    run_id: string;
    application_url: string;
    test_summary: TestSummary;
}''