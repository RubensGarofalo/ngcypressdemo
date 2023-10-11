export const orchestratorUrl: string = 'https://orchestrator.maphub.it';
export const orchestratorForgotPasswordUrl: string = '/password/reset';
export const email: string = Cypress.env('email');
export const password: string = Cypress.env('password');
export const greenColorRgb: string = 'rgb(24, 182, 155)';
export const apiNotifications: string =
  'https://orchestrator.maphub.it/nova-api/nova-notifications';

export const mockedApiNotifications = {
  notifications: [
    {
      id: '9a1d5a0e-6201-4c10-8392-d72a0d8dc333',
      user_id: 104,
      component: 'message-notification',
      actionText: 'View Epic',
      message: 'New Epic e2e_test has been assigned to you',
    },
    {
      id: '9a1b8181-eea9-4933-96a5-c304d42f0729',
      user_id: 104,
      component: 'message-notification',
      actionText: 'View Epic',
      message: 'Your Epic revision_interfaces has been marked as done',
    },
    {
      id: 'New Epic revision_interfaces has been assigned to you',
      user_id: 104,
      component: 'message-notification',
      actionText: 'View Epic',
      message: 'New Epic revision_interfaces has been assigned to you',
    },
  ],
};
