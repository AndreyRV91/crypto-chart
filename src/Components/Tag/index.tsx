import React from 'react';
import { TagType } from './types';
import './style.scss';
interface TagProps {
  tag: TagType;
  onToggle: (tagName: string) => void;
}
const Tag = ({ tag, onToggle }: TagProps) => {
  return (
    <span className='Tag'>
      <span className='Tag__name'>{tag.name}</span>
      <button className='Tag__btn' onPointerDown={() => onToggle(tag.name)} />
    </span>
  );
};

export { Tag };
