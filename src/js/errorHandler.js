import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ref from './references';

const { catSelector, loaderText } = ref;
export  function fetchError() {
  // catSelector.classList.remove('is-hidden');
  loaderText.classList.replace('loader', 'is-hidden');

  Notify.failure(
      'Oops! Something went wrong!',
    {
      position: 'center-center',
      width: '400px',
      fontSize: '16px',
    }
  );
}