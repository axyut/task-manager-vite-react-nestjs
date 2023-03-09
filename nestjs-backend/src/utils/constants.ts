export const Constants = {
  ROLES: {
    root: 'ADMIN',
    normal: 'NORMAL',
    guest: 'GUEST',
  },
  // don't check for jwt validation to these endpoints
  BYPASS_URLS: ['/auth/login', '/user/signUp'],
};
