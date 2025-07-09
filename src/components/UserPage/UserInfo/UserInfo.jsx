const UserInfo = ({ data }) => (
  <div>
    <img src={data.avatar} alt={data.name} />
    <h3>{data.name}</h3>
    <p>User ID: {data.id}</p>
  </div>
);

export default UserInfo;
