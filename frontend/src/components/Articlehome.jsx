import React from "react";
import { TableContainer } from "@mui/material";
import { format, parseISO } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { th } from "date-fns/locale";

function Articlehome({ articlelist }) {
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
    <TableContainer>
      <div style={containerStyle}>
        {articlelist[0] && (
          <a href={`/article/${articlelist[0].id}`} style={mainArticleStyle}>
            <img src={`http://localhost:3001/image/${articlelist[0].image}`} alt="Main Article" style={imageStyle} />
            <div style={contentStyle}>
              <h2 style={h2Style}>{articlelist[0].title}</h2>
              <p style={pStyle}>{formatDateTimeToThai(articlelist[0].created_date)} น.</p>
            </div>
          </a>
        )}
        <div style={sideArticlesStyle}>
          {articlelist[1] && (
            <a href={`/article/${articlelist[1].id}`} style={topArticleStyle}>
              <img src={`http://localhost:3001/image/${articlelist[1].image}`} alt="Top Article" style={imageStyle} />
              <h3 style={h3Style}>{articlelist[1].title}</h3>
              <p style={pStyle}>{formatDateTimeToThai(articlelist[1].created_date)} น.</p>
            </a>
          )}
          <div style={bottomRowStyle}>
            {articlelist[2] && (
              <a href={`/article/${articlelist[2].id}`} style={bottomArticleStyle}>
                <img src={`http://localhost:3001/image/${articlelist[2].image}`} alt="Bottom Left Article" style={imageStyle} />
                <h3 style={h3Style}>{articlelist[2].title}</h3>
                <p style={pBottomStyle}>{formatDateTimeToThai(articlelist[2].created_date)} น.</p>
              </a>
            )}
            {articlelist[3] && (
              <a href={`/article/${articlelist[3].id}`} style={bottomArticleStyle}>
                <img src={`http://localhost:3001/image/${articlelist[3].image}`} alt="Bottom Right Article" style={imageStyle} />
                <h3 style={h3Style}>{articlelist[3].title}</h3>
                <p style={pBottomStyle}>{formatDateTimeToThai(articlelist[3].created_date)} น.</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </TableContainer>
  );
}

export default Articlehome;

const containerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  padding: "20px",
};

const mainArticleStyle = {
  flex: "1 1 40%",
  position: "relative",
  border: "1px solid #ddd",
  borderRadius: "10px",
  overflow: "hidden",
  boxSizing: "border-box",
  textDecoration: "none",
};

const sideArticlesStyle = {
  flex: "1 1 35%",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const topArticleStyle = {
  position: "relative",
  border: "1px solid #ddd",
  borderRadius: "10px",
  overflow: "hidden",
  boxSizing: "border-box",
  textDecoration: "none",
};

const bottomRowStyle = {
  display: "flex",
  gap: "20px",
};

const bottomArticleStyle = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid #ddd",
  borderRadius: "10px",
  overflow: "hidden",
  boxSizing: "border-box",
  textDecoration: "none",
};

const imageStyle = {
  width: "100%",
  height: "auto",
  display: "block",
};

const contentStyle = {
  margin: "10px 0",
};

const h2Style = {
  padding: "0 10px",
};

const h3Style = {
  margin: "10px 0",
  padding: "0 10px",
  flex: "1",
};

const pStyle = {
  color: "gray",
  padding: "0 10px 10px 10px",
};

const pBottomStyle = {
  color: "gray",
  padding: "10px",
  marginTop: "auto",
};
