import * as React from 'react';

export const App = (props:any) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>Questionnaire</h1>
        {props.children}
    </div>
);
