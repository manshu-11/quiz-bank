import React from 'react';
function IncorrectFB({ fData }) {
	console.log("incorrectFB");
	return (
		<div className='wrongFeedback'>
			{
				fData.wrongFbText.map(ele => <p>{ele.text}</p>)
			}
		</div>
	);
}
export default IncorrectFB;
