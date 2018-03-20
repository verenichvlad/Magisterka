//
// COWNER
//
export const cownerMenu = {
  profile: {
    title: 'My profile',
    pathname: '/cowner/account',
    icon: 'fa fa-user-circle',
    anchors: [{
      title: 'Profile and contact',
      anchor: '#profile',
    }, {
      title: 'Notifications',
      anchor: '#notifications',
    }, {
      title: 'Billing',
      anchor: '#pricebox',
    }],
  },
  orders: {
    title: 'Orders',
    pathname: '/cowner/orders',
    icon: 'fa fa-paper-plane',
    anchors: [{
      title: 'Cars and orders',
      anchor: '#orders',
    }, {
      title: 'Evaluations',
      anchor: '#evaulations',
    }],
  },
  support: {
    title: 'Info',
    pathname: '/cowner/support',
    icon: 'fa fa-wrench',
    anchors: [{
      title: 'Info',
      anchor: '#qa',
    }],
  },
};

//
// TSTATION
//
export const tstationMenu = {
  account: {
    title: 'Account setup',
    pathname: '/tstation/account',
    icon: 'fa fa-user-circle',
    anchors: [{
      title: 'Profile and contacts',
      anchor: '#profile',
    }, {
      title: 'Notification settings',
      anchor: '#notifications',
    }, {
      title: 'Billing',
      anchor: '#pricebox',
    }],
  },
  profile: {
    title: 'Station Profile',
    pathname: '/tstation/profile',
    icon: 'fa fa-sticky-note',
    anchors: [{
      title: 'Rating',
      anchor: '#rate',
    }, {
      title: 'Profile info',
      anchor: '#profileInfo',
    }, {
      title: 'Verification',
      anchor: '#verification',
    }],
  },
  orders: {
    title: 'Orders for evaluation',
    pathname: '/tstation/orders',
    icon: 'fa fa-paper-plane',
    anchors: [{
      title: 'Filtr',
      anchor: '#filtr',
    }, {
      title: 'Orders',
      anchor: '#orders',
    }],
  },
  clients: {
    title: 'Clients',
    pathname: '/tstation/clients',
    icon: 'fa fa-users',
    anchors: [{
      title: 'Check-ins',
      anchor: '#list',
    }],
  },
};
