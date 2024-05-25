import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./css/AdminDashBoard.css";
import Chart from "chart.js/auto";
import Adminsidebar from "./Adminsidebar";

function Admindashboard() {
  const [users, setUsers] = useState([]);
  const [firstaids, setFirstaids] = useState([]);
  const [articles, setArticles] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [countmonth, setCountMonth] = useState([]);
  const [accounttype, setACCountType] = useState([]);
  const [facounttype, setFACountType] = useState([]);
  const [showFirstGraph, setShowFirstGraph] = useState(false);
  const [showSecondGraph, setShowSecondGraph] = useState(false);
  const [showThirdGraph, setShowThirdGraph] = useState(false);
  const [open, setOpen] = useState(true);

  const handleFirstButtonClick = () => {
    setShowFirstGraph(true);
    setShowSecondGraph(false);
    setShowThirdGraph(false);
  };

  const handleSecondButtonClick = () => {
    setShowFirstGraph(false);
    setShowSecondGraph(true);
    setShowThirdGraph(false);
  };

  const handleThirdButtonClick = () => {
    setShowFirstGraph(false);
    setShowSecondGraph(false);
    setShowThirdGraph(true);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // สร้างตัวแปรเพื่อเก็บวันที่ใหม่ทั้งหมด
  // const newDates = [];
  // for (let i = 0; i < users.length; i++) {
  //   const dateObject = new Date(users[i]["created_date"]);
  //   const day = dateObject.getDate().toString().padStart(2, "0");
  //   const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  //   const year = dateObject.getFullYear();
  //   const formattedDate = `${day}/${month}/${year}`;
  //   newDates.push(formattedDate);
  // }
  // console.log(newDates);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await fetch("http://localhost:3001/users");
      const usersData = await usersResponse.json();
      setUsers(usersData);

      const countmonthResponse = await fetch(
        "http://localhost:3001/users/countmonth"
      );
      const countmonthData = await countmonthResponse.json();
      setCountMonth(countmonthData);

      const firstaidsResponse = await fetch("http://localhost:3001/firstaids");
      const firstaidsData = await firstaidsResponse.json();
      setFirstaids(firstaidsData);

      const facounttypeResponse = await fetch(
        "http://localhost:3001/firstaids/counttype"
      );
      const facounttypeData = await facounttypeResponse.json();
      setFACountType(facounttypeData);

      const articlesResponse = await fetch("http://localhost:3001/articles");
      const articlesData = await articlesResponse.json();
      setArticles(articlesData);

      const accounttypeResponse = await fetch(
        "http://localhost:3001/articles/counttype"
      );
      const accounttypeData = await accounttypeResponse.json();
      setACCountType(accounttypeData);

      const adminsResponse = await fetch(
        "http://localhost:3001/users/role_id/2"
      );
      const adminsData = await adminsResponse.json();
      setAdmins(adminsData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showFirstGraph) {
      const userchart1 = document
        .getElementById("myUserChart")
        .getContext("2d");
      const myUserChart = new Chart(userchart1, {
        type: "bar",
        data: {
          labels: countmonth.map((item) => item.date).slice(0, 10),
          datasets: [
            {
              label: "จำนวนลงทะเบียน",
              data: countmonth.map((item) => item.count).slice(0, 10),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // const ctx2 = document.getElementById("popularCategory").getContext("2d");
      // const popularCategory = new Chart(ctx2, {
      //   type: "pie",
      //   data: {
      //     labels: ["Category A", "Category B", "Category C"],
      //     datasets: [
      //       {
      //         label: "Popular Category",
      //         data: [300, 50, 100],
      //         backgroundColor: [
      //           "rgba(255, 99, 132, 0.2)",
      //           "rgba(54, 162, 235, 0.2)",
      //           "rgba(255, 206, 86, 0.2)",
      //         ],
      //         borderColor: [
      //           "rgba(255, 99, 132, 1)",
      //           "rgba(54, 162, 235, 1)",
      //           "rgba(255, 206, 86, 1)",
      //         ],
      //         borderWidth: 1,
      //       },
      //     ],
      //   },
      //   options: {
      //     scales: {
      //       y: {
      //         beginAtZero: true,
      //       },
      //     },
      //   },
      // });

      return () => {
        myUserChart.destroy();
        // popularCategory.destroy();
      };
    }
  }, [showFirstGraph]);

  useEffect(() => {
    if (showSecondGraph) {
      const firstaidchart1 = document
        .getElementById("myFirstaidChart")
        .getContext("2d");
      const myFirstaidChart = new Chart(firstaidchart1, {
        type: "bar",
        data: {
          labels: ["A", "B", "C", "D", "E"],
          datasets: [
            {
              label: "Sample Data",
              data: [10, 20, 30, 40, 50],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      const firstaidchart2 = document
        .getElementById("myFirstaidCategory")
        .getContext("2d");
      const myFirstaidCategory = new Chart(firstaidchart2, {
        type: "pie",
        data: {
          labels: facounttype.map((item) => item.name),
          datasets: [
            {
              label: "จำนวนข้อมูลการปฐมพยาบาล",
              data: facounttype.map((item) => item.count),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        myFirstaidChart.destroy();
        myFirstaidCategory.destroy();
      };
    }
  }, [showSecondGraph]);

  useEffect(() => {
    if (showThirdGraph) {
      const articlechart1 = document
        .getElementById("myArticleChart")
        .getContext("2d");

      const myArticleChart = new Chart(articlechart1, {
        type: "line",
        data: {
          labels: articles.map((item) => item.title.slice(0, 25 - 3) + "..."),
          datasets: [
            {
              label: "จำนวนคนถูกใจ",
              data: articles.map((item) => item.like_count),
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      const articlechart2 = document
        .getElementById("myArticleCategory")
        .getContext("2d");
      const myArticleCategory = new Chart(articlechart2, {
        type: "pie",
        data: {
          labels: accounttype.map((item) => item.name),
          datasets: [
            {
              label: "จำนวนบทความ",
              data: accounttype.map((item) => item.count),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      return () => {
        myArticleChart.destroy();
        myArticleCategory.destroy();
      };
    }
  }, [showThirdGraph]);

  return (
    <div className="adminDashboard">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${open ? 240 : 0}px)`,
          ml: open ? `240px` : 0,
          transition: "width 0.3s", // เพิ่ม transition ในการเปลี่ยนความกว้างของ AppBar
        }}
      >
        <Toolbar style={{ background: "white" }}>
          <IconButton onClick={toggleDrawer} sx={{ color: "black" }}>
            <MenuIcon sx={{ width: "24", height: "24" }}></MenuIcon>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: "black" }}
          >
            Admin System
          </Typography>
        </Toolbar>
      </AppBar>
      {/* -------------------- Adminsidebar ------------------------ */}
      <Adminsidebar open={open} />
      {/* -------------------- End Adminsidebar ------------------------ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          ml: open ? "240px" : "0px",
          width: open ? `calc(100% - 240px)` : "100%",
          transition: "margin-left 0.3s, width 0.3s",
        }}
      >
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <div className="main-adminBx">
            <div className="showDataWeb">
              <div className="dataBx" onClick={handleFirstButtonClick}>
                <div className="content">
                  <div className="sumData">{users.length}</div>
                  <div className="nameData">All User</div>
                </div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAxtJREFUaEPtmW1yozAMhu0J1zBTTtLNSbY9SbcnaXqSsieBxdeA8VaMyaREwhIfcUmdv/hDj15ZlhWtfthP/zBelYDvXfGkcFL4zjyQQvrOBL3CSQpLFW6a5kkp9aiU+qW1foD5zrlaa1075967riuLoqil6241frbCHvRlgKQMBHil1Gue56etICTrzgK21n6AopKNALpt21NstcXAM2EH37waY/4IHbXqcBGwtRaMfVloQVRoKbAjYMu2bZ+Hb1mWQfICx1yFPZzpruuOsUKbDTyh7tEYU2KOoOY4555jJTEJMJaoSmPMcSrEm6Z5+7yi4Oo6/5xzpzzPzxGx8IiIprOBm6apkCuIVHewwloLYQ3OugSu8zwvRJauNJgNbK29Or/GGNb8JXNX4jwvwzIYRmMKt21bhJJPVVUPWZZVY8O5zrqIFOyGEGf8RcBKqWBIY8CQqaUhTSTATYGvkg9UT6FCgihUgsluHBExgJ+01m/ImSKhsYTl5wcdFR2YOsfeMLiHoVau4UzDw0Jr/ZsqPKThDHvcXOGJTaWJVKxuNOAVoMVnN1qWvpQRq54YMgdhfdhSS/VNhtFHOEp/qQlYQmVfS+NFuQ0AmMetnbECheFIcgh2188GHnYZEtRnfdy3d6D89F2O3vuSR8IugJcogFw91PNz1jabKDzLEmLSt1fYn+M+jDGGoXs53M8h53zLpCVJVuOMuqRte/PCA8pE5xzU06iaIfUuvpcALklmNy88VmrejX0iatveTOGZRQZXcHaZeRNgf8diL6QzEPSntNb/CMJHuJ8Dx4AFvTkw1anwYP3riOpWIvfr5PnndE42B54IZZYimOITuSC45qbAE+oGHwChw0s5kqNyaG3Od7SWxrw5pw+FGQDOPBwOH+NzzX1gcKCmxlDAWNM9GHZcY4jwXBw9nP1R4LlNd86GvoiI1pynFJ7ddBdAb74HZksC9iG3ufdj/f0ylaW/RESo4c4N5WEc9hRcew92SEuN39P4xT2tPcGCrQl4b4pJ7U0KSz22t/FJ4b0pJrU3KSz12N7GJ4X3ppjU3v/EWuJMa+pHFQAAAABJRU5ErkJggg=="
                  alt=""
                />
              </div>
              <div className="dataBx" onClick={handleSecondButtonClick}>
                <div className="content">
                  <div className="sumData">{firstaids.length}</div>
                  <div className="nameData">All Firstaid</div>
                </div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAfNJREFUaEPtWlFugzAMtSWuEVROsvYkW0+y9iRtTzJ2EhC5BshbpDLRlgAjNkqL8wt5+PnZxhAjrGzhyviCEn51xVXhUIWttQciekfETSBWTkSXpmnyLMvKQKy/7WwKF0WxSZLkBABbLuOuOHld13su0myErbVfAmRb3x2NMQcOR7IQvqpbcBjkw6jrOuNQmYWwy1sA+JQkTET7NE3Poc+QJDw7DD0OnI3XdZISnhMy3Ipw46nCc1Tt7uFWhBtvssLW2q3rmtz7laFzCvXr4H4iKhGxHGtSvEWrqqoPRHSd0zMub0XvJbxEIyHtRV+j0ktYuE2U5tri58aY3f3DfIRpKaskn2OMeeCnhJ3HrbWqMFPo5QDwfYf1JvVZGUNIP7wuJL+0lDBA/29awRxWhTWkmaqjg9Ec1hy+hlNI0eoLo5Ao5baFvbVUwiHyBra5ixQtVfjVFR7hp52WdlqBKdDdvkjR0pC+9YDmsObwi+Xw6v5pMeo3DhVDlR63kvGOyYSrqipiPy0c84s7TUzTNJt61CI5gjRmK9f1f50tuXPh05OrvDPGuCJ5s7znw4wjhFyKTcYZGnEanOJxEwBu/oqINs+g9q+dZ0S89CnbeotlbGmy6yO4UQlHIIKoCaqwqHsjAFeFIxBB1ARVWNS9EYCvTuEfbQ10THvwAPUAAAAASUVORK5CYII="
                  alt=""
                />
              </div>
              <div className="dataBx" onClick={handleThirdButtonClick}>
                <div className="content">
                  <div className="sumData">{articles.length}</div>
                  <div className="nameData">All Article</div>
                </div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAhVJREFUaEPtWm1ygyAUhEmugRNP0vYkbU7S5iRtTlJ7Eq1cQ4f4IplqhQQUTEyWmUz+8LVv31twWM4erPEHw8sA+N4ZB8Ng+M4iYE1pKeUzY4x+oVpWVVWRpmnxf0JaSym14ZxvAi2WCSEy01xGwFLKD8bYe6DFe9MopbZ1XWcEPOY6jLGdEIJw9JoNsIoBtjPnKfohM2iwZSHEAN+1AEeOZzs9ADd57sPwbgItT5cEsBGtL87574Q1BpoziWHTYJ/NadX/tox5samq6xpSyoHuXBUwbbwsy0/O+VsXhFKqSJIkdQVm63eTgC3HkPH48A0AAE9V6ak1TIyB4TZvkdK+9auz5/ZUGimNlB6TzO0YHEs4ltpMcP54wDk8otyg0lDpEWmjh0ClodJQ6b/6ca0H34qDSkOlfXPGPytx0/L58vDlAzWMGvbNGdRwL2JXf3lADaOGUcPOEXC9DuPiYbt4OIdad6Rn0OZptND/e3r/PSda2snzSk6eUI6eSSrtC9jQP9Pge+/DjTMgmsHFGXBZlnlAz1SAWI2b4qEA25wFRtHK83yzWq2OfowlMk0GmbqudybXXzQ3LQVtvV6TAJGvw9VSSHW+Pzn1xiXy+VHRAHeXdbEYEitJkmxjgOzOOQtgfdRZ/ZtzgT2WaOyIXmJ6TrCzA+4wTc48aj8mx2tMEmZlOCYQ17kB2DVSS+0HhpfKnOu+DyNDSFscOOLgAAAAAElFTkSuQmCC"
                  alt=""
                />
              </div>
              <div className="dataBx">
                <div className="content">
                  <div className="sumData">{admins.length}</div>
                  <div className="nameData">All Admin</div>
                </div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA75JREFUaEPtmn122yAMwOHZ18BLTtLmJEtP0u0kTU/S7CTpzDWcx6I82JgfIAnkJFuSf9r3bAM/SegDodWd/fSd8aoH8P+u8YeGpTVsrX1WSj07575orVfOuZX/+wlzaa0/nXPn/5VSP4Zh2EmvIR5PXMOHw2HV9/3WA265i/fw+6XgxYADqFLqlQuZex/gtdbvxphvUmOKAFtrYUFioHM4SfAmYNBq13UfsCelNFAaB8CPx+NmvV6HPc+ethrYO6MP9oyNH7Rquwp4aRMmyuR7zd5mA1trQasQam7hx4ZmAd+IZueCZkGTga+1Zylm5Jx7oSYsJOBbhgWBeEf2YoyBhKX4IwGP43i4VOjBFlxKUoZhWGPfo8DjOG611m/YQJTnIWeG7Cnk1pIOkGLaFOBm7WKxU8oZwjyYlovAQgvZG2M2mAX4XBwsqSnknaqx3TAML7n5MGCHLRR7Pk3TmpoKeugDNiaWfpa0nAWW2LuUPTVfvMS8p9Jyk/PYJeC3U3HOrmdjAGMM6iNS2rLWtlpWdhtlF7TkpJjJtqavJeeVBJYwK8x5lKCFnGXSrJPAQhOyctxYAOM4Nm+n03FZcv6chiUmJIWjlKYlMrucheU03FwCUpKAnFkL+A8YOinwnIabsyuf1JOrmAAv4T9CQZGKxzkNt4aF8/q5Z1ASiUcQXM7CFgXmQEulllgesNgejie+VPEwn5Nj0s1OK+WQopbKXmv9Uyn11FosFOI5y2lJhCUsoVr0OTcsLdpJWJT0z+D0xOPWz7AoAstVakmnJR0eoCUK3cDgtRMLhr0MrVNo2TQdAISxc5VaqVqqdlzBK0/TtKMW/2GhEl3IUuFSAgZJ1/SOqnPoWPO+UfdaU5OXDh6ywJVmXV0hFfJqtgMtHTxgZ1qcycRhgxCY5WpxHUVgRv9XxIwlDgWwYyX0zIlSvXCLBEpYme/nvu/RI1zKoSEKTE3ql4KmWhm1/kaBQdJUB4YVCVzNMvdu9mg2npcEDB9QTDuuRU/FAamblxICVavRtyTYc3LDkTpT4qGN+e6PW4qtzOh+11dmp5IVHVjAIBwu9Ezrv2/dQXko0EFkRwc2cAs0x5oI77I0G8arAubuacLiua+Q9+x84Grg4L0vfTGtxRmynVbOo/rLpFxnQ9aqZLhr0nAiG4Juo/Sdy6q9mpOmGHBcz3ZdB6XlU2VpBzdozwcGNTftMLMRB55rHeD9hfDzBXH/HC6M/3VB3IcpuKPxb10QxyR87eeLavjacKn5H8C3qBXJNd2dhn8Bth1eW2TrfQ0AAAAASUVORK5CYII="
                  alt=""
                />
              </div>
            </div>
            {/* <div className="showGraph">
          <div className="graphBx graph-1">
            <canvas id="myChart"></canvas>
          </div>
          <div className="graphBx graph-2">
            <canvas id="popularCategory"></canvas>
          </div>
        </div> */}
            <div>
              {showFirstGraph && (
                <div className="showGraph">
                  <div className="graphBx graph-1">
                    <canvas id="myUserChart"></canvas>
                  </div>
                  {/* <div className="graphBx graph-2">
                <canvas id="popularCategory"></canvas>
              </div> */}
                </div>
              )}

              {showSecondGraph && (
                <div className="showGraph">
                  <div className="graphBx graph-3">
                    <canvas id="myFirstaidChart"></canvas>
                  </div>
                  <div className="graphBx graph-4">
                    <canvas id="myFirstaidCategory"></canvas>
                  </div>
                </div>
              )}

              {showThirdGraph && (
                <div className="showGraph">
                  <div className="graphBx graph-5">
                    <canvas id="myArticleChart"></canvas>
                  </div>
                  <div className="graphBx graph-6">
                    <canvas id="myArticleCategory"></canvas>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Admindashboard;
