```bash
npm install
npm run start
```

this  app uses amplify datastore but amplify has not been setup (i have commented out `Amplify.configure(awsconfig);`). However there are no warnings logged. this seems to be a bug.