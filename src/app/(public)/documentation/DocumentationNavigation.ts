import { CreateNavItemType } from '@create/core/CreateNavigation/types/CreateNavItemType';
import createReactLatestVersion from './changelog/constants/createReactLatestVersion';

/**
 * Documentation Navigation — Final Support-Only Version
 */
const DocumentationNavigation: CreateNavItemType = {
  id: 'documentation',
  title: 'Documentation',
  subtitle: 'Everything you need to know about Create',
  icon: 'heroicons-outline:book-open',
  type: 'group',
  children: [
    {
      id: 'changelog',
      title: 'Changelog',
      type: 'item',
      icon: 'heroicons-outline:megaphone',
      url: '/documentation/changelog',
      badge: {
        title: createReactLatestVersion,
        bg: 'rgba(52, 214, 120, 1)',
        fg: '#ffffff',
      },
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      type: 'group',
      icon: 'play_arrow',
      children: [
        {
          id: 'introduction-doc',
          title: 'Introduction',
          type: 'item',
          icon: 'heroicons-outline:play',
          url: '/documentation/getting-started/introduction',
        },
        // Git Repository — REMOVED
      ],
    },
    {
      id: 'development-guide',
      title: 'Development Guide',
      type: 'group',
      icon: 'developer_board',
      children: [
        {
          id: 'installation-doc',
          title: 'Installation',
          type: 'item',
          icon: 'heroicons-outline:code-bracket-square',
          url: '/documentation/getting-started/installation',
        },
        {
          id: 'directory-structure-doc',
          title: 'Directory Structure',
          type: 'item',
          icon: 'heroicons-outline:folder',
          url: '/documentation/development/directory-structure',
        },
        {
          id: 'api-integration-doc',
          title: 'API Integration',
          type: 'collapse',
          icon: 'heroicons-outline:cloud',
          url: '/documentation/development/api-integration',
          children: [
            {
              id: 'api-configuration-doc',
              title: 'API Configuration',
              type: 'item',
              url: '/documentation/development/api-integration/api-configuration',
            },
            {
              id: 'mock-api-doc',
              title: 'Mock API Documentation',
              type: 'item',
              url: '/documentation/development/api-integration/mock-api',
            },
          ],
        },
      ],
    },
    {
      id: 'configuration',
      title: 'Configuration',
      type: 'group',
      icon: 'settings',
      children: [
        {
          id: 'default-settings-doc',
          title: 'Default Settings',
          type: 'item',
          icon: 'heroicons-outline:cog',
          url: '/documentation/configuration/settings',
        },
      ],
    },
    {
      id: 'user-interface',
      title: 'User Interface',
      type: 'group',
      icon: 'palette',
      children: [
        {
          id: 'theme-schemes-doc',
          title: 'Theme Schemes',
          type: 'item',
          icon: 'heroicons-outline:swatch',
          url: '/documentation/user-interface/theme-schemes',
        },
        {
          id: 'rtl-doc',
          title: 'RTL Support',
          type: 'item',
          icon: 'heroicons-outline:language',
          url: '/documentation/user-interface/rtl-support',
        },
      ],
    },
  ],
};

export default DocumentationNavigation;