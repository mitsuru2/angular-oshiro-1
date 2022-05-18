// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { TLogLevel } from 'src/app/log-level'

export const environment = {
  firebase: {
    projectId: 'angular-oshiro-1-4497a',
    appId: '1:900987277035:web:d18e94c579a6f896ca78ae',
    storageBucket: 'angular-oshiro-1-4497a.appspot.com',
    locationId: 'asia-northeast1',
    apiKey: 'AIzaSyC08vdvywFRwH03uO8OaIM3k-blAfB8HWI',
    authDomain: 'angular-oshiro-1-4497a.firebaseapp.com',
    messagingSenderId: '900987277035',
    measurementId: 'G-MH1VESMFZY'
  },
  production: false,
  logLevel: TLogLevel.Debug
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
