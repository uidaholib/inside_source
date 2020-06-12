
## Javascript apps
The Javascript apps use Yarn worspaces to share code. The apps are built with SvelteJS.
The /apps/packages/shared folder contains the shared code used by other apps in the /apps/packages/.
Following script are used:
1. Development
   - cd into the app folder (example: `cd apps/packages/search` from the root of the repository for the search app.)
   - run `yarn install` to install dependencies (if not done previously)
   - run `yarn dev` to start the local development server
2. Production
   - cd into the /apps folder: `cd /apps/`
   - run `yarn deploy` to build all the apps and copy them to the /src/assets/lib/
