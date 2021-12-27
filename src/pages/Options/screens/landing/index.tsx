import React from 'react';
import './styles.css';

/** importing components used in screen */
import Header from "../../components/header"
import WordTable from "../../components/table"
import TraceTable from "../../components/trace"

interface Props { }

/**
 * Settings page landing screen.
 * 
 * Renders the landing page showing configurable options of the extension.
 * 
 * @param {title:string} props 
 * @returns {JSX.Element}
 */
const OptionsPageLandingScreen: React.FC<Props> = () => {
  return <div>
    <Header />
    <WordTable />
    <TraceTable />
  </div>;
};

export default OptionsPageLandingScreen;
