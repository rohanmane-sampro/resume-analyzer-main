

import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
      <img
        src="https://prashantparshuramkar.host20.uk/cv-templates/resume-icon.png"
        alt="Wait a while 😐"
        title='Wait a while 😐. Content is loading'
        className="w-15 h-15 animate-step-rotate"
      />
    </div>
  );
};

export default Loader;