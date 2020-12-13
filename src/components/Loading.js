import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <>
    <br /><br /><br /><br /><br /><br /><br />
    <center>
    <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />
    </center>
    </>
);
 
export default Loading;