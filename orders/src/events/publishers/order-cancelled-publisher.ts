import { Publisher, OrderCancelledEvent, Subjects } from '@xjtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
