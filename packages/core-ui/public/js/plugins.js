window.plugins = [
  {
    name: 'automations',
    port: 3008,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3008/remoteEntry.js',
      scope: 'automations',
      module: './routes'
    },
    menus: [
      {
        text: 'Automations',
        url: '/automations',
        location: 'mainNavigation',
        icon: 'icon-circular',
        permission: 'showAutomations'
      }
    ]
  },
  {
    name: 'calendar',
    port: 3006,
    exposes: {
      './routes': './src/routes.tsx',
      './settings': './src/Settings.tsx'
    },
    routes: {
      url: 'http://localhost:3006/remoteEntry.js',
      scope: 'calendar',
      module: './routes'
    },
    menus: [
      {
        text: 'Calendar',
        url: '/calendar',
        icon: 'icon-calendar-alt',
        location: 'mainNavigation',
        permission: 'showCalendars'
      },
      {
        text: 'Calendar settings',
        to: '/settings/calendars',
        image: '/images/icons/erxes-21.svg',
        location: 'settings',
        scope: 'calendar',
        action: 'calendarsAll',
        permissions: [
          'calendarsAdd',
          'calendarsEdit',
          'calendarsRemove',
          'showCalendars',
          'showCalendarGroups',
          'calendarGroupsAdd',
          'calendarGroupsEdit',
          'calendarGroupsRemove'
        ]
      }
    ]
  },
  {
    name: 'cards',
    port: 3003,
    exposes: {
      './routes': './src/routes.tsx',
      './settings': './src/Settings.tsx'
    },
    routes: {
      url: 'http://localhost:3003/remoteEntry.js',
      scope: 'cards',
      module: './routes'
    },
    menus: [
      {
        text: 'Sales Pipeline',
        url: '/deal',
        icon: 'icon-piggy-bank',
        location: 'mainNavigation',
        permission: 'showDeals'
      },
      {
        text: 'Task',
        url: '/task',
        icon: 'icon-file-check-alt',
        location: 'mainNavigation',
        permission: 'showConversations'
      },
      {
        text: 'Ticket',
        url: '/ticket/board',
        icon: 'icon-ticket',
        location: 'mainNavigation',
        permission: 'showTickets'
      },
      {
        text: 'Growth Hacking',
        url: '/growthHack',
        icon: 'icon-idea',
        location: 'mainNavigation',
        permission: 'showGrowthHacks'
      },
      {
        text: 'Sales Pipelines',
        to: '/settings/boards/deal',
        image: '/images/icons/erxes-25.png',
        location: 'settings',
        scope: 'cards',
        action: 'dealsAll',
        permissions: [
          'dealBoardsAdd',
          'dealBoardsEdit',
          'dealBoardsRemove',
          'dealPipelinesAdd',
          'dealPipelinesEdit',
          'dealPipelinesUpdateOrder',
          'dealPipelinesRemove',
          'dealPipelinesArchive',
          'dealPipelinesArchive',
          'dealStagesAdd',
          'dealStagesEdit',
          'dealStagesUpdateOrder',
          'dealStagesRemove'
        ]
      },
      {
        text: 'Task Pipelines',
        to: '/settings/boards/task',
        image: '/images/icons/erxes-13.svg',
        location: 'settings',
        scope: 'cards',
        action: 'tasksAll',
        permissions: [
          'taskBoardsAdd',
          'taskBoardsEdit',
          'taskBoardsRemove',
          'taskPipelinesAdd',
          'taskPipelinesEdit',
          'taskPipelinesUpdateOrder',
          'taskPipelinesRemove',
          'taskPipelinesArchive',
          'taskPipelinesCopied',
          'taskStagesAdd',
          'taskStagesEdit',
          'taskStagesUpdateOrder',
          'taskStagesRemove',
          'tasksAll'
        ]
      },
      {
        text: 'Ticket Pipelines',
        to: '/settings/boards/ticket',
        image: '/images/icons/erxes-19.svg',
        location: 'settings',
        scope: 'cards',
        action: 'ticketsAll',
        permissions: [
          'ticketBoardsAdd',
          'ticketBoardsEdit',
          'ticketBoardsRemove',
          'ticketPipelinesAdd',
          'ticketPipelinesEdit',
          'ticketPipelinesUpdateOrder',
          'ticketPipelinesRemove',
          'ticketPipelinesArchive',
          'ticketPipelinesCopied',
          'ticketStagesAdd',
          'ticketStagesEdit',
          'ticketStagesUpdateOrder',
          'ticketStagesRemove'
        ]
      },
      {
        text: 'Growth Hacking Templates',
        to: '/settings/boards/growthHack',
        image: '/images/icons/erxes-12.svg',
        location: 'settings',
        scope: 'cards',
        action: 'growthHacksAll',
        permissions: [
          'growthHackTemplatesAdd',
          'growthHackTemplatesEdit',
          'growthHackTemplatesRemove',
          'growthHackTemplatesDuplicate',
          'showGrowthHackTemplates'
        ]
      }
    ]
  },
  {
    name: 'clientPortal',
    port: 3015,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3015/remoteEntry.js',
      scope: 'clientPortal',
      module: './routes'
    },
    menus: [
      {
        text: 'Client Portal',
        to: '/settings/client-portal',
        image: '/images/icons/erxes-32.png',
        location: 'settings',
        scope: 'clientPortal',
        action: '',
        permissions: []
      }
    ]
  },
  {
    name: 'contacts',
    port: 3011,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3011/remoteEntry.js',
      scope: 'contacts',
      module: './routes'
    },
    menus: [
      {
        text: 'Contacts',
        url: '/contacts/customer',
        icon: 'icon-users',
        location: 'mainNavigation',
        permission: 'showCustomers'
      }
    ]
  },
  {
    name: 'campaigns',
    port: 3001,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3001/remoteEntry.js',
      scope: 'campaigns',
      module: './routes'
    },
    menus: [
      {
        text: 'Campaigns',
        url: '/campaigns',
        icon: 'icon-megaphone',
        location: 'mainNavigation',
        permission: 'showEngagesMessages'
      },
      {
        text: 'Campaigns settings',
        to: '#',
        image: '/images/icons/erxes-31.png',
        location: 'settings',
        scope: 'campaigns',
        action: '',
        permissions: []
      }
    ]
  },
  {
    name: 'inbox',
    port: 3009,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3009/remoteEntry.js',
      scope: 'inbox',
      module: './routes'
    },
    menus: [
      {
        text: 'Team Inbox',
        url: '/inbox',
        icon: 'icon-chat',
        location: 'mainNavigation',
        permission: 'showConversations'
      },
      {
        text: 'Bookings',
        url: '/bookings',
        icon: 'icon-paste',
        location: 'mainNavigation',
        permission: 'showIntegrations'
      },
      {
        text: 'Forms',
        url: '/forms',
        icon: 'icon-laptop',
        location: 'mainNavigation',
        permission: 'showForms'
      },
      {
        text: 'Skills',
        to: '/settings/skills',
        image: '/images/icons/erxes-29.png',
        location: 'settings',
        scope: 'inbox',
        action: 'skillTypesAll',
        permissions: [
          'getSkillTypes',
          'getSkill',
          'getSkills',
          'manageSkills',
          'manageSkillTypes'
        ]
      },
      {
        text: 'Channels',
        to: '/settings/channels',
        image: '/images/icons/erxes-05.svg',
        location: 'settings',
        scope: 'inbox',
        action: 'channelsAll',
        permissions: ['showChannels', 'manageChannels']
      },
      {
        text: 'Integrations',
        to: '/settings/integrations',
        image: '/images/icons/erxes-04.svg',
        location: 'settings',
        scope: 'inbox',
        action: 'integrationsAll',
        permissions: [
          'showIntegrations',
          'integrationsCreateMessengerIntegration',
          'integrationsEditMessengerIntegration',
          'integrationsSaveMessengerAppearanceData',
          'integrationsSaveMessengerConfigs',
          'integrationsCreateLeadIntegration',
          'integrationsEditLeadIntegration',
          'integrationsRemove',
          'integrationsArchive',
          'integrationsEdit'
        ]
      },
      {
        text: 'Responses',
        to: '/settings/response-templates',
        image: '/images/icons/erxes-10.svg',
        location: 'settings',
        scope: 'inbox',
        action: 'responseTemplatesAll',
        permissions: ['manageResponseTemplate', 'showResponseTemplates']
      }
    ]
  },
  {
    name: 'knowledgeBase',
    port: 3004,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3004/remoteEntry.js',
      scope: 'knowledgeBase',
      module: './routes'
    },
    menus: [
      {
        text: 'Knowledge Base',
        url: '/knowledgeBase',
        icon: 'icon-book-open',
        location: 'mainNavigation',
        permission: 'showConversatshowKnowledgeBaseions'
      }
    ]
  },
  {
    name: 'logs',
    port: 3040,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3040/remoteEntry.js',
      scope: 'logs',
      module: './routes'
    },
    menus: [
      {
        text: 'logs',
        to: '/settings/logs',
        image: '/images/icons/erxes-33.png',
        location: 'settings',
        scope: 'logs',
        component: './settings',
        action: '',
        permissions: []
      }
    ]
  },
  {
    name: 'notifications',
    port: 3014,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3014/remoteEntry.js',
      scope: 'notifications',
      module: './routes'
    },
    menus: [
      {
        text: 'notifications',
        url: '/notifications',
        icon: 'icon-book-open',
        location: 'topNavigation'
      }
    ]
  },
  {
    name: 'products',
    port: 3022,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3022/remoteEntry.js',
      scope: 'products',
      module: './routes'
    },
    menus: [
      {
        text: 'Product and services',
        to: '/settings/product-service/',
        image: '/images/icons/erxes-31.png',
        location: 'settings',
        scope: 'products',
        action: 'productsAll',
        permissions: ['showProducts', 'manageProducts']
      }
    ]
  },
  {
    name: 'dashboard',
    port: 3007,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3007/remoteEntry.js',
      scope: 'dashboard',
      module: './routes'
    },
    menus: [
      {
        text: 'Reports',
        url: '/dashboard',
        icon: 'icon-dashboard',
        location: 'mainNavigation',
        permission: 'showDashboards'
      }
    ]
  },
  {
    name: 'segments',
    port: 3013,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3013/remoteEntry.js',
      scope: 'segments',
      module: './routes'
    },
    menus: [
      {
        text: 'Segments',
        url: '/segments/customer',
        icon: 'icon-chart-pie-alt',
        location: 'mainNavigation',
        permission: 'showSegments'
      }
    ]
  },
  {
    name: 'tags',
    port: 3012,
    exposes: { './routes': './src/routes.tsx' },
    routes: {
      url: 'http://localhost:3012/remoteEntry.js',
      scope: 'tags',
      module: './routes'
    },
    menus: [
      {
        text: 'Tags',
        url: '/tags/conversation',
        icon: 'icon-tag-alt',
        location: 'mainNavigation',
        permission: 'showTags'
      }
    ]
  }
];
