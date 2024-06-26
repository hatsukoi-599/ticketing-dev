import { Publisher, OrderCreatedEvent, Subjects } from '@xjtickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
