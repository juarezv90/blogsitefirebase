const postDate = (postData) => {
  let date = postData?.date.toDate();
  date =
    date?.getMonth() + 1 + "/" + date?.getDate() + "/" + date?.getFullYear();

  return date;
};

const getDate = () => {
  let todayDate = new Date(Date.now());
  todayDate =
    "Posted " +
    todayDate.toLocaleDateString("en-US") +
    " at " +
    todayDate.toLocaleTimeString("en-US");
  return todayDate;
};

module.exports = { postDate, getDate };
