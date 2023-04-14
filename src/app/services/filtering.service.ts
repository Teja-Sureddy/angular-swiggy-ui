import { Injectable } from '@angular/core';
import { EventFilter } from '../models/filters/eventFilters.models';
import { Params } from '../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {

  constructor() { }

  filterLazyLoadEvent(event: EventFilter) {
    let page: number = (event.first / event.rows) + 1
    let params: Params[] = [{ key: 'page', value: String(page) }]

    Object.entries(event.filters).forEach(([key, value]) => {
      if (value[0].value != null) {
        switch (value[0].matchMode) {
          case "startsWith": {
            params.push({ key: key + '__istartswith', value: value[0].value })
            break;
          }
          case "contains": {
            params.push({ key: key + '__icontains', value: value[0].value })
            break;
          }
          case "equals": {
            params.push({ key: key, value: value[0].value })
            break;
          }
          case "between": {
            params.push({ key: key + '__range', value: value[0].value })
            break;
          }
          case "dateAfter": {
            params.push({ key: key + '__gte', value: value[0].value.toISOString() })
            break;
          }
          case "dateBefore": {
            params.push({ key: key + '__lte', value: value[0].value.toISOString() })
            break;
          }
        }
      }
    })

    if (event.sortField) {
      params.push({ key: 'ordering', value: (event.sortOrder === 1 ? '-' : '') + event.sortField })
    }

    return params;
  }
}
