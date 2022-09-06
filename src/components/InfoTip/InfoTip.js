import React from 'react';

function InfoTip({ isInfoTipShown, messageText }) {
	return (
		<div className="info-tip">
			{isInfoTipShown && (<p className="info-tip__text">{messageText}</p>)}
		</div>
	);
}

export default InfoTip;
