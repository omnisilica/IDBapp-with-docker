import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useInactivityTimer = (timeout: number = 600000, isActive: boolean): void => { // default to 10 minutes
  const navigate = useNavigate();

  useEffect(() => {

    if (!isActive) {
      return;
    }
    // Define logout function
    const logout = (): void => {
      // Perform logout operations
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem("unLoggedInUser");
  
      alert('You have been logged out due to inactivity.');
      // Redirect to login page
      window.location.href = '/login';
    };

    let timer = setTimeout(logout, timeout);

    // Define function to reset timer
    const resetTimer = (): void => {
      //console.log("Timer reset.");
      clearTimeout(timer);
      timer = setTimeout(logout, timeout);
    };

    // Event listeners to reset the timer on user actions
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    // Cleanup function to remove event listeners and clear timer
    return (): void => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [navigate, timeout, isActive]); // Dependencies

  return;
};

export default useInactivityTimer;
