
function Product() {
  const [posts, setPosts] = React.useState([]);
  const [detailPost, setDetailPost] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const detailProduct = (post) => {
    setDetailPost(post);
    openModal();
  };

  const truncateStr = (str, maxLength = 100) => {
    if (str.length <= maxLength) return str;
    const subStr = str.slice(0, maxLength);
    return subStr.slice(0, subStr.lastIndexOf(" ")) + "…";
  };

  if (loading) {
    return (

      <div className="loader-overlay" role="status" aria-live="polite" aria-label="Đang tải">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <h1 className="heading">Danh sách sản phẩm</h1>


        <div id="posts" className="grid">
          {
            posts.map((post) => (
              <div className="card" key={post.id}>
                <h3>ID: {post.id}</h3>
                <h4>Title: {post.title}</h4>
                <p className="card-body" title={post.body}>{truncateStr(post.body)}</p>
                <button onClick={() => detailProduct(post)}>Xem chi tiết</button>
              </div>
            ))
          }

        </div>

        {isOpenModal && (
          <div id="modal" className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 id="modal-title">Chi tiết sản phẩm</h2>
                <button className="close-btn" onClick={closeModal}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div id="modal-body">
                <p>ID: {detailPost.id}</p>
                <p>Title: {detailPost.title}</p>
                <p>Body: {detailPost.body}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

const app = <Product />;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
