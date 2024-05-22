import React, { useState, useEffect } from "react";
import "./css/Home.css";
import NavTab from "./NavTab";
import Articlecards from "./Articlecards.jsx";
import BannerHome from "./BannerHome.jsx";
import Footer from "./Footer.jsx";
import { Button } from "react-bootstrap";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/articles")
      .then((res) => res.json())
      .then((result) => {
        setArticles(result);
      });
  }, []);

  return (
    <div className="Home">
      {/* NAVBAR */}
      <NavTab />
      {/* END NAVBAR */}
      <BannerHome
        title="ยินดีต้อนรับสู่เว็บไซต์การปฐมพยาบาลเบื้องต้น"
        page=""
      />
      <br />
      <section class="functional">
        <div class="container">
          <div class="row">
            <div class="col">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAAAwNJREFUeF7t3OFx1DAQhmGlE6gEqASoBKgEqAQ6ASqBfMMdBC7Wak/SJ+Xm1Ux+WdZajzfyWbJ9VygWgTtLFIIUoE1JADTQJgFTGDIaaJOAKcwOGf3m1NdnE/v8tZTy/fQ3Mcxx0yuhv5RSXpp7/amU8mEF+Apo4Qp5VVFmC1votuKG1vDwzda7eqDnzsx2Q68YLo64NW6/cp10J/TqIeMxU0ELfHpxQr8vpbyb3qNcgLeusdoJ/fF+TDz/lMtxzKutC6KwpxcndG18njleror7z8kD2nRBBBroYcMmQ8cDSsboYXn1+7b7aG4DaKDHCFx7MVRmat4iM7X5ulJfEz2fx3TpopXRca+acs1C73h3N+n8hM2eZwCVJGFphVbm6s7OPX8cdmBxBWW37ixD7FbonWbdFttehBeyJqeq2C3QDBfxqdUwIqfD0gL9M45DjfuLeXUhIYLeaUVk97PZBc2w0X56q3PbUUYD3Q5dHaeBboeMagIdCQ3afhPQ0VNGO9xI3QR0bbV6l9V1oAcNDVEzQEdCg7YDPQgyagboSGjQdqAHQUbNAB0JDdoO9CDIqBmgI6FB24EeBBk1A3QkNGj7ttDRzOGg/l80M2vFCOj/qIGelcJAm2SBBvqPwMw1Qy6GDxIN6Pb/um1/dejAWovenjp65ErPnmTe9pr1Ct620K3IqsdSVkaroy7QHXiZXYHOaHXUBboDL7Mr0BmtjrpAd+BldgU6o9VRF+gOvMyuQGe0OuoC3YGX2bX2ipkecpx1W505xpu4Bc90eFVdoE3yQANtEjCF6cpozfPqHXBKLFD9hl60nMQLnTHwuUbVMoJWI/qWaOa7HO2Hdjs1tfqjN2cPSwu0kPV1A7CPHcNPb7ZAq/mZi7RPPa/DLxuog63QqqsLo+7AyOy/qRFmctMA/kiqnVecX1zxTaWnnrnn49eK/I/Tf3lznzIZ3dwoFS8FgDZlBdBAmwRMYchooE0CpjBkNNAmAVMYMhpok4ApDBkNtEnAFIaMBtokYApDRpugfwFSrNlbNi+9HQAAAABJRU5ErkJggg=="
                alt=""
              />
              <h3>ปฐมพยาบาลเบื้องต้น</h3>
              <p>
                การปฐมพยาบาลในกรณีเบื้องต้น เช่น การให้ CPR,
                การปฐมพยาบาลในสถานการณ์เฉพาะ
              </p>
            </div>
            <div class="col">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAAAxlJREFUeF7t3YFt2zAQBdDzJu0kbSdJM0nbSZpMknSSZpO2HzANQZH4aenzTNVfgBEgYY6npzNFB9DlFD5SBE4ps3iSMHRSERja0EkCSdO4og2dJJA0jSva0EkCSdO4og2dJJA0TWtFf46Ih4j4kJQXpvkVEa8R8Xaes3xdSgH5IbdPyTkip+dznlWaFuivEfEzEXhpKpzQj3+IT7MfjpAbUkJu32tGDBpV8vvGyNPpUeGP52/g4qOSRzk+Tt5973Ji0LhK30Y5k8HzQAHM33GXlA2tu3rV5cPQhtYJJEXqWtG4OfU6cCPesp3smVPt5tsVmi09ey8Cbsat+/fqzWhvIuff/1OJc2honFfLzofuYw3dJoC9/Noygg8z2MNmHP91RQPwpfLhxNDCEqtB4+b3RThXLdRdV7ShhVXmihZi1kIZ2tAXgcPvo9muw2u0sNq9dAgxvUZXBHr/raNM7Yp2Rftm2KMG/Mmwh+pCTEMbWiPgm6HGkUYxNCXSDDC0xpFGMTQl0gwwtMaRRjE0JdIMMLTGkUYxNCXSDDC0xpFGMTQl0gwwtMaRRjE0JdIMMLTGkUYxNCXSDDC0xpFGMTQl0gwwtMaRRjE0JdIMMLTGkUYxNCXSDDC0xpFGMTQl0gwwtMaRRjE0JdIMMLTGkUYxNCXSDDC0xpFGMTQl0gwwtMaRRjE0JdIMuHtoPFunOPDg/PQ1j7kVGu3acGxpsLJ0XrVGXl2fM1QgL8XAs4NIvHSTaYVGhxhgbO1es+d8DgldTriAA2+tzQ7GoJsiOtXcsg/eoaH3VFj27+6CHqUlZTbalvl2QeOtiPXRBxfY1TIT4dEDtNy9+XT3OYI++N/6iPE1bdHujbqpQ1krdG+8slsoOwfFvhcNWec9qHufx2r8UaCnCQJ5T8vi0vq41tg7HXxE6ILQ0lhwDoYqLv2l0zFrE44MjbyvwR4WGScyOnQr9tDIR4Fm2MMjHwm6YM877zZtrUZYrI+wdEydsA3ECzuK6b8OGcGymsPRoIcHXUvQ0EmXztCGThJImsYVbegkgaRpXNFJ0H8B+d9Aap2NYRAAAAAASUVORK5CYII="
                alt=""
              />
              <h3>บทความสุขภาพ</h3>
              <p>
                บทความที่เกี่ยวกับสุขภาพทั่วไป เช่น การดูแลสุขภาพร่างกาย,
                การบำบัดอาการที่พบบ่อย ความดันโลหิตสูง, เบาหวาน เป็นต้น
              </p>
            </div>
            <div class="col">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAABShJREFUeF7tnf2R0zAQxX2dQCVAJUAlQCVAJUAl0Ancm8kympB4v5/kYM/c5I/IsfTT09uVZPuetvOgEHiiXOW8yHaCJongBH2CJhEgXeZU9AmaRIB0maMo+sW2bePfrwsffMofCVnsMquBBsx327a9ujTntaNZAv/7tm0/njvmi+Pc9qIrgB7hesBqcETpAl06Qjuv5fuZoD9elFsJdw8SQH99LoDr0o8ZoNHQtxfPpTf44ul04EzQsIhvEwFfdyoU/n7bNnh6+8EADcCfnxvEsggvNIAG8FYP7waNDAKQVz/a/bsTNAAD9JGOT13BsgP06lahdTzU/VIr5P2+GvRqAc/LQ8oD9ptK364EjWCHrOJRjtKspAo0lPzzUQgP7ShTdhVoKHnV9C3b/yWeXQH6kSFLJyHXhmeHjyzoI6ZwUVhYDcTEJnRkQB9lMhICc+ekcJ4dBf1oGYa1M8KZSBT0/+DL9+CH/DoCeoaax0V8WfzBLgzSyhnZDgKja9UvApqpZuvKGnva7075vKCZATASeLCp8MFquMlyyEDM+5Je0Jj9QT2dR3Y2xlpvcanaA5qlZrf/3eh1Vhwxq9oDmqHm1KTgCjjDRsyq9oD+3ekXlyXJynVgloWYRqAVNMM2IsFP63uGqk31toJmpHRmv9PoDt8zvNo0gbGC7rYNsIFtVO9EM9bJTT5tAc2wDYC21MUh5r9FGSJRR6OlcYylUNPwi1C+bK91T9PV+ltAM9I60/ALgl6i/quA7vJo/C7DOlShWEAzKgogpnzUqWpWfFFjjAaaEbWFnSkfdYJm5NFSpd2sSQPNyEOlourwc0JGcYY/S7V2R6QGmjn0UOHKtQ5GtjT2/aFAV3k1cySarE9TNNPjRgvJ3PfGWky6drLdSYsGeoYy0IDo/cozhCHADwl6VLfl8Qf2nuGtuJzyaGZ6t5dUjA9u4nE2HKgbdsK7p9fWZCeV3q0C2trYmeV2bVjzaHYuOhNU9tpp0IxF/2wjZ5+vTrYsij5B692oTrQsoNmzQ71Z65UoWfifGRCtr4kYXzExoxvUbTiLolFxln1gCCJ9w45FdP9QoON5c8ZzjqptAKAVdKd9RGeBFuXKKyo6H/JXbcMDuss+Otagb3WAAO+4AVK1DQ/oavsI3zlvkfFOGcwisXxadaOmyTa8oKvsQ90xTsLUTq9cFzHZhhd0xfKjmthrlIq+p7fFGgylfRlVz7KLe32ThW1Ws1fRUuFoqtexy50VeDTIu+3Pq2g0LLoZwMowPPCjGwVu0URAZzIQc5T20AqWjY5Mt5qj1oHzokMO584OiNmsw63mDGice8TAmIXsCoDjSItah/xG1OPkfFgJvDu6rmF1DQDGrDCz9pGyvSzorELESjpf+JcVA+oY8uVKRYtfV7w4EKqueoErMiP8VaxtlMSUrKKl0zLB8dbwH6Fra9LjWrRYhNVSLOVCwe/6h6tAZzMRS4PFZuSTcZtBCeRs1nELTnZaawXeXa58uaBS0aONZCN8N8i9308Hvls/3gFabASpVEUwYkJPpXB7Fe0CXZVnMyGHJyOWSnaDFnWvbCXWl69YeN4twwA9evdK75EuD3gzrePWtcW7q/btvErr3HVfQtFjJWRXmnnb7RTA0mimddzrbUDH5AP3XlRPQqbCHRu8AuhrpQN25FVrsgKIT9ztNOXfgNxT02qg7802JXsRX8fnuAbSvczqjQP/lD8C6HQjV/iBEzSpF07QJ2gSAdJlTkWfoEkESJc5FU0C/QeyJRhq7gHRBQAAAABJRU5ErkJggg=="
                alt=""
              />
              <h3>แอดมิน</h3>
              <p>
                เป็นพื้นที่ที่แสดงข้อมูลต่างๆของเว็บไซต์เพื่อให้ทีมงานสามารถอัพเดทข้อมูลต่างๆได้
              </p>
            </div>
            <div class="col">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAAA1NJREFUeF7tnP1R3DAQxUUnpJJAJZBKApUAlUAnJJUkvMGaubs5a1de7VqWnmZu7g/r8+fnJ3lt6yYxhRC4CWmFjSSCDhIBQRN0EIGgZqhogg4iENTMHoq+SyndLr+gYTZr5iOl9GepLf+rKo8E/ZRS+q3q1TEyPX+J5fUEfLHXEaCh3peUEpQ8WoLCf2lgR4B+HxRyFg0s5F6C7Q16NLtYuyJhIxjravIG/W80ryiM50dJ1Z6g4c2fBP1NwBP0LLaRtYRJEauQq8kT9FHFjNURfj8rJ/GiTxN0WQ6Py9ofNiglgpYICccBGUtUCTZBG0GjuGa+IegGoFEF7m5hJWuJoBuBBmTAJuhGQNeqwUoEXh0KGhND6TJyHrOpesQm8ENAqDaV7nSbWodmUqjt/F75Afttmei0fXAHPXKoUxV9W86EO+gZQp0ICknJFfRIdlECKYY6v+4SXUHPEuqEhUiqdgMtLWmkS+1ox/GkpLQacQMtLdKPBlLqbzHU6Wkds/hzPgGST7spmqDPrwGCljxBeZyKVoKyZiNoK0FleYJWgrJmI2grQWV5glaCsmYjaCtBZXmCVoKyZiNoK0FleYJWgrJmI2grQWV5glaCsmYjaCtBZXmCVoKyZiNoK0FleQvo4tMZ6bVdxqP18egiS4I+B7lV0VI58dMKKlpWtObpOUFfeLekzMtHWXhijjLie3y0ju3WIZ2Us5oJug40Xr84/fBeuZiRP3+jR6tRljNS0XWK3oydoAl6s3gsBasmuJqGqGgqukYvzfJS0c1QlivaDfRs70dLr+1uPt+SR3PPjc1ozwsSdB2Pzdgl0Kh4lrtDN38GRA3okb8xzApF/AJPSNySBjQa1+5Z4dZRx4oRT8YkKIY6LX3Qgs6w844sljZ7KutqF6cDrQGdy+WdWPIeo2vgavckKp0AbAr1t+EZgnpdFXzZ1y2gteNtNYm6rW21A2mRr2fQId7ZAqKmjl5Bu68CNHBa5ukRNPwYdjFU6g30EH58TSG9gB7Kj3sFPZwf9wh6SD/uDfSwftwL6OH9uAfQU/jx3qCn8eM9QU/lx3uAfoiI9R7hFtLzhgVh1NBQZM/APUH3PO7wvhF0EHKCJuggAkHNUNEEHUQgqBkqOgj0f0Qw4VtLY3g8AAAAAElFTkSuQmCC"
                alt=""
              />
              <h3>ถูกใจ แสดงความคิดเห็น</h3>
              <p>
                เป็นพื้นที่ที่ผู้ใช้งานสามารถแสดงความคิดเห็นหรือข้อเสนอแนะต่างๆ
                เกี่ยวกับเว็บไซต์
              </p>
            </div>
          </div>
        </div>
        <br />
      </section>
      <section class="firstaid">
        <div class="container">
          <div class="row">
            <div class="firstaid-pic">
              <img
                src="https://www.esafety.com/wp-content/uploads/2016/12/first-aid-1080x675.jpeg"
                alt=""
              />
            </div>
            <div class="firstaid-content">
              <h3>การปฐมพยาบาลเบื้องต้น</h3>
              <p>
                เป็นระบบที่ให้ผู้ใช้สามารถสืบค้นหาข้อมูลเกี่ยวกับวิธีกาปฐมพยาบาลเบื้องต้นได้
                เนื้อหาและข้อมูลของการปฐมพยาบาลเบื้องต้น
                เป็นข้อมูลซึ่งได้มาจากการสืบค้นและนำมาใช้อ้างอิงเพื่อการปฐมพยาบาลเบื้องต้น
              </p>
              <br />
              <div class="mini-row">
                <div class="mini-col">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAeJJREFUaEPtmuFRwzAMhdVN6CawCUxSmASYhG4CTAJ5d81dIXEulp4dqZHv+IcdfX6S/Wr7IDtrh53xSgLfuuKpsFLhOxF5FZF7ZX9Gty8Rwd/LEMe5NCBD4ccLLCNoxhiAfh8Gep4bzAoMRT8YUZLHAPTTnNJWYKQxFPbYkNYP/wOzAn+KCOrXY4PKRzbwj0fSq5gmgloVTmBniqfCmdKVKVlbw2/D/vgtIqfK72j/ffOUhu2DA8JWBujWe7gb4FExODWYl1Z7uTtggAMWSrdIc5fAo9otwFcDzy1Gcyt67aI11vDSIsSs7xDAzPoOBcyo73DA1voOC3wNXrN/3wRwzdlZWGDtlhUSGFZUa0pCATNsZwhg5hm3a2BtnS65NrfAljoNBcyo0xDAzDp1Dez2iKfVz0Pt2ZS23+aLljZwbb8ELp1LZ0oPN+uMIx5tamr70VPa83UpJokOjNv/Ld91LCmPLRCvAP40aw3DQEBljw23/5PHLVZggLbywZZJhLJQeNIYwOPpYs3RiwWm1Nf0bGntttQi8KZjshRuGiRz8AS+zGamdMFpMbOty1illPbkoKzvUFYZD08OqguwJwfVBdiTg+oG7MVBdQXusnL2/Ah19noGrv1WAmtnLkq/3Sn8CzuQgj3fl0/lAAAAAElFTkSuQmCC"
                    alt=""
                  />
                  <h3>ชมวิดีโอ</h3>
                  <p>วิดีโอการปฐมพยาบาลแต่ละหัวข้อให้เลือกดู</p>
                </div>
                <div class="mini-col mini2">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAcxJREFUaEPtWt1RwzAMVjdhE2ATmASYBJiEMglsAtFdc4TUtfxZim018ksf6ij6fqzYPh1oZ+OwM7wUgK9d8VBYUPiGiB6I6JaI7gZww/cph/fp97kkH0RhDvhUErTTHAZ/Pwkyk5BMoxTwxyCKSlweT6AvzisBzBZ+ld400P+sMgOvVviLiHjtehmPU75vtYAvqftSWiQ2ZilVV7K5SZZOAWb2mMURhjlgOGBjFuD8JIXhgAF4WwZgQVorDCco8AXHC8ArRmEGrRWxjhcKh8LnJyTNLqv7EglLG1g6dxBPXRzwyeYzU5xy8WDHbKHwj/FeI5djACYi1WkJZnC6BgqFlRYf3tK7K1o5QWuWiGm8Laq0aYKxl/7PAOyYUNhgpxWWXjAAWzDWsLM1rNyDnD0OO6Z10QrASgZC4R6nJaVo0ONNFIYy6jDZ/DzcAQP0ygC8pKvmswTR3WFyKGyhsOYyvoPof6+ssfRILQ8weTWA3arL7EiAU00tYvMXTHvDByTA3E/JXXjr4VZlCTA3pHFjmqeh+iwxUG+th2rAc8vwyJ20SweqAXMwT6BNAM8MjtYgnqotpoA9Fa9krlKVdg9wDSAAX52kK0C7U/gXOfvIPeCd3OIAAAAASUVORK5CYII="
                    alt=""
                  />
                  <h3>เรียนรู้เพิ่มเติม</h3>
                  <p>สามารถเรียนรู้ข้อมูลการปฐมพยาบาลเพิ่มเติม</p>
                </div>
              </div>

              <a href="/firstaid" class="firstaid-btn">
                การปฐมพยาบาลเบื้องต้น
              </a>
            </div>
          </div>
        </div>
      </section>

      <br />
      <div class="container">
        <div class="content">
          <h3>บทความเพื่อสุขภาพ</h3>
          <h1>อัพเดทตามสถานการณ์ปัจจุบัน</h1>
          <Button
            href="/article"
            className="w3-button w3-padding-large w3-white w3-border me-2"
          >
            บทความเพื่อสุขภาพ
          </Button>
        </div>
        <br />
        <Articlecards key={articles.id} cardList={articles} />
      </div>
      <Footer />
    </div>
  );
}
export default Home;
