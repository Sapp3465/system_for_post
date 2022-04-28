import { Injectable } from '@angular/core';

export type PlatformType = 'desktop' | 'tablet' | 'mobile';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  public get platform(): PlatformType {
    const size = window.innerWidth;
    if(size <= 720 && size > 320) return 'tablet';
    if(size <= 320) return 'mobile';
    return 'desktop';
  }
}
