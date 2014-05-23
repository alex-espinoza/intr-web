var User = DS.Model.extend({
  email: DS.attr('string')
});

// User.reopenClass({
//   FIXTURES: [
//     { id: 1, email: "test1@cool.com" },
//     { id: 2, email: "test2@wow.com" },
//     { id: 3, email: "test3@nice.com" }
//   ]
// });

DS.RESTAdapter.reopen({
  namespace: 'api/v1'
});

export default User;
