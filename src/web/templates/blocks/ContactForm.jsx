import { useEffect, useState } from "react"

const ContactForm = ({}) => {
  const cls5 = "cls-5 container"
  const cls6 = "cls-6 grid md:grid-cols-12 grid-cols-1 items-center gap-6"
  const cls7 = "cls-7 lg:col-span-7 md:col-span-6"
  const cls8 = "cls-8 w-full max-w-[500px] mx-auto"
  const cls9 = "cls-9 lg:col-span-5 md:col-span-6"
  const cls10 = "cls-10 lg:ms-5"
  const cls11 = "cls-11 bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6"
  const cls12 = "cls-12 mb-6 text-2xl leading-normal font-semibold"
  const cls13 = "cls-13 mb-0"
  const cls14 = "cls-14 grid lg:grid-cols-12 grid-cols-1 gap-3"
  const cls15 = "cls-15 lg:col-span-6"
  const cls16 = "cls-16 font-semibold"
  const cls17 =
    "cls-17 mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
  const cls18 = "cls-18 lg:col-span-12"
  const cls19 =
    "cls-19 mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
  const cls20 =
    "cls-20 py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md mt-2"
    /*********************/
/*     Contact Form  */
/*********************/


    const validateForm=()=>{
        var name = document.forms["myForm"]["name"].value;
        var email = document.forms["myForm"]["email"].value;
        var subject = document.forms["myForm"]["subject"].value;
        var comments = document.forms["myForm"]["comments"].value;
        document.getElementById("error-msg").style.opacity = 0;
        document.getElementById('error-msg').innerHTML = "";
        if (name == "" || name == null) {
            document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
            fadeIn();
            return false;
        }
        if (email == "" || email == null) {
            document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
            fadeIn();
            return false;
        }
        if (subject == "" || subject == null) {
            document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Subject*</div>";
            fadeIn();
            return false;
        }
        if (comments == "" || comments == null) {
            document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Comments*</div>";
            fadeIn();
            return false;
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("simple-msg").innerHTML = this.responseText;
                document.forms["myForm"]["name"].value = "";
                document.forms["myForm"]["email"].value = "";
                document.forms["myForm"]["subject"].value = "";
                document.forms["myForm"]["comments"].value = "";
            }
        };
        xhttp.open("POST", "php/contact.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("name=" + name + "&email=" + email + "&subject=" + subject + "&comments=" + comments);
        return false;
    }

    const fadeIn=()=> {
        var fade = document.getElementById("error-msg");
        var opacity = 0;
        var intervalID = setInterval(function () {
            if (opacity < 1) {
                opacity = opacity + 0.5
                fade.style.opacity = opacity;
            } else {
                clearInterval(intervalID);
            }
        }, 200);
    }
 
  return (
    <div className={cls5}>
      <div className={cls6}>
        <div className={cls7}>
          <img src="/assets/images/travel-train-station.svg" alt="" className={cls8} />
        </div>

        <div className={cls9}>
          <div className={cls10}>
            <div className={cls11}>
              <h3 className={cls12}> Hubungi Kami </h3>

              <form method="post" name="myForm" id="myForm" onsubmit="return validateForm()">
                <p id="error-msg" className={cls13}></p>
                <div id="simple-msg"> </div>
                <div className={cls14}>
                  <div className={cls15}>
                    <label htmlFor="name" className={cls16}>
                      Nama Anda:
                    </label>
                    <input name="name" id="name" type="text" placeholder="Nama :" className={cls17} />
                  </div>

                  <div className={cls15}>
                    <label htmlFor="email" className={cls16}>
                      Email:
                    </label>
                    <input name="email" id="email" type="email" placeholder="Email :" className={cls17} />
                  </div>

                  <div className={cls18}>
                    <label htmlFor="subject" className={cls16}>
                      Pertanyaan Anda:
                    </label>
                    <input name="subject" id="subject" placeholder="Subject :" className={cls17} />
                  </div>

                  <div className={cls18}>
                    <label htmlFor="comments" className={cls16}>
                      Komentar:
                    </label>
                    <textarea name="comments" id="comments" placeholder="Message :" className={cls19} />
                  </div>
                </div>
                <button type="submit" id="submit" name="send" className={cls20}>
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
