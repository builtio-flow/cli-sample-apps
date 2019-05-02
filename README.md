# Sample Connector Apps

> Repository contains getting started apps which are ready to deploy on environment.


 - **Connector with Action & Connection**
 - Connectors: *Pipedrive, Contentstack*
 - Features: Custom connection with ```oneof``` jsonschema type in contentstack and using pipedrive available connection webmethods.io platform
 
 - **Connector with Action & OAuth1**
 - Connectors: *Trello*
 - Features: Contains lot of trello actions/triggers which are ready to deploy
 
 
 - **Connector with Action & OAuth2**
 - Connectors: *Todoist*
 - Features: Action using todoist oauth2 you may have to register oauth and place values for clientId and secret in oauth.json file and run ```wmio oauth deploy``` command to deploy oauth before or after connector deployment
 
 
 - **Lookup**
 - Connectors: *Smartsheet*
 - Features: Action having lookup with pagination feature.
 
 - **Dynamic Form**
 - Connectors: *Excelonline*
 - Features: Custom lookup response on basis of data in users sheet and dynamically form creation on the basis of response schema
 
 - **Complex Input Schema **
 - Connectors:  *Contentstack*
 - Features: Contains complex input schema for form designing in ui
 
 - **Trigger**
 - Polling : *Gmail*
 - Webhook: *Wunderlist*
 - Hybrid (Polling + Webhook): *Box*  


### Usage

 1. cd project
 2. npm install --production
 3. wmio login  // required if not logged in webmethods.io
 4. wmio deploy
 5. wmio oauth deploy // incase of custom oauth exist i.e oauth.json file exist

[Contact](mailto:kailash.yogeshwar@softwareag.com)
Thank you. Happy Coding :smile:

