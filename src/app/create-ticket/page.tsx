'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import Accordion from '@/components/accordion';
import { createTicket } from '@/requests/ticket-actions';

const CreateTicket = () => {
  const router = useRouter();

  // REMOVE WHEN NOT NEEDED ANYMORE
  const defaultValues = {
    productionUrl: 'https://example.com',
    environments: ['Staging', 'Development'],
    applicationTypes: ['Web', 'API'],
    authenticationMethod: 'Username/Password',
    otherAuthMethod: '',
    userRoles: ['Regular Users', 'Administrators'],
    customRoles: '2',
    sessionManagement: 'JWT',
    sessionTimeout: '30 minutes',
    inputFields: '5',
    inputTypes: ['Free text fields', 'File uploads'],
    sensitiveData: ['Personal Information', 'Financial Data'],
    dataStorage: ['Cloud Storage'],
    apiEndpoints: '10',
    apiMethods: ['GET', 'POST'],
    securityControls: ['WAF', 'Load Balancer'],
    hosting: 'Cloud',
    criticalFunctions: ['Financial Transactions', 'User Data Management'],
    complianceRequirements: ['ISO 27001'],
    lastAssessmentDate: '2024-01-01',
    knownVulnerabilities: 'None',
    criticalAssets: 'Database, API',
    timeRestrictions: ['Business Hours Only'],
    testingLimitations: ['No Destructive Testing'],
    requiredReports: ['Executive Summary', 'Technical Details'],
    projectStartDate: '2024-02-01',
    draftReportDue: '2024-03-01',
    finalReportDue: '2024-04-01',
    additionalNotes: 'No additional notes.',
    authenticationRequired: 'Yes',
    rateLimiting: 'Yes',
    documentationAvailable: 'Yes',
    specificTimeWindow: '',
    clientRepresentative: 'John Doe',
    securityAssessor: 'Jane Smith',
    clientDate: '2024-02-10',
    assessorDate: '2024-02-11',
  };
  
  // const [formData, setFormData] = useState<{
  //   specificTimeWindow: string;
  //   clientRepresentative: any;
  //   securityAssessor: any;
  //   clientDate: string;
  //   assessorDate: string;
  //   rateLimiting: any;
  //   documentationAvailable: any;
  //   authenticationRequired: string;
  //   applicationName: string;
  //   productionUrl: string;
  //   environments: string[]; 
  //   applicationTypes: string[];
  //   authenticationMethod: string;
  //   otherAuthMethod: string;
  //   userRoles: string[];
  //   customRoles: string;
  //   sessionManagement: string;
  //   sessionTimeout: string;
  //   inputFields: string;
  //   inputTypes: string[];
  //   sensitiveData: string[];
  //   dataStorage: string[];
  //   apiEndpoints: string;
  //   apiMethods: string[];
  //   securityControls: string[];
  //   hosting: string;
  //   criticalFunctions: string[];
  //   complianceRequirements: string[];
  //   lastAssessmentDate: string;
  //   knownVulnerabilities: string;
  //   criticalAssets: string;
  //   timeRestrictions: string[];
  //   testingLimitations: string[];
  //   requiredReports: string[];
  //   projectStartDate: string;
  //   draftReportDue: string;
  //   finalReportDue: string;
  //   additionalNotes: string;
  // }>({
  //   applicationName: '',
  //   productionUrl: '',
  //   environments: [],
  //   applicationTypes: [],
  //   authenticationMethod: '',
  //   otherAuthMethod: '',
  //   userRoles: [],
  //   customRoles: '',
  //   sessionManagement: '',
  //   sessionTimeout: '',
  //   inputFields: '',
  //   inputTypes: [],
  //   sensitiveData: [],
  //   dataStorage: [],
  //   apiEndpoints: '',
  //   apiMethods: [],
  //   securityControls: [],
  //   hosting: '',
  //   criticalFunctions: [],
  //   complianceRequirements: [],
  //   lastAssessmentDate: '',
  //   knownVulnerabilities: '',
  //   criticalAssets: '',
  //   timeRestrictions: [],
  //   testingLimitations: [],
  //   requiredReports: [],
  //   projectStartDate: '',
  //   draftReportDue: '',
  //   finalReportDue: '',
  //   additionalNotes: '',
  //   authenticationRequired: '', 
  //   rateLimiting: '', 
  //   documentationAvailable: '', 
  //   specificTimeWindow: '', 
  //   clientRepresentative: '',
  //   securityAssessor: '', 
  //   clientDate: '',
  //   assessorDate: '',
  // });

  const [formData, setFormData] = useState({
    applicationName: '',
    ...defaultValues,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
  
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
  
      setFormData((prev) => {
        const currentValues = (prev[name as keyof typeof prev] as string[]) || [];
        const updatedValues = checked
          ? [...currentValues, value]
          : currentValues.filter((v) => v !== value);
  
        return { ...prev, [name]: updatedValues };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTicket(formData);
      router.push('/');
    } catch (error) {
      alert('Failed to create ticket. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center flex-grow">
        <div className="w-4/5 max-w-3xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            OWASP-Based Security Testing Interview Sheet
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Accordion Sections */}
            <Accordion title="1. Application Overview" isCompleted={!!formData.applicationName && !!formData.productionUrl && formData.environments.length > 0}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="applicationName" className="block text-sm font-medium text-gray-700 mb-1">
                    Application Name
                  </label>
                  <input
                    type="text"
                    id="applicationName"
                    name="applicationName"
                    value={formData.applicationName}
                    onChange={handleChange}
                    placeholder="Enter application name"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="productionUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Production URL
                  </label>
                  <input
                    type="text"
                    id="productionUrl"
                    name="productionUrl"
                    value={formData.productionUrl}
                    onChange={handleChange}
                    placeholder="Enter production URL"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Environment for Testing</label>
                  <div className="flex space-x-4">
                    {['Production', 'Staging', 'Development'].map((env) => (
                      <label key={env} className="flex items-center">
                        <input
                          type="checkbox"
                          name="environments"
                          value={env}
                          onChange={handleChange}
                          checked={formData.environments.includes(env)}
                          className="mr-2"
                        />
                        {env}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Type</label>
                  <div className="flex space-x-4">
                    {['Web', 'API', 'Mobile', 'Desktop'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          name="applicationTypes"
                          value={type}
                          onChange={handleChange}
                          checked={formData.applicationTypes.includes(type)}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion>

            <Accordion title="2. Authentication & Access Control" isCompleted={!!formData.authenticationMethod}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Authentication Method</label>
                  <div className="space-y-2">
                    {['Username/Password', 'SSO', 'OAuth', 'Certificate-based'].map((method) => (
                      <label key={method} className="flex items-center">
                        <input
                          type="radio"
                          name="authenticationMethod"
                          value={method}
                          onChange={handleChange}
                          checked={formData.authenticationMethod === method}
                          className="mr-2"
                        />
                        {method}
                      </label>
                    ))}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="authenticationMethod"
                        value="Other"
                        onChange={handleChange}
                        checked={formData.authenticationMethod === 'Other'}
                        className="mr-2"
                      />
                      Other:
                      <input
                        type="text"
                        name="otherAuthMethod"
                        value={formData.otherAuthMethod}
                        onChange={handleChange}
                        placeholder="Specify"
                        className="ml-2 border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Roles</label>
                  <div className="flex space-x-4">
                    {['Anonymous Users', 'Regular Users', 'Power Users', 'Administrators', 'System Administrators'].map((role) => (
                      <label key={role} className="flex items-center">
                        <input
                          type="checkbox"
                          name="userRoles"
                          value={role}
                          onChange={handleChange}
                          checked={formData.userRoles.includes(role)}
                          className="mr-2"
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of custom roles</label>
                    <input
                      type="text"
                      name="customRoles"
                      value={formData.customRoles}
                      onChange={handleChange}
                      placeholder="Enter number"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Management</label>
                  <div className="space-y-2">
                    {['JWT', 'Session Cookies', 'Custom Tokens'].map((session) => (
                      <label key={session} className="flex items-center">
                        <input
                          type="radio"
                          name="sessionManagement"
                          value={session}
                          onChange={handleChange}
                          checked={formData.sessionManagement === session}
                          className="mr-2"
                        />
                        {session}
                      </label>
                    ))}
                  </div>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session timeout period</label>
                    <input
                      type="text"
                      name="sessionTimeout"
                      value={formData.sessionTimeout}
                      onChange={handleChange}
                      placeholder="Enter timeout period"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            </Accordion>

            {/* 3. Input Processing */}
            <Accordion
              title="3. Input Processing"
              isCompleted={
                !!formData.inputFields && formData.inputTypes.length > 0
              }
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="inputFields" className="block text-sm font-medium text-gray-700 mb-1">
                    Total number of input fields
                  </label>
                  <input
                    type="text"
                    id="inputFields"
                    name="inputFields"
                    value={formData.inputFields}
                    onChange={handleChange}
                    placeholder="Enter total number of input fields"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Input Types Present</label>
                  <div className="flex flex-col space-y-2">
                    {[
                      "Free text fields",
                      "File uploads",
                      "Rich text editors",
                      "Payment information",
                      "Personal data",
                      "Database queries",
                      "API calls",
                    ].map((inputType) => (
                      <label key={inputType} className="flex items-center">
                        <input
                          type="checkbox"
                          name="inputTypes"
                          value={inputType}
                          onChange={handleChange}
                          checked={formData.inputTypes.includes(inputType)}
                          className="mr-2"
                        />
                        {inputType}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion>

            {/* 4. Data Processing */}
            <Accordion
              title="4. Data Processing"
              isCompleted={
                formData.sensitiveData.length > 0 && formData.dataStorage.length > 0
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sensitive Data Handled</label>
                  <div className="flex flex-col space-y-2">
                    {[
                      "Personal Information",
                      "Financial Data",
                      "Healthcare Information",
                      "Government Data",
                      "Intellectual Property",
                    ].map((dataType) => (
                      <label key={dataType} className="flex items-center">
                        <input
                          type="checkbox"
                          name="sensitiveData"
                          value={dataType}
                          onChange={handleChange}
                          checked={formData.sensitiveData.includes(dataType)}
                          className="mr-2"
                        />
                        {dataType}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Storage</label>
                  <div className="flex flex-col space-y-2">
                    {["Local Database", "Cloud Storage", "Third-party Services", "Distributed Systems"].map(
                      (storageType) => (
                        <label key={storageType} className="flex items-center">
                          <input
                            type="checkbox"
                            name="dataStorage"
                            value={storageType}
                            onChange={handleChange}
                            checked={formData.dataStorage.includes(storageType)}
                            className="mr-2"
                          />
                          {storageType}
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Accordion>

            {/* 5. API Details */}
            <Accordion
              title="5. API Details"
              isCompleted={
                !!formData.apiEndpoints &&
                (formData.apiMethods?.length > 0 || !!formData.rateLimiting || !!formData.documentationAvailable)
              }
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="apiEndpoints" className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Endpoints
                  </label>
                  <input
                    type="text"
                    id="apiEndpoints"
                    name="apiEndpoints"
                    value={formData.apiEndpoints || ''}
                    onChange={handleChange}
                    placeholder="Enter number of endpoints"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Authentication Required</label>
                  <div className="flex space-x-4">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="authenticationRequired"
                          value={option}
                          onChange={handleChange}
                          checked={formData.authenticationRequired === option}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rate Limiting</label>
                  <div className="flex space-x-4">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="rateLimiting"
                          value={option}
                          onChange={handleChange}
                          checked={formData.rateLimiting === option}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Documentation Available</label>
                  <div className="flex space-x-4">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="documentationAvailable"
                          value={option}
                          onChange={handleChange}
                          checked={formData.documentationAvailable === option}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Methods Used</label>
                  <div className="flex flex-col space-y-2">
                    {['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'Other'].map((method) => (
                      <label key={method} className="flex items-center">
                        <input
                          type="checkbox"
                          name="apiMethods"
                          value={method}
                          onChange={handleChange}
                          checked={formData.apiMethods?.includes(method)}
                          className="mr-2"
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion>

            {/* 6. Infrastructure */}
            <Accordion
              title="6. Infrastructure"
              isCompleted={
                formData.securityControls?.length > 0 && !!formData.hosting
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Security Controls Present</label>
                  <div className="flex flex-col space-y-2">
                    {['WAF', 'IPS/IDS', 'Load Balancer', 'Anti-DDoS', 'API Gateway'].map((control) => (
                      <label key={control} className="flex items-center">
                        <input
                          type="checkbox"
                          name="securityControls"
                          value={control}
                          onChange={handleChange}
                          checked={formData.securityControls?.includes(control)}
                          className="mr-2"
                        />
                        {control}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hosting</label>
                  <div className="flex flex-col space-y-2">
                    {['Cloud', 'On-premises', 'Hybrid'].map((hostingType) => (
                      <label key={hostingType} className="flex items-center">
                        <input
                          type="radio"
                          name="hosting"
                          value={hostingType}
                          onChange={handleChange}
                          checked={formData.hosting === hostingType}
                          className="mr-2"
                        />
                        {hostingType}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion>

            {/* 7. Business Logic */}
            <Accordion
              title="7. Business Logic"
              isCompleted={
                formData.criticalFunctions?.length > 0
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Critical Functions</label>
                  <div className="flex flex-col space-y-2">
                    {[
                      'Financial Transactions',
                      'User Data Management',
                      'Administrative Operations',
                      'System Configuration',
                      'Report Generation',
                    ].map((functionality) => (
                      <label key={functionality} className="flex items-center">
                        <input
                          type="checkbox"
                          name="criticalFunctions"
                          value={functionality}
                          onChange={handleChange}
                          checked={formData.criticalFunctions?.includes(functionality)}
                          className="mr-2"
                        />
                        {functionality}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion>

            {/* 8. Security Requirements */}
            <Accordion
              title="8. Security Requirements"
              isCompleted={
                formData.complianceRequirements?.length > 0 ||
                !!formData.lastAssessmentDate ||
                !!formData.knownVulnerabilities
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Compliance Requirements</label>
                  <div className="flex flex-col space-y-2">
                    {[
                      'PCI DSS',
                      'HIPAA',
                      'GDPR',
                      'ISO 27001',
                      'SOC 2',
                      'Other',
                    ].map((requirement) => (
                      <label key={requirement} className="flex items-center">
                        <input
                          type="checkbox"
                          name="complianceRequirements"
                          value={requirement}
                          onChange={handleChange}
                          checked={formData.complianceRequirements?.includes(requirement)}
                          className="mr-2"
                        />
                        {requirement}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="lastAssessmentDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Security Assessment Date
                  </label>
                  <input
                    type="date"
                    id="lastAssessmentDate"
                    name="lastAssessmentDate"
                    value={formData.lastAssessmentDate || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="knownVulnerabilities" className="block text-sm font-medium text-gray-700 mb-1">
                    Known Vulnerabilities
                  </label>
                  <textarea
                    id="knownVulnerabilities"
                    name="knownVulnerabilities"
                    value={formData.knownVulnerabilities || ''}
                    onChange={handleChange}
                    placeholder="List known vulnerabilities"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
              </div>
            </Accordion>
                  
            {/* 9. Testing Constraints */}
            <Accordion
              title="9. Testing Constraints"
              isCompleted={
                formData.timeRestrictions?.length > 0 || formData.testingLimitations?.length > 0
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Restrictions</label>
                  <div className="flex flex-col space-y-2">
                    {[
                      'Business Hours Only',
                      '24/7 Allowed',
                      'Specific Time Window',
                    ].map((restriction) => (
                      <label key={restriction} className="flex items-center">
                        <input
                          type="checkbox"
                          name="timeRestrictions"
                          value={restriction}
                          onChange={handleChange}
                          checked={formData.timeRestrictions?.includes(restriction)}
                          className="mr-2"
                        />
                        {restriction}
                      </label>
                    ))}
                  </div>
                  {formData.timeRestrictions?.includes('Specific Time Window') && (
                    <div className="mt-2">
                      <label htmlFor="specificTimeWindow" className="block text-sm font-medium text-gray-700 mb-1">
                        Specify Time Window
                      </label>
                      <input
                        type="text"
                        id="specificTimeWindow"
                        name="specificTimeWindow"
                        value={formData.specificTimeWindow || ''}
                        onChange={handleChange}
                        placeholder="Enter time window"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Testing Limitations</label>
                  <div className="flex flex-col space-y-2">
                    {[
                      'No Destructive Testing',
                      'No Automated Scanning',
                      'No Performance Testing',
                      'Other',
                    ].map((limitation) => (
                      <label key={limitation} className="flex items-center">
                        <input
                          type="checkbox"
                          name="testingLimitations"
                          value={limitation}
                          onChange={handleChange}
                          checked={formData.testingLimitations?.includes(limitation)}
                          className="mr-2"
                        />
                        {limitation}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion>

            {/* 10. Deliverables */}
            <Accordion
              title="10. Deliverables"
              isCompleted={
                formData.requiredReports?.length > 0 &&
                !!formData.projectStartDate &&
                !!formData.draftReportDue &&
                !!formData.finalReportDue
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Required Reports</label>
                  <div className="flex flex-col space-y-2">
                    {[
                      'Executive Summary',
                      'Technical Details',
                      'Remediation Plan',
                      'Compliance Mapping',
                      'Risk Rating',
                    ].map((report) => (
                      <label key={report} className="flex items-center">
                        <input
                          type="checkbox"
                          name="requiredReports"
                          value={report}
                          onChange={handleChange}
                          checked={formData.requiredReports?.includes(report)}
                          className="mr-2"
                        />
                        {report}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="projectStartDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Start Date
                  </label>
                  <input
                    type="date"
                    id="projectStartDate"
                    name="projectStartDate"
                    value={formData.projectStartDate || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="draftReportDue" className="block text-sm font-medium text-gray-700 mb-1">
                    Draft Report Due
                  </label>
                  <input
                    type="date"
                    id="draftReportDue"
                    name="draftReportDue"
                    value={formData.draftReportDue || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="finalReportDue" className="block text-sm font-medium text-gray-700 mb-1">
                    Final Report Due
                  </label>
                  <input
                    type="date"
                    id="finalReportDue"
                    name="finalReportDue"
                    value={formData.finalReportDue || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </Accordion>

            {/* Notes */}
            <Accordion
              title="Notes"
              isCompleted={!!formData.additionalNotes}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Information
                  </label>
                  <textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={formData.additionalNotes || ''}
                    onChange={handleChange}
                    placeholder="Enter any additional information"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                </div>
              </div>
            </Accordion>

            {/* Sign-off */}
            <Accordion
              title="Sign-off"
              isCompleted={!!formData.clientRepresentative && !!formData.securityAssessor}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="clientRepresentative" className="block text-sm font-medium text-gray-700 mb-1">
                    Client Representative
                  </label>
                  <input
                    type="text"
                    id="clientRepresentative"
                    name="clientRepresentative"
                    value={formData.clientRepresentative || ''}
                    onChange={handleChange}
                    placeholder="Enter client representative"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="clientDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="clientDate"
                    name="clientDate"
                    value={formData.clientDate || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="securityAssessor" className="block text-sm font-medium text-gray-700 mb-1">
                    Security Assessor
                  </label>
                  <input
                    type="text"
                    id="securityAssessor"
                    name="securityAssessor"
                    value={formData.securityAssessor || ''}
                    onChange={handleChange}
                    placeholder="Enter security assessor"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="assessorDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="assessorDate"
                    name="assessorDate"
                    value={formData.assessorDate || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </Accordion>


            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;