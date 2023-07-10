import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  set(key: string, token: string): void {
    try {
      localStorage.setItem(key, JSON.stringify(token));
    } catch (err) {
      throw new Error('An error occurred while processing your request');
    }
  }
  get(key: string): any {
    try {
      const token = localStorage.getItem(key);
      return JSON.parse(token as string);
    } catch (err) {
      throw new Error('An error occurred while processing your request');
    }
  }
}
