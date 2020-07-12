import { Service, MongooseServiceOptions } from "feathers-mongoose";
import { Types } from "mongoose";
import { Application } from "../../declarations";

const { ObjectId } = Types;

export class Orders extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async dayWiseAnalytics(): Promise<any> {
    const aggregationResult = await this.Model.aggregate([
      {
        $group: {
          _id: {
            day: {
              $dayOfMonth: "$createdAt",
            },
          },
          ordersCount: { $sum: 1 },
          totalPrice: {
            $sum: {
              $multiply: ["$price", "$quantity"],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    return aggregationResult.map((u) => ({
      day: u._id.day,
      ordersCount: u.ordersCount,
      totalPrice: u.totalPrice,
    }));
  }

  async findByCustomer(id: string): Promise<any> {
    return await this.find({
      query: { customer: ObjectId(id) },
      paginate: false,
    });
  }

  async findByCustomerIds(ids: string[]): Promise<Record<string, any>> {
    const customerIdOrdersMap: Record<string, any> = {};
    try {
      const orders = await this.find({
        query: { customer: { $in: ids.map((id) => ObjectId(id)) } },
        paginate: false,
      });
      console.log(ids, orders);
      if (Array.isArray(orders)) {
        orders.forEach((order) => {
          const ordersForCustomerId = customerIdOrdersMap[order.customer] || [];
          ordersForCustomerId.push(order);
          customerIdOrdersMap[order.customer] = ordersForCustomerId;
        });
      }
    } catch {}
    return customerIdOrdersMap;
  }
}
