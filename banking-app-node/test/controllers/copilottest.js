// function that calculates days between two dates
// and returns the result

module.exports = {
  daysBetween: function (startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.abs(end - start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },
};

print(daysBetween("2021-01-01", "2021-01-10"));
