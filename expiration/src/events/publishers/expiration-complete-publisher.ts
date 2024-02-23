import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@xjtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
