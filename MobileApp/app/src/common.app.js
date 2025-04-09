export const errorUtils = {
  getError: (error) => {
    let e = error;
    if (error.response) {
      e = error.response.data;
      if (error.response.data && error.response.data.error) {
        e = error.response.data.error;
      }
    } else if (error.message) {
      e = error.message;
    } else {
      e = 'Unknown error occured';
    }
    return e;
  },
};
