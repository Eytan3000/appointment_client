// // import original module declarations
// import 'styled-components';


// // and extend them!
// declare module 'styled-components' {
//   export interface DefaultTheme {
//     borderRadius: string;


//     colors: {
//       main: string;
//       secondary: string;
//     };
//   }
// }


import {} from 'styled-components';
import { ThemeType } from './theme'; // Import type from above file
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {} // extends the global DefaultTheme with our ThemeType.
}