import * as authentication from '@feathersjs/authentication';
import {HookContext} from '@feathersjs/feathers'
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      async (context: HookContext): Promise<void> => {
        try {
          const customerIds = context.result.data.map((u: any) => u._id);
          const customerIdOrdersMap = await context.app
            .service('orders')
            .findByCustomerIds(customerIds);
          context.result.data.forEach((entry: any) => {
            entry.orders = customerIdOrdersMap[entry._id] || [];
          });
        } catch (e) {
          console.log(e);
        }
      },
    ],
    get: [
      async (context: HookContext): Promise<void> => {
        try {
          console.log(context.result._id);
          const orders = await context.app
            .service('orders')
            .findByCustomer(context.result._id);
          context.result.orders = orders;
        } catch (e) {
          console.error(e);
          context.result.orders = [];
        }
      },
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
