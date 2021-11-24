import pluginPkg from "../../package.json"
import pluginId from "./pluginId"
import App from "./containers/App"
import Initializer from "./containers/Initializer"
import lifecycles from "./lifecycles"
import trads from "./translations"

export default (strapi) => {
  const pluginDescription =
    pluginPkg.strapi.description || pluginPkg.description
  const icon = pluginPkg.strapi.icon
  const name = pluginPkg.strapi.name

  const menuSection = {
    // Unique id of the section
    id: pluginId,
    // Title of Menu section using i18n
    title: {
      id: `${pluginId}.id`,
      defaultMessage: "Super cool setting"
    },
    // Array of links to be displayed
    links: [
      // {
      //   // Using string
      //   title: "Setting page 1",
      //   to: `${strapi.settingsBaseURL}/${pluginId}`,
      //   name: "setting1",
      //   permissions: [{ action: "plugins::my-plugin.action-name", subject: null }] // This key is not mandatory it can be null, undefined or an empty array
      // },
      {
        // Using i18n with a corresponding translation key
        title: {
          id: `${pluginId}.test`,
          defaultMessage: "Setting page 2"
        },
        to: `${strapi.settingsBaseURL}/${pluginId}/test`,
        name: "test",
        // Define a specific component if needed:
        Component: () => <div />
      }
    ]
  }

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    mainComponent: App,
    name,
    preventComponentRendering: false,
    trads,
    menu: {
      pluginsSectionLinks: [
        {
          destination: `/plugins/${pluginId}`,
          icon,
          label: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: name
          },
          name,
          permissions: [
            // Uncomment to set the permissions of the plugin here
            // {
            //   action: '', // the action name should be plugins::plugin-name.actionType
            //   subject: null,
            // },
          ]
        }
      ]
    },
    settings: {
      menuSection
    }
  }

  return strapi.registerPlugin(plugin)
}
