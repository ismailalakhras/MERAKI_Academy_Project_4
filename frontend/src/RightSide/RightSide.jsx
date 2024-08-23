// import React, { useContext, useEffect, useRef, useState } from "react";
// // import "../../src/Suggestions/Suggestions.css";
// import axios from "axios";
// import { AppContext } from "../App";
// // import PostTimestamp from "../PostTimestamp";

// const RightSide = ({
//   followers,
//   following,
//   user,
//   setFollowers,
//   setFollowing,
//   setUser,
// }) => {
//   const { setComments, toggle, setToggle, post, token } =
//     useContext(AppContext);

//   const [users, setUsers] = useState([]);

  

//   useEffect(() => {

//     axios
//       .get(`https://webpulse-35pb.onrender.com/users/userId`, {
//         headers: {
//           authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((result) => {
//         setFollowers(result.data.user.followers);

//         setFollowing(result.data.user.following);

//         setUser(result.data.user);
//       })
//       .catch((err) => {
//         console.log(err.response.data.message);
//       });
//   }, [toggle, followers, following]);

//   useEffect(() => {
//     axios
//       .get(`https://webpulse-35pb.onrender.com/users`)
//       .then((result) => {
//         console.log(result.data.users);
//         setUsers(result.data.users);
//       })
//       .catch((err) => {
//         console.log(err.response.data.message);
//       });
//   }, []);




//   return (
//     <div className="suggestios rightSide">
//       <div className="suggestios-container">
//         <h1>Suggestions</h1>
//         {users?.map((ele, ind) => {
//           if (ele._id !== user._id) {
//             return (
//               <>
//                 <div key={ind} className="suggestios-container-user ">
//                   <div className="left-side">
//                     <img src={ele.profileImage} alt="" />
//                     <div className="userName">
//                       {ele.firstName} {ele.lastName}
//                     </div>
//                   </div>

//                   {following?.some((element) => {
//                     return element._id === ele._id;
//                   }) ? (
//                     <div
//                       onClick={() => {
//                         axios
//                           .put(
//                             `https://webpulse-35pb.onrender.com/users/unFollow/${ele._id}`,
//                             {},
//                             {
//                               headers: {
//                                 authorization: `Bearer ${token}`,
//                               },
//                             }
//                           )
//                           .then((result) => {
//                             // console.log(result.data.user);
//                           })
//                           .catch((err) => {
//                             console.log(err.response.data.message);
//                           });
//                       }}
//                       className="button unFollow"
//                     >
//                       unFollow
//                     </div>
//                   ) : (
//                     <div
//                       onClick={() => {
//                         axios
//                           .put(
//                             `https://webpulse-35pb.onrender.com/users/follow/${ele._id}`,
//                             {},
//                             {
//                               headers: {
//                                 authorization: `Bearer ${token}`,
//                               },
//                             }
//                           )

//                           .then((result) => {
//                             // console.log(result.data.user);
//                           })
//                           .catch((err) => {
//                             console.log(err.response.data.message);
//                           });
//                       }}
//                       className="button"
//                     >
//                       Follow
//                     </div>
//                   )}
//                 </div>
//               </>
//             );
//           }
//         })}
//       </div>
//     </div>
//   );
// };

// export default RightSide;
