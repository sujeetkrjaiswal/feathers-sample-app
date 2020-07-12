// Initializes the `analytics` service on path `/analytics`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Analytics } from './analytics.class';
import hooks from './analytics.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'analytics': Analytics & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/analytics', new Analytics(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('analytics');

  service.hooks(hooks);
}
