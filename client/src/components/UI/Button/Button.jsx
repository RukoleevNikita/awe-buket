import React from 'react';

export const Button = ({children, onClick = () => {}, disabled = false, className=''}) => {
  return (
    <button type="button" variant="success" disabled={disabled} onClick={onClick} className={className}>{children}</button> 
  );
};
