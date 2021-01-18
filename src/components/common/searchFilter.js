import React, { useState } from 'react'

//Assets
import { AutocompleteDropdown } from './AutocompleteDropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes, faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'

//ANDT
import 'antd/dist/antd.css';

import { Input, AutoComplete } from 'antd';
import { SelectProps } from 'antd/es/select';

//Variables checkbox
const checkboxSource = ['NBCU', 'Public Domain']
const checkboxTarget = ['Dailymotion', 'Vimeo', 'VK']
function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

const searchResult = (query) => {
    return new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((_, idx) => {
            const category = `${query}${idx}`;
            return {
                value: category,
                label: (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>
                            Found {query} on{' '}
                            <a
                                href={`https://www.google.com/search?q=${query}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {category}
                            </a>
                        </span>
                        <span>{getRandomInt(200, 100)} results</span>
                    </div>
                ),
            };
        });
};

const jumbotron = {
    padding: '1em 1em 0 1em',
    background: 'rgb(223,232,238)',
    marginBottom: '0',
}

const spacer = {
    height: '1em'
}

const toolButton = {
    width: '28px'
}

const iconMarginRight = {
    marginRight: '5px'
}

function Searchfilter() {
    //Use State are
    const [selectedCheckbox, setSelectedCheckbox] = useState([""]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([""]);
    const [checked, setChecked] = useState(true);
    const [checker, setChecker] = useState(true);

    const [options, setOptions] = useState([]);

    const handleSearch = (value) => {
        setOptions(value ? searchResult(value) : []);
    };

    const onSelect = (value) => {
        console.log('onSelect', value);
    };

    return (
        <div>
            <p>
                <FontAwesomeIcon icon={faSearch} /> Search filters: <span className="text-secondary">{selectedCheckbox} |{selectedCheckboxes}<br /></span>
            </p>
            <div className="jumbotron mt-3" style={jumbotron}>
                <div className="row" style={{ fontSize: '18px', marginBottom: '5px' }}>
                    <div className="col">
                        <p>Collection </p>
                    </div>
                    <div className="col">
                        <p>Target </p>
                    </div>
                </div>
                <div className='row' style={{ fontSize: '18px', marginBottom: '5px' }}>
                    <div className="col">
                        {checkboxSource.map((text, index) => (
                            <div>
                                <input checked={checked} type="checkbox" value={text} onClick={(e) => { if (e.target.checked) { setSelectedCheckbox(e.target.value) } }} id="flexCheckIndeterminate" />
                                <label style={{ marginLeft: '5px' }} class="form-check-label" for="flexCheckIndeterminate">
                                    {text}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="col">
                        {checkboxTarget.map((text, index) => (
                            <div>
                                <input type="checkbox" value={text} onClick={(e) => { if (e.target.checked) { setSelectedCheckboxes(e.target.value) } }} id="flexCheckIndeterminate" />
                                <label style={{ marginLeft: '5px' }} class="form-check-label" for="flexCheckIndeterminate">
                                    {text}
                                </label>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <AutoComplete
                            dropdownMatchSelectWidth={252}
                            style={{
                                width: "100%",
                                marginBottom: '20px'
                            }}
                            options={options}
                            onSelect={onSelect}
                            onSearch={handleSearch}
                        >
                            <Input.Search size="large" placeholder="input here" enterButton />
                        </AutoComplete>
                    </div>
                </div>
                <div className="row">
                    <div className="col"><button className="btn btn-primary btn-sm ml-1 mb-3" type="button" onClick={() => { setChecked(old => !old) }}  ><span style={iconMarginRight} ><FontAwesomeIcon icon={checked ? faTimes : faCheck} /></span>{checked ? 'Clear All' : 'Select All'}</button></div>
                    <div
                        className="col text-right"><button className="btn btn-success btn-sm mb-3" type="button"><span style={iconMarginRight} ><FontAwesomeIcon icon={faSearch} /></span>Search</button></div>
                </div>
            </div>
        </div >
    )
}

export default Searchfilter
