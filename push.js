function confirmAge() {
  document.getElementById('age-confirm').style.display = 'none';

  setTimeout(() => {
    OneSignal.push(function () {
      OneSignal.init({
        appId: "d76d58de-1471-4be3-8afc-08a7143171c0",
        notifyButton: { enable: true }
      });
    });
  }, 5000); // Показывать пуш через 5 секунд
}