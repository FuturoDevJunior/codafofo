import React from 'react';
export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props}>{props.children}</label>;
} 