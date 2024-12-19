// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class RunningRealityService {
//   setMapDate(date: string): string {
//     const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d+(BC)?$/;
//     if (!dateRegex.test(date)) {
//       throw new Error('Invalid date format.');
//     }
//     return `Date set to ${date}`;
//   }

//   setMapLocation(lat: number, lng: number, zoom: number): string {
//     if (
//       lat < -90 ||
//       lat > 90 ||
//       lng < -180 ||
//       lng > 180 ||
//       zoom < 1 ||
//       zoom > 20
//     ) {
//       throw new Error('Invalod latitude, longitude, or zoom level.');
//     }
//     return `Location set to latitude ${lat}, longitude ${lng}, zoom level ${zoom}.`;
//   }
// }
