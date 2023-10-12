export const orchestratorForgotPasswordUrl: string = '/password/reset';
export const email: string = Cypress.env('email');
export const password: string = Cypress.env('password');
export const greenColorRgb: string = 'rgb(24, 182, 150)';
export const apiNotifications: string =
  'https://orchestrator.maphub.it/nova-api/nova-notifications';

export interface ActionUrl {
  remote: boolean;
  url: string;
}

export interface Notification {
  actionText: string;
  actionUrl: ActionUrl;
  component: string;
  created_at: string;
  created_at_friendly: string;
  icon: string;
  iconClass: string;
  id: string;
  message: string;
  openInNewTab: boolean | null;
  read_at: string | null;
  type: string;
  user_id: number;
}
