/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RSVPData {
  name: string;
  email: string;
  attending: boolean;
  guests: number;
  dietaryRestrictions?: string;
  message?: string;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
}

export interface PetalInstance {
  id: number;
  left: string;
  size: number;
  delay: string;
  duration: string;
  rotation: number;
}

export interface WeddingInfo {
  date: string;
  formattedDate: string;
  time: string;
  locationName: string;
  address: string;
  googleMapsUrl: string;
}
