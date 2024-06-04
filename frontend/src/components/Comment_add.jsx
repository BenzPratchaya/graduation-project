import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Comment_add({ articleId, user }) {
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/comments/${articleId}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error(error));
  }, [articleId, comments]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user || !user.id) {
      MySwal.fire({
        title: "คุณยังไม่ได้เข้าสู่ระบบ?",
        text: "Please log in or register to comment articles.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "เข้าสู่ระบบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    axios
      .post("http://localhost:3001/comment/create", {
        article_id: articleId,
        user_id: user.id,
        body,
        user_fname: user.fname,
        user_lname: user.lname,
      })
      .then((response) => {
        setComments([...comments, response.data]);
        setBody("");
      })
      .catch((error) => console.error(error));
  };

  // สร้างฟังก์ชัน formatDateTimeToThai ที่ควบคุมสำหรับการตรวจสอบว่าค่าอินพุตไม่ใช่ undefined ก่อนที่จะใช้งาน
  function formatDateTimeToThai(isoDateString) {
    if (!isoDateString) return "Invalid date";

    const timeZone = "Asia/Bangkok";
    const date = parseISO(isoDateString);
    try {
      const formattedDate = formatInTimeZone(date, timeZone, "dd MMMM yyyy HH:mm 'น.'", { locale: th });

      const buddhistYear = date.getFullYear() + 543;
      const formattedDateWithBuddhistYear = formattedDate.replace(/(\d{4})/, buddhistYear.toString());
      return formattedDateWithBuddhistYear;
    } catch (error) {
      console.error("Invalid date format:", isoDateString);
      return "Invalid date";
    }
  }

  return (
    <div>
      <div style={containerStyle}>
        <form onSubmit={handleSubmit}>
          <div style={headerStyle}>
            <AccountCircleIcon style={iconStyle} />
            <p style={pStyle}>
              {user.fname} {user.lname}
            </p>
          </div>
          <hr />
          <div style={contentStyle}>
            <h3>Comment</h3>
            <textarea name="comment" style={textStyle} cols="30" rows="10" value={body} onChange={(e) => setBody(e.target.value)} />
            <button style={{ ...buttonStyle, ":hover": buttonHoverStyle }} type="submit">
              comment
            </button>
          </div>
        </form>
      </div>
      <ul style={{ padding: "15px" }}>
        {comments.map((comment) => (
          <div style={containerStyle} key={comment.id}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <AccountCircleIcon style={iconStyle} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <p style={{ margin: 0 }}>
                  {comment.user_fname} {comment.user_lname}
                </p>
                <p style={{ margin: 0 }}>{formatDateTimeToThai(comment.created_date)}</p>
              </div>
            </div>
            <br />
            <p>{comment.body}</p>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Comment_add;

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "15px",
  marginBottom: "15px",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
};

const iconStyle = {
  width: "48px",
  height: "48px",
};

const pStyle = {
  marginLeft: "10px",
};

const contentStyle = {
  marginTop: "10px",
};

const textStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "3px",
  marginBottom: "10px",
  width: "100%",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  backgroundColor: "#333",
  color: "#fff",
  transition: "all 0.2s ease-in-out",
};

const buttonHoverStyle = {
  backgroundColor: "#222",
};
