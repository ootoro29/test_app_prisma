"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { FormEvent, useEffect, useState } from "react";

type Article = {
  id:string
  title:string;
  content:string;
  writer:string;
};


export default function Home() {
  const [articles,setArticles] = useState<Article[]>([]);
    const [inputArticle,setInputArticle] = useState<Article>({id:"0",title:"",content:"",writer:""});
    useEffect(() => {
      const dataFetch = async() => {
          await fetch(`/api/article`,{method:"GET"})
          .then(async(res) => {
              const articles = await res.json() as Article[];
              articles.map((article) => {
                  setArticles((prev) => [...prev,article])
              })
          });
      }
      dataFetch();
  },[]);

    const onSubmitHandler = async(e:FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/article',{
            method:"POST",
            headers: {
                'Content-Type':"application/json"
            },
            body: JSON.stringify({title:inputArticle.title,content:inputArticle.content,writer:"ootoro"})
        })
        const data = await res.json() as Article;
        console.log(data);
        setArticles((prev) => [...prev,{id:data.id,title:data.title,content:data.content,writer:data.writer}])
        setInputArticle({id:"0",title:"",content:"",writer:"ootoro"});
    }
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
          <input type="text" name="title" value={inputArticle.title} 
                  onChange={(e) => {
                      const changedInputArticle:Article = {id:inputArticle.id,title:e.target.value,content:inputArticle.content,writer:inputArticle.writer}
                      setInputArticle(changedInputArticle);
                  }} />
          <input type="text" name="content" value={inputArticle.content} 
                  onChange={(e) => {
                      const changedInputArticle:Article = {id:inputArticle.id,title:inputArticle.title,content:e.target.value,writer:inputArticle.writer}
                      setInputArticle(changedInputArticle);
                  }} />
          <button type="submit">送信</button>
      </form>
      {
        articles.map((article,i) => (
          <div key={i}>
            <p>{article.title}</p>
            <p>{article.content}</p>
            <p>{article.writer}</p>
          </div>
        ))
      }
    </div>
  );
}
