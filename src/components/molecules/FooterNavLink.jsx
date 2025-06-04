import React from 'react';

const FooterNavLink = ({ href = '#', children }) => {
  return (
    <li>
      <a href={href} className="hover:text-white transition-colors">
        {children}
      </a>
    </li>
  );
};

export default FooterNavLink;