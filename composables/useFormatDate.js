const useDateFormatter = () => {
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);

  //   const monthNames = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  //   const month = monthNames[date.getMonth()];
  //   const day = date.getDate();
  //   const year = date.getFullYear();

  //   return `${month} ${day}, ${year}`;
  // };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return {
    formatDate,
  };
};

export default useDateFormatter;
