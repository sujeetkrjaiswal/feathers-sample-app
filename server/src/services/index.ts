import { Application } from '../declarations';
import users from './users/users.service';
import customers from './customers/customers.service';
import orders from './orders/orders.service';
import analytics from './analytics/analytics.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(customers);
  app.configure(orders);
  app.configure(analytics);
}
