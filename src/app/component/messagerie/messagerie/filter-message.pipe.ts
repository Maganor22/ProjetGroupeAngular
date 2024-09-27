import { Pipe, PipeTransform } from '@angular/core';

interface GroupedMessages {
  user: string;
  messages: any[];
}

@Pipe({
  name: 'filterMessages',
  standalone: true
})
export class FilterMessagesPipe implements PipeTransform {
  transform(groupedMessages: GroupedMessages[], selectedUser: string): GroupedMessages | null {
    if (!groupedMessages || !selectedUser) {
      return null;
    }
    return groupedMessages.find(group => group.user === selectedUser) || null;
  }
}