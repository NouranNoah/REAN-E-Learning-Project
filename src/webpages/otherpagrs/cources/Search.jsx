import PropTypes from "prop-types";
import { useState } from "react";
import "./Courses.css";

export default function Search({  handleSearch, handleprice }) {
    const [localSearchTerm, setLocalSearchTerm] = useState("");

    function handlesearch(e) {
        e.preventDefault();
        handleSearch(localSearchTerm);
    }

    function handleSelectChange(e) {
        const selectedTerm = e.target.value;
        setLocalSearchTerm(selectedTerm)
        handleSearch(selectedTerm);
    }

    function handlepricee(e) {
        const selectprice = e.target.value;
        setLocalSearchTerm(selectprice);
        handleprice(selectprice)
    }

    return (
        <div className="search">
            <div className="text">
                <form onSubmit={handlesearch}>
                    <div>
                        <input
                            type="text"
                            placeholder="search"
                            value={localSearchTerm}
                            onChange={(e) => setLocalSearchTerm(e.target.value)}
                        />
                        <button type="submit">search</button>
                    </div>
                </form>

                <div className="select-container">
                    <select id="options" onChange={handleSelectChange}>
                        <option value="all">All languages</option>
                        <option value="react">React</option>
                        <option value="node">Node</option>
                        <option value="php">PHP</option>
                    </select>

                    <select id="price-options" onChange={handlepricee}>
                        <option value="all">All prices</option>
                        <option value="1000">Above 1000</option>
                        <option value="-1000">Below 1000</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

Search.propTypes = {
    handleprice :PropTypes.func.isRequired,
    allCourses: PropTypes.array.isRequired,
    handleSearch: PropTypes.func.isRequired,
};



