import axios from "axios";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const options = [
    { value: 0, label: "tag1" },
    { value: 1, label: "tag2" },
    { value: 2, label: "tag3" },
];

function ProductDetail() {
    const [state, setState] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);
    const { articleId } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}api/react/article/${articleId}`).then((response) => {
            const tagOptions = [];
            response.data.article.tag.forEach((value, index) => {
                let obj = {
                    value: index,
                    label: value,
                };
                tagOptions.push(obj);
            });

            setState(response.data.article);
            setSelectedOption(tagOptions);
        });
    }, []);

    function handleChange(event) {
        let { value, id } = event.target;

        if (id === "isPublic") value = !event.target.checked;

        setState({
            ...state,
            [id]: value,
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-white">
                            <h5 className="card-title">文章資訊</h5>
                        </div>
                        <div className="card-body">
                            <form className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">
                                            文章名稱
                                        </label>
                                        <input type="text" className="form-control" id="title" value={state.title} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="author" className="form-label">
                                            文章作者
                                        </label>
                                        <input type="text" className="form-control" id="author" value={state.author} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">
                                        文章內容
                                    </label>
                                    <textarea className="form-control" id="content" value={state.content} onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        文章描述
                                    </label>

                                    <textarea className="form-control" id="description" value={state.description} onChange={handleChange} />
                                </div>

                                <div className="col-12 mb-3">
                                    <Select
                                        defaultValue={selectedOption}
                                        onChange={(event) => setSelectedOption(event)}
                                        options={options}
                                        placeholder="請選擇 tag"
                                        isMulti
                                        isSearchable
                                        value={selectedOption}
                                        selectOption={selectedOption}
                                    />
                                </div>
                                <div className="col-12">
                                    <div className="form-check form-switch">
                                        <label className="form-check-label" htmlFor="isPublic">
                                            是否上架
                                        </label>
                                        <input className="form-check-input" type="checkbox" role="switch" id="isPublic" value={state.isPublic} onChange={handleChange} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-white">
                            <h5 className="card-title">產品圖片</h5>
                        </div>
                        <div className="card-body">
                            <img src={state.image} className="rounded mb-2 me-2" alt="" />
                            <div>
                                <label htmlFor="content" className="form-label">
                                    產品圖片網址
                                </label>
                                <input type="text" className="form-control" id="image" value={state.image} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
