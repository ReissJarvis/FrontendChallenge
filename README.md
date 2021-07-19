# Frontend Challenge
[![CircleCI](https://circleci.com/gh/ReissJarvis/FrontendChallenge/tree/main.svg?style=svg)](https://circleci.com/gh/ReissJarvis/FrontendChallenge/tree/main)

## Installation and Starting
Before starting: 

```npm install```

Once dependencies have been installed:

```npm start```


## Testing

```npm test```


## CircleCI
This project will CI into GCP when a commit goes to main. The ci config can be found at: `./circleci/config.yaml`


## GCP (Google Cloud Platform) - Cloud deployed

The Client has been deployed in production mode using local-web-server in SPA mode and deployed to a Cloud run Serverless instance in GCP.
This means that the instance will only be billed during its execution time. Due to the low amount of traffic, The service will be more cost-efficient than if it was running 24/7.

The application is fully agnostic and only the CircleCI deployment will need to be modified 

## Bulma CSS
Used for Utility classes and quicker scaffolding of components

Even though CSS Styling have been used for multi select and toggle, implementation has been all my own
