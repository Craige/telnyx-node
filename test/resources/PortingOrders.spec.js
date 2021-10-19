'use strict';

var utils = require('../../testUtils');
var telnyx = utils.getTelnyxMock();
var expect = require('chai').expect;

var TEST_AUTH_KEY = utils.getUserTelnyxKey();

describe('PortingOrders Resource', function() {
  function responseFn(response) {
    expect(response.data).to.have.property('activation_settings');
    expect(response.data).to.have.property('end_user');
    expect(response.data).to.have.property('phone_number_configuration');
    expect(response.data).to.include({record_type: 'porting_order'});
  }

  function listResponseFn(response) {
    return responseFn({data: response.data[0]});
  }

  const newPortingOrderParams = {
    phone_numbers: ['+15555555555', '+16666666667']
  };

  describe('list', function() {
    it('Sends the correct request', function() {
      return telnyx.portingOrders.list()
        .then(listResponseFn);
    });

    it('Sends the correct request [with specified auth]', function() {
      return telnyx.portingOrders.list()
        .then(listResponseFn);
    });
  });

  describe('create', function() {
    it('Sends the correct request', function() {
      return telnyx.portingOrders.create(newPortingOrderParams).then(listResponseFn);
    })

    it('Sends the correct request [with specified auth]', function() {
      return telnyx.portingOrders.create(newPortingOrderParams, TEST_AUTH_KEY)
        .then(listResponseFn);
    });
  });

  describe('retrieve', function() {
    it('Sends the correct request', function() {
      return telnyx.portingOrders.retrieve('id').then(responseFn);
    })

    it('Sends the correct request [with specified auth]', function() {
      return telnyx.portingOrders.retrieve('id', TEST_AUTH_KEY)
        .then(responseFn);
    });
  });

  describe('listExceptionTypes', function() {
    function responseFn(response) {
      expect(response.data[0]).to.have.property('code');
      expect(response.data[0]).to.have.property('description');
    }

    it('Sends the correct request', function() {
      return telnyx.portingOrders.listExceptionTypes().then(responseFn);
    })

    it('Sends the correct request [with specified auth]', function() {
      return telnyx.portingOrders.listExceptionTypes(TEST_AUTH_KEY)
        .then(responseFn);
    });
  });

  describe('listActivationJobs', function() {
    function responseFn(response) {
      expect(response.data[0]).to.have.property('id');
      expect(response.data[0]).to.have.property('status');
      expect(response.data[0]).to.have.include({record_type: 'porting_activation_job'});
    }

    it('Sends the correct request', function() {
      return telnyx.portingOrders.listActivationJobs('123').then(responseFn);
    })

    it('Sends the correct request [with specified auth]', function() {
      return telnyx.portingOrders.listActivationJobs('123', TEST_AUTH_KEY)
        .then(responseFn);
    });
  });

  describe('cancelOrder', function() {
    it('Sends the correct request', function() {
      return telnyx.portingOrders.cancelOrder('123').then(responseFn);
    })
  });

  describe('listAllowedFocWindows', function() {
    function responseFn(response) {
      expect(response.data[0]).to.have.property('started_at');
      expect(response.data[0]).to.have.property('ended_at');
      expect(response.data[0]).to.have.include({record_type: 'porting_order'});
    }

    it('Sends the correct request', function() {
      return telnyx.portingOrders.listAllowedFocWindows('123').then(responseFn);
    });
  });

  describe('retrieveLoaTemplate', function() {
    function responseFn(response) {
      expect(response.data).to.not.be.null
    }

    it('Sends the correct request', function() {
      return telnyx.portingOrders.retrieveLoaTemplate('id').then(responseFn);
    });

    it('Sends the correct request [with specified auth]', function() {
      return telnyx.portingOrders.retrieveLoaTemplate('id', TEST_AUTH_KEY)
        .then(responseFn);
    });
  });

  describe('confirmOrder', function() {
    it('Sends the correct request', function() {
      return telnyx.portingOrders.confirmOrder('id').then(responseFn);
    })

    it('Sends the correct request [with specified auth]', function() {
      return telnyx.portingOrders.confirmOrder('id', TEST_AUTH_KEY)
        .then(responseFn);
    });
  });

  describe('update', function() {
    const INVOICE_ID = '35146afd-df93-4963-b1e9-1a085e2ae875';

    it('Sends the correct request', function() {
      return telnyx.portingOrders.create(newPortingOrderParams)
        .then(function(response) {
          const po = response.data;
          return po.update({documents: {invoice: INVOICE_ID}})
            .then(responseFn);
        })
    });
    it('Sends the correct request [with specified auth]', function() {
      return telnyx.portingOrders.retrieve('id')
        .then(function(response) {
          const po = response.data;
          return po.update({documents: {invoice: INVOICE_ID}}, TEST_AUTH_KEY)
            .then(responseFn);
        })
    });
  });

  describe.skip('del', function() {
    it('Sends the correct request', function() {
      return telnyx.portingOrders.create(newPortingOrderParams)
        .then(function(response) {
          const po = response.data;
          return po.del()
            .then(responseFn);
        })
    });
    it('Sends the correct request [with specified auth]', function() {
      return telnyx.portingOrders.retrieve('id')
        .then(function(response) {
          const po = response.data;
          return po.del(TEST_AUTH_KEY)
            .then(responseFn);
        })
    });
  });
});