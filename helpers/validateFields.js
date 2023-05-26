const validateFields = (fields) => {
    for (const field in fields) {
      if (!fields[field]) {
        return field;
      }
    }
    return null;
  };

  module.exports = { validateFields };
  