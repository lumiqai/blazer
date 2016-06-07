// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//
//= require ./core
//= require action_cable

var runCount = 0;

function runQuery(data, success, failure) {
  var cable = ActionCable.createConsumer();
  runCount++;

  // fix for ignoring namespaces https://github.com/rails/rails/pull/25240
  var sub = cable.subscriptions.create({channel: "Blazer::QueriesChannel", topic: window.randomTopic + ":run" + runCount}, {
    connected: function () {
      sub.run(data);
    },
    received: function (data) {
      // console.log(data);
      if (data.error) {
        failure(data.error);
      } else {
        success(data.data);
      }
      cable.disconnect();
    },
    run: function(data) {
      this.perform("run", data);
    }
  });

  sub.run(data);
}