
function Profile() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false); // dữ liệu tải xong tắt loading
      })
      .catch(() => {
        setLoading(false); // nếu lỗi cũng tắt loading
      });
  }, []);

  if (loading) {
    return <div>Đang tải…</div>;
  }

  return (
    <div className="slide-container">
      <div className="slide-content">
        <div className="card-wrapper">
          <div className="card">
            <div className="image-content">
              <span className="overlay"></span>
              <div className="card-image">
                <img src="./img/avatar.png" alt="avatar" className="card-img" />
              </div>
            </div>
            <div className="card-content">
              <h2 className="name">{user.name}</h2>
              <p className="card-item"><strong>Username:</strong> {user.username}</p>
              <p className="card-item"><strong>Email:</strong> {user.email}</p>
              <p className="card-item"><strong>Phone:</strong> {user.phone}</p>
              <p className="card-item"><strong>Website:</strong> {user.website}</p>
              <p className="card-item"><strong>Address:</strong> {user?.address?.street} - {user?.address?.city}</p>
              <button className="button">View More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const app = <Profile />;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(app);
