export const reduceFunc = (x, y) => {
  const cpy = "fieldName" in x ? { [x.fieldName]: x.initialValue } : { ...x };
  return { ...cpy, [y.fieldName]: y.initialValue };
};

export const fieldsToInitialValues = fields => {
  if (fields.length === 1) {
    return {
      [`${fields[0].fieldName}`]: fields[0].initialValue
    };
  }

  return fields.reduce(reduceFunc);
};
