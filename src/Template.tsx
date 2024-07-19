import React from "https://esm.sh/react@18.2.0";
import './Template.css';

export const Template = ({ imageUrl }: { imageUrl: string }) => (
  <div className="template-container">
    <img src={imageUrl} alt="base image" className="template-image" />
    <div className="template-overlay">
      <p className="template-text">LGTM</p>
    </div>
  </div>
);
