import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { variablesSlice, vinSlice } from "../store/store";
import { Link } from "react-router-dom";
import '../css/vinDecode.css';

const VinDecode = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState('');
    const [vinInput, setVinInput] = useState('');
    const [history, setHistory] = useState([]);

    const vin = useSelector((state) => state.vin.list);
    const variables = useSelector((state) => state.variables.list);

    useEffect(() => {
        dispatch(variablesSlice.fetchItems())
    }, [dispatch])

    const validateVin = (vin) => {
        if (!vin) return "The VIN cannot be empty.";
        if (vin.length > 17) return "The VIN code must not exceed 17 characters.";
        if (!/^[A-Za-z0-9]+$/.test(vin)) return "The VIN code can only contain letters and numbers";
        return null;
    };

    const getVin = async() => {
        const validationError = validateVin(vinInput);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError('');

        try {
            await dispatch(vinSlice.fetchOneItem(vinInput));

            setHistory((prevHistory) => {
                if (prevHistory.includes(vinInput)) return prevHistory;
                return [vinInput, ...prevHistory.slice(0, 4)];
            })
        } catch (e) {
            setError('Error when requesting data: ' + e.message);
        }
    }

    const getVariableDescription = (variableId) => {
        const variable = variables.find(v => v.ID === variableId);
        return variable ? variable.Description : "No description available";
    }

    const filteredResults = vin.filter(result =>
        result.Value?.trim() &&
        result.Value.trim() !== "0" &&
        !["Error Text", "Error Code"].includes(result.Variable.trim())
    );

    return (
        <div className='input-decode'>
            <Link to="/variables" className="links-item">All variables</Link>
            <div className='input-decode-info'>
                <input
                    type="text"
                    placeholder="Enter VIN-code"
                    value={vinInput}
                    onChange={(e) => setVinInput(e.target.value)}
                    list="vin-history"
                />
                <datalist id="vin-history">
                    {history.slice(0, 3).map((item, index) => (
                        <option key={index} value={item}/>
                    ))}
                </datalist>
                <button type="button" onClick={getVin}>Search</button>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className='history'>
                <h3>History of requesting:</h3>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className='Result'>
                <h3>Results of decoding: </h3>
                <ul>
                    {filteredResults.map((result, index) => {
                        const description = getVariableDescription(result.VariableId);
                        return (
                            <li key={index}>
                                <strong>{result.Variable}:</strong> {result.Value}
                                <div dangerouslySetInnerHTML={{__html: description}}/>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default VinDecode;