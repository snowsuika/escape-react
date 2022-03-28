import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function Article() {

  const [articles, setArticle] = useState([]);


  const getData = () => {
    axios.get(`${process.env.REACT_APP_URL}api/react/articles`)
      .then((response) => {
        let resData = response.data.articles
    
      resData.forEach(item => {
        item.create_at = item.create_at * 1000
      });
        setArticle(resData);
      });
  }
  useEffect(() => {
    getData();
    console.log();
  }, [])


  return (
    <div className="container">
      <div className="card">
        <div className="card-header bg-white">
          <h5 className="">產品列表</h5>
        </div>
        <div className="table-responsive">
          <table className="table table-hover table-nowrap">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">名稱</th>
                <th scope="col">文章類別</th>
                <th scope="col">作者</th>
                <th scope="col">內容</th>
                <th scope="col">建立時間</th>
                <th scope="col">描述</th>
                <th scope="col">上架</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>

              {
                articles.map((item, index) => {
                  return <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>
                  
                      {Array.isArray(item.tag) }
                      {
                        item.tag.map((tag,index)=> {return <span key={index} className="badge rounded-pill bg-secondary me-2">{tag}</span>})
                      } 
                    </td>
                    <td>{item.author}</td>
                    <td>{item.content}</td>
                    <td>{moment(item.create_at).format('YYYY-MM-DD hh:ss')}</td>
                    <td>{item.description}</td>
                    <td>{item.isPublic ? '上架中' : '已下架'}</td>
                    <td>
                      <Link to={item.id} className="btn btn-sm btn-neutral">查看</Link>
                    </td>
                  </tr>
                })
              }

            </tbody>
          </table>
        </div>
        <div className="card-footer bg-white py-3 text-end">
          <span className="text-muted text-sm ">總共{articles.length}筆資料</span>
        </div>
      </div>
    </div>
  )

}

export default Article;