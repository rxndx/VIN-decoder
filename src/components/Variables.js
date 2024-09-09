import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import '../css/variables.css';
import '../css/vinDecode.css';

const Variables = () => {
    const variables = useSelector((state) => state.variables.list);

    return (
        <div className="input-decode">
            <Link to="/" className="links-item">VIN decode</Link>
            <div className="list-of-variables">
                <ul className="variables-place">
                    {variables.map((item, index) => (
                        <li key={index} className="variables-item">
                            <Link to={`/variables/${item.ID}`}>
                                <strong>{item.Name}</strong>
                            </Link>
                            <p>{item.GroupName}</p>
                            <div dangerouslySetInnerHTML={{__html: item.Description}}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Variables;