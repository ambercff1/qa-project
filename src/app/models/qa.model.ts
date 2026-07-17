export interface AnalysisRequest {
    githubUrl: string;
}

export interface TestSummary {
    status: string;
    output: string;
    returnCode: number;
}

export interface AnalysisResponse {
    status: string;
    message: string;
    run_id: string;
    application_url: string;
    test_summary: TestSummary;
}''