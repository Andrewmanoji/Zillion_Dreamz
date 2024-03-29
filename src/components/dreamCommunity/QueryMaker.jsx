import { useState,useEffect } from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { addQuery } from "../../slices/eventSlice";
import IdeaCreate from "../dreamCommunity/IdeaCrate";
import Ideas from "../dreamCommunity/Ideas";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

import { stepContentClasses } from "@mui/material";
import {
  endpoint,
  token,
  config,
  formatDate1,
  ModalAnimation,
} from "../../endpoint";


const PurpleTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    color: "#a11cf9",
    backgroundColor: "#ffffff",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function QueryMaker({
  setIdea,
  setYourquery,
  menu,
  setAddquery,
  data,
  setContent,
  setPassdata,
}) {
  // const data = useSelector((state) => state.queryMaker);

  // console.log(data[0].content[1]);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [addopen, setaddOpen] = useState(false);
  const [alert, setAlert] = useState(false);


  
  // const [field, setField] = useState(1);
  const [page, setPage] = useState(0);
  const [isMore, setIsMore] = useState(false);
  const [queryData, setQueryData] = useState([]);
  const [loaded, setLoaded] = useState(false);

useEffect(() => {
  axios
    .get(`${endpoint}/questions?page=${page}&limit=7`, config)
    .then((res) => {
      console.log(res.data.data);
      // setEveData(res.data.data);
      setQueryData([...queryData, ...res.data.data]);
      setLoaded(true);
      // setLoad(false);
      res.data.data.length < 7 ? setIsMore(false) : setIsMore(true);
    })
    .catch((err) => console.log(err));
}, [ page]);







  const [values, setValues] = useState({
    query: "",
  });



  

  const handleSubmit = () => {
    data.map((val) => {
      if (val.query === null || val.query === "") {
        setAlert(true);
      } else {
        dispatch(
          addQuery({
            query: val.query,
          })
        );
      }
      return null;
    });
  };

  setTimeout(() => {
    setAlert(false);
  }, 3000);

  const handleClose = () => {
    setOpen(false);
    setaddOpen(false);
  };

  const [publicQueryId, setPublicQueryId] = useState(null);

  return (
    <>
      <div className="rounded-4 bg-purple d-flex flex-column justify-content-evenly p-4 vh-70        w-md-100  ">
        {
          queryData.map((dt, index) => {
            
              return (
                <>
                
                   <div
                        className="d-flex  mb-2   align-items-start"
                        key={index}
                      >
                        {/* user name */}
                        <div className=" p-2 ps-1   pb-1 mb-sm-0 pb-sm-0  col-sm-1  col-1  me-sm-0 me-2    ">
                          <Avatar
                            className="bg-linear  "
                            // alt={logUser.username}
                            src={dt.user.profile_pic}
                            style={{
                              // boxShadow: "0px 5px 10px black",
                              transform: "scale(1.2)",
                              width: 50,
                              height: 50,
                            }}
                          />
                        </div>

                        <div className="d-flex flex-column ms-sm-4 col-sm-10  ms-lg-2       col-lg-11  col-10 ms-4   p-0 pl-0">
                          {/* </StyledBadge> */}
                          <div className="d-flex flex-sm-row mt-0   ms-0  pe-sm-2 mb-sm-3   ">
                            <div
                              className="fw-bold pe-sm-2     d-flex "
                              style={{ fontSize: 18 }}
                            >
                              <span
                                className="fw-bold pe-sm-2 p-1   "
                                style={{ fontSize: 18 }}
                              >
                                {dt.user.username}
                              </span>
                              {/* {logUser.username} */}
                            </div>
                          </div>
                          {/* queries */}

                          <div
                            onClick={() => {
                              setIdea(true);
                              // setPassdata(index);
                            }}
                            className="bg-white cursor-pointer p-4  rounded-3 w-100"
                          >
                            <p className="text-dark mb-0 ">{dt.text}</p>
                          </div>
                        </div>
                      </div>
                    
                 
                </>
              );
            
          })}
      </div>


      
    </>
  );
}
      // <div className="rounded-4 bg-purple d-flex flex-column justify-content-evenly p-4 vh-70        w-md-100  ">
      //   {data &&
      //     data.map((dt, index) => {
      //       if (dt.type == menu || menu == 10) {
      //         return (
      //           <>
      //             {dt.content.map((cont, ind) => {
      //               return (
      //                 <div
      //                   className="d-flex  mb-2   align-items-start"
      //                   key={index}
      //                 >
      //                   {/* user name */}
      //                   <div className=" p-2 ps-1   pb-1 mb-sm-0 pb-sm-0  col-sm-1  col-1  me-sm-0 me-2    ">
      //                     <Avatar
      //                       className="bg-linear  "
      //                       // alt={logUser.username}
      //                       // src={logUser.profile_pic.public_url}
      //                       style={{
      //                         // boxShadow: "0px 5px 10px black",
      //                         transform: "scale(1.2)",
      //                         width: 50,
      //                         height: 50,
      //                       }}
      //                     />
      //                   </div>

      //                   <div className="d-flex flex-column ms-sm-4 col-sm-10  ms-lg-2       col-lg-11  col-10 ms-4   p-0 pl-0">
      //                     {/* </StyledBadge> */}
      //                     <div className="d-flex flex-sm-row mt-0   ms-0  pe-sm-2 mb-sm-3   ">
      //                       <div
      //                         className="fw-bold pe-sm-2     d-flex "
      //                         style={{ fontSize: 18 }}
      //                       >
      //                         <span
      //                           className="fw-bold pe-sm-2 p-1   "
      //                           style={{ fontSize: 18 }}
      //                         >
      //                           {cont.uname}
      //                         </span>
      //                         {/* {logUser.username} */}
      //                       </div>
      //                     </div>
      //                     {/* queries */}

      //                     <div
      //                       onClick={() => {
      //                         setIdea(true);
      //                         setContent(ind);
      //                         setPassdata(index);
      //                       }}
      //                       className="bg-white cursor-pointer p-4  rounded-3 w-100"
      //                     >
      //                       <p className="text-dark mb-0 ">{cont.query}</p>
      //                     </div>
      //                   </div>
      //                 </div>
      //               );
      //             })}
      //           </>
      //         );
      //       } else return null;
      //     })}
      // </div>
