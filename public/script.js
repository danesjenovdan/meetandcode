document.addEventListener('DOMContentLoaded', () => {
  const title = document.title;
  const text = document.querySelector('head meta[name="description"]').content;
  const eventDetails = document.querySelector('.js-event-details').innerHTML;

  document.querySelector('#signup-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const form = event.target;
    const button = form.querySelector('button[type="submit"]');

    const eventName = document.body.className;
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const age = form.querySelector('#age').value;

    const data = [
      ['peticija', `meetandcode-${eventName}`],
      ['name', `${name} -- ${age}`],
      ['email', email],
      ['subject', `Prijava na delavnico: ${title}`],
      ['content', `
        Živjo,<br>
        <br>
        potrjujemo tvojo prijavo na Meet and Code dogodek v izvedbi Danes je nov dan. Se vidimo kmalu!<br>
        <br>
        ${title}<br>
        ${eventDetails}<br>
        <br>
        Ekipa Danes je nov dan<br>
      `],
    ]
      .map(entry => `${entry[0]}=${encodeURIComponent(entry[1])}`)
      .join('&');

    button.setAttribute('disabled', true);
    button.className += ' disabled';
    button.textContent = 'Pošiljam ...';

    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
      const res = e.target.response;
      if (res === 'Saved') {
        button.textContent = 'Hvala :)';
      } else {
        // eslint-disable-next-line no-console
        console.log('error', res, e);
        button.textContent = 'Napaka :(';
      }
    };
    xhr.open('POST', 'https://api.djnd.si/sign-mail/', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  });

  // social
  document.querySelector('.js-facebook').addEventListener('click', (event) => {
    event.preventDefault();
    const url = `https://www.facebook.com/dialog/feed?app_id=301375193309601&redirect_uri=${encodeURIComponent(document.location.href)}&link=${encodeURIComponent(document.location.href)}&ref=responsive&name=${encodeURIComponent(title)}`;
    window.open(url, '_blank');
  });
  document.querySelector('.js-twitter').addEventListener('click', (event) => {
    event.preventDefault();
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text} ${document.location.href}`)}`;
    window.open(url, '_blank');
  });
  document.querySelector('.js-email').addEventListener('click', (event) => {
    event.preventDefault();
    const url = `mailto:?subject=${encodeURIComponent(title)}&body=${text} ${encodeURIComponent(document.location.href)}`;
    window.open(url, '_blank');
  });
});
