import {z} from 'zod';

const formSchema = z.object({
  businessAge: z.string(),
  businessType: z.string(),
  systemsProcesses: z.object({
    trackingTools: z.string(),
    documentedProcesses: z.string(),
    dataDecisions: z.string(),
  }),
  innovationStrategy: z.object({
    exploreOpportunities: z.string(),
    adaptToChanges: z.string(),
    clearVision: z.string(),
  }),
  finances: z.object({
    cashFlowUnderstanding: z.string(),
    profitability: z.string(),
    emergencyFunds: z.string(),
  }),
  operationalEfficiency: z.object({
    streamlinedOperations: z.string(),
    automationTechnology: z.string(),
    handleDemand: z.string(),
  }),
  marketPresence: z.object({
    targetMarketUnderstanding: z.string(),
    customerBaseGrowth: z.string(),
    repeatBusiness: z.string(),
  }),
  teamLeadership: z.object({
    definedRoles: z.string(),
    teamCommunication: z.string(),
    taskDelegation: z.string(),
  }),
});

export {formSchema}