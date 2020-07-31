// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDn-zq4-g_orsiseH2-Z2uVOHK-O0AKX0w",
    authDomain: "piqap-b37ac.firebaseapp.com",
    databaseURL: "https://piqap-b37ac.firebaseio.com",
    projectId: "piqap-b37ac",
    storageBucket: "piqap-b37ac.appspot.com",
    messagingSenderId: "37397201954",
    appId: "1:37397201954:web:e8719214520cc4dfd1f67b",
    measurementId: "G-SP1S4R3WQ5"
  },
  onesignal: {
    appId: '',
    googleProjectNumber: '',
    restKey: ''
  },
  stripe: {
    sk: ''
  },
  general: {
    symbol: '$',
    code: 'USD'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
