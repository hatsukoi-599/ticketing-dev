import { Publisher, Subjects, TicketUpdatedEvent } from '@xjtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
