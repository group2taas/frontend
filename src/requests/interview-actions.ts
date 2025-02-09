import axiosInstance from '@/axios/axios-instance';

const QUESTION_MAP: Record<string, number> = {
    applicationName: 1,
    productionUrl: 2,
    environments: 3,
    applicationTypes: 4,
    authenticationMethod: 5,
    // otherAuthMethod: 6,
    userRoles: 6,
    customRoles: 7,
    sessionManagement: 8,
    sessionTimeout: 9,
    inputFields: 10,
    inputTypes: 11,
    sensitiveData: 12,
    dataStorage: 13,
    apiEndpoints: 14,
    authenticationRequired: 15,
    rateLimiting: 16,
    documentationAvailable: 17,
    apiMethods: 18,
    securityControls: 19,
    hosting: 20,
    criticalFunctions: 21,
    complianceRequirements: 22,
    lastAssessmentDate: 23,
    knownVulnerabilities: 24,
    // criticalAssets: 23, 
    timeRestrictions: 25,
    testingLimitations: 26,
    requiredReports: 27,
    projectStartDate: 28,
    draftReportDue: 29,
    finalReportDue: 30,
    additionalNotes: 31,
    clientRepresentative: 32,
    clientDate: 33,
    securityAssessor: 34,
    assessorDate: 35,
    // specificTimeWindow: 34, 
  };
  

function buildAnswersFromFormData(formData: any) {
    const answers = [];

    for (const fieldName of Object.keys(formData)) {
        const questionId = QUESTION_MAP[fieldName];
        if (!questionId) {
            continue;
        }

        let fieldValue = formData[fieldName];

        if (Array.isArray(fieldValue)) {
            // Convert arrays into comma-separated strings for multi-select type
            fieldValue = fieldValue.join(',');

            if (typeof fieldValue === 'string' && /^[0-9]+$/.test(fieldValue)) {
                fieldValue = parseInt(fieldValue, 10);
            }
        }

        answers.push({
            question: questionId,
            body: fieldValue ?? '',
        });
    }

    return answers;
}


export const createInterview = async (ticketId: number, formData: any) => {
  const answers = buildAnswersFromFormData(formData);

  const response = await axiosInstance.post('/interviews/create/', {
    ticket: ticketId,
    answers,
  });

  return response.data;
};
