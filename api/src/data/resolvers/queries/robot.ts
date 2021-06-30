import { RobotEntries } from '../../../db/models';
import { IUserDocument } from '../../../db/models/definitions/users';
import { OnboardingHistories } from '../../../db/models/Robot';
import { moduleObjects } from '../../permissions/actions/permission';
import { getUserAllowedActions, IModuleMap } from '../../permissions/utils';
import { moduleRequireLogin } from '../../permissions/wrappers';
import { IContext } from '../../types';

const features: {
  [key: string]: { settings: string[]; settingsPermissions: string[] };
} = {
  generalSettings: {
    settings: [
      'generalSettingsCreate',
      'generalSettingsUploadCreate',
      'generelSettingsConstantsCreate'
    ],
    settingsPermissions: ['showGeneralSettings', 'manageGeneralSettings']
  },

  channelBrands: {
    settings: ['brandCreate', 'channelCreate'],
    settingsPermissions: ['brandCreate', 'channelCreate']
  },

  integrationOtherApps: {
    settings: ['integrationsCreate', 'connectIntegrationsToChannel'],
    settingsPermissions: [
      'integrationsCreateMessengerIntegration',
      'manageChannels'
    ]
  },

  customizeDatabase: {
    settings: ['fieldGroupCreate', 'fieldCreate'],
    settingsPermissions: ['manageForms']
  },

  importExistingContacts: {
    settings: [
      'fieldGroupCreate',
      'fieldCreate',
      'importPrepareFiles',
      'importDownloadTemplate',
      'importEnterData',
      'importCreate'
    ],
    settingsPermissions: ['manageForms', 'importHistories']
  },

  inviteTeamMembers: {
    settings: ['permissionGroupCreate', 'usersInvite', 'userEdit'],
    settingsPermissions: ['manageForms', 'usersInvite', 'usersEdit']
  },

  salesPipeline: {
    settings: ['dealBoardCreate', 'dealPipelineCreate', 'dealStageCreate'],
    settingsPermissions: ['dealBoardsAdd', 'dealPipelinesAdd']
  },

  createProductServices: {
    settings: ['productCategoryCreate', 'productCreate'],
    settingsPermissions: ['manageProducts']
  },

  customizeTickets: {
    settings: [
      'ticketBoardCreate',
      'ticketPipelineCreate',
      'ticketStageCreate'
    ],
    settingsPermissions: ['ticketBoardsAdd', 'ticketPipelinesAdd']
  },

  customizeTasks: {
    settings: ['taskBoardCreate', 'taskPipelineCreate', 'taskStageCreate'],
    settingsPermissions: ['taskBoardsAdd', 'taskPipelinesAdd']
  },

  customizeGrowthHacking: {
    settings: ['growthHackingTemplateCreate', 'growthHackingStageCreate'],
    settingsPermissions: ['growthHackStagesAdd', 'growthHackTemplatesAdd']
  },

  customizeSegmentation: {
    settings: ['segmentFamliarize', 'segmentCreate', 'subSegmentCreate'],
    settingsPermissions: ['manageSegments']
  },

  prepareMailResponseTemplates: {
    settings: ['createResponseTemplate', 'createEmailTemplate'],
    settingsPermissions: ['manageEmailTemplate']
  },

  automateCampaigns: {
    settings: [
      'createCampaign',
      'chooseCampaignChannel',
      'chooseRecipientsChannel',
      'composeCampaign'
    ],
    settingsPermissions: ['engageMessageAdd']
  },

  customizeKnowledgeBase: {
    settings: ['createForm', 'createCategoryForm', 'createArticleForm'],
    settingsPermissions: ['manageKnowledgeBase']
  }
};

const checkShowModule = (
  user: IUserDocument,
  actionsMap,
  moduleName: string
): { showModule: boolean; showSettings: boolean } => {
  if (user.isOwner) {
    return {
      showModule: true,
      showSettings: true
    };
  }

  const module: IModuleMap = moduleObjects[moduleName];

  interface IAction {
    name: string;
    description?: string;
  }

  let actions: IAction[] = [];
  let showModule = false;
  let showSettings = true;

  if (!module) {
    if (moduleName === 'leads') {
      actions = [{ name: 'integrationsCreateLeadIntegration' }];
    }

    if (moduleName === 'properties') {
      actions = [{ name: 'manageForms' }];
    }
  } else {
    actions = module.actions as IAction[];
  }

  for (const action of actions) {
    if (actionsMap.includes(action.name || '')) {
      showModule = true;
      break;
    }
  }

  for (const permission of features[moduleName].settingsPermissions) {
    if (!actionsMap.includes(permission)) {
      showSettings = false;
      break;
    }
  }

  return {
    showModule,
    showSettings
  };
};

const robotQueries = {
  robotEntries(
    _root,
    {
      isNotified,
      action,
      parentId
    }: { isNotified: boolean; action: string; parentId: string }
  ) {
    const selector: any = { parentId, action };

    if (typeof isNotified !== 'undefined') {
      selector.isNotified = isNotified;
    }

    return RobotEntries.find(selector);
  },

  onboardingStepsCompleteness(
    _root,
    { steps }: { steps: string[] },
    { user }: IContext
  ) {
    return OnboardingHistories.stepsCompletness(steps, user);
  },

  async onboardingGetAvailableFeatures(_root, _args, { user }: IContext) {
    const results: Array<{
      name: string;
      isComplete: boolean;
      settings?: string[];
      showSettings?: boolean;
    }> = [];
    const actionsMap = await getUserAllowedActions(user);

    for (const feature of Object.keys(features)) {
      const { settings } = features[feature];
      const { showModule, showSettings } = checkShowModule(
        user,
        actionsMap,
        feature
      );

      if (showModule) {
        let steps: string[] = [];

        if (showSettings) {
          steps = [...steps, ...settings];
        }

        const selector = { userId: user._id, completedSteps: { $all: steps } };

        results.push({
          name: feature,
          settings,
          showSettings,
          isComplete:
            (await OnboardingHistories.find(selector).countDocuments()) > 0
        });
      }
    }

    return results;
  }
};

moduleRequireLogin(robotQueries);

export default robotQueries;
