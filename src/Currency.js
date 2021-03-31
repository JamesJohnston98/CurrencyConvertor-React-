import React from 'react'

export default function Currency(props) {
    
    const {
        Currency_opt, 
        selectedCurrency,
        onChange_Currency,
        onChange_Amount,
        amount
    } = props;
    
    return (
        <div>
            <input type="number" className="Num" value={amount} onChange={onChange_Amount}/>
            <select value={selectedCurrency} onChange={onChange_Currency}>
                {
                    //load the currency exchange rates to the select options
                    Currency_opt.map(option => (
                    <option key={option} value={option}>{option}</option>
                    ))}
                
            </select>
        </div>
    )
}
