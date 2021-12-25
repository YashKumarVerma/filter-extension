import React from 'react';
import './styles.css';


interface Props {
  title: string;
}

/**
 * Settings page landing screen.
 * 
 * Renders the landing page showing configurable options of the extension.
 * 
 * @param {title:string} props 
 * @returns {JSX.Element}
 */
const OptionsPageLandingScreen: React.FC<Props> = ({ title }: Props) => {
  return <div className="main-container">{title} Page</div>;
};

export default OptionsPageLandingScreen;
