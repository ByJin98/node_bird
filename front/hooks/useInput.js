import { useState, useCallback } from 'react';

export default (initalValue) => {
  const [value, setValue] = useState(initalValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return [value, handler, setValue];
};
