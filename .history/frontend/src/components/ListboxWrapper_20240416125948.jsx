import React from 'react';
import PropTypes from 'prop-types';

export const ListboxWrapper = ({ children }) => (
  <div className="w-[260px] border-large px-1 py-2 rounded-small border-blue-900">
    {children}
  </div>
);

ListboxWrapper.propTypes = {
  children: PropTypes.node // 'node' covers anything that can be rendered: numbers, strings, elements, or an array (or fragment) containing these types.
};

