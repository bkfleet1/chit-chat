module.exports = {
  format_date: (date) => {
    let todayDate = new Date();
    let dd = todayDate.getDate();
    let mm = todayDate.getMonth() + 1;
    const yyyy = todayDate.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }
    todayDate = `${mm}-${dd}-${yyyy}`;
    todayDate = `${mm}/${dd}/${yyyy}`;
    todayDate = `${dd}-${mm}-${yyyy}`;
    todayDate = `${dd}/${mm}/${yyyy}`;
    return todayDate;
  },
  format_url: (url) => {
    return url
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/")[0]
      .split("?")[0];
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
};
