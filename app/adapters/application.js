// export { default } from 'ember-data-fixture-adapter';

import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  namespace: 'api/v1'
});