import React, { Suspense } from 'react';

const templateContext = require.context('./Templates', false, /\.jsx$/);

const templates = templateContext.keys().reduce((acc, key) => {
  const templateName = key.match(/\.\/(.*)\.jsx$/)[1];
  acc[templateName] = React.lazy(() => import(`./Templates/${templateName}`));
  return acc;
}, {});

const BirthdayTemplate = ({ name, nickname, description1, description2, templateType, photos }) => {
  const TemplateComponent = templates[templateType];

  if (!TemplateComponent) {
    return <div>Invalid template type selected.</div>;
  }

  return (
    <Suspense fallback={<div>Loading template...</div>}>
      <TemplateComponent
        name={name}
        nickname={nickname}
        description1={description1}
        description2={description2}
        photos={photos}
      />
    </Suspense>
  );
};

export default BirthdayTemplate;
