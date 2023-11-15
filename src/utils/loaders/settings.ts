import { redirect } from 'react-router-dom';
import { checkAuthLoader } from './auth';

export async function checkSettingsMainLoader() {
  const response = await checkAuthLoader();

  if (response instanceof Response) {
    return response;
  } else {
    const isAuthenticated = response;
    if (isAuthenticated) {
      const pathName = window.document.location.pathname;
      if (pathName === '/settings'){
        return redirect('/settings/profile')
      }
    }

    return response;
  }
}
