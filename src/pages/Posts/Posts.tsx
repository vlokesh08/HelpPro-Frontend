import React from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import EditPost from './EditPost'
const Posts = () => {
  const [data, setData] = React.useState([]);
  const user = useSelector((state : any) => state.user);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  React.useEffect(() => {
    axios
      .get(`${backendURL}/api/posts/getpostforprofile/${user.username}` , {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },  
      })
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {
        data.map((post : any) => {
          return (
            <div key={post._id} className="mt-5 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-5 lg:mx-0 lg:flex lg:max-w-none p-4 mb-6">
              <EditPost post={post} />
            </div>
          )
        })
      }
    </div>
  )
}

export default Posts