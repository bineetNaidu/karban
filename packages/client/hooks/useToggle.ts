import { useState } from 'react';

const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [open, setOpen] = useState(initialValue);

  const toggle = () => setOpen((prevState) => !prevState);

  return [open, toggle];
};

export default useToggle;
