import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import '../css/vinDecode.css';
import '../css/variables.css';

const OneVariable = () => {
    const { id } = useParams();
    const variables = useSelector((state) => state.variables.list);

    const variable = variables.find(v => v.ID === parseInt(id));

    return (
        <div className="input-decode">
            <div className="links">
                <Link to="/" className="links-item">VIN decode</Link>
                <Link to="/variables" className="links-item">All variables</Link>
            </div>
            <div className="variable-details">
                {variable ? (
                    <div>
                        <h2>{variable.Name}</h2>
                        <p><strong>Group:</strong> {variable.GroupName}</p>
                        <div dangerouslySetInnerHTML={{ __html: variable.Description }} />
                    </div>
                ) : (
                    <p>Variable not found.</p>
                )}
            </div>
        </div>
    );
};

export default OneVariable;
