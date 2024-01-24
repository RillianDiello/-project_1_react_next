import './styles.css';
import React from 'react';
import { useCallback, useEffect } from 'react';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { loadPosts } from '../../utils/load-post';
import { TextInput } from '../../components/TextInput';
import { useState } from 'react';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postMessage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue);
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  useEffect(() => {
    console.log('oi');
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1> Serach Value: {searchValue}</h1>
          </>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredPosts.length === 0 && <p>Não existem postes com o termo buscado</p>} <Posts posts={filteredPosts} />
      <div className="button-container">
        {!searchValue && <Button disabled={noMorePosts} text="Load more posts" onClick={loadMorePosts} />}
      </div>
    </section>
  );
};
// class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 10,
//     searchValue: "",
//   };
//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;

//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     const { page, postsPerPage, allPosts, posts } = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);
//     this.setState({ posts, page: nextPage });
//   };

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//     console.log(e.target.value);
//   };

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePost = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue
//       ? allPosts.filter((post) => {
//           return post.title.toLowerCase().includes(searchValue);
//         })
//       : posts;

//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValue && (
//             <>
//               <h1> Serach Value: {searchValue}</h1>
//             </>
//           )}
//           <TextInput
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//           />
//         </div>
//         {filteredPosts.length === 0 && (
//           <p>Não existem postes com o termo buscado</p>
//         )}{" "}
//         <Posts posts={filteredPosts} />
//         <div className="button-container">
//           {!searchValue && (
//             <Button
//               disabled={noMorePost}
//               text="Load more posts"
//               onClick={this.loadMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Home;
