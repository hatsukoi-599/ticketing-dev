import { Subjects, PaymentCreatedEvent, Publisher } from '@xjtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
